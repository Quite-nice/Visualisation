
import datetime
from pymongo import MongoClient

from pyre import Pyre
from pyre import zhelper
import zmq
import uuid
import json

import logging


def rethinkdb_writer(ctx, pipe):

    # Database setup
    with open('../configuration.json') as data_file:
        configuration = json.load(data_file)

    group_name = configuration['zyreMediator']['group']

    n = Pyre(configuration['zyreMediator']['name'])
    n.set_header('TYPE', configuration['zyreMediator']['type'])
    n.join(group_name)
    n.start()

    # Zyre setup
    poller = zmq.Poller()
    poller.register(pipe, zmq.POLLIN)
    poller.register(n.inbox, zmq.POLLIN)

    database_configuration = configuration['database']['mongoDB']
    mongo_connection = MongoClient(database_configuration["host"], database_configuration["port"])

    meteor = mongo_connection['meteor']

    # Add this module to the database
    meteor['modules'].insert([{
        "_id": str(n.uuid()),
        "name": n.name(),
        "type": configuration['zyreMediator']['type'],

    }])

    ready_message = {
        'type': 'state',
        'sender_UUID': str(n.uuid()),
        'payload': 2
    }

    def logMessage(message_to_log):
        message_to_log['timestamp'] = datetime.datetime.utcnow()
        meteor['events'].insert_one(message_to_log)
        del message_to_log['timestamp']
        del message_to_log['_id']

    n.shout(group_name, json.dumps(ready_message))
    logMessage(ready_message)

    module_name_to_uid_map = {}

    while True:
        items = dict(poller.poll(10))

        if pipe in items and items[pipe] == zmq.POLLIN:
            message = pipe.recv()
            # message to quit
            if message.decode('utf-8') == '$$STOP':
                break

        if n.inbox in items and items[n.inbox] == zmq.POLLIN:

            msg_frame = n.recv()
            msg_type = msg_frame.pop(0)
            peer_uid = uuid.UUID(bytes=msg_frame.pop(0))
            peer_name = msg_frame.pop(0)
            # print('NODE_MSG TYPE: %s' % msg_type)
            # print('NODE_MSG PEER: %s' % str(peer_uid))
            # print('NODE_MSG NAME: %s' % peer_name)

            if msg_type.decode('utf-8') == 'ENTER':

                headers = json.loads(msg_frame.pop(0))

                try:
                    module_type = headers['type']
                except KeyError:
                    print("Your header doesn't contain your type of robot")
                    module_type = 'unknown'

                # creates an entry with all known information about the robot
                # in the database if the robot is not in the database
                meteor['modules'].insert_one({
                    '_id': str(peer_uid),
                    'name': peer_name,
                    'type': module_type
                })

                module_name_to_uid_map[peer_name] = str(peer_uid)

            elif msg_type.decode('utf-8') == 'EXIT':
                meteor['modules'].remove({'uuid': str(peer_uid)})

            elif msg_type.decode('utf-8') == 'SHOUT':

                # write message to database
                group = msg_frame.pop(0)
                try:
                    data = json.loads(msg_frame[0])
                except:
                    print 'Invalid JSON string'

                # print data

                data['sender_UUID'] = str(peer_uid)
                logMessage(data)

            elif msg_type.decode('utf-8') == 'WHISPER':
                # write message to database
                try:
                    data = json.loads(msg_frame[0])
                except:
                    print 'Invalid JSON string'

                logMessage(data)

    meteor['modules'].remove({'_id': str(n.uuid())})
    n.stop()


if __name__ == '__main__':
    # Create a StreamHandler for debugging
    logger = logging.getLogger('pyre')
    logger.setLevel(logging.INFO)
    logger.addHandler(logging.StreamHandler())
    logger.propagate = False

    ctx = zmq.Context()
    database_writer = zhelper.zthread_fork(ctx, rethinkdb_writer)

    while True:
        try:
            msg = raw_input()
            database_writer.send(msg.encode('utf_8'))

        except (KeyboardInterrupt, SystemExit):
            break

    database_writer.send('$$STOP'.encode('utf_8'))

    print('FINISHED')