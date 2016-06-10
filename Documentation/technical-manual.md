# Technical manual

## Database structure

This is a draft. If you have suggestions on how to improve the schema, please add some comments.

### Modules

- `_id`: unique string
- `parentId`: the `_id` of its parent module or `null` if it has no parent
- `name`: string


- `typeId`: the `_id` of its type
- `loc: { type: 'Point', coordinates: [long, lat] }`: location data in GeoJSON format

### Events

- `senderId`: a string that references the `id` property of the module that sent the event
- `date`: JS Date object. This is the receive date.
- `type`: a string. This can be anything except the reserved event types
- `payload`: the actual event. This may be a JSON object but it can also be a BLOB, string, array or number.

**Generic event types**

There are some event types that every will module have, regardless of the application. We list them here and provide a visualisation in the GUI for them that you can reuse in every application.

- `stateChange`: to indicate that the module's state changed. These events should have a number as payload:
  - `0` if the module is offline
  - `1` if it is configuring (on startup for example)
  - `2` if the module is online