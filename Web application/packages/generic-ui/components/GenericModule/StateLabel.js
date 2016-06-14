import './StateLabel.html'

const bootstrapNames = new Map([
	[0, 'danger'],
	[1, 'warning'],
	[2, 'success']
])

const descriptions = new Map([
	[0, 'Offline'],
	[1, 'Configuring'],
	[2, 'Online']
])

Template.StateLabel.helpers({
	bootstrapName: state => bootstrapNames.get(state),
	description: state => descriptions.get(state)
})