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
var sonny_dialogue_component_1 = require('../sonny.dialogue.component');
var generator_component_1 = require('../generator.component');
var badBroDialogue_directive_1 = require('../badBroDialogue.directive');
var theme_component_1 = require('../theme.component');
var inputNameEmail_component_1 = require('../inputNameEmail.component');
var swiper_component_1 = require('../generator/swiper.component');
var alternateKindnessView_component_1 = require('../alternativeHome/alternateKindnessView.component');
var help_component_1 = require('../generator/help.component');
var edit_component_1 = require('../generator/edit.component');
var data_component_1 = require('./data.component');
var time_service_1 = require('../time.service');
var CompassionFlow = (function () {
    function CompassionFlow(swiperComponent, timeService, sonnyDialogue, inputNameEmail, generatorBackend, badBroDialogue, compassionData, themeComponent, alternativeKindness, helpComponent, editComponent) {
        this.swiperComponent = swiperComponent;
        this.timeService = timeService;
        this.sonnyDialogue = sonnyDialogue;
        this.inputNameEmail = inputNameEmail;
        this.generatorBackend = generatorBackend;
        this.badBroDialogue = badBroDialogue;
        this.compassionData = compassionData;
        this.themeComponent = themeComponent;
        this.alternativeKindness = alternativeKindness;
        this.helpComponent = helpComponent;
        this.editComponent = editComponent;
    }
    /*
    * INT GENERATOR
    * Edit existing #sonnyIcon and .kindnessCal
    * Determine what screen is going based on if day has been done or not
    * Set attr so above buttons work as expected
    * Setup .kindnessTxt and content
    */
    CompassionFlow.prototype.intGenerator = function () {
        var classname;
        this.alternativeKindness.changeSonny(); // change #sonnyIcon
        // var classname, fontSize;
        jQuery('#kindness-generator').attr('active', 'true');
        // set kindness-done to analytics
        jQuery('#sonnyGif').attr('onclick', 'analytics("kindness_generator")').click();
        // edit box
        jQuery('.kindnessCal .menuItem').css('width', '45vw');
        // width screen
        // jQuery('.kindnessCal .menuItem').css('width','10vw');
        // sonny is allowed to be idle
        jQuery('#sonnyStatic').attr('idle', 'true');
        jQuery('.kindnessTxt').show();
        // jQuery('.control').show();
        // swiper font goes white from evil mode 
        jQuery('.sliderComponent ').css('color', 'black');
        classname = '';
        jQuery('.swiper-container h1').html('Please choose a kindness that you can complete today: ');
        jQuery('.swiper-container h2').css('color', '#57a3b0');
        // insert kindnessTxt into swiper
        var data = this.compassionData.data;
        this.swiperComponent.populateData(data);
        // change fonts back
        jQuery('.kindnessCal p').css('font-family', 'kindness');
        jQuery('.kindnessTxt').css({ 'font-family': 'kindness', 'font-size': '7.5vw', 'color': 'black' });
        // change sonny char
        var sonnyImg = document.getElementById("sonnyGif");
        sonnyImg.src = "./img/sonny/idle.gif?t=" + new Date().getTime();
        // sonny introduces the feature    
        jQuery('.sonnyDialogue').attr('generatorMode', 'compassion');
        jQuery('.sonnyDialogue').attr('resetSwiper', 'compassion');
        this.sonnyDialogue.greeting();
        if (jQuery('#doneView').css('display') != 'none') {
            // remove #doneView
            document.getElementById('doneView').className = "";
            document.getElementById('doneView').className += " outro";
            jQuery('#doneView').attr('dayDone', 'true'); // right view when remove
        }
        else {
            // remove #kindness-generator
            document.getElementById('kindnessView').className = "";
            document.getElementById('kindnessView').className += " outro";
            jQuery('#doneView').attr('dayDone', 'false'); // right view when remove
        }
        // bring all the nessecaries
        jQuery('.kindnessContainer,.realStopHelp, .helpMenu').show();
        // bring in #kindnessView
        jQuery('kindness-generator-component').show();
        jQuery('#kindness-generator').css('position', 'inherit');
        document.getElementById('kindness-generator').className = "";
        document.getElementById('kindness-generator').className += " intro " + classname;
        // hide specifics
        jQuery('.editKindness').hide();
        jQuery('.swiper-container h1, .kindnessTxt, .generatorEdit, .kindnessEdit, .editContainer, .realStopHelp').hide();
        // sonny scene
        jQuery('.furniture').fadeOut();
        // change 'see progress' to 'progress'
        if (jQuery(window).width() < 440) {
            jQuery('.goToCal p').html('progress');
        }
        // change font size
        jQuery('.kindnessCal .menuItem p').css({ 'margin': '0px', 'margin-top': '11px', 'font-size': '20px' });
        jQuery('.kindnessCal .menuItem img').attr('src', './img/icons/caly.svg').css({ 'margin-top': '5.5px', 'border': 'black solid 1px', 'border-radius': '200px', 'width': '30px', 'margin-bottom': '7.5px' });
        // sonny click goes to editTask
        jQuery('.prev').show();
        // kindnessTxt vertical & horizontal positison on page
        this.swiperComponent.kindnessDimension();
        this.swiperComponent.enableSlider(data, 'compassion');
        // fix the height of swiper
        jQuery('.sliderComponent').css('top', '30%');
        jQuery('.sliderComponent').css('opacity', '1');
        jQuery('.accept').hide();
        jQuery('.customKindness').hide();
        this.swiperComponent.arrowContainerHeight();
        setTimeout(function () {
            jQuery('.swiper-slide, .arrow, .swiper-container h2, .helpMenu').hide();
            jQuery('.kindnessEdit').show().val("Loading...");
            jQuery('.swiper-container h1').html('One second');
        }, 500);
        setTimeout(function () {
            jQuery('.sliderComponent, .swiper-slide, .arrow, .helpMenu').show();
            jQuery('.swiper-container h1').html('Please choose a kindness that you can complete today: ');
            jQuery('.swiper-container h2').show();
            jQuery('.editMenu .menuItem, .kindnessEdit').hide();
        }, 1000);
        if (navigator.userAgent.match(/iPad/i) != null) {
            var userAgent = navigator.userAgent || navigator.vendor;
            // iOS detection from: http://stackoverflow.com/a/9039885/177710
            if (/iPad|iPhone|iPod/.test(userAgent)) {
                setTimeout(function () {
                    jQuery('.swiper-slide, .arrow, .swiper-container h2, .helpMenu').hide();
                    jQuery('.kindnessEdit').show().val("Loading...");
                    jQuery('.swiper-container h1').html('One second');
                    // jQuery('.editMenu .menuItem').show();
                    // jQuery('.kindnessEdit').attr('editKindness','true'); 
                    ;
                }, 500);
                setTimeout(function () {
                    jQuery('.sliderComponent, .swiper-slide, .arrow, .helpMenu').show();
                    jQuery('.swiper-container h1').html('Please choose a kindness that you can complete today: ');
                    jQuery('.swiper-container h2').show();
                    jQuery('.editMenu .menuItem, .kindnessEdit').hide();
                }, 1000);
            }
        }
    };
    CompassionFlow = __decorate([
        core_1.Component({
            selector: 'compassion-flow-component',
            templateUrl: 'app/generator/kindness-generator.html',
            styleUrls: ['app/generator/kindness-generator.css'],
            directives: [swiper_component_1.SwiperComponent],
            providers: [alternateKindnessView_component_1.AlternativeKindness, swiper_component_1.SwiperComponent, theme_component_1.ThemeComponent, sonny_dialogue_component_1.SonnyDialogue, data_component_1.CompassionData, badBroDialogue_directive_1.BadBroDialogue, inputNameEmail_component_1.inputNameEmail]
        }), 
        __metadata('design:paramtypes', [swiper_component_1.SwiperComponent, time_service_1.TimeService, sonny_dialogue_component_1.SonnyDialogue, inputNameEmail_component_1.inputNameEmail, generator_component_1.GeneratorBackend, badBroDialogue_directive_1.BadBroDialogue, data_component_1.CompassionData, theme_component_1.ThemeComponent, alternateKindnessView_component_1.AlternativeKindness, help_component_1.HelpComponent, edit_component_1.EditComponent])
    ], CompassionFlow);
    return CompassionFlow;
}());
exports.CompassionFlow = CompassionFlow;
//# sourceMappingURL=flow.component.js.map