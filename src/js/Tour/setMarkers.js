/* globals Tour, Lang, UI */



Tour.setMarkers = function(id) {

    if (this.markers) {
        this.markers.forEach(function(marker) {
            marker.remove();
        });
    }

    this.markers = [];
    var pano = this.getPanorama(id);
    var markers = pano && pano.markers;

    if (markers) {
        /* Типы действий
         * github.com/Tour-360/tour-player/wiki/Формат-файла-manifest.json#action
         */

        if (pano.bgm !== undefined) {

            var bgmid = pano.bgm.id;
            var volume = pano.bgm.volume;
            var panoid = pano.id;

            if (bgmState)
            {
                if (this.currentBGM == '') {
                    console.log('now playing', bgmid)
                    bgmplayer[panoid].play();
                    bgmplayer[panoid].volume = volume;
                    bgmplayer[panoid].loop = true;
                    this.currentBGM = panoid;

                    bgmCurrent = panoid;
                }
                else if (this.currentBGM != panoid)
                {
                    console.log('change bgm to', bgmid)
                    bgmplayer[this.currentBGM].pause();
                    bgmplayer[panoid].play();
                    bgmplayer[panoid].volume = volume;
                    bgmplayer[panoid].loop = true;
                    this.currentBGM = panoid;

                    bgmCurrent = panoid;
                } else {

                    
                    
                }
            }
            else 
            {
                this.currentBGM = panoid;
                bgmCurrent = panoid;
            }
            
        }

        var action = function(marker) {

            if (marker.sound !== undefined) {
                var sfx = document.getElementById(marker.sound); 
                sfx.play()
            }

            if (this.type == 'panorama') {
                Tour.view.set(this, null, Math.abs(Tour.view.lat.value) < 45);
            } else if (this.type == 'popnorama') {

                Tour.view.set(this, null, Math.abs(Tour.view.lat.value) < 45);
                UI.popUp.set(this.popupid);

            } else if (this.type == 'url') {
                window.open(this.href, this.target || '_blank');
            } else if (this.type == 'popup') {
                UI.popUp.set(this.id);
            } else if (this.type == 'window') {

            } else if (this.type == 'change') {
                this.click = this.click + 1 || 0;
                Tour.backgroundImage.transitionStart(function() {
                    if (Array.isArray(marker.title)) {
                        Tour.markers[marker.index].setTitle(
                            Lang.translate(marker.title[this.click % marker.title.length])
                        );
                    }
                    var manager = new Tour.LoadingManager();
                    manager.onprogress = function(event) {
                        UI.controlPanel.setProgress(event.progress);
                    };
                    manager.onload = function() {
                        Tour.backgroundImage.transitionEnd();
                    };
                    for (var k in this.planes) {
                        var planeId = this.planes[k][this.click % this.planes[k].length];
                        var imgeURL = Tour.options.path + id + '/' + Tour.options.imageType + '/' + planeId + '.jpg';

                        Tour.setPlane(k, imgeURL, manager);
                    }
                }.bind(this));
            } 
        };

        for (var i = 0; i < markers.length; i++) {

            var m = markers[i];

            var marker = new this.Marker(
                m.lat,
                m.lon,
                action.bind(m.action, m)
            );

            var title = (Array.isArray(m.title) ? m.title[m.title.length - 1] : m.title) ||
                (markers[i].action.type == 'panorama' && this.getPanorama(m.action.id).title) || 
                (markers[i].action.type == 'popnorama' && this.getPanorama(m.action.id).title);

            if (!BrouserInfo.mobile) {
                marker.setTitle(Lang.translate(title));
            }
            marker.setIcon(m.icon || 
                (m.action && markers[i].action.type == 'panorama' ? 'up' : 'info') ||
                (m.action && markers[i].action.type == 'popnorama' ? 'up' : 'info'));

            marker.setSound(m.sound);

            m.index = this.markers.push(marker) - 1;
        }
    }
};
