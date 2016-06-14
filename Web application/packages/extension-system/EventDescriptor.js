export class EventDescriptor {
	constructor({name, lineView, detailView}) {
		if (name == undefined && lineView == undefined && detailView == undefined) {
			throw new Error('An event descriptor needs at least one of the following properties: "name", "lineView", "detailView"')
		} else {
			this.name = name;
			this.lineView = lineView;
			this.detailView = detailView
		}
	}

	getName(event) {
		let name = this.name
		if (typeof name == 'function') name = this.name(event);
		return name || event.type || "No name"
	}

	getLineView(event) {
		return this.lineView || "GenericEventLineView"
	}

	getDetailView(event) {
		return this.detailView || "JsonView"
	}
}
