Requires nodeJS 6.x (or newer, this is a constraint of [zyre.js](https://github.com/interpretor/zyre.js)) and thus meteor 1.6

This package runs a ZRE peer (referred to as `zreObserver`) to observe the network and add all other peers and their events to the Collections provided by [meteor/visualisation:database](https://github.com/Quite-nice/Visualisation/tree/develop/Web%20application/packages/database).

## Exports

This package exports:

```javascript
 export const rootModuleType = 'ZRE network observer'
 export const zreModuleType = 'ZRE node'
 export const zreNodeModuleIdPrefix = 'ZRE-node:'
 export const whisperMethodName = 'ZRE.whisper'
 export const shoutMethodName = 'ZRE.shout'
 export const restartMethodName = 'ZRE.restart'
```

To import some of these constants in your own code, write:

```javascript
import {shoutMethodName, whisperMethodName} from 'meteor/visualisation:zre'
```

## Methods

### Shout

```javascript
import {Meteor} from 'meteor/meteor'
import {shoutMethodName} from 'meteor/visualisation:zre'

Meteor.call(shoutMethodName, group, message)
```

### Whisper

```javascript
import {Meteor} from 'meteor/meteor'
import {whisperMethodName} from 'meteor/visualisation:zre'

Meteor.call(whisperMethodName, moduleId, message)
```

Note that you should not provide the ZRE peer id of the intended receiver but the module id that corresponds to this peer. (see [Modules](#modules))

### Restart

To restart the ZRE node call the method `restartMethodName`

```javascript
import {Meteor} from 'meteor/meteor'
import {restartMethodName} from 'meteor/visualisation:zre'

Meteor.call(restartMethodName)
```


## Collection insertions

### Modules

#### ZRE peer modules

```javascript
import {Modules} from 'meteor/visualisation:database'
```

For each ZRE peer (with peerID, peerName, peerHeader) that enters the network

- A new module is created if there was none for the the peer with peerID already
- The existing module's peerName and peerHeader are updated (using peerID as reference)

The module is an object with these properties

```javascript
{
  "_id": zreNodeModuleIdPrefix + peerID,
  "type": zreModuleType,
  "header": peerHeader,
  "name": peerName,
  "groups": []
  "parentId": rootModule._id
}
```

Where 

- `rootModule` is an object that this package inserts into the Modules collection on startup.
- `"groups"` is an array containing the name of the groups this peer is in.

#### Root module

The root module contains:

```
{
  "type": rootModuleType,
  "parentId": null,
  "name": "ZRE network"
}
```

### Events

```javascript
import {Events} from 'meteor/visualisation:database'
```

#### on Enter

The following object is inserted into the Events collection

```javascript
{
  "senderId": zreNodeModuleIdPrefix + peerID,
  "type": "state",
  "payload": 2,
  "date": new Date()
}
```

#### on Whisper

When a (utf8 string) `message` is whispered to the `zreObserver` the following object is added to `Events`

```javascript
{
  "senderId": zreNodeModuleIdPrefix + peerID,
  "type": "whisper",
  "payload": message,
  "date": new Date()
}
```

#### on Shout

When a (utf8 string) `message` is shouted to a `group` the following object is added to `Events`

```javascript
{
  "senderId": zreNodeModuleIdPrefix + peerID,
  "type": "shout",
  "group": group,
  "payload": message,
  "date": new Date()
}
```

#### on Join

When a ZRE node (with `peerID`) joins a `group` the following object is added to `Events`

```javascript
{
  "senderId": zreNodeModuleIdPrefix + peerID,
  "type": "join",
  "payload": group,
  "date": new Date()
}
```

#### on Leave

When a ZRE node (with `peerID`) **leaves** a `group`, the following object is added to `Events`

```javascript
{
  "senderId": zreNodeModuleIdPrefix + peerID,
  "type": "leave",
  "payload": group,
  "date": new Date()
}
```

#### on Exit

When a ZRE node (with `peerID`) **exits** the network, the following object is added to `Events`

```javascript
{
  "senderId": zreNodeModuleIdPrefix + peerID,
  "type": "state",
  "payload": 0,
  "date": new Date()
}
```



