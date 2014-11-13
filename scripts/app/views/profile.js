define(['backbone'], function() {
	return Backbone.View.extend({
		template: _.template($('#profile-template').html()),
		tagName: 'li',
		className: 'media',

		initialize: function() {
			var _this = this;
			this.model.on("change:link", function(){
				_this.$('.profile-link').attr('href', this.get('link'));
			});
			this.model.on("change:picture", function(){
				_this.$('.profile-image').attr('src', this.get('picture').url);
			});
		},

		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}
	});
});