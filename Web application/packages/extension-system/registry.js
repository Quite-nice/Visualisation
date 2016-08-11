export {EventDescriptor} from './EventDescriptor'
export {ModuleDescriptor} from './ModuleDescriptor'

// Template registers
const moduleTypeRegister = new Map();
const moduleIndicatorRegister = [];
const detailPageNames = new Map()

registerDetailPageName('Events', 'EventDetailPage')

export function registerDetailPageName(name, view) {
	detailPageNames.set(view, name)
}

export function getDetailPageName(view) {
	return detailPageNames.get(view)
}

export function registerModuleDescriptor(indicator, moduleDescriptor) {
	if (typeof indicator == 'function') {
		moduleIndicatorRegister.push([indicator, moduleDescriptor])
	} else if (typeof indicator == 'string') {
		moduleTypeRegister.set(indicator, moduleDescriptor)
	}
}

export function findModuleDescriptorField(module, extractField) {
	if (module == undefined) throw new Error('This function expects a module as the first parameter');
	let field;
	if (typeof extractField == 'string') {
		field = moduleDescriptor => moduleDescriptor[extractField];
	} else {
		field = extractField
	}
	if (moduleTypeRegister.has(module.type)) {
		let descriptor = moduleTypeRegister.get(module.type)
		let result = field(descriptor)
		if (result != undefined) return result
	}

	for (let i = moduleIndicatorRegister.length-1; i>=0; --i) {
		let [indicator, descriptor] = moduleIndicatorRegister[i]
		if (indicator(module)) {
			let result = field(descriptor)
			if (result != undefined) return result
		}
	}

	throw new Error('No module descriptor found');
}

export function findEventDescriptorField(event, module, field) {
	return findModuleDescriptorField(module, function(moduleDescriptor) {
		if (moduleDescriptor.eventRegistry.types.has(event.type))
			return moduleDescriptor.eventRegistry.types.get(event.type)[field]
		
		for (let [indicator, descriptor] of moduleDescriptor.eventRegistry.indicators.reverse()) {
			if (indicator(event)) return descriptor[field]
		}
	})
}

