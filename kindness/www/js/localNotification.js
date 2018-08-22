hasPermission = function () {
    cordova.plugins.notification.local.hasPermission(function (granted) {
        showToast(granted ? 'Yes' : 'No');
    });
};
registerPermission = function () {
    cordova.plugins.notification.local.registerPermission(function (granted) {
        showToast(granted ? 'Yes' : 'No');
    });
};



scheduleMinutely = function () {
    var sound = device.platform == 'Android' ? 'file://sound.mp3' : 'file://beep.caf';
    cordova.plugins.notification.local.schedule({
        id: 1,
        text: 'Scheduled every minute',
        every: 'minute',
        sound: sound,
        // icon: 'res://icon',
        // smallIcon: 'res://ic_popup_sync'
    });
};


scheduleDelayed = function () {
    var now = new Date().getTime(),
        _5_sec_from_now = new Date(now + 5 * 1000);
    var sound = device.platform == 'Android' ? 'file://sound.mp3' : 'file://beep.caf';
    cordova.plugins.notification.local.schedule({
        id: 1,
        title: 'Scheduled with delay',
        text: 'Test Message 1',
        at: _5_sec_from_now,
        sound: sound,
        badge: 12
    });


