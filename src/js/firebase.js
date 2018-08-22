$(document).ready(function () {
  var config = {
    apiKey: "AIzaSyCm-Inv6AHZI2riGC6uliHxtCjTluL6ejg",
    authDomain: "the-kindness-app.firebaseapp.com",
    databaseURL: "https://the-kindness-app.firebaseio.com",
    projectId: "the-kindness-app",
    storageBucket: "",
    messagingSenderId: "715785739746"
  };
  firebase.initializeApp(config);
});

function writeUserData(email,name) {
  ;
  if(email == ""){
    return;
  }
  firebase.database().ref('message').push({
  messageType:messageType,
  message: message,
  name: name
  });
  // alert('YES!');
// completeFeedback();

}
