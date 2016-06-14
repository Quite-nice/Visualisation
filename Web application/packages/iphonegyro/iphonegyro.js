import {EventDescriptor, ModuleDescriptor, registerModuleDescriptor} from 'meteor/extension-system';
import './components/MiniView'

const iPhoneDescriptor = new ModuleDescriptor({
	miniView: 'iPhoneGyroView'
})

registerModuleDescriptor('iPhone', iPhoneDescriptor)