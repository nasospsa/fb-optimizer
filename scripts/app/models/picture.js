define(['fb', 'backbone'], function(fb) {
	return Backbone.Model.extend({
		initialize: function() {
			// console.log(this);
			this.getLikes();
		},

		getLikes: function() {
			var _this = this;
			fb.likes(this.id, function(data){
				_this.trigger('likes', data);
			})
		}
	});
});