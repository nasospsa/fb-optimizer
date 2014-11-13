define(['backbone'], function() {
	return Backbone.Collection.extend({
		getProfileAlbum: function() {
			return this.findWhere({
				type: 'profile'
			});
		}
	});
});