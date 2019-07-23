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
var tour_component_1 = require('./tour.component');
var kindness_generator_component_1 = require('./generator/kindness-generator.component');
var cordova_directive_1 = require('./cordova.directive');
var theme_component_1 = require('./theme.component');
var IntroScreens = (function () {
    function IntroScreens(tourComponent, cordova, themeComponent, kindnessGenerator) {
        this.tourComponent = tourComponent;
        this.cordova = cordova;
        this.themeComponent = themeComponent;
        this.kindnessGenerator = kindnessGenerator;
        this.idleInterval = [];
        this.introStep = 1; // set initial tour step      
    }
    /*
     * WHERE TO START
     * Decides whether to start with main suggestion mode
     * Or suggestion already selected
     */
    IntroScreens.prototype._startWhere = function () {
        jQuery(".sonnyContainer").attr("present", 'false');
        // var customKindness = localStorage.getItem('cutomIntention');
        // var intentionNum = parseInt(localStorage.getItem('intentionNum'));
        // var intention = localStorage.getItem('intention');
        // var isIntentionCustom = localStorage.getItem('isCustom');
        if (jQuery('#kindnessView').attr('kindnessComplete') != 'true') {
            var intention = localStorage.getItem('intention');
            if (intention == 'true') {
                document.getElementById('kindnessView').className = "";
                document.getElementById('kindnessView').className += " intro";
            }
            else {
                jQuery('#doneView').hide();
                this.kindnessGenerator.intGenerator();
                jQuery("#kindnessView").hide();
            }
        }
    };
    /*
    * SKIP
    * Skips the intro screens
    * Same function plays at end of intro screens
    * Don't want to interfere with compassion challanege
    * @param BOOL hasSkipped - mess with challenge
    */
    IntroScreens.prototype.skipButton = function (hasSkip) {
        if (hasSkip) {
            // set compassion challenge to no
            localStorage.setItem("compassionChallenge", "no");
        }
        jQuery(".introContainer").hide();
        this.cordova.onResume();
        this._startWhere();
    };
    IntroScreens.prototype.iosProb = function () {
        this.themeComponent.setTheme('summer');
    };
    /*
    * INT INTRO
    * Determines whether to launch intro screen or compassion screens
    */
    IntroScreens.prototype.intIntro = function () {
        this.iosProb();
        if (jQuery(window).scrollTop() != 0) {
            jQuery('html, body').animate({ scrollTop: 0 });
        }
        var introNecessary = localStorage.getItem("kindnessArray");
        if (introNecessary == null || introNecessary == "") {
            jQuery('#introScreen').css({ '-webkit-appearance': 'none', 'box-shadow': '0 0 0 ' + jQuery(window).height() + 'px #4caf50;', '-webkit-box-shadow': '0 0 0 ' + jQuery(window).height() + 'px #4caf50', '-moz-box-shadow': '0 0 0 ' + jQuery(window).height() + 'px #4caf50' });
        }
        else {
            jQuery(".introContainer").hide();
            this.cordova.onResume();
            this._startWhere();
        }
    };
    /*
    * CHALLENGE EXPLAINED
    * Changes the text of screen 3 to explain better what compassion challenge is
    * Removes btn 3
    */
    IntroScreens.prototype.challengeExplained = function () {
        jQuery(".btn3").hide();
        // change text
        document.getElementById("introTxt").innerText = "Challenge yourself to perform 5 acts of kindness across 5 days to unlock unkind/greedy mode";
    };
    IntroScreens.prototype.sonnyAnimations = function () {
        var _this = this;
        // analytics as introduction page
        var sonnyImg = document.getElementById("sonnyIntro");
        jQuery("#sonnyIntro").opacity = 0;
        sonnyImg.src = "./img/sonny/intro.gif";
        setTimeout(function () {
            //console.log("sonny's intro");
            jQuery("#sonnyIntro").opacity = 1;
            sonnyImg.src = "./img/sonny/intro.gif";
            // Sonny bounce            
            setTimeout(function () {
                if (jQuery("#sonnyIntro").attr('animation') != 'false')
                    sonnyImg.src = "./img/sonny/bounce.gif";
            }, 2500);
            setTimeout(function () {
                if (jQuery("#sonnyIntro").attr('animation') != 'false')
                    sonnyImg.src = "./img/sonny/idle-blink.gif?t=" + new Date().getTime();
            }, 6700);
            setTimeout(function () {
                if (jQuery("#sonnyIntro").attr('animation') != 'false')
                    sonnyImg.src = "./img/sonny/idle-look.gif?t=" + new Date().getTime();
            }, 10700); //idle
            // Sonny idle animation
            setTimeout(function () {
                if (jQuery("#sonnyIntro").attr('animation') != 'false') {
                    sonnyImg.src = "./img/sonny/idle-blink.gif?t=" + new Date().getTime();
                    _this.idleInterval[4] = setTimeout(function () {
                        sonnyImg.src = "./img/sonny/idle-blink.gif?t=" + new Date().getTime();
                    }, 6000);
                }
            }, 15700);
        }, 1000);
    };
    IntroScreens.prototype.btnClick1 = function () {
        this.introStep++;
        switch (this.introStep) {
            case 1:
                this.intro();
                break;
            case 2:
                this.intro();
                break;
            case 3:
                this.intro();
                break;
            case 4:
                this.intro();
                break;
            case 5:
                // turn weekly notificatons on
                this.intro();
                jQuery('.weeklyCompassion').click();
                break;
            case 6:
                this.challengeAccepted = true;
                localStorage.setItem("compassionChallenge", "1");
                this.intro();
                jQuery('.dailyCompassion').click();
                break;
            case 7:
                this.tourComponent.intTour();
                break;
            case 8:
                this.tourComponent.intTour();
                break;
        }
    };
    IntroScreens.prototype.btnClick2 = function () {
        this.introStep++;
        switch (this.introStep) {
            case 1:
                this.intro();
                break;
            case 2:
                this.intro();
                break;
            case 3:
                this.challengeAccepted = false;
                this.intro();
                break;
            case 4:
                this.intro();
                break;
            case 5:
                // turn weekly notificatons off (just do nothing)
                this.intro();
                break;
            case 6:
                this.intro();
                localStorage.setItem("compassionChallenge", "no");
                break;
            case 7:
                this.skipButton(false);
                break;
            case 8:
                this.skipButton(false);
                break;
            case 9:
                this.skipButton(false);
                break;
        }
    };
    IntroScreens.prototype.intro = function () {
        //console.log("intro step: "+this.introStep);
        var _this = this;
        jQuery(".introContainer").show();
        switch (this.introStep) {
            case 2:
                // stop sonny animation
                jQuery("#sonnyIntro").attr('animation', 'false');
                jQuery("#otherChars").show();
                this.introStep = 2;
                jQuery(".btn").hide().html("Got it");
                // clear all the previous animations
                for (var i = 0; i <= 4; i++) {
                    clearTimeout(this.idleInterval[i]);
                }
                // background css
                document.getElementById("charContainer").style.background = "linear-gradient(#D6EDED,#EAF7FF,#FFF)";
                document.getElementById("introScreen").style.boxShadow = "0 0 0 140vw #C8523B";
                jQuery('.iosFix').css('background', '#C8523B');
                // change text
                document.getElementById("introTxt").innerText = "None of us have enough time, I get it. But performing a kindness is quick, simple and makes you feel pretty good. What's to lose?";
                // document.getElementById("introTxt").innerText = "In this app, There are over one hundred ideas. Ya' know, if you're ever stuck or bored or whatever ";
                // sonny exits  
                var sonnyImg = document.getElementById("sonnyIntro");
                sonnyImg.src = "./img/sonny/exit.gif?t=" + new Date().getTime();
                var calImg = document.getElementById("otherChars");
                jQuery("#otherChars").css({ "width": "215px", "margin-left": "-150px", "margin-top": "30px" });
                var timeout = 1000;
                // caly animation
                this.idleInterval[0] = setTimeout(function () {
                    calImg.src = "./img/caly/intro.gif?t=" + new Date().getTime();
                }, 1405 + timeout);
                this.idleInterval[0] = setTimeout(function () {
                    //   jQuery("#sonnyIntro").hide();   
                    jQuery("#otherChars").css({ "margin-left": "115px" });
                    calImg.src = "./img/caly/intro.gif?t=" + new Date().getTime();
                    jQuery("#otherChars").attr('onPhone', 'false');
                }, 1500 + timeout);
                this.idleInterval[1] = setTimeout(function () {
                    jQuery(".btn").fadeIn();
                    calImg.src = "./img/caly/blink.gif?t=" + new Date().getTime();
                }, 3000 + timeout);
                this.idleInterval[2] = setTimeout(function () {
                    clearTimeout(_this.idleInterval[5]);
                    calImg.src = "./img/caly/idle.gif?t=" + new Date().getTime();
                }, 4000 + timeout);
                this.idleInterval[3] = setTimeout(function () {
                    clearTimeout(_this.idleInterval[6]);
                    calImg.src = "./img/caly/phone-intro.gif";
                    jQuery("#otherChars").attr('onPhone', 'true');
                }, 8500 + timeout);
                this.idleInterval[4] = setTimeout(function () {
                    clearTimeout(_this.idleInterval[7]);
                    calImg.src = "./img/caly/phone.gif";
                }, 14000 + timeout);
                break;
            case 3:
                // clear all the previous animations
                for (var i = 0; i <= 4; i++) {
                    clearTimeout(this.idleInterval[i]);
                }
                // background css
                document.getElementById("charContainer").style.background = "linear-gradient(#D6EDED,#EAF7FF,#FFF)";
                document.getElementById("introScreen").style.boxShadow = "0 0 0 140vw #4caf50";
                jQuery('.iosFix').css('background', '#4caf50');
                // change text            
                document.getElementById("introTxt").innerText = "Need ideas? There's over 100 packed into this app. Try your hand at the flow of compassion with audio exercises by Prof. Paul Gilbert.";
                // document.getElementById("introTxt").innerText = "Up for a challenge? Why not try the 10 Day Compassion Challenge?";
                jQuery(".btn").hide().html("Continue");
                var calImg = document.getElementById("otherChars");
                // caly walks out
                var cupIntroTime;
                if (jQuery("#otherChars").attr('onPhone') == 'true') {
                    calImg.src = "./img/caly/phone-outro.gif";
                    cupIntroTime = 3500;
                    setTimeout(function () {
                        calImg.src = "./img/caly/intro.gif";
                        jQuery("#otherChars").css({ "margin-left": "340px" }); // walks right
                    }, 2500);
                }
                else {
                    calImg.src = "./img/caly/intro.gif";
                    jQuery("#otherChars").css({ "margin-left": "340px" }); // walks right
                    cupIntroTime = 1000;
                }
                jQuery("#sonnyIntro").css({ "margin-left": "250px" });
                // compasion cup
                this.idleInterval[0] = setTimeout(function () {
                    jQuery('#otherChars').hide().css({ 'margin-left': '0px', 'margin-top': '0px' });
                    jQuery("#star12").show();
                    jQuery("#sonnyIntro").css({ "top": "25px", "margin-left": "0px" });
                    jQuery(".btn").fadeIn();
                    _this.idleInterval[1] = setTimeout(function () {
                        jQuery("#star12").fadeIn('slow');
                    }, 3000);
                    var trophy = document.getElementById("sonnyIntro");
                    trophy.src = "./img/icons/achievement.png";
                    jQuery("#sonnyIntro").css({ "width": "175px", "left": "-35%" });
                }, cupIntroTime);
                break;
            case 4:
                // image change
                jQuery("#sonnyIntro").attr('src', './img/icons/notification.gif');
                jQuery("#sonnyIntro").css({ 'width': '150px', 'margin-top': '-5px', 'left': '-25%' });
                // background css
                document.getElementById("charContainer").style.background = "linear-gradient(rgb(217, 138, 218), #EAF7FF,#FFF)";
                document.getElementById("introScreen").style.boxShadow = "rgb(103, 58, 183) 0px 0px 0px 140vw";
                jQuery('.iosFix').css('background', 'rgb(103, 58, 183)');
                // change text            
                document.getElementById("introTxt").innerText = "Turn on notifications? They will help you stay on track!";
                jQuery(".btn").hide().html("Good idea!");
                jQuery(".btn2").hide().html("No thanks");
                // compasion cup
                this.idleInterval[0] = setTimeout(function () {
                    jQuery("#sonnyIntro").css({ 'z-index': '200' });
                    jQuery(".btn, .btn2").fadeIn();
                    //  var ua = navigator.userAgent.toLowerCase();
                    //  var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");
                    //  if(isAndroid) {
                    //    // Do something!
                    //    // Redirect to Android-site?
                    //    jQuery(".btn").hide().html("Coming soon");
                    //    jQuery(".btn2").hide();
                    //  }
                }, 1000);
                break;
            case 5:
                // clear all the previous animations
                for (var i = 0; i <= 2; i++) {
                    clearTimeout(this.idleInterval[i]);
                }
                jQuery("#sonnyIntro").css({ 'z-index': '-1' });
                var badBro = document.getElementById("otherChars");
                badBro.src = "./img/badBro/intro.gif";
                jQuery(".btn3").hide().html('5 days of wha?');
                jQuery(".btn2").hide().html("Maybe Later");
                jQuery(".btn").hide().html("Challenge Accepted");
                // background css
                document.getElementById("charContainer").style.background = "linear-gradient(#ffc98d,#fffad2,#fff)";
                document.getElementById("introScreen").style.boxShadow = "0 0 0 140vw #f6805c";
                jQuery('.iosFix').css('background', '#f6805c');
                // change text
                document.getElementById("introTxt").innerText = "Perform 5 kindnesses in 5 consecutive days to unlock the unkind version of this app!!";
                // document.getElementById("introTxt").innerText = "Want to unlock the unkind version of this app? You'll need to perform 5 kindness in consecutive days first!!";               
                jQuery("#sonnyIntro").css({ "margin-top": "300px" }); //cup dissapear
                this.idleInterval[0] = setTimeout(function () {
                    jQuery('#otherChars').show();
                }, 900);
                this.idleInterval[0] = setTimeout(function () {
                    jQuery("#sonnyIntro").hide();
                    jQuery("#otherChars").show().css({ "width": "540px", "left": "-78%" });
                    jQuery(".btn, .btn2, .btn3").fadeIn();
                    _this.idleInterval[1] = setTimeout(function () {
                        badBro.src = "./img/badBro/laughing.gif?t=" + new Date().getTime();
                        _this.idleInterval[2] = setTimeout(function () {
                            badBro.src = "./img/badBro/idle.gif?t=" + new Date().getTime();
                        }, 7700);
                    }, 2300);
                }, 1000);
                break;
            case 6:
                // clear all the previous animations
                for (var i = 0; i <= 2; i++) {
                    clearTimeout(this.idleInterval[i]);
                }
                // background css
                document.getElementById("charContainer").style.background = "linear-gradient(#D6EDED,#EAF7FF,#FFF)";
                document.getElementById("introScreen").style.boxShadow = "0 0 0 140vw rgb(221, 176, 176)";
                jQuery('.iosFix').css('background', 'rgb(221, 176, 176)');
                // change text
                if (jQuery(window).height() >= 750) {
                    document.getElementById("introTxt").innerText = "Good luck fella' \n";
                }
                else {
                    document.getElementById("introTxt").innerText = "";
                }
                document.getElementById("introTxt").innerText += "This app is all about perseverance. Stick with it and you'll make this world a little kinder";
                jQuery(".btn2").hide().html("Let's do it");
                jQuery(".btn").hide().html("Take the tour");
                jQuery(".btn3").hide();
                this.idleInterval[0] = setTimeout(function () {
                    jQuery(".btn2").fadeIn();
                }, 1000);
                //badBro dissapear
                var badBro = document.getElementById("otherChars");
                badBro.src = "./img/badBro/exit.gif";
                this.idleInterval[0] = setTimeout(function () {
                    jQuery("#otherChars").hide();
                }, 3900);
                this.idleInterval[1] = setTimeout(function () {
                    jQuery("#sonnyIntro").fadeIn("2000").css({ "width": "175px", "left": "-88px", "top": "60px", "margin-top": "0px" });
                    var heart = document.getElementById("sonnyIntro");
                    heart.src = "./img/icons/heart.png";
                }, 2000);
                break;
        }
    };
    IntroScreens = __decorate([
        core_1.Component({
            selector: 'intro-screen-component',
            templateUrl: 'app/intro-screen-component.html',
            styleUrls: ['app/intro-screens.component.css'],
            providers: [theme_component_1.ThemeComponent, tour_component_1.TourComponent, cordova_directive_1.Cordova, kindness_generator_component_1.KindnessGenerator]
        }), 
        __metadata('design:paramtypes', [tour_component_1.TourComponent, cordova_directive_1.Cordova, theme_component_1.ThemeComponent, kindness_generator_component_1.KindnessGenerator])
    ], IntroScreens);
    return IntroScreens;
}());
exports.IntroScreens = IntroScreens;
//# sourceMappingURL=intro-screens.component.js.map