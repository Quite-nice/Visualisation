/**
 * Created by Kymer on 8/06/16.
 */
import {Types} from '/imports/api/types/types'
import {Factory} from 'meteor/dburles:factory'

Factory.define('branch', Types, {
	name: 'branch',
	color: '#c0c0c0',
	discription: 'Git branch'
})