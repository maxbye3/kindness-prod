function dayNotifications(){
  // 'daily: notification cancelled and started'

  cordova.plugins.notification.local.cancelAll(function() {
  }, this);

  cordova.plugins.notification.local.schedule({
      id: 1,
      text: "Complete a kindness before end of the day to progress in the compassion challenge!",
      foreground: true,
      sound: "file://audio/yay.caf",
      every: "day" // "minute", "hour", "week", "month", "year"
  });

}



function weekNotifications(){
  // 'weekly: notification cancelled and started'

  cordova.plugins.notification.local.cancelAll(function() {
  }, this);

  cordova.plugins.notification.local.schedule({
      id: 1,
      foreground: true,
      text: 'No act of kindness, no matter how small, is ever wasted...',
      sound: "file://audio/yay.caf",
      every: "week" // "minute", "hour", "week", "month", "year"
  });
}

