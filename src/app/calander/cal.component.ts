import {Component, OnInit} from '@angular/core';
import { calanderOutroTransition } from './outro.transition.directive';
declare var jQuery: any;
import { KindnessService } from '../kindness.service';
import { ThemeComponent } from '../theme.component';
import { SonnyDialogue } from '../sonny.dialogue.component';
import { PretentiousComponent } from '../pretentious.component';

@Component({
  selector: 'cal-view',
  templateUrl:'app/calander/cal.component.html',
  styleUrls: ['app/calander/cal.component.css'],
  providers: [ KindnessService, calanderOutroTransition ]
})

export class CalComponent implements OnInit {

  public calyTimeout;
  private animationTime = 0;
  constructor(
    private kindnessService:KindnessService,
    private calanderOutroTransition:calanderOutroTransition
  ) {}
    
  ngOnInit(){   
   /* Angular-not-working can just hop on and off based on animation attribute */
   jQuery(".calyDiv").attr("animation","false");
    
   var idleCal = setInterval(() => {
       this.animationTime++;                
       this.animationTime = idleAnimation(this.animationTime);
   }, 1000);
 
  function idleAnimation(t){
      // no duplicate cals!
      // check if other cal is on display
      if( jQuery("#calyGif").css('display') != 'none'){
        jQuery('#calyIdle').hide();
        return;
      }
      // calander animation time: " + t
      var calyIdle =  <HTMLImageElement>document.getElementById("calyIdle");
      
      // reset the animation
      if(jQuery(".calyDiv").attr("animation") == "start"){
        t = 0;
        jQuery(".calyDiv").attr("animation","true"); 
      }// reset the animation
      
      if(t==0)
      calyIdle.src = "./img/caly/idle.gif?t=" + new Date().getTime(); 
     
      if(t == 3)  
        calyIdle.src = "./img/caly/blink.gif?t=" + new Date().getTime();
      
      if(t == 8)
        calyIdle.src = "./img/caly/phone-intro.gif?t=" + new Date().getTime(); 
      
      
      if(t == 12)
        calyIdle.src = "./img/caly/phone.gif?t=" + new Date().getTime(); 
                      
      if(t == 17)
        calyIdle.src = "./img/caly/phone-outro.gif?t=" + new Date().getTime(); 
      
      if(t == 22)
        calyIdle.src = "./img/caly/blink.gif?t=" + new Date().getTime(); 
      
      if(t == 27){
        
        t = 0;                
      }  
        
      return t;
    }     
  }
  
 /*
  * CHECK SCROLLABLE
  * Check if finger is scrollable 
  * If overlap then add the finger scroll down image
  */
  checkScrollable(){
    if (document.getElementById('task-view').offsetHeight < document.getElementById('task-view').scrollHeight) {
      jQuery('.finger').show().attr('src','./img/caly/up-down.gif');
      setTimeout(function(){ 
        jQuery('.finger').hide();
      }, 3000);
      //jQuery('.finger').attr('src','./img/caly/finger.gif?t=' + new Date().getTime() );
    }
    else if (document.getElementById('weekView').offsetHeight < document.getElementById('weekView').scrollHeight) {
      jQuery('.finger').show().attr('src','./img/caly/up-down.gif');
      setTimeout(function(){ 
        jQuery('.finger').hide();
      }, 3000);
      //jQuery('.finger').attr('src','./img/caly/finger.gif?t=' + new Date().getTime() );
    } 
    else { // doesn't have overflow      
      jQuery('.finger').hide();
    }
  }  
  

  /*
   * Go To Kindness View
  */
    toKindness(){
      this.calanderOutroTransition.exitCal();
    }

   /*
   * CALY: VICTORY OR CHAT
   * To victory or chat   
   */
    victoryChat(phaseArray){
      if(jQuery(".calyDiv").attr("winning") == "true"){
        jQuery('.speechDiv').hide(); // hides cal dialogue
        setTimeout(() => {          
          this.calyState("winning");
          jQuery('.speechDiv').show(); // show cal dialogue
          this.calSpeech(true,["Congratulations...."]);  
          jQuery(".calyDiv").attr("winning","false");        
          setTimeout(() => { 
            jQuery(".calyDiv").attr("speaking",'false');
            this.stopTalking(); 
            setTimeout(() => {                
              this.calSpeech(true,phaseArray); 
              setTimeout(() => { 
                this.calyState("chatIntro"); 
              }, 1500);  
            }, 500);  
          }, 5000);  
        },3500);
      }       
      else{
        jQuery('.speechDiv').show();
        this.calSpeech(true,phaseArray);        
      } 
    }
  
    
  // Task Complete
  // What view should we int based on tasks complete
  intTask(){

    // Load variables
    var taskView = document.getElementById("task-view");

    // Load data  
    var whoArray = this.kindnessService.loadWhoArray();
    var kindnessArray = this.kindnessService.loadKindnessArray();
    var dateArray = this.kindnessService.loadDateArray();
    var taskComplete = this.kindnessService.loadData();
    //var taskComplete = 8 ; // just for testing
    var kindnessIncomplete = "\
    <div class='square'>\
    <h3>Keep up the Streak!</h3>\
    <p>Try and reflect on a kidness <br>\
    no matter how small tomorrow.</p>\
    </div>\
    ";

    switch(taskComplete){
      case 0:              
        this.calSpeech(true,["Welcome!","It doesn't actually look like you've done anything...","Click <img src='./img/icons/sonny.svg' style='height: 25px;border: #473939 solid 0.5px;padding: 5px;'> to get started... Or not. You're a strong independent human and you can do what you want.."]);
        var kindnessIncomplete = "\
          <div class='square encourageScreen' >\
          <h3>Fill out your first kindness!</h3>\
          <p>Click on <img src='./img/icons/sonny.svg' style='height: 25px;border: #473939 solid 0.5px;padding: 5px;'> fill out a kind action\
          you have done or thinking of doing today.</p>\
          </div>\
        ";
        taskView.style.display = 'block';
        taskView.style.bottom = '60vh';
        taskView.innerHTML = "<center>"+kindnessIncomplete+"</center>";
      break;
      case 1:             
        this.victoryChat(["Looks like you've recorded your first kindness..","Got anything else left in the tank?","Click 'VIEW/EDIT' next to the kindness you submitted above to either edit or delete it."])
        var kindnessIncomplete = "\
          <div class='square encourageScreen'>\
          <h3>One Kindness Down!</h3>\
          <p>Kindness shouldn't be a one time thing <br>\
          Try and perform and record another kind act tomorrow.</p>\
          </div>\
        ";
    
         createView(kindnessIncomplete);
    
      break;
      case 2:
        this.victoryChat(["Two acts of kindness..","Aren't you on a roll..."]);
        kindnessIncomplete = "\
          <div class='square encourageScreen'>\
          <h3>Go for three!</h3>\
          <p>You're so close! <br>\
          Record kindness tomorrow for 3 day streak!</p>\
          </div>\
        ";
        
        createView(kindnessIncomplete);

        // taskView.innerHTML = "<center>"+kindnessComplete+kindnessComplete+kindnessIncomplete+"</center>";
      break;
      case 3:
        this.victoryChat(["Congrats on completing the three acts of kindness!","Bet <img src='./img/icons/sonny.svg' style='height: 20px;border: #473939 solid 0.5px;padding: 5px;vertical-align: bottom;'> is proud of you.. I'm not. I'm twice as kind as you."]);
        kindnessIncomplete = "\
          <div class='square encourageScreen'>\
          <h3>Nice one!</h3>\
          <p> Keep up kindness for the rest of the week!</p>\
          </div>\
        ";           
        createView(kindnessIncomplete);
      break;
      case 4:
      this.calSpeech(true,["Well.. well.. we even had to change the view to accomodate..",
      "You've filled out more than half of the week. Keep it up.",]);      
      
      // only iphone unlocks new view!
      if( /iPhone|iPad|iPod/i.test(navigator.userAgent) ) {
        kindnessIncomplete = "\
            <div class='square encourageScreen'>\
            <h3>New view!</h3>\
            <p>You've unlocked a new view! <br>\
            Now keep up kindness for the rest of the week!</p>\
            </div>\
          ";            
      }
      else{ // if (/android/i.test(userAgent))
        kindnessIncomplete = "\
        <div class='square encourageScreen'>\
        <h3>Excellent stuff</h3>\
        <p>Look at all that kindness <br>\
        You're racking up one heck of a list!</p>\
        </div>\
        ";  
      }
      weekView(kindnessIncomplete);
      break;
      case 5:
      this.calSpeech(true,["Bet we're feel pretty good about yourself, with all this kind karma racked up..."]);
      weekView('');
      break;
      case 6:
      this.calSpeech(true,["I bet <img src='./img/icons/sonny.svg' style='height: 20px;border: #473939 solid 0.5px;padding: 5px;vertical-align: bottom;'> is proud of you.. I'm not. I'm twice as kind as you."]);
      kindnessIncomplete = "\
          <div class='square encourageScreen'>\
          <h3>So Close!</h3>\
          <p>You're a day away <br>\
          from performing a whole week of kindness!</p>\
          </div>\
      ";
      weekView(kindnessIncomplete);
      break;
      case 7:
      this.calSpeech(true,["That's a whole week of kindness!","Making the world a better place friend."]);
      kindnessIncomplete = "\
          <div class='square encourageScreen'>\
          <h3>Week Complete!</h3>\
          <p> That's a whole week's worth of kindness </p>\
          </div>\
      ";
      weekView(kindnessIncomplete);
      break;
      default:
      weekView('');
      var random = Math.floor(Math.random() * (6 - 1 + 1) + 1); // spits back a number between 1 & 3
      var saying;
      switch(random) {
        case 1:
          saying = ['Nice work buddy!',"That's quite a list you're racking up there"];
        break;
        case 2:
          saying = ['Excellent list there!','Nice work on making the world kinder!'];
        break;
        case 3:
          saying = ["Wow! That's one good looking list","I hope that it keeps growing!"];
        break;
        case 4:
          saying = ['How come everytime I come back this list keeps getting longer?',"Nice work budster you're racking up some serious karma..."];
        break;
        case 5:
          saying = ['Now this is one super fine list of kindnesses!','How did you find the time to do all of this?'];
        break;
        case 6:
          saying = ['Sweet list friend!','You make this sweet little calander modest of even his actions..'];
        break;
      }
      this.calSpeech( true , saying );      
      break;
    }  

     // Keep track on how many kindnesses people complete 
    //  jQuery('#sonnyGif').attr('onclick', 'analytics("Kindness_Complete_' + taskComplete + '")').click(); 
     

    /*
    * Week View  
    * If not iOS then default back to createView  
    */
    function weekView(kindnessIncomplete){

      // only iphone unlocks new view!
      var userAgent = navigator.userAgent || navigator.vendor;
      if (/android/i.test(navigator.userAgent)){
        createView(kindnessIncomplete);
        return;
      }
      
      /*
      * LIMIT CHAR
      * Based on screen width - how many chars before . . . 
      */
      function limitChar(string){
        var deviceOffset = 10;
        switch(jQuery('html').width()) {            
            case 320: // iphone 5 & iphone SE
            if(string.length > 40 - deviceOffset){
              return string.substring(0, 37 - deviceOffset) + ' . . .';
            }
            case 375: // iphone 6 & iPhone 7
            
            if(string.length > 45 - deviceOffset){
              return string.substring(0, 42 - deviceOffset) + ' . . .';
            }
            case 414: // iphone 6 & 7 Plus
            if(string.length > 40 - deviceOffset){
              return string.substring(0, 37 - deviceOffset) + ' . . .';
            }
            case 768: // iPad
            if(string.length > 45 - deviceOffset){
              return string.substring(0, 42 - deviceOffset) + ' . . .';
            }
            case 1024: // iPad Pro
            if(string.length > 55 - deviceOffset){
              return string.substring(0, 52 - deviceOffset) + ' . . .';
            }
            default:
              return string;
        }
        
       
      }

      document.getElementById("weekView").style.display = 'initial';
      document.getElementById("task-view").style.display = 'none';
 
      var actions = [];

      for (var i = 0; i < kindnessArray.length; i++){
         var kindAction = kindnessArray[i];        
         // if the task has a hyperlink in it then have it removed
        if(new RegExp("([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?").test(kindAction)) { // there's a hyperlink in the kindAction        
            // remove hyperlink
            kindAction = kindAction.replace(/<a\b[^>]*>/i,"").replace(/<\/a>/i, "");
        }
         kindAction = limitChar(kindAction);

         // change all " into something *
         var editedKindness = kindnessArray[i].replace(/["']/g, "");
         actions.push("<div class='square task"+i+"'>\
          <b class='kindness"+i+"'>"+kindAction+"</b> \
          <div class='editContainer edit edit" + i + "' onclick='editData("+i+")'><img width='10px' src='./img/icons/edit.png' style='filter:invert(100%)'><p>MORE</p></div>\
          <div class='editContainer share share" + i + "' onclick='setCal(\"social\","+i+")'><img width='10px' src='./img/icons/megaphone.png'><p>SHARE</p></div>\
          <div class='editContainer delete delete" + i + "' onclick='deleteData("+i+")'><img width='10px' src='./img/icons/rubbish-bin.png'><p>DELETE</p></div>\
          <div class='editContainer twitter twitter" + i + "' onclick='twitter("+i+")'><img width='10px' src='./img/icons/twitter.svg'><p>TWEET</p></div>\
          <div class='editContainer facebook facebook" + i + "' onclick='facebookShare("+i+")'><img width='10px' src='./img/icons/facebook.svg'><p>SHARE</p></div>\
          <div class='editContainer dontEdit dontEdit" + i + "' onclick='setCal(\"default\",\"" + i + "\")'><img width='10px' src='./img/icons/back-arrow.png' style='filter:invert(100%)'><p>BACK</p></div>\
          </div>\
          <div class='more taskDetail taskDetail"+i+"'>\
          <p class='kindness' onclick='editText(\"kindness\",\""+ editedKindness +"\","+i+")'><span class='kindnessTxt'>"+kindnessArray[i]+"&nbsp;</span></p><p class='edit editKindness' onclick='editText(\"kindness\",\""+ editedKindness +"\","+i+")'><a href>(edit kindness)</a></span></p><br>\
          <p class='date' onclick='editText(\"date\",\""+dateArray[i]+"\","+i+")'>"+dateArray[i]+"&nbsp;</p><p class='edit editDate' onclick='editText(\"date\",\""+dateArray[i]+"\","+i+")'><a href>(edit date)</a></span></p><br>\
          <h6 class='saveChanges' onclick>save changes</h6>\
          </div>\
         ");
        // console.log(actions[i]);
      }
      var resetAll = "<div class='square'>\
      <p class='resetTxt'>All data is private unless you choose to share</p>\
      <p class='resetBtn' onclick='resetAll()'> Reset All Data </p>\
      </div>";
      document.getElementById("weekView").innerHTML = "<center>"+actions + kindnessIncomplete + resetAll + "</center>";
    }
    
    /*
    * CREATE VIEW (DAILY)
    * Happense before week view (above)
    */
    function createView(kindnessIncomplete){   
      
      var kindnesslist = '';
      for(var i = 0; i < taskComplete; i++){
          
          var kindnessComplete = "\
          <div class='square task"+i+"'>\
          <h3>Kindness Number "+(taskComplete-i)+"</h3>\
          <p class='kindness kindness"+i+"'><span class='kindnessTxt'>"+kindnessArray[i]+"</span></p>\
          <div onclick='editData("+i+")' class='editContainer edit edit" + i + "'><p><img src='./img/icons/edit.png' width='12px' style='filter: invert(100%)'>View/Edit Details</p></div>\
          <div onclick='setCal(\"social\","+i+")' class='editContainer share share" + i + "'><p><img src='./img/icons/megaphone.png' width='12px'>Share Online</p></div>\
          <div onclick='deleteData("+i+")' class='editContainer delete delete" + i + "'><p><img src='./img/icons/rubbish-bin.png' width='12px'>Delete Day</p></div>\
          <div onclick='twitter("+i+")' class='editContainer twitter twitter" + i + "'><p><img src='./img/icons/twitter.svg' width='12px'>Twitter</p></div>\
          <div onclick='facebookShare("+i+")' class='editContainer facebook facebook" + i + "'><p><img src='./img/icons/facebook.svg' width='12px'>Facebook</p></div>\
          <div onclick='setCal(\"default\",\" " + i + " \")' class='editContainer dontEdit dontEdit" + i + "'><p><img src='./img/icons/back-arrow.png' width='12px' style='filter: invert(100%)'>Back</p></div>\
          </div>\
          <div class='more taskDetail"+i+"'>\
          <p class='kindness' >"+kindnessArray[i]+"&nbsp;</p><p class='edit editKindness' onclick='editText(\"kindness\",\""+kindnessArray[i]+"\","+i+")'><a href=''>(edit)</a></p>\
          <p class='date'>"+dateArray[i]+"&nbsp;</p><p class='edit editDate' onclick='editText(\"date\",\""+dateArray[i]+"\","+i+")'><a href=''>(edit)</a></p>\
          <h6 class='saveChanges' onclick>save changes</h6>\
          </div>\
          ";

          kindnesslist += kindnessComplete;
      }
      
      // unique style for daily view
      taskView.style.display = 'block';
      setTimeout(() => {  
        jQuery('#task-view .editContainer').css({'text-align':'left','padding-left': '10px'});  
      }, 0);      

      var resetAll = "<div class='square'>\
          <p class='resetTxt'>All data is private unless you choose to share</p>\
          <p class='resetBtn' onclick='resetAll()'> Reset All Data </p>\
          </div>";
      taskView.innerHTML = "<center>"+kindnesslist + kindnessIncomplete + resetAll +"</center>"; 

    }

  }


  callCaly(){
      document.getElementById("calyCall").style.display = "none";
      document.getElementById("calBubble").style.opacity = "0"; 
      document.getElementById("calyGif").style.display = "block";  
      document.getElementById("calyGif").style.opacity = "1";                
      this.calyState("intro");
      jQuery('.calView .speechDiv').show();
      setTimeout(() => {  
        jQuery('#calBubble').css('opacity','1');  
      }, 1000);
  }
 

  /*
  * CALY STATE
  * Determine which state caly is in
  */
  calyState(state){    
    var calyImg = <HTMLImageElement>document.getElementById("calyGif");
    var calyPhone = <HTMLImageElement>document.getElementById("calyPhone");

    //var calyIcon = document.getElementById('calyIcon');
    switch(state) { 
        case "intro": 
          document.getElementById("calyCall").style.display = "none";
          document.getElementById("calyGif").style.right = '-200px'  
          // window.scrollTo(0,document.body.scrollHeight); // scroll to bottom of page             
          calyImg.src = "./img/caly/intro.gif?t=" + new Date().getTime();              
          // Caly animation
          setTimeout(() => {  
            // window.scrollTo(0,document.body.scrollHeight); // scroll to bottom of page                
            calyImg.style.right = "0px";             
            this.calyTimeout = setTimeout(() => {                       
              this.calyState("idle");
            },1700)  
            },700);
        break;           
        case "outro":              
          calyExit(calyImg);
        break;
        case "chatIntro":   
                      
          this.checkScrollable();
          calyImg.src = "./img/caly/caly-chat.gif?t=" + new Date().getTime();

          
          //  this.calyTimeout = setTimeout(() => { 
          //    this.calyState("chat");
          //  },900);          
        break;
        case "chatOutro":
            calyImg.src = "./img/caly/chat-outro.gif?t=" + new Date().getTime();
          setTimeout(() => { 
              this.calyState("idle");                 
            },1000)  
        break;
        case "phone":
            calyImg.src = "./img/caly/phone.gif?t=" + new Date().getTime();
            this.calyTimeout = this.calyTimeout = setTimeout(() => {
              this.calyState("phoneOutro");
          },12000)  
        break;
        case "phoneIntro":
          calyImg.src = "./img/caly/phone-intro.gif?t=" + new Date().getTime();
          this.calyTimeout = this.calyTimeout = setTimeout(() => { 
              this.calyState("phone");
            },3000);
        break;
        case "phoneOutro":
          calyImg.src = "./img/caly/phone-outro.gif?t=" + new Date().getTime(); 
          this.calyTimeout = this.calyTimeout = setTimeout(() => {
            this.calyState("outro");
          },3000);
        break;
        case "winning":
          calyImg.src = "./img/caly/winning.gif?t=" + new Date().getTime();
        break;
        case "idle":
          // console.log('idle');
          calyImg.src = "./img/caly/idle.gif?t=" + new Date().getTime();              
        break;
        case "extended-idle":
          var calyIdle =  <HTMLImageElement>document.getElementById("calyIdle");      
          calyIdle.src = "./img/caly/idle.gif?t=" + new Date().getTime();
          jQuery(".calyDiv").attr("animation","start"); // reset animation
          jQuery("#calyGif,#calyPhone").css("opacity","0").hide();
          
          if(jQuery('.kindnessCal').attr('kindnessView') == 'false'){ // stop cal from appearing)
            jQuery("#calyIdle").css("opacity","1").show();             
          }  
        break;
        
        case "return-phone":                       
                
                // INT Animation
                document.getElementById("calType").innerHTML = ""; // remove text from bubble
                this.calSpeech(true,['one second...','Just updating my status..']);  
                /* INT Temp Cal Animation Graphic (id=calyPhone) */
                this.calyTimeout = setTimeout(() => {
                  calyImg.style.display = "none"; // turn off regular cal
                  calyPhone.style.display = "block";
                  calyPhone.style.opacity = '1';  

                  /* Animate calyPhone */
                  calyPhone.src="./img/caly/phone-intro.gif?t=" + new Date().getTime();                               
                  this.calyTimeout = setTimeout(() => {
                  calyPhone.src="./img/caly/phone.gif?t=" + new Date().getTime();                                          
                  
                  this.calyTimeout = setTimeout(() => { 
                    if(jQuery("#calyPhone").css("display") != "none"){
                    this.calSpeech(true,["and.. you haven't even done anything.."]);
                    }     
                    calyPhone.src="./img/caly/phone-outro.gif?t=" + new Date().getTime();
                      this.calyTimeout = setTimeout(() => {                               
                          calyExit(calyPhone);
                      },5000)   // exit chat to outro func 
                  },8000) // using phone
                  },3000) // intro phone
                },800) // make visible calyPhone
        
        break;                       
        }
        
        

        function calyExit(calyImgType){
          calyImgType.src = "./img/caly/outro.gif?t=" + new Date().getTime();
 
              setTimeout(() => {              
                calyImgType.style.right = "-200px";
                calyImgType.style.opacity = '0';            
                document.getElementById("calBubble").style.opacity = "0";
               

                calyImgType.src = "./img/caly/intro.gif?t=" + new Date().getTime();     
                
                
                // clean up revert the horizontal orientation of caly
                calyImgType.className += "flipCaly"; 

                // Clean up
                setTimeout(() => {  
                     calyImgType.className = "";  
                     document.getElementById("calType").innerHTML = '';
                     document.getElementById("calyGif").style.display = "none";
                     document.getElementById("calyGif").style.opacity = "1";
                     document.getElementById("calyPhone").style.display = "none";  
                     if(jQuery("#calyIdle").attr('idle') == 'false'  || jQuery(".calyDiv").attr("speech") == "false")
                     {
                       return;
                     }
                     document.getElementById("calyCall").style.display = "block";
                     
                },3000)  
              },700)
        }
    }


    /*
    * CALY SPEECH
    */
    calSpeech(calyStay, phraseArray) {  

        setTimeout(() => {
           
          var calyGif = <HTMLImageElement>document.getElementById("calyGif");
           jQuery(".calyDiv").attr("speaking",'true');
             
        this.startTalking();
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
              
             if(calyGif.src.includes("idle")){ 
              ctx.calyState("chatIntro");
             }

            },
            callback: function () {
                // if cal is doing the phone status gig then there's no interupting with this callback biz
                if(jQuery("#calyIdle").attr('idle') == 'false'  || jQuery(".calyDiv").attr("speech") == "false"){
                  return;
                }
                
                setTimeout(() => { 
                  ctx.stopTalking(); // turn of chat bubble                  
                }, 2000);
                
                if(!calyGif.src.includes("winning")){                
                // check if got phone animation
                var imgSrc = <HTMLImageElement>document.getElementById("calyGif");
                  if(imgSrc.src.indexOf("phone") !== -1 || imgSrc.src.indexOf("Phone") !== -1){
                  console.log("but there's a phone animation so do nothing")
                  }
                  //else ctx.calyState("chatOutro");
                }

                if(!calyStay){
                  clearTimeout(ctx.calyTimeout); 
                  ctx.stopTalking();   
                  ctx.calyState("outro");
                }

                // cleanup
                phraseArray = [];                
                return;
            }
        });
      },3000) 
    }

 /*
 * START TALKING
 */
  startTalking(){
        var speechBubble = document.getElementById('calBubble');
        speechBubble.style.opacity="0";
        setTimeout(() => {
            speechBubble.style.opacity="1";
           
        }, 100); 
  }

 /*
 * STOP TALKING
 */
  stopTalking(){
      if(jQuery(".calyDiv").attr("speaking") == 'false'){
        return;
      }
      
      var speechBubble = document.getElementById('calBubble');
      setTimeout(() => { 
          speechBubble.style.opacity="0";  
          this.calyState("extended-idle");       
      },1000);   
  }
}