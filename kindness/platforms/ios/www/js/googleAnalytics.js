//In your 'deviceready' handler, set up your Analytics tracker:
// document.addEventListener("deviceready", onDeviceReady, false);

// function onDeviceReady() {

//   // Get a reference to the database service
//   // var database = firebase.database();
  
//   var strconfirm = confirm("Enable reminders?\nNotications will help you stay on track!");
//   if (strconfirm == true) {
//       cordova.plugins.notification.local.schedule({
//           id: 1,
//           text: "Good morning!",
//           every: "minute" // "minute", "hour", "week", "month", "year"
//       });
//       return true;
//   }

//   //In your 'deviceready' handler, set up your Analytics tracker:
//   window.ga.startTrackerWithId('UA-33843970-2', 30);
//   //UA-33843970-2



 
 
  


// }



function firebase(){

}



function analytics(type){
    
    $('.GooglePageName').html(type);    
    // window.ga.trackView(type);
    
}