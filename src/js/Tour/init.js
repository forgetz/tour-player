/* globals Tour, Lang, BrouserInfo, UI*/

Tour.init = function(data, options) {
    console.info('Tour-player', 'v' + this.version.join('.'), 'by http://Tour-360.ru');
    BrouserInfo();
    this.options.set(this.defaultOption);
    this.options.set(options);
    Lang.set(this.options.lang, Tour.dictionary);
    this.backgroundImage.init();
    UI.notification.init();
    this.setControlPanel();
    this.setMouseMenu();
    this.load(this.options.data || data, function(data) {
        this.createScene();
        document.title = Lang.translate(data.title) || '';
        var query = Tour.query.get();
        query.id = query.id || data.start || 0;
        this.view.set(query);
        this.addEventListeners();
        this.animate();
    }.bind(this));
};
