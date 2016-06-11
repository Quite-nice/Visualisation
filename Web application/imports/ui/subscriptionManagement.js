export function replaceSubscription(context, oldSubscription, ...parameters) {
	return context.subscribe.apply(context, parameters.concat(function() {
		if (oldSubscription != null) oldSubscription.stop()
	}))
}