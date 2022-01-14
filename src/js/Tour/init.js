/* globals Tour, Lang, BrouserInfo, UI*/

var bgmplayer = [];
var bgmCurrent = '';
var bgmState = true;

Tour.init = function(data, options) {
    this.sentry();
    console.info('Tour-player', 'v' + this.version.join('.'));
    BrouserInfo();
    this.options.set(this.defaultOption);
    this.options.set(options);
    this.options.set(Tour.query.get());
    Lang.set(this.options.lang, Tour.dictionary);
    this.backgroundImage.init();
    this.createScene();
    UI.notification.init();
    UI.popUp.init();
    this.setSliders();
    UI.devCursor.init(this.options.cursor);

    
    this.setMouseMenu();
    this.orientationControls.init();

    this.load(data, function(data) {

        this.setControlPanel(data.control);
        this.setVideos(data.videos);
        this.setImages(data.images);
        document.title = Lang.translate(data.title) || Lang.get('virtual-tour');
        var query = Tour.query.get();
        query.id = query.id || data.start || data.panorams[0].id || 0;
        if (query.id == data.start && !query.lon && !query.lat) {
            var pano = this.getPanorama(query.id);
            query.lat = pano.lat;
            query.lon = pano.lon;
        };
        this.view.set(query, true);
        this.setGallery(data, options.galleryVisible);
        this.addEventListeners();
        Tour.emmit('init');
        this.animate();


        this.currentBGM = '';
        for (i = 0; i< data.panorams.length; i++) {
            if (data.panorams[i].bgm !== undefined) { 
                var panoid = data.panorams[i].id
                bgmplayer[panoid] = document.getElementById(data.panorams[i].bgm.id)
            }
        }

    }.bind(this));
};
