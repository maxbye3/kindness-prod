"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var badBroDialogue_directive_1 = require('./badBroDialogue.directive');
var GeneratorBackend = (function () {
    function GeneratorBackend(badBroDialogue) {
        this.badBroDialogue = badBroDialogue;
        this.evilData = [
            ["Sprinkle rice all over a park and watch the feeding pigeons explode"],
            ["Put your friends hand in warm water while he sleeps and upload the results to YouTube"],
            ["Decline to be seated at a restaurant, and simply eat their complimentary mints"],
            ["Buy a large quantity of orange traffic cones and reroute your street"],
            ["Take 200 selfies and 'cc' all of them to your boss"],
            [""]
        ];
        this.data = [
            ["The Italian tradition of caffe sospeso or pending coffee. You pay for two cups, one for you and one in advance as an anonymous act of charity for someone who can't afford it."],
            ["Catch up with an old friend who you have not heard from in a while"],
            ["Use <a href='https://soundcloud.com/compassionatemind/building-the-compassionate-self/s-c7EQJ?in=compassionatemind/sets/compassionate-minds' target='_blank'>this audio exercise</a> to help build a compassionate self"],
            ["Jump on the <a target='_blank' href='https://tinybuddha.com/forums/'>Tiny Buddha community and help someone out"],
            ["Donate books you're not reading to the library"],
            ["Relay an overheard compliment"],
            ["Take a long & relaxing bath"],
            ["Bake something sweet for a neighbour"],
            ["Go to the park / large natural space and tap into the stillness"],
            ["<a href='https://onetoday.google.com' target='_blank'>Google's One Today</a> app on Android or iOS whenever you're feeling generous and give just $1 to the charity of the day."],
            ["Go on a walk sans phone"],
            ["Pay for a bus fare for someone just cause"],
            ["Watch Professor Paul Gilbert explain how <a href='https://www.youtube.com/watch?v=pz9Fr_v9Okw' target='_blank'>mindfulness fosters compassion</a>"],
            ["Compliment someone to their boss"],
            ["Plant a seed"],
            ["Forgive someone for hurting you"],
            ['Smile entire journey of bus / train ride'],
            ["Give someone a USB of movies / audio you think they'd like on it. It's the modern day mix-tape."],
            ["Be patient with someone you find annoying or ask them out for a coffee"],
            ["Be the person who puts a tip in the tip jar at the coffee-shop (Fewer people tip than you'd think!)"],
            ["Call a friend you haven’t seen in a while to say hello"],
            ["Try out <a href='https://www.headspace.com/' target='_blank'>Headspace</a>'s free meditation demo"],
            ["Cook dinner to share"],
            ["Ask your local homeless shelter if they need anything"],
            ["Buy flowers or a plant for someone"],
            ["Send a postcard to a friend"],
            ["Write a long constructive comment on a blog or website"],
            // ["Review this kindness app by going here"], // 28
            ["<a href='http://www.charitymiles.org/' target='_blank'>Charity Miles</a> is a free Android or iPhone app that raises 10 to 25 cents per mile you run/jog for a charity you select"],
            ["Use <a href='https://soundcloud.com/compassionatemind/addressing-self-crticism/s-U19Fd?in=compassionatemind/sets/compassionate-minds' target='_blank'>this audio exercise</a> to address self criticism"],
            ["Make someone feel good about their outfit"],
            ["Call your folks"],
            ["Set out clothes for the next day and come up with a plan to make the most of the day"],
            ["Try <a target='_blank' href='https://thrive.uk.com/be-stress-free/'>Stress Free</a>. Try <a target='_blank' href='https://thrive.uk.com/be-stress-free/'>Stress Free</a>. A free relaxation game that I built!"],
            ["Help make audio books available to anyone who wants them with <a target='_blank' href='https://librivox.org/'>LibriVox</a>"],
            ["Use <a target='_blank' href='https://www.goodsearch.com/'>Goodsearch</a> to search the internet. A portion of search revenue is donated to charities as you browse."],
            ["Perform some soothing rhythm and breathing practice with <a href='https://soundcloud.com/compassionatemind/soothing-rhythm-breathing-practices/s-JA0g8?in=compassionatemind/sets/compassionate-minds' target='_blank'>this audio guide</a> from Professor Paul Gilbert"],
            ["Indulge yourself with a long relaxing hot bath"],
            ["Make a fruit smoothie. <a href='http://www.prevention.com/food/20-super-healthy-smoothie-recipes#20-super-healthy-smoothie-recipes/slide/2?&_suid=1500460068522016663691577294393' target='_blank'>Try this</a> for inspiration."],
            ["Send someone you know whose down on their luck a gift"],
            ["Perform the <a href='http://hfhc.ext.wvu.edu/r/download/114469' target='_blank'>raisin meditation</a> on a piece of food. Don't like raisins? I use chocolate buttons"],
            ["Change your desktop background to somewhere in the world you would like to visit"],
            ["Organize someone's birthday party"],
            ["Take a photo of something that piques your interest / curiosity and jot down why"],
            ["Help someone with their bags or stroller"],
            ["Acknowledge the cashier who's helping you and genuinely ask them how they're doing"],
            ["Give up your seat to someone who needs it more"],
            ["Be courteous to massive to other drivers even if they're being massive jerks"],
            ["Give a homeless person the leftovers from your meal."],
            ["Use the idle time on your computer to cure diseases, study global warming and many other research projects. Your computing power will be donated through <a href='http://boinc.berkeley.edu/' target='_blank'>BOINC</a>, a project of the University of California supported by the National Science Foundation."] //48
            ["Write a note of inspiration to someone who needs inspiration"],
            ["Send a letter to someone oversees"],
            ["Drop off clothes at a local charity outlet"],
            ["Buy a phone card and give it to a homeless shelter for them to give to someone"],
            ["Take flowers to a hospital ward and give them to someone who hasn't had any visitors"],
            ["Write anonymous compliments for strangers to find"],
            ["Put something you no longer need on <a href='https://www.freecycle.org/' target='_blank'>FreeCycle</a> for free"],
            ["Tape some change to a pay phone with a card saying it is for whoever needs it"],
            ["Leave a book you have finished for someone else to read"],
            ["Offer to help an elderly neighbour with household chores"],
            ["Give a lottery ticket to a stranger"],
            ["Call a friend randomly and let them know you're thinking of them"],
            ["Leave an anonymous thank you notes to a teacher/mentor"],
            ["Write letters of appreciation to groups who are helping the community or a cause you believe in"],
            ["Have a browse on the <a target='_blank' href='https://www.reddit.com/r/RandomKindness/'>Random Acts of Kindness</a> sub-reddit. Maybe you'll be inspired to do one?"],
            ["Visit <a href='https://12kindsofkindness.com/' target='_blank'>12 kinds of Kindness</a>. It's got some bizarre and wonderful content"],
            ["Help a stranger on <a href='http://blahtherapy.com/' target='_blank'>BlahTherapy</a>"],
            ["Ask strangers on the street: 'can I help you with anything?'"],
            ["Backup hard drive (you'll thank yourself big time for this)"],
            ["Make a concerted effort to stop malicious gossip spreading"],
            ["Volunteer your skills for someone who has expressed an interest in what you do"],
            ["Connect people to each other"],
            ["Make an extra special effort to be patient with someone"],
            ["Compliment someone in front of others. Complimenting in front of others usually holds more weight"],
            ["Watch a film with someone. Don't be on your phone for the duration "],
            ["Spend an hour learning something you've never heard of before. Maybe use the <a href='https://www.khanacademy.org/' target='_blank'>Khan academy</a> for inspiration."],
            ["Leave some nice comments on blogs and Twitter"],
            ["Do the task nobody else wants to"],
            ["Respond to invites and text immediately"],
            ["Decorate for someone's birthday"],
            ["Tell someone they're pretty (but not in a creepy way)"],
            ["Send anonymous flowers to someone at work"],
            ["Put together a small garden"],
            ["Make two lunches and give one away"],
            ["Close your eyes right now and think of three things that you're grateful for"],
            ["Plan a holiday for your friends"],
            ["<a href='http://www.sendkidstheworld.com/' target='_blank'>Send postcards</a> to sick children who are fighting serious illnesses and want to receive mail"],
            ["Get setup for free on <a target='_blank' href='http://www.bradaronson.com/amazon-smile/'>Amazon Smile</a>. Amazon will donate to your favorite nonprofit each time you make a purchase"],
            ["Support the troops! Write a letter to a deployed or wounded member of the military through <a target='_blank' href=' http://www.operationgratitude.com/'>Operation Gratitude </a>"],
            ["Do some yoga. Adrienne's <a href='https://www.youtube.com/watch?v=oBu-pQG6sTY' target='_blank'>30 day challenge</a> is a great place to start"],
            ["Keep an extra umbrella at work, so you can lend it out when it rains"],
            ["Have a conversation with someone and don't interrupt or present a solution to their problem. We often underestimate how important and comforting it is to be listened to."],
            ["Close your eyes for 3 minute and perform <a href='https://www.youtube.com/watch?v=rOne1P0TKL8' target='_blank'>Mark William's breathing space</a>"],
            ["Write down 3 to 5 things for which you’re grateful for <a href='http://www.spring.org.uk/2007/09/practicing-gratitude-can-increase.php' target='_blank'>here</a>"],
            ["Try and go three days without complaining about anything"],
            ["Learn the names of people you see every day but don't necessarily interact with. Greet them by name"],
            ["Make a helpful introduction for someone"],
            ["<a href='https://organdonor.gov/register.html' target='_blank'>Sign up to become an organ donor</a>. Then, when you die (we all do eventually), your organs can be used to save up to 8 lives."],
            ["Ask for help. Let someone else enjoy performing an act of kindness."],
            ["Spend a few minutes on <a href='http://freerice.com/#/english-vocabulary/1367' target='_blank'>Free Rice</a>, a United Nations Food Program that will donate rice to hungry people for every question you get right on their learning website"],
            ["Purchase a couple of umbrellas and hand them out on a rainy day"],
            ["Sign up to donate blood"],
            ["Drop off a toy or game at a hospital"],
            ["Donate <a href='http://www.instructables.com/id/How-to-Donate-Your-Hair-to-a-Great-Cause/'>hair</a> to make wigs for cancer patients"],
            ["Donate clothes to charity"] //104
        ];
        this.descrptionData = [
            ["Pay for two cups of coffee"],
            ["Catch up with an old friend"],
            ["Practice <a href='https://soundcloud.com/compassionatemind/building-the-compassionate-self/s-c7EQJ?in=compassionatemind/sets/compassionate-minds' target='_blank'>this compassionate audio exercise</a>"],
            ["Help someone on <a target='_blank' href='https://tinybuddha.com/forums/'>Tiny Buddha</a>"],
            ["Donate books"],
            ["Relay a compliment"],
            ["Take a relaxing bath"],
            ["Bake something sweet for a neighbour"],
            ["Go to a large natural space and tap into the stillness"],
            ["Download <a href='https://onetoday.google.com' target='_blank'>Google's One Today</a> app"],
            ["Go on a walk minus phone"],
            ["Pay for a bus fare for someone"],
            ["How does <a href='https://www.youtube.com/watch?v=pz9Fr_v9Okw' target='_blank'>mindfulness foster compassion?</a>"],
            ["Compliment someone to their boss"],
            ["Plant a seed"],
            ["Forgive someone for hurting you"],
            ['Smile your entire journey'],
            ["Give someone a USB full of cool content"],
            ["Be patient with someone you find annoying"],
            ["Be the person who puts a tip in the tip jar at the coffee-shop"],
            ["Call a friend you haven’t seen in a while"],
            ["Try <a href='https://www.headspace.com/' target='_blank'>Headspace</a>"],
            ["Cook dinner to share"],
            ["Volunteer at a homeless shelter"],
            ["Buy a plant for someone"],
            ["Send a postcard to a friend"],
            ["Write a long constructive comment"],
            // ["Review this kindness app by going here LINK"], //28
            ["<a href='http://www.charitymiles.org/' target='_blank'>Charity Miles</a> raise money for running/jogging"],
            ["Perform audio exercise on self criticism "],
            ["Make someone feel good about their outfit"],
            ["Call your folks"],
            ["Come up with a plan to make the most of the day"],
            ["Try <a target='_blank' href='https://thrive.uk.com/be-stress-free/'>Stress Free</a>"],
            ["Help make audio books available with <a target='_blank' href='https://librivox.org/'>LibriVox</a>"],
            ["Spend some time on <a target='_blank' href='https://www.goodsearch.com/'>Goodsearch</a>"],
            ["Perform some soothing rhythm and breathing practice with <a href='https://soundcloud.com/compassionatemind/soothing-rhythm-breathing-practices/s-JA0g8?in=compassionatemind/sets/compassionate-minds' target='_blank'>this audio guide</a>"],
            ["Indulge yourself with a long relaxing hot bath "],
            ["Make a fruit smoothie"],
            ["Send someone you know whose down on their luck a gift"],
            ["Perform the <a href='http://hfhc.ext.wvu.edu/r/download/114469' target='_blank'>raisin meditation</a> on a piece of food"],
            ["Change your desktop background to somewhere in the world you would like to visit"],
            ["Organize someone's birthday party"],
            ["Take a photo of something that piques your interest and jot down why"],
            ["Help someone with their bags or stroller"],
            ["Acknowledge the cashier who's helping you and genuinely ask them how they're doing"],
            ["Give up your seat to someone who needs it more"],
            ["Be courteous to other drivers"],
            ["Doante the leftovers from your  meal"],
            ["Cure diseases with <a href='http://boinc.berkeley.edu/' target='_blank'>BOINC</a>"] //100
            ["Write a note of inspiration to someone who needs inspiration"],
            ["Become pen-pal with someone oversees"],
            ["Drop off clothes at a local charity outlet"],
            ["Buy a phone card and give it to a homeless shelter"],
            ["Take flowers to a hospital ward"],
            ["Write anonymous compliments for strangers to find"],
            ["Put something you no longer need on <a href='https://www.freecycle.org/' target='_blank'>Freecycle</a> for free"],
            ["Tape some change to a pay phone"],
            ["Leave a book you have finished for someone else to read"],
            ["Offer to help an elderly neighbour with household chores"],
            ["Give a lottery ticket to a stranger"],
            ["Call a friend randomly and let them know you're thinking of them"],
            ["Leave an anonymous thank you notes to a mentor"],
            ["Write letters of appreciation to a cause you believe in"],
            ["Have a browse on the <a target='_blank' href='https://www.reddit.com/r/RandomKindness/'>Random Acts of Kindness</a> sub-reddit"],
            ["Visit <a target='_blank' href='https://www.reddit.com/r/RandomKindness/'>12 kinds of Kindness</a>"],
            ["Help a stranger on <a href='http://blahtherapy.com/' target='_blank'>BlahTherapy</a>"],
            ["Ask strangers on the street - 'can I help you with anything?'"],
            ["Backup your computer's hard drive"],
            ["Make a concerted effort to stop gossip"],
            ["Volunteer for has expressed an interest in what you do"],
            ["Connect people to each other"],
            ["Make an extra special effort to be patient with someone"],
            ["Compliment someone in front of others"],
            ["Watch a film and don't be on your phone"],
            ["Spend an hour learning something you've never heard of before"],
            ["Leave some nice comments on blogs and Twitter"],
            ["Do the task nobody else wants to"],
            ["Respond to invites and text immediately"],
            ["Decorate for someone's birthday"],
            ["Tell someone they're pretty"],
            ["Send flowers anonymously to someone at work"],
            ["Put together a small garden"],
            ["Make two lunches and give one away"],
            ["Close your eyes right now and think of three things that you're grateful for"],
            ["Plan a holiday for your friends"],
            ["<a href='http://www.sendkidstheworld.com/' target='_blank'>Send postcards</a> to sick children who are fighting serious illnesses"],
            ["Get setup for free on <a target='_blank' href='http://www.bradaronson.com/amazon-smile/'>Amazon Smile</a>. Amazon will donate to your favorite nonprofit"],
            ["Support the troops! Write a letter to a deployed or wounded member of the military through <a href='http://www.operationgratitude.com/' target='_blank'>Operation Gratitude</a>"],
            ["Do some yoga. Adrienne's <a href='https://www.youtube.com/watch?v=oBu-pQG6sTY' target='_blank'>30 day challenge</a> is a great place to start"],
            ["Keep an extra umbrella at work, so you can lend it out when it rains"],
            ["Have a conversation with someone and don't interrupt or present a solution to their problem."],
            ["Close your eyes for 3 minute and perform <a href='https://www.youtube.com/watch?v=rOne1P0TKL8' target='_blank'>Mark William's breathing space</a>"],
            ["Write down 3 to 5 things for which you’re grateful for <a href='http://www.spring.org.uk/2007/09/practicing-gratitude-can-increase.php' target='_blank'>here</a>"],
            ["Try and go three days without complaining about anything"],
            ["Learn the names of people you see every day but don't necessarily interact with. Greet them by name"],
            ["Make a helpful introduction for someone"],
            ["<a href=' https://organdonor.gov/register.html' target='_blank'>Sign up</a> to become an organ donor"],
            ["Ask for help. Let someone else enjoy performing an act of kindness."],
            ["Spend a few minutes on <a href='http://freerice.com/#/english-vocabulary/1367' target='_blank'>Free Rice</a>"],
            ["Purchase a couple of umbrellas and hand them out on a rainy day"],
            ["Sign up to donate blood"],
            ["Drop off a toy or game at a hospital"],
            ["Donate <a href='http://www.instructables.com/id/How-to-Donate-Your-Hair-to-a-Great-Cause/'>hair</a> to make wigs for cancer patients"],
            ["Donate clothes to charity"],
        ];
    }
    /*
    * CHECK INTENTION
    * Check local storage of intention
    * If false #itentionFound is hidden and itentionNotFound shown
    * Check if sonny or badBro and apply styles
    * If custom kindness check local storage
    * If badBro make sure task is valid
    */
    GeneratorBackend.prototype.checkIntention = function () {
        var intention = localStorage.getItem('intention');
        if (intention == 'false' || !intention) {
            jQuery('.itentionFound, .intentionSet').hide();
            jQuery('.itentionNotFound, .createIntention').show();
            jQuery('.intentionFinished .txt').html('Set Intention');
        }
        else {
            var intentionString = localStorage.getItem('intentionNum');
            var intentionNum = parseInt(intentionString);
            intentionNum = this.suggestionsExceeded(intentionNum);
            jQuery('.intentionFinished .txt').html('Change Intention');
            // check if sonny or badBro
            if (jQuery('#sonnyStatic').attr('char') == 'sonny') {
                // sonny intention
                var color = 'black';
                var isIntentionCustom = localStorage.getItem('isCustom');
                if (isIntentionCustom == 'true') {
                    // custom kindness
                    var kindness = localStorage.getItem('cutomIntention');
                }
                else {
                    kindness = this.descrptionData[(intentionNum)];
                }
                jQuery('.intentionTask').html(kindness);
                jQuery('.completeContainer').css({ 'color': color, 'font-family': 'kindness', 'font-size': '7.5vw' });
                jQuery('.completeContainer, .intentionTask').css({ 'color': color, 'font-family': 'kindness', 'font-size': '7.5vw' });
            }
            else {
                // evil intention
                if (intentionNum > 4) {
                    localStorage.setItem('intentionNum', '0');
                    this.checkIntention();
                    return;
                }
                color = 'white';
                jQuery('.intentionTask').html(this.evilData[intentionNum]);
            }
            // settings menu
            jQuery('.intention-complete').css('border', color + ' solid 1px');
            jQuery('.itentionFound, .intentionSet').show();
            jQuery('.itentionNotFound, .createIntention').hide();
        }
    };
    /*
    * INTENTION COMPLETE
    * Toggle the radio button
    * @param - STRING - if intention put that into inputKindness.value
    */
    GeneratorBackend.prototype.itentionComplete = function (type) {
        var inputKindness = document.getElementById("inputKindness");
        if (type == 'intention') {
            inputKindness.value = jQuery('.intentionTask').html();
        }
        // intention needs to be added to kindness
        jQuery(".intention-complete").toggleClass("intention-complete--clicked");
        // actually cancel the intention
        jQuery('.itentionFound, .intentionSet').hide();
        jQuery('.itentionNotFound, .createIntention').show();
        jQuery('.intentionFinished .txt').html('Set Intention');
        // lose the change / cancel intention
        localStorage.setItem('intention', 'false');
    };
    /*
    * BAD BRO OUT
    * Bad bro gets pissy and gets out of there
    */
    GeneratorBackend.prototype.badBroOut = function () {
        if (jQuery('#sonnyGif').attr('char') != 'badBro') {
            return;
        }
        jQuery('#sonnyIcon, .swiper-container').hide();
        localStorage.setItem('intentionNum', '1');
        jQuery('.helpMenu,.accept,.kindnessCal,.control').hide();
        var sonnyIcon = "<img src='./img/icons/sonny.svg' style='height: 25px;border: #473939 solid 0.5px;padding: 5px; filter: invert(100%);'>";
        this.badBroDialogue.dialogue('spit', ["Yo! You expect me to stand here and give you idea after idea?!", "Do I look like " + sonnyIcon + "  to you?!", "I'm out..."]);
        // this.badBroDialogue.dialogue('spit',["Yo!","I'm out..." ]);
        jQuery('#sonnyStatic').attr('idle', 'false'); // stops idle animation of bad bro
        jQuery('.sonnyContainer').attr('introallowed', 'false');
        jQuery('#kindness-generator').attr('sonnyOut', 'true'); // make sonny jump up at the end of conversation 
    };
    /*
    * SUGGESTIONS EXCEEDED
    * intention number > number of kindness
    * then intention number == 0
    * @param INT intentionNumber - the intention number
    */
    GeneratorBackend.prototype.suggestionsExceeded = function (intentionNumber) {
        if (intentionNumber > this.data.length) {
            return 0;
        }
        else
            return intentionNumber;
    };
    /*
    * DELIVER TASK
    * If task is undefined then place task as the first
    * Task number got from local storage as array: MAX CHANGE THIS AS SHOULDN'T BE ARR
      * [{current task number}, {whether intention is true or not}]
    * @param string STATE - prev / next / int
    */
    GeneratorBackend.prototype.deliverTask = function (state) {
        jQuery('.stillNasty,.backToKindness').hide();
        var intentionNum;
        if (!localStorage.getItem('intentionNum')) {
            intentionNum = 0;
        }
        else {
            intentionNum = localStorage.getItem('intentionNum');
        }
        intentionNum = parseInt(intentionNum);
        intentionNum = this.suggestionsExceeded(intentionNum);
        if (state == 'next') {
            intentionNum = intentionNum + 1;
        }
        else if (state == 'prev') {
            if (intentionNum == 0) {
                if (jQuery('#sonnyGif').attr('char') == 'badBro') {
                    return this.evilData[0];
                }
                else {
                    return this.data[0];
                }
            }
            intentionNum = intentionNum - 1;
        }
        localStorage.setItem('intentionNum', intentionNum);
        if (jQuery('#sonnyGif').attr('char') == 'badBro') {
            if (intentionNum == 5) {
                this.badBroOut();
                return [''];
            }
            else {
                return this.evilData[intentionNum];
            }
        }
        else {
            return this.data[intentionNum];
        }
    };
    GeneratorBackend = __decorate([
        core_1.Directive({
            providers: [badBroDialogue_directive_1.BadBroDialogue]
        }), 
        __metadata('design:paramtypes', [badBroDialogue_directive_1.BadBroDialogue])
    ], GeneratorBackend);
    return GeneratorBackend;
}());
exports.GeneratorBackend = GeneratorBackend;
//# sourceMappingURL=generator.component.js.map