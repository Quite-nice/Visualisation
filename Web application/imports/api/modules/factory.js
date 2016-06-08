/**
 * Created by Kymer on 8/06/16.
 */
import {Modules} from '/imports/api/modules/modules'
import {Factory} from 'meteor/dburles:factory'

Factory.define('branchesModule', Modules, {
	typeId: () => Factory.get('branch'),
	name: 'Branches',
	parentId: null
})