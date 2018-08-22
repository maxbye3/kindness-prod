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
var sonny_component_1 = require('./sonny.component');
var pretentious_component_1 = require('./pretentious.component');
var sonny_dialogue_component_1 = require('./sonny.dialogue.component');
var tour_component_1 = require('./tour.component');
var theme_component_1 = require('./theme.component');
var time_service_1 = require('./time.service');
var SonnyHelp = (function () {
    function SonnyHelp(timeService, themeComponent, sonnyDialogue, sonnyComponent, pretentiousComponent) {
        this.timeService = timeService;
        this.themeComponent = themeComponent;
        this.sonnyDialogue = sonnyDialogue;
        this.sonnyComponent = sonnyComponent;
        this.pretentiousComponent = pretentiousComponent;
        this.sonnyDialogue = sonnyDialogue;
        this.sonnyComponent = sonnyComponent;
    }
    SonnyHelp.prototype.ngOnInit = function () {
        //calculate the number of hours left
        this.hoursLeft = this.calculateHoursLeft();
    };
    /*
   * OUTRO/INTRO TRANSITION
   * Add outro animation to different parameters
   * If going into helpView then disable call button
   * If #themeChange present then remove
   * clearout any timeout from last view
   * There seems to be some sort of check later for jQuery("#doneView") so let's hide it if screen2
   */
    SonnyHelp.prototype.transitionViews = function (screen1, screen2) {
        jQuery(".sonnyContainer").attr("destroyBubble", "false");
        if (screen2 == "helpView") {
            jQuery('#sonnyIcon').css("right", "-100px"); // get out of here
        }
        else {
            jQuery('#sonnyIcon').css("right", "0px");
        }
        // exit screen 1
        document.getElementById(screen1).className = "";
        document.getElementById(screen1).className += " outro";
        // enter screen 2
        document.getElementById(screen2).className = "";
        document.getElementById(screen2).className += " intro";
        // check for doneView
        if (screen1 == "doneView") {
            jQuery("#doneView").hide();
        }
    };
    /*
    * Int Help View
    * Check if BadBro present and deal some damage if he is.
    * Otherwose, change the views from kindness / finished to help
    */
    SonnyHelp.prototype.helpView = function () {
        // is badBro present
        if (this.sonnyComponent.sonnyPresent == false) {
            this.pretentiousComponent.intBad('help');
            jQuery('#sonnyIcon').hide();
        }
        else {
            this.sonnyDialogue.introSonny('help');
        }
        this.transitionToHelp();
    };
    /*
    * Transition to help
    * If regular screen then translate regular screen to help
    * If theme change then remove theme
    */
    SonnyHelp.prototype.transitionToHelp = function () {
        if (jQuery('#themeChange').css('display') != 'none') {
            // exit screen 1
            document.getElementById('themeChange').className = "";
            document.getElementById('themeChange').className += " outro";
        }
        //if done screen detected then transition from tht screen otherwise
        var victoryTrue = jQuery("#doneView").css("display");
        if (victoryTrue != "none") {
            // transition from done view to helpView
            this.transitionViews('doneView', 'helpView');
        }
        else {
            // transition from kindness view to help view
            this.transitionViews('kindnessView', 'helpView');
        }
    };
    /*
    * Calculate the hourse left
    */
    SonnyHelp.prototype.calculateHoursLeft = function () {
        var d = new Date();
        var n = d.getHours();
        var hoursLeft = 24 - n;
        return hoursLeft;
    };
    /*
    * BACK TO KINDNESS VIEW
    * Check if badBro or sonny
    * Out you go
    */
    SonnyHelp.prototype.goBack = function (page) {
        this.timeService.dayCheck('kindnessView');
        if (this.sonnyComponent.sonnyPresent == false) {
            this.pretentiousComponent.goBack();
        }
        else {
            this.sonnyDialogue.sonnySpeech(["Click <img src='./img/icons/sonny.svg' style='height: 20px; border: #473939 solid 0.5px;padding: 5px;vertical-align: bottom;'> if you need anything else!!"]);
        }
        setTimeout(function () {
            jQuery(".sonnyContainer").attr("outroAllowed", "true");
        }, 3500);
        if (page == "help")
            this.transitionViews("helpView", "kindnessView");
        else
            this.transitionViews("contactView", "kindnessView");
    };
    /*
    * EXAMPLE KINDNESS
    */
    SonnyHelp.prototype.giveExample = function () {
        document.getElementById("typed").innerHTML = "okay.. let me think..";
        // console.log("provide kidness example");
        this.transitionViews("helpView", "kindnessView");
        // sony asks if this okay
        this.sonnyDialogue.sonnySpeech(["Here's something you could do.. Feel free to edit the act if it's not quite right.."]);
        // placeholders edited        
        document.getElementById("inputPerson").value = "folks";
        document.getElementById("inputKindness").value = "call them and catch up";
    };
    /*
     * CONTACT ME
     */
    SonnyHelp.prototype.contactme = function () {
        document.getElementById("typed").innerHTML = "Great! Let me just find the forms..";
        this.transitionViews("helpView", "contactView");
        // sony contact disclaimer
        this.sonnyDialogue.sonnySpeech(["Using the fields below you can contact the developer directly, who thinks he's a being from the moon.",
            "I know.. It's a bit strange. I think it's some psychological miswiring. Luckily, we're working through it.",
            "Seriously though, thanks for taking the time.", "All feedback is used to improve the app."]);
    };
    /*
    * WHAT ON EARTH WHY IS THIS EVEN HERE?!
    */
    SonnyHelp.prototype.launchBirds = function () {
    };
    SonnyHelp = __decorate([
        core_1.Component({
            selector: 'sonny-help',
            template: "",
            styleUrls: ["app/sonny.dialogue.component.css"],
            directives: [tour_component_1.TourComponent, sonny_dialogue_component_1.SonnyDialogue],
            providers: [time_service_1.TimeService, theme_component_1.ThemeComponent, sonny_component_1.SonnyComponent, pretentious_component_1.PretentiousComponent, sonny_dialogue_component_1.SonnyDialogue]
        }),
        core_1.Injectable(), 
        __metadata('design:paramtypes', [time_service_1.TimeService, theme_component_1.ThemeComponent, sonny_dialogue_component_1.SonnyDialogue, sonny_component_1.SonnyComponent, pretentious_component_1.PretentiousComponent])
    ], SonnyHelp);
    return SonnyHelp;
}());
exports.SonnyHelp = SonnyHelp;
//# sourceMappingURL=help.component.js.map