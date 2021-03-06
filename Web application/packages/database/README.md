# Publications
This is a file containing both requested and provided publications. The publications are based upon 2 entities: Modules & Events.

## Events
* [x] `allEvents()`: *returns all events, period*
* [x] `event(_id)`: *returns event, given the `_id`*
* [x] `eventsReceivedByModule(_id)`: *returns events received by a certain module, given its `_id`*
* [x] `eventsSentByModule(_id)`: *returns all events sent by a certain module, given its `_id`*
* [x] `eventsWithinTimeSpan(dateFrom, dateTo)`: *returns all events between `dateFrom` & `dateTo`*

## Modules
**BEWARE!** you have to merge the Types collection with the Modules collection before publishing

* [x] `allModules() + allModulesPlusType() `: *returns all modules, period*
* [x] `module(_id) + modulePlusType(_id)`: *returns event, given the `_id`*
* [x] `subModulesFromModule(_id) + subModulesFromModulePlusType(_id)`: *returns the submodules of a module, given the `_id`*
* [x] `modulesFromLocation(lat, long, radiusInMeter)`: *returns all modules, positioned within the radius of the given `lat` & `long`*, sorted by distance
