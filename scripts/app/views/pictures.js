define(['backbone', 'models/picture'], function(__notUsed__, Picture) {
	var PictureView = Backbone.View.extend({
		template: _.template($('#picture-template').html()),
		tagName: 'li',

		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}
	});

	return Backbone.View.extend({
		initialize: function() {
			console.log('initialized view', this);
			this.render();
		},

		render: function() {
			var $el = this.$el;
			this.collection.each(function(picture) {
				var model = new Picture(_(picture.get('images')[0]).extend({
					id: picture.id
				}));
				var v = new PictureView({
						model: model
					});
				v.listenTo(model, 'likes', function(data) {
					v.$('.likes').text(data.summary.total_count);
				})
				$el.append(v.render().$el);
			});
		}
	});
});