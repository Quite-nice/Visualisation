import './JsonView.html'
import './style.less'

import './Object'
import './String.html'
import './Number.html'
import './Boolean.html'
import './Undefined.html'

const typeMap = new Map([
	['string', 'JsonStringView'],
	['number', 'JsonNumberView'],
	['object', 'JsonObjectView'],
	['boolean', 'JsonBooleanView'],
	['undefined', 'JsonUndefinedView']
])

Template.JsonView.helpers({
	entries() {
		return _.pairs(this.object)
	},
	entryView() {
		return typeMap.get(typeof this[1])
	}
})