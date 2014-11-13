define(['fb', 'backbone'], function(fb) {
	var Model = Backbone.Model.extend({

		initialize: function() {
			this.requesting = false;
		},

		getInfo: function() {
			if (this.get('link') || this.get('picture') || this.requesting) {
			} else {
				var _this = this;
				this.requesting = true;
				fb.obj(this.id, function(data) {
					_this.set(data);
				});
				fb.obj(this.id, function(data) {
					window.reqs += 1;
					_this.set(data);
				});
				fb.picture(this.id, function(data) {
					_this.set('picture', data.data);
				});
			}
		}
	});
	return Backbone.Collection.extend({
		model: Model,
		initialize: function() {
			window.reqs = 0;
		},
	})
});