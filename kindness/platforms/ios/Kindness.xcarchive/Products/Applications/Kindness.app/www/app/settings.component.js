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
var core_2 = require('@angular/core');
var sonny_dialogue_component_1 = require('./sonny.dialogue.component');
var modal_component_1 = require('./modal.component');
var pretentious_component_1 = require('./pretentious.component');
var help_component_1 = require('./help.component');
var theme_component_1 = require('./theme.component');
var challenge_component_1 = require('./challenge.component');
var kindness_generator_component_1 = require('./generator/kindness-generator.component');
var generator_component_1 = require('./generator.component');
var sendEmail_directive_1 = require('./sendEmail.directive');
var badBroDialogue_directive_1 = require('./badBroDialogue.directive');
var inputNameEmail_component_1 = require('./inputNameEmail.component');
var kindness_service_1 = require('./kindness.service');
var flow_component_1 = require('./compassion/flow.component');
var time_service_1 = require('./time.service');
var alternateKindnessView_component_1 = require('./alternativeHome/alternateKindnessView.component');
var SettingsComponent = (function () {
    function SettingsComponent(timeService, modalComponent, compassionFlow, kindnessService, sonnyDialogue, badBroDialogue, inputNameEmail, kindnessGenerator, sonnyHelp, alternativeKindness, themeComponent, challengeComponent, pretentiousComponent, generatorBackend, sendEmail) {
        this.timeService = timeService;
        this.modalComponent = modalComponent;
        this.compassionFlow = compassionFlow;
        this.kindnessService = kindnessService;
        this.sonnyDialogue = sonnyDialogue;
        this.badBroDialogue = badBroDialogue;
        this.inputNameEmail = inputNameEmail;
        this.kindnessGenerator = kindnessGenerator;
        this.sonnyHelp = sonnyHelp;
        this.alternativeKindness = alternativeKindness;
        this.themeComponent = themeComponent;
        this.challengeComponent = challengeComponent;
        this.pretentiousComponent = pretentiousComponent;
        this.generatorBackend = generatorBackend;
        this.sendEmail = sendEmail;
        this.communityLink = "https://partner.plumis.com/login.php";
    }
    SettingsComponent.prototype.ngOnInit = function () {
        this.isPretentious();
    };
    /*
    * LAUNCH COMPASSION FLOW
    * Disable settings
    * If badBro then reset to summer
    * Launch compassion flow
    */
    SettingsComponent.prototype.intFlow = function () {
        this.back();
        if (jQuery('#sonnyStatic').attr('char') == 'badBro') {
            this.themeComponent.setTheme('summer');
            // always start as nice guy
            jQuery('.narcissimTxt').html('Tired of being nice?');
            jQuery(".settingsMenuItem img").attr('src', './img/icons/sonny.png');
            jQuery(".kindnessCal").show();
            jQuery('.speechDiv').show();
            jQuery(".square-radio").removeClass("square-radio--clicked");
            // change #sonnyIcon
            jQuery('#sonnyIcon img').attr('src', './img/icons/more.png');
            jQuery('#sonnyIcon img').css('margin-top', '0px');
            jQuery('#sonnyIcon p').html('more');
        }
        jQuery('.sonnyDialogue').attr('generatorMode', 'true');
        this.compassionFlow.intGenerator();
    };
    /*
    * IS PRETENTIOUS(?)
    * MAX: CHECK
    * Remove square radio if is
    */
    SettingsComponent.prototype.isPretentious = function () {
        jQuery(".square-radio").removeClass("square-radio--clicked");
    };
    /*
    * INT OR REMOVE NARCISSISM
    * UI Change
    * Determine on click whether to remove or int pretentious
    * Launch or remove pretentious actions (without sliding back)
    */
    SettingsComponent.prototype.togglePretentiousMode = function () {
        // if(this.kindnessService.loadData() < 5){
        //   this.modalComponent.intModal('You must complete 5 kindness in 5 days to unlock', "Won't be shown", 'Go Back', false);
        // }
        // else{
        jQuery(".square-radio").toggleClass("square-radio--clicked");
        jQuery('.compassionSelect').hide();
        var pretentiousTrue = jQuery(".square-radio--clicked").css("display");
        if (pretentiousTrue) {
            // turn pretentious mode on                 
            jQuery(".skipContainer").attr('theme', 'pretentious');
            jQuery('#sonnyGif').attr('char', 'badBro');
            this.themeComponent.setTheme("pretentious");
            jQuery('.sonnyContainer').attr('introallowed', 'true');
        }
        else {
            this.pretentiousComponent.removeScene();
            this.themeComponent.setTheme("summer");
            this.alternativeKindness.backToKindness();
        }
        this.returnHome();
        this.back();
        this.timeService.backToDone();
        //  }
    }; /* int / remove narcissism */
    /*
    * INITIALISE SETTINGS
    * If #sonnyIcon settings attr true - app.component
    * Hide sonnyIcon
    * Turn on opacity on more
    * Launch settings css animation
    */
    SettingsComponent.prototype.intSettings = function () {
        jQuery('.goToCal,.orTxt, .intentionTask, .completeContainer').show();
        // remove the btns
        this.generatorBackend.checkIntention();
        // stop bad bro dialogue
        if (jQuery(".sonnyContainer").attr("outroAllowed") == 'true') {
            this.badBroDialogue.dialogue('exit', ['']);
        }
        jQuery('.sonnyDialogue').fadeOut();
        setTimeout(function () {
            jQuery('#settingsH1').css({ 'border': 'solid rgba(256,256,256,1) 2px' });
        }, 500);
        jQuery('#sonnyIcon').hide();
        jQuery(".settings").show().css("animation", "settingsIntro 1s");
    };
    /*
     * INT CHALLENGE
     * Set to 0
     * load compassion elements
     */
    SettingsComponent.prototype.intCompassion = function () {
        var compassionNum = localStorage.getItem("compassionChallenge");
        if (compassionNum == null || compassionNum == "null" || compassionNum == "no") {
            this.challengeComponent.startCompassion();
        }
        else {
            // cancel compassion challenge
            // Ask user if they really want to stop with alert
            this.modalComponent.intModal('Are You Sure? <br> None of your data will be lost but your challenge will restart to day one...', "I'm sure", 'Changed my mind', true);
        }
        // this.back(); 
        this.sonnyDialogue.greeting();
        this.timeService.backToDone();
    };
    /*
    * GO TO INTENTION
    * Remove the settings menu
    * Go to Intention Screen
    */
    SettingsComponent.prototype.goToIntention = function () {
        this.back();
        jQuery('.sonnyDialogue').attr('generatorMode', 'true');
        this.kindnessGenerator.intGenerator();
    };
    /*
    * Cancel intention
    * Go back
    * Turn localStorage.getItem('intention') to false
    * CheckIntention()
    */
    SettingsComponent.prototype.cancelIntention = function () {
        localStorage.setItem('intention', 'false');
        this.generatorBackend.checkIntention();
        // go to intention
        jQuery('#doneView').hide();
        this.kindnessGenerator.intGenerator();
        jQuery("#kindnessView").hide();
        this.back();
    };
    SettingsComponent.prototype.goCommunity = function () {
        location.href = this.communityLink;
    };
    /*
    * Return Home
    * Go backa  page
    * Get badBro or Sonny to say something
    */
    SettingsComponent.prototype.returnHome = function () {
        this.back();
        if (jQuery('#sonnyGif').attr('char') == 'badBro') {
            // launch bad bro dialogue
            this.pretentiousComponent.intBad('greet');
            if (jQuery('#kindnessView').attr('kindnessComplete') != 'true') {
                document.getElementById("kindnessView").className = "";
                document.getElementById("kindnessView").className += " intro";
                jQuery('#kindnessView').show();
            }
            jQuery('.missionView, .completeContainer').hide();
            jQuery('.intentionTask').css('width', 'auto');
            jQuery('.classicView').show();
        }
        else {
            jQuery('.completeContainer').show();
            jQuery('.intentionTask').css('width', '75%');
            this.sonnyDialogue.greeting();
        }
    };
    SettingsComponent.prototype.themeView = function () {
        if (jQuery('#sonnyGif').attr('char') == 'badBro') {
            this.pretentiousComponent.changeTheme();
        }
        else {
            this.themeComponent.sonnyComment();
        }
        if (jQuery("#settingsView").css('display') != 'none') {
            this.returnHome();
        }
        document.getElementById("themeChange").style.display = "block";
        this.sonnyHelp.transitionViews("helpView", "themeChange");
    };
    /*
    * GO BACK
    * Hide settings
    * Launch Sonny but not in generator mode
    */
    SettingsComponent.prototype.back = function () {
        jQuery('#sonnyIcon').show();
        jQuery(".settings").show().css("animation", "settingsOutro 1s");
        setTimeout(function () {
            jQuery(".settings").hide();
        }, 500);
    };
    SettingsComponent.prototype.goMoonhead = function () {
        var URL = "http://thekindnessapp.com";
        window.open(URL, "_blank");
    };
    /*
    * Setting up dialogue for different forms
    */
    SettingsComponent.prototype.questionTime = function (type) {
        document.getElementById("settingsView").style.display = "none";
        document.getElementById("mrMoonhead").style.display = "block";
        jQuery("textarea").html(""); // remove the message in text area
        var placeholder, blurb;
        if (type == 'bug') {
            placeholder = 'Write the bugs you want busted...';
            blurb = "A bug in the app you say?! Well, no app is perfect. <br> However, you are helping to make this app better for everyone who uses it. <br> Write the issue below and I'll squash it asap.";
            this.settings = "bug";
        }
        else if (type == 'comment') {
            placeholder = 'Let go of all your words here...';
            blurb = "You got something you say!?<br> (All thoughts are appreciated, <br> thanks for taking the time!!) ";
            this.settings = "comment";
        }
        else if (type == 'question') {
            placeholder = 'Type all your personal questions here...';
            blurb = "If you have any questions, I'm all ears! <br> Write your question below.";
            this.settings = "question";
        }
        else if (type == 'suggestion') {
            placeholder = 'Type in your name and kindness suggestion here...';
            blurb = "You want to add a kindness for other people? <br> Nice one! I had a real struggle coming up with 100 ideas so your help is totally appreciated. Here's the thing: suggestion should be as free (as possible) & accessible to everyone. Include your name so I can give credit!";
            this.settings = "suggestion";
        }
        jQuery("textarea").attr("placeholder", placeholder);
        jQuery(".blurb").html(blurb);
    };
    /*
    * SUBMIT (YOUR MESSAGE)
    * Message is sent to sendEmail service
    * Thank the user
    */
    SettingsComponent.prototype.submit = function () {
        if (jQuery("textarea").val() == "") {
            return;
        }
        this.sendEmail.send(this.settings, jQuery("textarea").val());
        jQuery(".blurb").html("Message sent. Thanks!");
        jQuery("textarea").val('');
        this.moonhead_back();
    };
    SettingsComponent.prototype.moonhead_back = function () {
        document.getElementById("settingsView").style.display = "block";
        document.getElementById("mrMoonhead").style.display = "none";
        jQuery("textarea").val('');
    };
    /*
    * STYLE THE INPUTS
    */
    SettingsComponent.prototype.inputStyle = function (input) {
        input.margin = "0px";
        input.fontSize = "30px";
        input.background = "rgba(256,256,256,0.7)";
        input.padding = "5px";
        input.marginBottom = "30px";
        input.width = "100%";
        input.border = "none";
    };
    SettingsComponent = __decorate([
        core_1.Component({
            selector: 'settings-component',
            templateUrl: 'app/settings.component.html',
            styleUrls: ['app/settings.component.css'],
            providers: [modal_component_1.ModalComponent, alternateKindnessView_component_1.AlternativeKindness, flow_component_1.CompassionFlow, kindness_service_1.KindnessService, inputNameEmail_component_1.inputNameEmail, badBroDialogue_directive_1.BadBroDialogue, generator_component_1.GeneratorBackend, kindness_generator_component_1.KindnessGenerator, challenge_component_1.ChallengeComponent, sonny_dialogue_component_1.SonnyDialogue, help_component_1.SonnyHelp, pretentious_component_1.PretentiousComponent, theme_component_1.ThemeComponent, sendEmail_directive_1.SendEmail]
        }),
        core_2.Injectable(), 
        __metadata('design:paramtypes', [time_service_1.TimeService, modal_component_1.ModalComponent, flow_component_1.CompassionFlow, kindness_service_1.KindnessService, sonny_dialogue_component_1.SonnyDialogue, badBroDialogue_directive_1.BadBroDialogue, inputNameEmail_component_1.inputNameEmail, kindness_generator_component_1.KindnessGenerator, help_component_1.SonnyHelp, alternateKindnessView_component_1.AlternativeKindness, theme_component_1.ThemeComponent, challenge_component_1.ChallengeComponent, pretentious_component_1.PretentiousComponent, generator_component_1.GeneratorBackend, sendEmail_directive_1.SendEmail])
    ], SettingsComponent);
    return SettingsComponent;
}());
exports.SettingsComponent = SettingsComponent;
//# sourceMappingURL=settings.component.js.map