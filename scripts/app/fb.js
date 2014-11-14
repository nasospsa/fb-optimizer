define(['facebook', 'backbone'], function(){
	var FBModel = Backbone.Model.extend({
		init: function() {
			var _this = this;
			FB.init({
				appId: '1561887870713742',
			});
			FB.getLoginStatus(function(response) {
				if (response.status === 'connected') {
					_this.trigger('logged', response);
				}
				else {
					// _this.login();
				}
			});
		},

		me: function(callback) {
			this._api('/me', {}, callback);
		},

		obj: function(id, callback) {
			this._api('/'+id, {}, callback);
		},
		picture: function(id, callback) {
			this._api('/'+id+'/picture', {}, callback);
		},

		login: function() {
			FB.login(function(response) {
				_this.trigger('logged', response);
				console.log('logged', response);
			}, {
				scope: 'user_photos',
				return_scopes: true
			});
		},

		albums: function(callback) {
			this._api('/me/albums', {
				type: 'large',
			}, callback);
		},

		albumPictures: function(albumID, callback) {
			this._api('/' + albumID + '/photos', {}, callback);
		},

		likes: function(id, callback) {
			this._api('/' + id + '/likes', {
				summary: true,
				limit: 1000
			}, callback);
		},

		_api: function(path, params, callback) {
			FB.api(path, params, function(response) {
				if (response && !response.error) {
					callback(response);
				} else {
					console.info(path, params);
					console.error(response);
				}
			});
		}
	});

	return new FBModel;
});