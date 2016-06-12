import {genericModuleDescriptor} from './genericDescriptors'

// Template registers
const moduleTypeRegister = new Map();
const moduleIndicatorRegister = [];
const detailPageNames = new Map()

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

	for (let [indicator, descriptor] of moduleIndicatorRegister.reverse()) {
		if (indicator(module)) {
			let result = field(descriptor)
			if (result != undefined) return result
		}
	}

	return field(genericModuleDescriptor)
}

export function findEventDescriptorField(event, module, field) {
	return findModuleDescriptorField(module, function(moduleDescriptor) {
		if (moduleDescriptor.eventRegistry.types.has(field))
			return moduleDescriptor.eventRegistry.types.get(field)
		
		for (let [indicator, descriptor] of moduleDescriptor.eventRegistry.indicators.reverse()) {
			if (indicator(event)) return descriptor[field]
		}
	})
}