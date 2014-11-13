define(['models/profiles', 'views/profile', 'backbone'], function(ProfileCollection, ProfileView) {
	var PictureView = Backbone.View.extend({
		template: _.template($('#picture-template').html()),
		tagName: 'div',
		className: 'col-sm-6 col-md-3',
		events: {

		},

		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}
	});

	return Backbone.View.extend({
		initialize: function() {
			this.views = [];
			this.profiles = new ProfileCollection;
			this.collection.profiles = this.profiles;
			this.render();
		},

		render: function() {
			var $el = this.$el,
				likesReturned = 0,
				_this = this;

			this.collection.each(function(pictureModel) {
				// var model = new Picture(_(picture.get('images')[0]).extend({
				// 	id: picture.id
				// }));
				var v = new PictureView({
					model: pictureModel
				});
				v.listenTo(pictureModel, 'likes', function(data) {
					v.$('.likes').text(data.summary.total_count);

					_this.profiles.add(data.data, {merge: true});

					likesReturned += 1;
					if (likesReturned == _this.collection.length) {
						_this.renderOdds();
					}

				})
				$el.append(v.render().$el);
				_this.views.push(v)
			});
		},

		renderOdds: function() {
			var _this = this;
			_(this.views).each(function(v) {
				var odds = v.model.findOddOnes(_this.profiles);
				v.$('.missing').text(odds.length);
				_(odds).each(function(o) {
					o.getInfo();
					var pv = new ProfileView({
						model: o
					});
					v.$('.missing-list').append(pv.render().$el);
				});
			});
		},

	});
});