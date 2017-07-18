import './meta-detailViewPage.html'
import {zreNodeModuleIdPrefix} from '../../meta'

Template.ZreMetaDetailViewPage.helpers({
	idFrom(visualisationID) {
		if (visualisationID !== undefined)
			return visualisationID.slice(zreNodeModuleIdPrefix.length)
	}
})