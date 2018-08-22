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
var sonny_dialogue_component_1 = require('./sonny.dialogue.component');
var sonny_component_1 = require('./sonny.component');
var cal_component_1 = require('./cal.component');
var go_cal_component_1 = require('./go.cal.component');
var TourComponent = (function () {
    function TourComponent(sonnyDialogue, sonnyComponent, calComponent) {
        this.sonnyDialogue = sonnyDialogue;
        this.sonnyComponent = sonnyComponent;
        this.calComponent = calComponent;
        this.sonnyDialogue = sonnyDialogue;
        this.calComponent = calComponent;
        this.sonnyComponent = sonnyComponent;
        // int tour
        this.tourStep = 0;
    }
    TourComponent.prototype.ngOnInit = function () {
        document.getElementById("tourContainer").style.display = "none";
        //  this.intTour();
        //  this.continueTour();
    };
    /*
    * TOUR STUFF
    */
    TourComponent.prototype.displayHide = function () {
        if (document.getElementById("tourContainer").style.display == "initial") {
            document.getElementById("tourContainer").style.display = "none";
            jQuery("#kindness .themeButton").hide(); // show the submit button
            document.getElementById("sonnyIcon").style.display = "initial";
            document.getElementById("backKindness").style.display = "initial";
        }
        else {
            document.getElementById("tourContainer").style.display = "initial";
            jQuery("#kindness .themeButton").hide(); // hide the submit button
            document.getElementById("sonnyIcon").style.display = "none";
            document.getElementById("backKindness").style.display = "none";
        }
    };
    TourComponent.prototype.intTour = function () {
        this.displayHide();
        this.continueTour();
        // Welcome to the tour! Click skip to stop me at anytime. Otherwise, click continue tour above.
        this.sonnyDialogue.sonnySpeech(["Welcome to the tour!", " Click <b>SKIP</b> to stop me at anytime. Otherwise, click <b>CONTINUE TOUR</b> above."]);
        jQuery("#kindnessView").hide();
    };
    TourComponent.prototype.skipTour = function () {
        this.displayHide();
        // And that's the app! I hope you enjoy using the app daily to create a kinder and more compassionate world...
        jQuery("#typed").html(""); // clear text
        this.calComponent.toKindness();
        jQuery(".sonnyContainer").css({
            "position": "absolute",
            "bottom": "auto"
        });
        var speechBubble = document.getElementById('speechBubble').style;
        var bubbleOffset = window.innerWidth - 140;
        speechBubble.width = bubbleOffset + "px";
        speechBubble.position = "absolute";
        speechBubble.top = "75px";
        speechBubble.bottom = "auto";
        // if(tour == finished)
        // this.sonnyComponent.sonnyState("",'sonny');
        // setTimeout(() => {
        //   this.sonnyComponent.sonnyState("intro",'sonny');
        //    //if(tour == "finished")
        //    this.sonnyDialogue.sonnySpeech(false,[
        //     "And that's the app!",
        //     "I hope you enjoy using it daily to create a kinder and more compassionate world...",
        //     "Click this icon <img src='./img/icons/sonny.svg' style='height: 20px;border: #473939 solid 0.5px;padding: 5px;vertical-align: bottom;'> if you need my help."
        // ]);
        // var sonnyImg = <HTMLImageElement>document.getElementById("sonnyStatic");
        // setTimeout(() => {   
        //   this.sonnyDialogue.jiggleIcon(); 
        // }, 10000);
        // }, 1000);
        // else // tour unfinshed
        this.sonnyDialogue.sonnySpeech([
            "You can repeat the tour anytime by clicking this icon <img src='./img/icons/sonny.svg' style='height: 20px;border: #473939 solid 0.5px;padding: 5px;vertical-align: bottom;'>"
        ]);
        var sonnyImg = document.getElementById("sonnyStatic");
        setTimeout(function () {
            // this.sonnyDialogue.jiggleIcon(); 
        }, 3000);
        // exit screen 1
        document.getElementById("helpView").className = "";
        document.getElementById("helpView").className += " outro";
        // enter screen 2
        document.getElementById("kindnessView").className = "";
        document.getElementById("kindnessView").className += " intro";
    };
    TourComponent.prototype.continueTour = function () {
        var _this = this;
        this.tourStep++;
        var speechBubble = document.getElementById('speechBubble').style;
        switch (this.tourStep) {
            case 1:
                // This is the kindness screen write your actions here. It takes seconds to complete, so try and keep up a daily streak.        
                jQuery("#kindnessView").show();
                this.sonnyDialogue.sonnySpeech(["This is the main screen write your kind actions here.", "It takes seconds to complete, so try and keep up a daily streak!!"]);
                // exit screen 1
                document.getElementById("helpView").className = "";
                document.getElementById("helpView").className += " outro";
                // enter screen 2
                document.getElementById("kindnessView").className = "";
                document.getElementById("kindnessView").className += " intro";
                break;
            case 2:
                // Hit the call button to get help. You can contact the developer, change the theme and turn the whole point of the app into narcissism
                // See the tour again 
                // or have me recommend over 100 different kindnesses if you're stumped and want some inspiration
                this.sonnyDialogue.sonnySpeech(["Hit the call button to get help.", "You can contact the developer,", "View the tour again,", "Change the theme", "And even turn the whole point of the app into narcissism", "Or have me recommend a kindnesses if you're stumped and want some inspiration!!"]);
                document.getElementById("sonnyIcon").className = 'menuItem';
                document.getElementById("sonnyIcon").style.display = "initial";
                document.getElementById("sonnyIcon").style.opacity = "1";
                // do some fancy skip tour animation
                jQuery(".skipTour").fadeOut();
                setTimeout(function () {
                    //  document.getElementById("sonnyIcon").className += ' jiggleOpac';   
                }, 1000);
                setTimeout(function () {
                    jQuery("#sonnyIcon").fadeOut();
                    setTimeout(function () {
                        jQuery(".skipTour").fadeIn();
                    }, 500);
                }, 3500);
                break;
            case 3:
                // Let's say you're out of kind ideas
                // Here's an example of a kindness you can do
                // If you're not sure about it, I can provide another task if you click new example 
                this.sonnyDialogue.sonnySpeech(["Here's an example of a kindness you can do...", "If you're not sure about it, I can provide another task if you click <b>NEW EXAMPLE</b>. I have ovver 100 recommendations!!"]);
                // placeholders edited        
                document.getElementById("inputPerson").value = "folks";
                document.getElementById("inputKindness").value = "call them and catch up";
                break;
            case 4:
                jQuery("html, body").animate({
                    scrollTop: jQuery(document).height()
                }, 1000);
                /* Move down skip & continue */
                document.getElementById("tourContainer").style.top = "100%";
                setTimeout(function () {
                    /*
                    * Sonny Text
                    */
                    _this.sonnyComponent.sonnyState("intro", 'sonny');
                    jQuery(".sonnyContainer").css({ "position": "fixed", "bottom": "180px" });
                    var bubbleOffset = window.innerWidth - 240;
                    setTimeout(function () {
                        speechBubble.width = bubbleOffset + "px"; // make sonny speech smaller
                    }, 500); // small delay to replace original width
                    // fix to bottom of the screen
                    speechBubble.position = "fixed";
                    speechBubble.top = "auto";
                    speechBubble.bottom = "-10px";
                    // what sonny says
                    var calIcon = "<img src='./img/icons/caly.png' style='height: 25px;border: #473939 solid 0.5px;padding: 5px; vertical-align: bottom;'>";
                    _this.sonnyDialogue.sonnySpeech([
                        "This is the calander view",
                        calIcon + " will help you try and achieve a daily streak of kindness",
                        "He has his own special way of showing affection",
                        "Daily kindnesses are really important so try keep " + calIcon + " happy"
                    ]);
                    // Caly Text
                    setTimeout(function () {
                        document.getElementById("calyGif").style.display = "block";
                        document.getElementById("calyGif").style.opacity = "1";
                        _this.calComponent.calyState("intro");
                        setTimeout(function () {
                            _this.calComponent.calyState("phoneIntro");
                        }, 10000);
                        setTimeout(function () {
                            _this.calComponent.calyState("phoneOutro");
                        }, 20000);
                        var sonnyIcon = "<img src='./img/icons/sonny.svg' style='height: 25px;border: #473939 solid 0.5px;padding: 5px; vertical-align: bottom;'>";
                        _this.calComponent.calSpeech(true, [
                            "Hey.. Who are you?!",
                            "If you don't leave I'm calling the police",
                            "An angrily worded letter is being written right now " + sonnyIcon,
                            "Yeah, I expect a high kindness combo from <b><u>you</b></u> fella..."
                        ]);
                        jQuery(".calView .speechDiv").css({
                            "bottom": "0px" // max remember to revert back
                        });
                        jQuery("#calType").css({
                            "font-size": "25px" // max revert to font-size: 6vw;
                        });
                    }, 1000);
                    //caly Text
                }, 1000);
                // This is the calander view
                // Hey!! Who are you?!
                // calIcon will help you try and achieve a daily streak of kindness 
                // If you don't leave I'm calling the police
                // He has his own special way of showing affection
                // An angry letter regarding your trespassing is being sent right now sonnyIcon
                // Daily kindnesses are really important so try keep calIcon happy
                // Yeah, I expect a high combo from you.
                break;
            case 5:
                /* Move up skip & continue */
                document.getElementById("tourContainer").style.top = "auto";
                // And that's the app! I hope you enjoy using the app daily to create a kinder and more compassionate world...
                jQuery("#typed").html(""); // clear text
                this.calComponent.toKindness();
                jQuery(".sonnyContainer").css({
                    "position": "absolute",
                    "bottom": "auto"
                });
                var bubbleOffset = window.innerWidth - 140;
                speechBubble.width = bubbleOffset + "px";
                speechBubble.position = "absolute";
                speechBubble.top = "75px";
                speechBubble.bottom = "auto";
                this.sonnyComponent.sonnyState("", 'sonny');
                setTimeout(function () {
                    _this.sonnyComponent.sonnyState("intro", 'sonny');
                    _this.sonnyDialogue.sonnySpeech([
                        "And that's the app!",
                        "I hope you enjoy using it daily to create a kinder and more compassionate world...",
                        "Click this icon <img src='./img/icons/sonny.svg' style='height: 20px;border: #473939 solid 0.5px;padding: 5px;vertical-align: bottom;'> if you need my help."
                    ]);
                    var sonnyImg = document.getElementById("sonnyStatic");
                    setTimeout(function () {
                        _this.displayHide();
                        // this.sonnyDialogue.jiggleIcon(); 
                    }, 10000);
                }, 1000);
                break;
        }
    };
    TourComponent = __decorate([
        core_1.Component({
            selector: 'tour-component',
            template: "       \n        <div (click)=\"intTour();\" class=\"themeButton selected\" >\n                    show me the tour again\n        </div>\n    ",
            providers: [sonny_dialogue_component_1.SonnyDialogue, sonny_component_1.SonnyComponent, go_cal_component_1.GoCalComponent, cal_component_1.CalComponent]
        }), 
        __metadata('design:paramtypes', [sonny_dialogue_component_1.SonnyDialogue, sonny_component_1.SonnyComponent, cal_component_1.CalComponent])
    ], TourComponent);
    return TourComponent;
}());
exports.TourComponent = TourComponent;
//# sourceMappingURL=tour.component.js.map