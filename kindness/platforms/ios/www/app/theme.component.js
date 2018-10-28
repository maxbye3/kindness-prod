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
var pretentious_component_1 = require('./pretentious.component');
var sonny_component_1 = require('./sonny.component');
var sonny_dialogue_component_1 = require('./sonny.dialogue.component');
var challenge_component_1 = require('./challenge.component');
var boat_component_1 = require('./boat.component');
var time_service_1 = require('./time.service');
var generator_component_1 = require('./generator.component');
var ThemeComponent = (function () {
    function ThemeComponent(pretentiousComponent, generatorBackend, sonnyComponent, sonnyDialogue, timeService, challengeComponent, boatComponent) {
        this.pretentiousComponent = pretentiousComponent;
        this.generatorBackend = generatorBackend;
        this.sonnyComponent = sonnyComponent;
        this.sonnyDialogue = sonnyDialogue;
        this.timeService = timeService;
        this.challengeComponent = challengeComponent;
        this.boatComponent = boatComponent;
        this.showStyle = false;
    }
    /*
    * RESET SONNY
    * Totally reset either sonny or Bad Bro
    */
    ThemeComponent.prototype.resetSonny = function () {
        if (this.sonnyComponent.sonnyPresent == false) {
            // reset Bad Bro
            jQuery(".sonnyContainer").attr("outroAllowed", 'false');
            this.pretentiousComponent.intBad('greet');
        }
        else {
        }
    };
    ThemeComponent.prototype.setTheme = function (theme) {
        jQuery('kindness-generator-component').hide();
        jQuery('#sonnyIcon').css("right", "0px"); // slide sonnyIcon in
        var introNecessary = localStorage.getItem("compassionChallenge"); // if undefined then do screens       
        if (introNecessary != null) {
            if (theme == "pretentious") {
                this.removeAllThemesBar(theme);
                var is_iPad = navigator.userAgent.match(/iPad/i) != null;
                if (is_iPad) {
                    jQuery('.sonnyChar').css('top', '60px');
                }
                this.pretentiousComponent.intScene();
                jQuery('.birdContainer').show();
            }
            else {
                this.seasonTheme(theme);
                jQuery('.birdContainer').hide();
            }
        }
        this.generatorBackend.checkIntention(); // find if intention has been done     
    };
    /*
    * SUMMER SCENE
    * Set all generator parameters to false
    * Launch Sonny
    * Setup parameters for winter or summer
    */
    ThemeComponent.prototype.seasonTheme = function (theme) {
        jQuery(".skipContainer").attr('theme', theme);
        // hide so nothing shown & set all generator parameters to false
        jQuery('kindness-generator-component, compassion-flow-component').hide();
        jQuery(".settingsMenuItem img").attr('src', './img/icons/sonny.png');
        jQuery('.narcissimTxt').html('Tired of being nice?');
        var is_iPad = navigator.userAgent.match(/iPad/i) != null;
        if (is_iPad) {
            jQuery('.sonnyChar').css('top', '50px');
        }
        this.sonnyComponent.sonnyPresent = true;
        jQuery('.summerShip').show();
        jQuery('.pretentiousShip').hide();
        jQuery('.callChar p .icon img').attr('src', './img/icons/more-skinny.png');
        //remove badBro
        jQuery("badBroStatic").hide();
        clearInterval(this.sonnyComponent.idleAnimation); // idle animations        
        jQuery('#sonnyGif,#sonnyStatic').show().attr('char', 'sonny'); // idle animations
        // launch Sonny
        this.sonnyComponent.sonnyState("intro", "sonny");
        this.sonnyDialogue.greeting();
        jQuery(".sonnyDialogue").show();
        jQuery(".badBroDialogue").hide();
        // hide pretentious stuff
        jQuery(".preventThorns,.preventThornsGrad,.calBg,.badBroDialogue").hide();
        this.removeAllThemesBar(theme);
        this.pretentiousComponent.removeScene();
        this.theme = theme;
        this.selectedBackground = theme;
        //document.getElementById("themeSelected").innerHTML = theme;
        this.furnitureImg = './img/scenes/' + theme + '.gif?t=' + new Date().getTime();
        jQuery('.furniture').attr('src', './img/scenes/summer.gif?t=' + +new Date().getTime());
        if (theme == "summer") {
            this.boatComponent.moveBoat('summer');
            document.getElementById("birdContainer").style.display = "block";
            document.getElementById("boatContainer").style.display = "block";
            document.getElementById("winterHouse").style.display = "none";
            document.getElementById("snowContainer1").style.display = "none";
            document.getElementById("snowContainer2").style.display = "none";
            jQuery("#themeSelected").html('summer');
        }
        else if (theme == "winter") {
            this.boatComponent.moveBoat('winter');
            document.getElementById("birdContainer").style.display = "none";
            document.getElementById("boatContainer").style.display = "none";
            document.getElementById("winterHouse").style.display = "block";
            document.getElementById("snowContainer1").style.display = "block";
            document.getElementById("snowContainer2").style.display = "block";
            jQuery("#themeSelected").html('winter');
        }
        this.challengeComponent.intCompassion();
    };
    /*
    * SONNY COMMENT
    * Sonny comments on theme change
    */
    ThemeComponent.prototype.sonnyComment = function () {
        jQuery("#sonnyGif").attr('animating', 'true');
        var badBro = "<img src='./img/icons/badBro.png' style='height: 25px;border: #473939 solid 0.5px;padding: 5px;'>";
        this.sonnyDialogue.sonnySpeech(["Change theme by clicking on one below", "Pretentious theme will bring up " + badBro]);
        jQuery(".sonnyContainer").attr("outroAllowed", "false");
    };
    /*
     * Changing the theme
     */
    ThemeComponent.prototype.changeTheme = function () {
        return this.theme;
    };
    /*
    * GO BACK
    * Go back to main screen
    */
    ThemeComponent.prototype.back = function () {
        // show everything
        jQuery('kindness-generator-component, #kindness-generator, #doneView').css('opacity', '1');
        setTimeout(function () {
            jQuery('kindness-generator-component, #kindness-generator, #doneView').css('opacity', '1');
            if (jQuery('.sliderComponent').css('display') === 'block') {
                jQuery('#kindnessView').hide();
            }
        }, 500);
        jQuery('kindness-generator-component').show();
        document.getElementById('themeChange').className = "";
        document.getElementById('themeChange').className += " outro";
        if (jQuery('#kindnessView').css('display') == 'none') {
            var classname = 'doneView';
        }
        else if (jQuery('#doneView').css('display') == 'none') {
            classname = 'kindnessView';
        }
        this.timeService.dayCheck(classname);
    };
    ThemeComponent.prototype.selectButton = function (theme) {
        this.selectedBackground = theme;
        jQuery('.sonnyDialogue').attr('theme', theme);
        this.setTheme(this.selectedBackground);
        return 'rgba(0,0,0,0.05)';
    };
    // theme change (end)
    ThemeComponent.prototype.removeAllThemesBar = function (theme) {
        // max add spring and autumn when they are made
        jQuery(".theme").removeClass("winter pretentious summer");
        jQuery(".theme").addClass(theme);
    };
    ThemeComponent = __decorate([
        core_1.Directive({
            selector: 'theme-component',
            providers: [generator_component_1.GeneratorBackend, boat_component_1.BoatComponent, challenge_component_1.ChallengeComponent, pretentious_component_1.PretentiousComponent, sonny_component_1.SonnyComponent, sonny_dialogue_component_1.SonnyDialogue, time_service_1.TimeService]
        }), 
        __metadata('design:paramtypes', [pretentious_component_1.PretentiousComponent, generator_component_1.GeneratorBackend, sonny_component_1.SonnyComponent, sonny_dialogue_component_1.SonnyDialogue, time_service_1.TimeService, challenge_component_1.ChallengeComponent, boat_component_1.BoatComponent])
    ], ThemeComponent);
    return ThemeComponent;
}());
exports.ThemeComponent = ThemeComponent;
//# sourceMappingURL=theme.component.js.map