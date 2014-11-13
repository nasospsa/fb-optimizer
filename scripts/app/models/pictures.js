define(['fb', 'models/likes', 'backbone'], function(fb, LikesCollection) {
	var Model = Backbone.Model.extend({
		initialize: function() {
			this.getLikes();
		},

		getLikes: function() {
			var _this = this;
			this.likes = null;

			fb.likes(this.id, function(data){
				_this.likes = new LikesCollection(data.data);
				_this.trigger('likes', data);
			})
		},

		findOddOnes: function(profiles) {
			var _this = this;
			return profiles.reject(function(m){
				return _this.likes.get(m.id);
			});
		}

	});

	return Backbone.Collection.extend({
		model: Model,
		profiles: null,

		getProfileAlbum: function() {
			return this.findWhere({
				type: 'profile'
			});
		},

	});
});