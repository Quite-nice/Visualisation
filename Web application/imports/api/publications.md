#publications
This is a file containing both requested and provided publications. The publications are based upon 2 entities: Modules & Events.

##Events
* [ ] `allEvents()`: *returns all events, period*
* [ ] `event(_id)`: *returns event, given the `_id`*
* [ ] `eventsReceivedByModule(_id)`: *returns events received by a certain module, given its `_id`*
* [ ] `eventsSentByModule(_id)`: *returns all events sent by a certain module, given its `_id`*
* [ ] `eventsWithinTimeSpan(dateFrom, dateTo)`: *returns all events between `dateFrom` & `dateTo`*

##Modules
**BEWARE!** you have to merge the Types collection with the Modules collection before publishing

* [ ] `allModules()`: *returns all modules, period*
* [ ] `module(_id)`: *returns event, given the `_id`*
* [ ] `subModulesFromModule(_id)`: *returns the submodules of a module, given the `_id`*
* [ ] `modulesFromLocation(lat, long, radiusInMeter)`: *returns all modules, positioned within the radius of the given `lat` & `long`*
