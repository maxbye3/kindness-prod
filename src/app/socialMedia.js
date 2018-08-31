  window.fbAsyncInit = function() {
    FB.init({
      appId      : '738823079479997',
      xfbml      : true,
      version    : 'v2.9'
    });
    FB.AppEvents.logPageView();
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
   
/*
 * FACEBOOK
 * Shares to Facebook
 * If type == 'finished' then share that compassion challenge is complete
 * Else grab content of kindness and share update
 * @param - STRING or INT type - either compassion challenge complete or number of task 
 */ 

   function facebookShare(type){ 
      // jQuery('#sonnyGif').attr('onclick', 'analytics("facebook_share")').click();
      if(type == 'finished'){
        var msg = 'I finished the 10 day compassion challenge! That\'s 5 acts of kindness in 5 days! Try it now';
      }
      else{
          msg = jQuery('.taskDetail'+ type +' .kindnessTxt').text();
      }
      FB.ui({
        quote: msg,
        hashtag: '#kindness',
        method: 'share',
        mobile_iframe: true,
        href: 'http://thekindnessapp.com',
      }, function(response){});
  } 
  
 /*
 * TWITTER
 * Shares tweet of kindness
 * If type == 'finished' then tweet that compassion challenge is complete
 * Else grab content of kindness and share update
 * @param - STRING or INT type - either compassion challenge complete or number of task 
 */ 
 function twitter(type){
    // jQuery('#sonnyGif').attr('onclick', 'analytics("twitter_share")').click();
    var hashtag = 'kindnessApp';
    if(type == 'finished'){ // compassion challenge finished
      var msg = 'I%20finished%20the%2010%20day%20compassion%20challenge!%20That\'s%2010%20acts%20of%20kindness%20in%2010%20days!%20Try%20it%20now';
    }
    else{ // pulling kindness from cal view
      msg = jQuery('.taskDetail'+ type +' .kindnessTxt').text();
      msg = encodeURIComponent(msg);
    }
    var url = 'http%3A%2F%2Fmrmoonhead.com';
    var mrmoonhead = 'mr_moonhead';
    var tweet = '?hashtags='+hashtag+'&original_referer=https%3A%2F%2Fdev.twitter.com%2Fweb%2Ftweet-button&ref_src=twsrc%5Etfw&related=twitterapi%2Ctwitter&text=' + msg + '&tw_p=tweetbutton&url=' + url;
   
    var url = "https://twitter.com/intent/tweet" + tweet;
    window.open(url, '_blank');    
  }
  
  function twitterFollow(){
   window.open('https://twitter.com/mr_moonhead?lang=en', '_blank');   
  }
  
  function instagramFollow(){
   window.open('https://www.instagram.com/max_bye3/', '_blank');   
  }
  
 
   
   
  