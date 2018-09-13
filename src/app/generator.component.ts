import { Directive, ElementRef } from '@angular/core';
import { Injectable } from '@angular/core';
import { BadBroDialogue } from './badBroDialogue.directive';
declare var jQuery: any;


@Directive({
  providers: [ BadBroDialogue ]
})

export class GeneratorBackend {
        
  constructor(
    private badBroDialogue : BadBroDialogue
  ) {}
   
    /*
    * CHECK INTENTION
    * Check local storage of intention
    * If false #itentionFound is hidden and itentionNotFound shown
    * Check if sonny or badBro and apply styles
    * If custom kindness check local storage
    * If badBro make sure task is valid
    */
    checkIntention(){
      var intention = localStorage.getItem('intention');      
      if(intention == 'false' || !intention){
        jQuery('.itentionFound, .intentionSet').hide();
        jQuery('.itentionNotFound, .createIntention').show();
        jQuery('.intentionFinished .txt').html('Set Intention');
      }
      else{
        var intentionString = localStorage.getItem('intentionNum');
        var intentionNum = parseInt(intentionString);
        intentionNum = this.suggestionsExceeded(intentionNum);

        jQuery('.intentionFinished .txt').html('Change Intention');

        // check if sonny or badBro
        if(jQuery('#sonnyStatic').attr('char') == 'sonny'){ 
          // sonny intention
          var color = 'black';
          var isIntentionCustom = localStorage.getItem('isCustom' );
          if( isIntentionCustom == 'true'){
            // custom kindness
            var kindness = localStorage.getItem('cutomIntention');
          }
          else{
            kindness = this.descrptionData[(intentionNum)];
          }
          jQuery('.intentionTask').html(kindness);
          jQuery('.completeContainer').css({'color':color,'font-family':'kindness','font-size':'7.5vw'});
          jQuery('.completeContainer, .intentionTask').css({'color':color,'font-family':'kindness','font-size':'7.5vw'});
        }  
        else{
          // evil intention
          if(intentionNum > 4){
            localStorage.setItem('intentionNum','0');
            this.checkIntention();
            return;
          }

          color = 'white';
          jQuery('.intentionTask').html(this.evilData[intentionNum]);
          // jQuery('.completeContainer, .intentionTask').css({'color':color,'font-family':'evil','font-size':'4.5vw'});
        }
        // settings menu
        jQuery('.intention-complete').css('border',color+' solid 1px');
        jQuery('.itentionFound, .intentionSet').show();       
        jQuery('.itentionNotFound, .createIntention').hide();
      }
    }
    
    /*
    * INTENTION COMPLETE
    * Toggle the radio button
    * @param - STRING - if intention put that into inputKindness.value 
    */
    itentionComplete(type){
      var inputKindness = <HTMLInputElement>document.getElementById("inputKindness");
      if(type == 'intention'){
        inputKindness.value = jQuery('.intentionTask').html();
      }
      // intention needs to be added to kindness
      jQuery(".intention-complete").toggleClass("intention-complete--clicked");

      // actually cancel the intention
      jQuery('.itentionFound, .intentionSet').hide();
      jQuery('.itentionNotFound, .createIntention').show();
      jQuery('.intentionFinished .txt').html('Set Intention');

      // lose the change / cancel intention
      localStorage.setItem('intention','false');  

    }
   
  /*
  * BAD BRO OUT
  * Bad bro gets pissy and gets out of there
  */
  badBroOut(){
    if(jQuery('#sonnyGif').attr('char') != 'badBro'){ 
      return;
    }
    
    jQuery('#sonnyIcon, .swiper-container').hide();
    localStorage.setItem('intentionNum','1');
    jQuery('.helpMenu,.accept,.kindnessCal,.control').hide();
    var sonnyIcon = "<img src='./img/icons/sonny.svg' style='height: 25px;border: #473939 solid 0.5px;padding: 5px; filter: invert(100%);'>";
    this.badBroDialogue.dialogue('spit',["Yo! You expect me to stand here and give you idea after idea?!","Do I look like "+  sonnyIcon + "  to you?!", "I'm out..." ]);
    // this.badBroDialogue.dialogue('spit',["Yo!","I'm out..." ]);
    jQuery('#sonnyStatic').attr('idle','false'); // stops idle animation of bad bro
    jQuery('.sonnyContainer').attr('introallowed','false');
    jQuery('#kindness-generator').attr('sonnyOut','true'); // make sonny jump up at the end of conversation 
  }
  
  /*
  * SUGGESTIONS EXCEEDED
  * intention number > number of kindness
  * then intention number == 0
  * @param INT intentionNumber - the intention number
  */
  suggestionsExceeded(intentionNumber){
    if(intentionNumber > this.kindnessData.length){
      return 0;
    }
    else return intentionNumber;
  }
  /*
  * DELIVER TASK
  * If task is undefined then place task as the first
  * Task number got from local storage as array: MAX CHANGE THIS AS SHOULDN'T BE ARR
    * [{current task number}, {whether intention is true or not}]
  * @param string STATE - prev / next / int 
  */
  deliverTask(state){

      jQuery('.stillNasty,.backToKindness').hide();
      
      var intentionNum;
      if(!localStorage.getItem('intentionNum')){ // if undefined
        intentionNum = 0;
      }
      else{
        intentionNum = localStorage.getItem('intentionNum');
      }
   
      intentionNum = parseInt(intentionNum);
      intentionNum = this.suggestionsExceeded(intentionNum);
      if (state == 'next'){
         intentionNum = intentionNum + 1;
         
                
      }
      else if (state == 'prev'){         
         if(intentionNum == 0 ){
                  if(jQuery('#sonnyGif').attr('char') == 'badBro'){
                    return this.evilData[0];
                  }
                  else{
                    return this.kindnessData[0];
                  }
         } 
         intentionNum = intentionNum  - 1;         
      }

      localStorage.setItem('intentionNum', intentionNum);

      if(jQuery('#sonnyGif').attr('char') == 'badBro'){        
        
        if(intentionNum == 5){       
          this.badBroOut();
          return [''];          
        }
        else{
          return this.evilData[intentionNum]; 
        }        
      }
      else{
        return this.kindnessData[intentionNum];
      }
  }
  
  public evilData =[
    ["Sprinkle rice all over a park and watch the feeding pigeons explode"],
    ["Put your friends hand in warm water while he sleeps and upload the results to YouTube"],
    ["Decline to be seated at a restaurant, and simply eat their complimentary mints"],
    ["Buy a large quantity of orange traffic cones and reroute your street"],
    ["Take 200 selfies and 'cc' all of them to your boss"],
    [""]
  ];
  
  public kindnessData = [
["The Italian tradition of caffe sospeso or pending coffee. You pay for two cups, one for you and one in advance as an anonymous act of charity for someone who can't afford it."], // 1
["Catch up with an old friend who you have not heard from in a while"], //2
["Use <a href='https://soundcloud.com/compassionatemind/building-the-compassionate-self/s-c7EQJ?in=compassionatemind/sets/compassionate-minds' target='_blank'>this audio exercise</a> to help build a compassionate self"], //3
["Jump on the <a target='_blank' href='https://tinybuddha.com/forums/'>Tiny Buddha community and help someone out"], //4
["Donate books you're not reading to the library"], //5
["Relay an overheard compliment"], //6
["Take a long & relaxing bath"], //7
["Bake something sweet for a neighbour"], //8
["Go to the park / large natural space and tap into the stillness"], //9
["<a href='https://onetoday.google.com' target='_blank'>Google's One Today</a> app on Android or iOS whenever you're feeling generous and give just $1 to the charity of the day."], //10
["Go on a walk sans phone"], // 11
["Pay for a bus fare for someone just cause"], //12
["Watch Professor Paul Gilbert explain how <a href='https://www.youtube.com/watch?v=pz9Fr_v9Okw' target='_blank'>mindfulness fosters compassion</a>"], // 13.5
["Compliment someone to their boss"], //14
["Plant a seed"], //15
["Forgive someone for hurting you"], //16
['Smile entire journey of bus / train ride'], //17
["Give someone a USB of movies / audio you think they'd like on it. It's the modern day mix-tape."], //18
["Be patient with someone you find annoying or ask them out for a coffee"],// 19
["Be the person who puts a tip in the tip jar at the coffee-shop (Fewer people tip than you'd think!)"], //20
["Call a friend you haven’t seen in a while to say hello"], //21
["Try out <a href='https://www.headspace.com/' target='_blank'>Headspace</a>'s free meditation demo"], //22
["Cook dinner to share"], //23
["Ask your local homeless shelter if they need anything"], //24
["Buy flowers or a plant for someone"], //25
["Send a postcard to a friend"], //26
["Write a long constructive comment on a blog or website"], //27
// ["Review this kindness app by going here"], // 28
["<a href='http://www.charitymiles.org/' target='_blank'>Charity Miles</a> is a free Android or iPhone app that raises 10 to 25 cents per mile you run/jog for a charity you select"], // 28
["Use <a href='https://soundcloud.com/compassionatemind/addressing-self-crticism/s-U19Fd?in=compassionatemind/sets/compassionate-minds' target='_blank'>this audio exercise</a> to address self criticism"], //29
["Make someone feel good about their outfit"], //30
["Call your folks"], //31
["Set out clothes for the next day and come up with a plan to make the most of the day"], // 32
["Try <a target='_blank' href='https://thrive.uk.com/be-stress-free/'>Stress Free</a>. Try <a target='_blank' href='https://thrive.uk.com/be-stress-free/'>Stress Free</a>. A free relaxation game that I built!"], //32.5
["Help make audio books available to anyone who wants them with <a target='_blank' href='https://librivox.org/'>LibriVox</a>"], //33
["Use <a target='_blank' href='https://www.goodsearch.com/'>Goodsearch</a> to search the internet. A portion of search revenue is donated to charities as you browse."], // 34
["Perform some soothing rhythm and breathing practice with <a href='https://soundcloud.com/compassionatemind/soothing-rhythm-breathing-practices/s-JA0g8?in=compassionatemind/sets/compassionate-minds' target='_blank'>this audio guide</a> from Professor Paul Gilbert"], //35
["Indulge yourself with a long relaxing hot bath"], //36
["Make a fruit smoothie. <a href='http://www.prevention.com/food/20-super-healthy-smoothie-recipes#20-super-healthy-smoothie-recipes/slide/2?&_suid=1500460068522016663691577294393' target='_blank'>Try this</a> for inspiration."], //37
["Send someone you know whose down on their luck a gift"], // 38
["Perform the <a href='http://hfhc.ext.wvu.edu/r/download/114469' target='_blank'>raisin meditation</a> on a piece of food. Don't like raisins? I use chocolate buttons"], //39
["Change your desktop background to somewhere in the world you would like to visit"], //40
["Organize someone's birthday party"], //41
["Take a photo of something that piques your interest / curiosity and jot down why"], //42
["Help someone with their bags or stroller"], // 43
["Acknowledge the cashier who's helping you and genuinely ask them how they're doing"], //44
["Give up your seat to someone who needs it more"], //45
["Be courteous to massive to other drivers even if they're being massive jerks"], //46
["Give a homeless person the leftovers from your meal."], //47
["Use the idle time on your computer to cure diseases, study global warming and many other research projects. Your computing power will be donated through <a href='http://boinc.berkeley.edu/' target='_blank'>BOINC</a>, a project of the University of California supported by the National Science Foundation."] //48
["Write a note of inspiration to someone who needs inspiration"], // 49
["Send a letter to someone oversees"], //50
["Drop off clothes at a local charity outlet"], //51
["Buy a phone card and give it to a homeless shelter for them to give to someone"], //53
["Take flowers to a hospital ward and give them to someone who hasn't had any visitors"], //54
["Write anonymous compliments for strangers to find"], //55
["Put something you no longer need on <a href='https://www.freecycle.org/' target='_blank'>FreeCycle</a> for free"], //56  // LINK
["Tape some change to a pay phone with a card saying it is for whoever needs it"], //57
["Leave a book you have finished for someone else to read"], // 58
["Offer to help an elderly neighbour with household chores"], //59
["Give a lottery ticket to a stranger"], //60
["Call a friend randomly and let them know you're thinking of them"], //61
["Leave an anonymous thank you notes to a teacher/mentor"], // 62
["Write letters of appreciation to groups who are helping the community or a cause you believe in"], //63
["Have a browse on the <a target='_blank' href='https://www.reddit.com/r/RandomKindness/'>Random Acts of Kindness</a> sub-reddit. Maybe you'll be inspired to do one?"], // 64
["Visit <a href='https://12kindsofkindness.com/' target='_blank'>12 kinds of Kindness</a>. It's got some bizarre and wonderful content"], // 65
["Help a stranger on <a href='http://blahtherapy.com/' target='_blank'>BlahTherapy</a>"], // 66
["Ask strangers on the street: 'can I help you with anything?'"], // 67
["Backup hard drive (you'll thank yourself big time for this)"], // 68
["Make a concerted effort to stop malicious gossip spreading"], //69
["Volunteer your skills for someone who has expressed an interest in what you do"], // 70
["Connect people to each other"], //71
["Make an extra special effort to be patient with someone"], // 72
["Compliment someone in front of others. Complimenting in front of others usually holds more weight"], //73
["Watch a film with someone. Don't be on your phone for the duration "], // 74
["Spend an hour learning something you've never heard of before. Maybe use the <a href='https://www.khanacademy.org/' target='_blank'>Khan academy</a> for inspiration."], //75 // LINK
["Leave some nice comments on blogs and Twitter"], // 76
["Do the task nobody else wants to"], // 77
["Respond to invites and text immediately"], // 78
["Decorate for someone's birthday"], // 79
["Tell someone they're pretty (but not in a creepy way)"], // 80
["Send anonymous flowers to someone at work"], // 81
["Put together a small garden"], // 82
["Make two lunches and give one away"], // 83
["Close your eyes right now and think of three things that you're grateful for"], //84
["Plan a holiday for your friends"], // 85
["<a href='http://www.sendkidstheworld.com/' target='_blank'>Send postcards</a> to sick children who are fighting serious illnesses and want to receive mail"], // 86
["Get setup for free on <a target='_blank' href='http://www.bradaronson.com/amazon-smile/'>Amazon Smile</a>. Amazon will donate to your favorite nonprofit each time you make a purchase"], //87
["Support the troops! Write a letter to a deployed or wounded member of the military through <a target='_blank' href=' http://www.operationgratitude.com/'>Operation Gratitude </a>"], // 88
["Do some yoga. Adrienne's <a href='https://www.youtube.com/watch?v=oBu-pQG6sTY' target='_blank'>30 day challenge</a> is a great place to start"], // 89
["Keep an extra umbrella at work, so you can lend it out when it rains"], // 90
["Have a conversation with someone and don't interrupt or present a solution to their problem. We often underestimate how important and comforting it is to be listened to."], //91
["Close your eyes for 3 minute and perform <a href='https://www.youtube.com/watch?v=rOne1P0TKL8' target='_blank'>Mark William's breathing space</a>"], //92
["Write down 3 to 5 things for which you’re grateful for <a href='http://www.spring.org.uk/2007/09/practicing-gratitude-can-increase.php' target='_blank'>here</a>"], // 93
["Try and go three days without complaining about anything"], // 94
["Learn the names of people you see every day but don't necessarily interact with. Greet them by name"], //95
["Make a helpful introduction for someone"], //96
["<a href='https://organdonor.gov/register.html' target='_blank'>Sign up to become an organ donor</a>. Then, when you die (we all do eventually), your organs can be used to save up to 8 lives."], // 97
["Ask for help. Let someone else enjoy performing an act of kindness."], // 98
["Spend a few minutes on <a href='http://freerice.com/#/english-vocabulary/1367' target='_blank'>Free Rice</a>, a United Nations Food Program that will donate rice to hungry people for every question you get right on their learning website"], // 99
["Purchase a couple of umbrellas and hand them out on a rainy day"], // 100
["Sign up to donate blood"], // 101
["Drop off a toy or game at a hospital"], //102
["Donate <a href='http://www.instructables.com/id/How-to-Donate-Your-Hair-to-a-Great-Cause/'>hair</a> to make wigs for cancer patients"], // 103
["Donate clothes to charity"] //104
  ];


public descrptionData = [
["Pay for two cups of coffee"], // 1
["Catch up with an old friend"], //2
["Practice <a href='https://soundcloud.com/compassionatemind/building-the-compassionate-self/s-c7EQJ?in=compassionatemind/sets/compassionate-minds' target='_blank'>this compassionate audio exercise</a>"], //3
["Help someone on <a target='_blank' href='https://tinybuddha.com/forums/'>Tiny Buddha</a>"], //4
["Donate books"], //5
["Relay a compliment"], //6
["Take a relaxing bath"], //7
["Bake something sweet for a neighbour"], //8
["Go to a large natural space and tap into the stillness"], //9
["Download <a href='https://onetoday.google.com' target='_blank'>Google's One Today</a> app"], //10
["Go on a walk minus phone"], // 11
["Pay for a bus fare for someone"], //12
["How does <a href='https://www.youtube.com/watch?v=pz9Fr_v9Okw' target='_blank'>mindfulness foster compassion?</a>"],
["Compliment someone to their boss"], //14
["Plant a seed"], //15
["Forgive someone for hurting you"], //16
['Smile your entire journey'], //17
["Give someone a USB full of cool content"], //18
["Be patient with someone you find annoying"],// 19
["Be the person who puts a tip in the tip jar at the coffee-shop"], //20
["Call a friend you haven’t seen in a while"], //21
["Try <a href='https://www.headspace.com/' target='_blank'>Headspace</a>"], //22
["Cook dinner to share"], //23
["Volunteer at a homeless shelter"], //24
["Buy a plant for someone"], //25
["Send a postcard to a friend"], //26
["Write a long constructive comment"], //27
// ["Review this kindness app by going here LINK"], //28
["<a href='http://www.charitymiles.org/' target='_blank'>Charity Miles</a> raise money for running/jogging"], // 28
["Perform audio exercise on self criticism "], //29
["Make someone feel good about their outfit"], //30
["Call your folks"], //31
["Come up with a plan to make the most of the day"], //32
["Try <a target='_blank' href='https://thrive.uk.com/be-stress-free/'>Stress Free</a>"], //32.5
["Help make audio books available with <a target='_blank' href='https://librivox.org/'>LibriVox</a>"], //33
["Spend some time on <a target='_blank' href='https://www.goodsearch.com/'>Goodsearch</a>"], // 34
["Perform some soothing rhythm and breathing practice with <a href='https://soundcloud.com/compassionatemind/soothing-rhythm-breathing-practices/s-JA0g8?in=compassionatemind/sets/compassionate-minds' target='_blank'>this audio guide</a>"], //35
["Indulge yourself with a long relaxing hot bath "], //36
["Make a fruit smoothie"], //37
["Send someone you know whose down on their luck a gift"], //38
["Perform the <a href='http://hfhc.ext.wvu.edu/r/download/114469' target='_blank'>raisin meditation</a> on a piece of food"], //39
["Change your desktop background to somewhere in the world you would like to visit"], //40
["Organize someone's birthday party"], //41
["Take a photo of something that piques your interest and jot down why"], //42
["Help someone with their bags or stroller"], //43
["Acknowledge the cashier who's helping you and genuinely ask them how they're doing"], //44
["Give up your seat to someone who needs it more"], //45
["Be courteous to other drivers"], //46
["Doante the leftovers from your  meal"], //47
["Cure diseases with <a href='http://boinc.berkeley.edu/' target='_blank'>BOINC</a>"] //100
["Write a note of inspiration to someone who needs inspiration"], // 49
["Become pen-pal with someone oversees"], //50
["Drop off clothes at a local charity outlet"], //51
["Buy a phone card and give it to a homeless shelter"], // 53
["Take flowers to a hospital ward"], //54
["Write anonymous compliments for strangers to find"], // 55
["Put something you no longer need on <a href='https://www.freecycle.org/' target='_blank'>Freecycle</a> for free"], //56
["Tape some change to a pay phone"], //57
["Leave a book you have finished for someone else to read"], //58
["Offer to help an elderly neighbour with household chores"], //59
["Give a lottery ticket to a stranger"], // 60
["Call a friend randomly and let them know you're thinking of them"], //61
["Leave an anonymous thank you notes to a mentor"], //62
["Write letters of appreciation to a cause you believe in"], // 63
["Have a browse on the <a target='_blank' href='https://www.reddit.com/r/RandomKindness/'>Random Acts of Kindness</a> sub-reddit"], // 64
["Visit <a target='_blank' href='https://www.reddit.com/r/RandomKindness/'>12 kinds of Kindness</a>"], // 65
["Help a stranger on <a href='http://blahtherapy.com/' target='_blank'>BlahTherapy</a>"], // 66
["Ask strangers on the street - 'can I help you with anything?'"], // 67
["Backup your computer's hard drive"], // 68 // LINK
["Make a concerted effort to stop gossip"], //69
["Volunteer for has expressed an interest in what you do"], // 70
["Connect people to each other"], // 71
["Make an extra special effort to be patient with someone"], // 72
["Compliment someone in front of others"], //73
["Watch a film and don't be on your phone"], // 74
["Spend an hour learning something you've never heard of before"],//75
["Leave some nice comments on blogs and Twitter"], // 76
["Do the task nobody else wants to"], // 77
["Respond to invites and text immediately"], // 78
["Decorate for someone's birthday"], // 79
["Tell someone they're pretty"], //80
["Send flowers anonymously to someone at work"], // 81
["Put together a small garden"], // 81
["Make two lunches and give one away"], // 83
["Close your eyes right now and think of three things that you're grateful for"], // 84
["Plan a holiday for your friends"], // 85
["<a href='http://www.sendkidstheworld.com/' target='_blank'>Send postcards</a> to sick children who are fighting serious illnesses"], // 86
["Get setup for free on <a target='_blank' href='http://www.bradaronson.com/amazon-smile/'>Amazon Smile</a>. Amazon will donate to your favorite nonprofit"], //87
["Support the troops! Write a letter to a deployed or wounded member of the military through <a href='http://www.operationgratitude.com/' target='_blank'>Operation Gratitude</a>"], //88
["Do some yoga. Adrienne's <a href='https://www.youtube.com/watch?v=oBu-pQG6sTY' target='_blank'>30 day challenge</a> is a great place to start"], // 89
["Keep an extra umbrella at work, so you can lend it out when it rains"], // 90
["Have a conversation with someone and don't interrupt or present a solution to their problem."], // 91
["Close your eyes for 3 minute and perform <a href='https://www.youtube.com/watch?v=rOne1P0TKL8' target='_blank'>Mark William's breathing space</a>"], //92
["Write down 3 to 5 things for which you’re grateful for <a href='http://www.spring.org.uk/2007/09/practicing-gratitude-can-increase.php' target='_blank'>here</a>"], // 93
["Try and go three days without complaining about anything"], // 94
["Learn the names of people you see every day but don't necessarily interact with. Greet them by name"], //95
["Make a helpful introduction for someone"], // 96
["<a href=' https://organdonor.gov/register.html' target='_blank'>Sign up</a> to become an organ donor"], //97
["Ask for help. Let someone else enjoy performing an act of kindness."], // 98
["Spend a few minutes on <a href='http://freerice.com/#/english-vocabulary/1367' target='_blank'>Free Rice</a>"], // 99
["Purchase a couple of umbrellas and hand them out on a rainy day"], //100
["Sign up to donate blood"], //101
["Drop off a toy or game at a hospital"], //102
["Donate <a href='http://www.instructables.com/id/How-to-Donate-Your-Hair-to-a-Great-Cause/'>hair</a> to make wigs for cancer patients"], // 103
["Donate clothes to charity"], //104
  ];

  
}