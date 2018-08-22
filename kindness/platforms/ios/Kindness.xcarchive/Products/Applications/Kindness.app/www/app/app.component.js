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
var sonny_dialogue_component_1 = require('./sonny.dialogue.component');
var submit_kindness_component_1 = require('./submit-kindness.component');
var help_component_1 = require('./help.component');
var cordova_directive_1 = require('./cordova.directive');
var cal_component_1 = require('./cal.component');
var go_cal_component_1 = require('./go.cal.component');
var modal_component_1 = require('./modal.component');
var weather_component_1 = require('./weather.component');
var kindness_service_1 = require('./kindness.service');
var letter_component_1 = require('./letter.component');
var time_service_1 = require('./time.service');
var inputNameEmail_component_1 = require('./inputNameEmail.component');
var settings_component_1 = require('./settings.component');
var help_component_2 = require('./generator/help.component');
var edit_component_1 = require('./generator/edit.component');
var pretentious_component_1 = require('./pretentious.component');
var theme_component_1 = require('./theme.component');
var tour_component_1 = require('./tour.component');
var intro_screens_component_1 = require('./intro-screens.component');
var boat_component_1 = require('./boat.component');
var challenge_component_1 = require('./challenge.component');
var badBroDialogue_directive_1 = require('./badBroDialogue.directive');
var kindness_generator_component_1 = require('./generator/kindness-generator.component');
var generator_component_1 = require('./generator.component');
var sendEmail_directive_1 = require('./sendEmail.directive');
var flow_component_1 = require('./compassion/flow.component');
var data_component_1 = require('./compassion/data.component');
var swiper_component_1 = require('./generator/swiper.component');
var alternateKindnessView_component_1 = require('./alternativeHome/alternateKindnessView.component');
var AppComponent = (function () {
    function AppComponent(renderer, cordova, alternativeKindness, compassionFlow, inputNameEmail, goCalComponent, challengeComponent, sonnyHelp, generatorBackend, settingsComponent, themeComponent, timeService, tourComponent, IntroScreens, submitKindnessComplete, kindnessGenerator, sonnyDialogue, sendEmail) {
        var _this = this;
        this.renderer = renderer;
        this.cordova = cordova;
        this.alternativeKindness = alternativeKindness;
        this.compassionFlow = compassionFlow;
        this.inputNameEmail = inputNameEmail;
        this.goCalComponent = goCalComponent;
        this.challengeComponent = challengeComponent;
        this.sonnyHelp = sonnyHelp;
        this.generatorBackend = generatorBackend;
        this.settingsComponent = settingsComponent;
        this.themeComponent = themeComponent;
        this.timeService = timeService;
        this.tourComponent = tourComponent;
        this.IntroScreens = IntroScreens;
        this.submitKindnessComplete = submitKindnessComplete;
        this.kindnessGenerator = kindnessGenerator;
        this.sonnyDialogue = sonnyDialogue;
        this.sendEmail = sendEmail;
        this.calVisit = 0;
        this.title = "Kindness App";
        renderer.listenGlobal('document', 'pause', function (event) {
            _this.cordova.onResume();
        });
    }
    AppComponent.prototype.ngOnInit = function () {
        this.IntroScreens.intIntro();
        this.IntroScreens.sonnyAnimations();
        jQuery('.kindnessCal .menuItem').attr('goCal', 'true');
        jQuery('#sonnyIcon').attr('settings', 'true');
    };
    /*
    * SONNY (ICON) CLICK
    * On #sonnyIcon:
    * if settings attr true - app.component
      * intSettings() - settings.component
    * else
      * removeGenerator() - kindness-generator.component
    */
    AppComponent.prototype.goToIntention = function () {
        jQuery('.sonnyDialogue').attr('generatorMode', 'true');
        this.kindnessGenerator.intGenerator();
    };
    AppComponent.prototype.sonnyClick = function () {
        var sounds = document.getElementsByTagName('audio');
        for (var i = 0; i < sounds.length; i++)
            sounds[i].pause();
        if (jQuery('#sonnyIcon').attr('settings') == 'true') {
            this.settingsComponent.intSettings();
        }
        else {
            jQuery('.missionView').hide();
            jQuery('.classicView').hide();
            this.kindnessGenerator.removeGenerator();
            if (jQuery('#sonnyStatic').attr('char') == 'sonny') {
                this.sonnyDialogue.greeting();
            }
            this.timeService.backToDone();
            // change #sonnyIcon
            jQuery('#sonnyIcon img').attr('src', './img/icons/more.png');
            jQuery('#sonnyIcon img').css('margin-top', '0px');
            jQuery('#sonnyIcon p').html('more');
            // sonny icon when clicked goes to settings
            jQuery('#sonnyIcon').attr('settings', 'true');
        }
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            templateUrl: 'app/app.component.html',
            styleUrls: ['app/app.component.css'],
            directives: [
                inputNameEmail_component_1.inputNameEmail,
                settings_component_1.SettingsComponent,
                letter_component_1.LetterComponent,
                boat_component_1.BoatComponent,
                intro_screens_component_1.IntroScreens,
                help_component_1.SonnyHelp,
                swiper_component_1.SwiperComponent,
                submit_kindness_component_1.SubmitKindnessComplete,
                sonny_dialogue_component_1.SonnyDialogue,
                sonny_component_1.SonnyComponent,
                kindness_generator_component_1.KindnessGenerator,
                modal_component_1.ModalComponent,
                flow_component_1.CompassionFlow,
                cal_component_1.CalComponent,
                go_cal_component_1.GoCalComponent,
                generator_component_1.GeneratorBackend,
                // AlternativeKindness,
                weather_component_1.WeatherComponent
            ],
            providers: [
                help_component_2.HelpComponent,
                modal_component_1.ModalComponent,
                submit_kindness_component_1.SubmitKindnessComplete,
                cordova_directive_1.Cordova,
                alternateKindnessView_component_1.AlternativeKindness,
                data_component_1.CompassionData,
                letter_component_1.LetterComponent,
                sendEmail_directive_1.SendEmail,
                swiper_component_1.SwiperComponent,
                inputNameEmail_component_1.inputNameEmail,
                badBroDialogue_directive_1.BadBroDialogue,
                kindness_generator_component_1.KindnessGenerator,
                settings_component_1.SettingsComponent,
                challenge_component_1.ChallengeComponent,
                time_service_1.TimeService,
                intro_screens_component_1.IntroScreens,
                boat_component_1.BoatComponent,
                kindness_service_1.KindnessService,
                theme_component_1.ThemeComponent,
                pretentious_component_1.PretentiousComponent,
                sonny_component_1.SonnyComponent,
                go_cal_component_1.GoCalComponent,
                help_component_1.SonnyHelp,
                sonny_dialogue_component_1.SonnyDialogue,
                weather_component_1.WeatherComponent,
                generator_component_1.GeneratorBackend,
                cal_component_1.CalComponent,
                tour_component_1.TourComponent,
                flow_component_1.CompassionFlow,
                edit_component_1.EditComponent
            ]
        }), 
        __metadata('design:paramtypes', [core_1.Renderer, cordova_directive_1.Cordova, alternateKindnessView_component_1.AlternativeKindness, flow_component_1.CompassionFlow, inputNameEmail_component_1.inputNameEmail, go_cal_component_1.GoCalComponent, challenge_component_1.ChallengeComponent, help_component_1.SonnyHelp, generator_component_1.GeneratorBackend, settings_component_1.SettingsComponent, theme_component_1.ThemeComponent, time_service_1.TimeService, tour_component_1.TourComponent, intro_screens_component_1.IntroScreens, submit_kindness_component_1.SubmitKindnessComplete, kindness_generator_component_1.KindnessGenerator, sonny_dialogue_component_1.SonnyDialogue, sendEmail_directive_1.SendEmail])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
/**
 * Determine the mobile operating system.
 * This function returns one of 'iOS', 'Android', 'Windows Phone', or 'unknown'.
 *
 * @returns {String}
 */
// function getMobileOperatingSystem() {
//   var userAgent = navigator.userAgent || navigator.vendor;
//       // Windows Phone must come first because its UA also contains "Android"
//     if (/windows phone/i.test(userAgent)) {
//         return "Windows Phone";
//     }
//     if (/android/i.test(userAgent)) {
//         return "Android";
//     }
//     if( /iPhone|iPad|iPod/i.test(navigator.userAgent) ) {
//       // run your code here
//       return "iOS";
//     }
//     return "unknown";
// }
//# sourceMappingURL=app.component.js.map