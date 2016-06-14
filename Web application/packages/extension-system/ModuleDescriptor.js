export class ModuleDescriptor {
	constructor({name, miniView, detailView, detailPageViews}) {
		if (name == undefined && miniView == undefined && detailView == undefined && detailPageViews == undefined) {
			throw new Error('An event descriptor needs at least one of the following properties: "name", "miniView", "detailView", "detailPageViews"')
		} else {
			this.name = name;
			this.miniView = miniView;
			this.detailView = detailView
			if (detailPageViews != undefined && !(detailPageViews instanceof Array)) {
				throw new Error('detailPageViews must be an array')
			}
			this.detailPageViews = detailPageViews

			this.eventRegistry = {
				types: new Map(),
				indicators: []
			}
		}
	}

	getName(module) {
		let name = this.name
		if (typeof name == 'function') name = this.name(module);
		return name
	}

	getMiniView(event) {
		return this.miniView
	}

	getDetailView(event) {
		return this.detailView
	}

	registerEvent(indicator, eventDescriptor) {
		if (typeof indicator == 'function') {
			this.eventRegistry.indicators.push([indicator, eventDescriptor])
		} else if (typeof indicator == 'string') {
			this.eventRegistry.types.set(indicator, eventDescriptor)
		}
	}
}