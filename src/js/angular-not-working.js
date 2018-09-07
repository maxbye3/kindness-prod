// TO FUDGE TO 10
/*
      localStorage.setItem("compassionChallenge",'10');
      var dateArray = '["10/6/2017", "9/6/2017", "8/6/2017", "7/6/2017", "6/6/2017", "6/6/2017", "6/6/2017", "6/6/2017", "6/6/2017"]';
      localStorage.setItem("dateArray",dateArray);
      var kindnessArray = '["Challenge 10","Challenge 9","Challenge 8","Challenge 7","Compassion 6","Compassion 5","Compassion 5","Compassion 3","Compassion 2","Compassion 1"]';
      localStorage.setItem("kindnessArray",kindnessArray);

*/

  function playAudio(audioSuffix){
    var audio = document.getElementById("audio" + audioSuffix);
    audio.load();
    audio.play();


  

    // $(".audio0").html("<audio autoplay controls><source src='audio/audio0.mp3' type='audio/mpeg'></audio>");
  }


  /*
  * RESET ALL DATA
  * Resets all app data
  */
  function resetAll(){       
    if (confirm('Reset all data?')) {
      // Reset
      localStorage.setItem("compassionChallenge", 'null');
      localStorage.setItem('sonnySaying','0')
      localStorage.setItem("kindnessArray","");
      localStorage.setItem("dateArray","");
      localStorage.setItem("compassionIteration",'true');
      location.reload();

      // slide ups
      jQuery('html, body').animate({scrollTop : 0},0);
      setTimeout(() => {  
          location.reload();
      }, 500); 

      } else {
      // Do nothing!
      }
  }
  

  /*
  * LIMIT CHAR
  * Based on screen width - how many chars before . . . 
  */
  function limitChar(string){
    var deviceOffset = 5;
    
    switch(jQuery('html').width()) {            
        case 320: // iphone 5 & iphone SE
        if(string.length > 32 - deviceOffset){
          return string.substring(0, 29 - deviceOffset) + ' . . .';
        }
        case 375: // iphone 6 & iPhone 7  
        if(string.length > 32 - deviceOffset){
          return string.substring(0, 29 - deviceOffset) + ' . . .';
        }
        case 414: // iphone 6 & 7 Plus
        if(string.length > 32 - deviceOffset){
          return string.substring(0, 26 - deviceOffset) + ' . . .';
        }
        case 768: // iPad
        if(string.length > 42 - deviceOffset){      
          return string.substring(0, 39 - deviceOffset) + ' . . .';
        }
        case 1024: // iPad Pro
        if(string.length > 55 - deviceOffset){
          return string.substring(0, 52 - deviceOffset) + ' . . .';
        }
        default:
          return string;
    }
  }

  /*
  * SET CAL (BUTTONS)  
  * Hide everything else (delete, twitter, facebook, dontEdit, taskDetail, more)
  * If type default - show edit & share
  * If type edit - show taskDetail and back button (.dontEdit)
  * If type social - show twitter, facebook and back button 
     * In this case shrink the letters of week view
  * @param - STRING type - what view are we talking
  */
  function setCal(type,i){
      
    jQuery('.delete, .twitter, .facebook, .dontEdit, .more').hide();
    jQuery('.edit, .share').show();

    if(jQuery('.edit').attr('txtShort') == "true"){
      var string =  jQuery('.edit').attr('string');
      var entry =  jQuery('.edit').attr('entry');
      $('.task' + entry + ' .kindness' + entry).html(string);
    }

    switch(type){
      case 'save':
        calSpeech(["Your changes have been saved!"]);
        jQuery(".calyDiv").attr("speech","true");
      break;
      case 'edit':
        jQuery('.edit' + i + ', .share' + i).hide();
        jQuery('.taskDetail' + i + ', .dontEdit' + i +', .delete' + i).show();
      break; 
      case 'social':
        jQuery(".calyDiv").attr("social","true");
        calSpeech(["Boast your accomplishments to the big wide world!!"]);		  
        var kindnessArray = JSON.parse(localStorage.getItem("kindnessArray"));      
        var string = $('.task' + i + ' .kindness' + i).html();        
        jQuery('.edit').attr('txtShort','true').attr('entry',i).attr('string',string);

        if(kindnessArray.length >= 4){
            string = limitChar(string);
            $('.task' + i + ' .kindness' + i).html(string);
        }
        jQuery('.edit' + i + ', .share' + i).hide();
        jQuery('.twitter' + i + ', .facebook' + i + ', .dontEdit' + i).show();
      break;
      case 'default':	

	      // var itemNum = parseInt(i);
		    for (i = 0; i < 3; i++) { 
		      // hide just the editable menu 
		      jQuery('.taskDetail'+i).hide();
		      updateData(i); 
		    }

        var shared = jQuery('#sonnyGif').attr('onclick');
        


        // if(shared == 'analytics("facebook_share")' || shared == 'analytics("twitter_share")' ){
        //   calSpeech(["Thanks for the share!!","Appreciate it!!"]);
        // }
        // else{

        //   // if coming back from social
        //   if(jQuery(".calyDiv").attr("social") == "true"){
        //     calSpeech(["I don't like sharing either..."]);
        //     jQuery(".calyDiv").attr("social","false");
        //   }
        //   else{
        //     calSpeech(["Changed your mind?","I won't judge..."]);
        //   }          
        //   jQuery('#sonnyGif').attr('onclick','');
        // }
		    
        
        
        jQuery(".calyDiv").attr("speech","true");

      break;
    }  
	  
  }
  
  
  /*
  * UPDATE DATA
  * Update / reverts the editable and non-editable menus
  * @param - STRING itemNum - the item number of the editable menu 
  */
  function updateData(itemNum){

	  // find text
	  var textEdit = jQuery('.taskDetail'+ itemNum +' .kindnessEdit').val();
	  var valueText = jQuery('.taskDetail'+ itemNum +' .kindnessEdit').attr('value');
	  var text = jQuery('.taskDetail'+ itemNum +' .kindness').text();
	  if(textEdit){
	  	restoreTxt = textEdit;	
	  }
	  else if(valueText){
  	    restoreTxt = valueText;		
	  }
	  else{
	    restoreTxt = text;
	  }

	  // restore text
	  jQuery('.taskDetail'+ itemNum +' .kindness').css('width','auto').html('<span class="kindnessTxt">' + restoreTxt + '</span>');
	  jQuery('.taskDetail'+ itemNum +' .editKindness').show();

	  var dateEdit = jQuery('.taskDetail'+ itemNum +' .dateEdit').val();
	  var valueDate = jQuery('.taskDetail'+ itemNum +' .dateEdit').attr('value');
	  var date = jQuery('.taskDetail'+ itemNum +' .date').text();
	  if(dateEdit){
		  restoreTxt = dateEdit;
	  }
	  else if(valueDate){
	    restoreTxt = valueDate;
	  }
	  else{
		restoreTxt = date;  
	  }

	  // restore text
	  jQuery('.taskDetail'+ itemNum +' .date').css('width','auto').html(restoreTxt);
	  jQuery('.taskDetail'+ itemNum +' .editDate').show();	  
  } 
  
  function editData(itemNum){
  
  // hide cal
  if (/android/i.test(navigator.userAgent)){
    $('.orTxt, .intentionTask, .completeContainer').hide();
  }

  

	// remove menus for all other items
	setCal('default');
    
	// set view    
    setCal('edit',itemNum);
    jQuery(".calyDiv").attr("speech","false");
    calSpeech(["Here you can edit and delete your tasks."]);
    $(".saveChanges").hide();
    $(".kindness, .date").show();
    // $(".kindness, .who, .date").show(); who has been hidden from results
    byePhone();
  }

  /*
  * EDIT TEXT
  * text is wrong and manually over-ridden
  */
  function editText(type,text,itemNum){

    // hide cal
    if (/android/i.test(navigator.userAgent)){
      $('.calyDiv, #calBubble').hide();
    }

    if(type=="date"){
	
      // hide date (edit)
      jQuery('.taskDetail'+itemNum+' .editDate').hide();
    
      // over-written as wrong
      text = jQuery('.taskDetail'+ itemNum +' .date').text();


      jQuery(".calyDiv").attr("speech","false");
      calSpeech(["Classic human.","You forget what day it was?"]);
      var textInput = '<input class="'+type+'Edit datepicker" type="text" id="" value="'+text+'">';
      setTimeout(() => { 
          document.activeElement.blur(); 
          $(".ui-datepicker-prev").html("Prev month");
          $(".ui-datepicker-next").html("Next month")
      }, 0);  
    }
    else{ // who and kind
      
      // get back quotation marks and such
      // text = text.replace(/±/g,'/"').replace(/^/g,"/'");
    
      // hide kindness (edit)
      jQuery('.taskDetail'+itemNum+' .editKindness').hide();
    
      jQuery(".calyDiv").attr("speech","false");
      calSpeech(["Editing the truth?","Edit away...","Click the text in the box to get started!"]);
      var textInput = '<input class="'+type+'Edit" type="text" value="' + text + '">';
      // there's a bug here with ' and "

       // put in text
       $('#weekView .kindnessEdit').attr('value' , text);
  }

  $(".taskDetail"+itemNum+" ."+type+"").html(textInput).css('width','100%');
  
  $(".taskDetail"+itemNum+" .saveChanges").show().html("Save Changes").attr("onclick",'saveData(\''+type+'\',\''+itemNum+'\')');
  
  $( ".datepicker" ).datepicker();
 
  $('.taskDetail'+ itemNum +' .'+type+'Edit').focus();

  
  // sort out width of text box
  var inputWidth = parseInt($('.square').width()) - 20;
  $('#weekView .kindnessEdit').css('width' , inputWidth);
  
 


  }

  function saveData(type,itemNum){
    
    var text = $('.taskDetail' + itemNum + ' .'+type+'Edit').val();
    $(".saveChanges").attr("onclick",'').html('Changes Saved');   
    // $(".taskDetail"+itemNum+" .kindness, .taskDetail"+itemNum+" .who, .taskDetail"+itemNum+" .date").hide(); // removed who
    $(".taskDetail"+itemNum+" .kindness, .taskDetail"+itemNum+" .date").hide();
    setTimeout(() => {  
      $(".saveChanges").fadeOut(1000);
    }, 1000);    
    var arrayType = type+"Array";

    // if type = "kind" then update the kindness on square as well
    if(type=="kindness"){
      jQuery(".calyDiv").attr("speech","true");
      calSpeech(["That comes across way better","Your changes have been saved..."]);
      $(".square .kindness"+itemNum).html(text);
    }
    /* WHO NOT USED ANYMORE
    else if(type == "who"){
      calSpeech(["Well, I'm not a fan of them.","But your changes are saved..."]);
    }
    */
    else {
       jQuery(".calyDiv").attr("speech","true"); 
       calSpeech(["Looks like everything's been saved"]);
    }
    
    //load
    var localStorageArray = JSON.parse(localStorage.getItem(arrayType));
    //edit
    localStorageArray[itemNum] = text;
   
    //save
    localStorage.setItem(arrayType, JSON.stringify(localStorageArray));

    //restore
    setCal('save');
	
    // revert edit menus
    updateData(itemNum);
  
    // go to bottom of page
    jQuery("html, body").animate({ 
      scrollTop: jQuery(document).height() 
    }, 1000);

    // show cal
    jQuery('.calyDiv, #calBubble').show();

  }

  /*
  * DELETE DATA
  * Confirm if data can actually be deleted
  */
  function deleteData(itemNum){
    if (confirm('Are you sure you want to delete this day?')) {
      // Delete
      byePhone();
      calSpeech(["Kindness deleted.","And good riddance..","I never liked that submission anyway.."]);
      $(".task"+itemNum).remove();
      $(".taskDetail"+itemNum).remove();
      $(".encourageScreen").remove();

      //load
      var kindnessArray = JSON.parse(localStorage.getItem("kindnessArray"));
      var whoArray = JSON.parse(localStorage.getItem("whoArray"));
      var dateArray = JSON.parse(localStorage.getItem("dateArray"));
      
      //edit
      kindnessArray.splice(itemNum, 1);
      whoArray.splice(itemNum, 1);
      dateArray.splice(itemNum, 1);
      
      //save
      localStorage.setItem('kindnessArray', JSON.stringify(kindnessArray));
      localStorage.setItem('whoArray', JSON.stringify(whoArray));
      localStorage.setItem('dateArray', JSON.stringify(dateArray));
     
    }
  }


  function calSpeech(phraseArray) {  
        // make speech bubble visible
        var speechBubble = document.getElementById('calBubble');
        speechBubble.style.opacity="1";  
        
        // remove idle animation
        jQuery("#calyGif").css("opacity","1").show();
        jQuery("#calyIdle").css("opacity","0").hide(); 
              
        if(document.getElementById("calyCall").style.display == "none"){  
        document.getElementById("calType").innerHTML = "";    
        var ctx = this;
        jQuery("#calType").typed({
            strings: phraseArray,
            typeSpeed: 5,
            showCursor: false,
            backDelay: 1750,
            backSpeed: 2,
            loop: false, // loop on or off (true or false)
            loopCount: false, // number of loops, false = infinite            
            preStringTyped: function() {
              //  if(document.getElementById("calyGif").src.includes("idle")){
                chatAnimation();
                // document.getElementById("calBubble").style.opacity= "1";
              //  }
            },
            callback: function () {
                if(jQuery(".calyDiv").attr("speech") == "false"){
                  return; 
                }
                
                var speechBubble = document.getElementById('calBubble');
                setTimeout(() => { 
                    // if speech is done then close speech
                    if(jQuery(".calyDiv").attr("speech") == "false"){
                      speechBubble.style.opacity="0";
                    }
                    else{
                      // set off interval until jQuery(".calyDiv").attr("speech") == "false"
                       var checkShutup = setInterval(function(){ 
                         
                           speechBubble.style.opacity="0";
                           clearInterval(checkShutup);
                         
                       }, 1000);
                       
                       
                       
                    }
                    
                     var calyImg = document.getElementById("calyGif");
                     // chat idle                     
                     calyIdle.src = "./img/caly/idle.gif?t=" + new Date().getTime();
                     jQuery("#calyIdle").attr("src","./img/caly/idle.gif?t=" + new Date().getTime());  
                     jQuery(".calyDiv").attr("animation","start"); // reset animation
                     jQuery("#calyGif,#calyPhone").css("opacity","0").hide();
                     jQuery("#calyIdle").css("opacity","1").show();            
                },3000);   
                
                // cleanup
                phraseArray = [];                
                return;
            }
        });
      }
    }

   /*
   * HIDE PHONE CALY
   * So if you return Caly is on the phone 
   * But any interaction with the menu (delete or edit)
   * Should kick phone caly off
   */
  function byePhone(){
    jQuery("#calyGif").css("opacity","1").show();
    jQuery("#calyIdle").css("opacity","0").hide();
    
    $("#calyGif").show();
    $("#calyPhone").hide();
  }
  
function chatAnimation(){
    var calyImg = document.getElementById("calyGif");
   // chat intro
   calyImg.src = "./img/caly/caly-chat.gif?t=" + new Date().getTime();
}
            