/* globals UI, Tour, Lang */

Tour.setControlPanel = function(data) {


    if (this.options.controlPanel !== undefined) {

        if (data == "custom")
        {
            UI.controlPanelBig.init(this.options.controlPanel);
            
            UI.controlPanelBig.addBtn('unmute',           Tour.controls.mute,         'Mute');
            UI.controlPanelBig.addBtn('fullscreen',     Tour.controls.fullscreen,   'Full Screen');
            UI.controlPanelBig.addBtn('hall',           Tour.controls.gohome,       'Diamond Hall');
        }
        else
        {
            UI.controlPanel.init(this.options.controlPanel);
            UI.controlPanel.addBtn('left',       Tour.controls.moveLeft,       Lang.get('control.left'));
            UI.controlPanel.addBtn('right',      Tour.controls.moveRight,      Lang.get('control.right'));
            UI.controlPanel.addBtn('up',         Tour.controls.moveUp,         Lang.get('control.up'));
            UI.controlPanel.addBtn('down',       Tour.controls.moveDown,       Lang.get('control.down'));
            UI.controlPanel.addBtn('zoom-in',    Tour.controls.zoomIn,         Lang.get('mousemenu.zoomin'));
            UI.controlPanel.addBtn('zoom-out',   Tour.controls.zoomOut,        Lang.get('mousemenu.zoomout'));
            UI.controlPanel.addBtn('fullscreen', Tour.controls.fullscreen,     Lang.get('mousemenu.fullscreen'));
        }

    }

};
