require.config({
	shim: {
		'facebook' : {
			exports: 'FB'
		},
		'bootstrap': {
			deps:['jquery']
		}
	},
	paths: {
		'facebook': 'http://connect.facebook.net/en_US/all',
		'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap.min',
		'backbone': '../bower_components/backbone/backbone',
		'underscore': '../bower_components/underscore/underscore-min',
		'jquery' : '../bower_components/jquery/dist/jquery.min'
	}
})
require(['bootstrap', 'fb', 'models/albums', 'models/pictures', 'views/pictures'], function(__bs__, fb, AlbumCollection, PictureCollection, PicturesView){
	var pictureCollection,
		picturesView;

	fb.once('logged', function(data) {
		fb.albums(function (albums) {
			var albumCollection = new AlbumCollection(albums.data),
				profileAlbum = albumCollection.getProfileAlbum();

			fb.albumPictures(profileAlbum.id, function(profilePictures) {
				pictureCollection = new PictureCollection(profilePictures.data);
				picturesView = new PicturesView({
					el: '#pictures',
					collection: pictureCollection
				});
			});
		})
	});
});