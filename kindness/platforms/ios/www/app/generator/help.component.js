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
var generator_component_1 = require('../generator.component');
var swiper_component_1 = require('../generator/swiper.component');
var HelpComponent = (function () {
    function HelpComponent(swiperComponent, generatorBackend) {
        this.swiperComponent = swiperComponent;
        this.generatorBackend = generatorBackend;
    }
    /*
    * Deliver Task
    * Put HTML into .kindnessTxt all typed out
    */
    HelpComponent.prototype.typedContent = function (phraseArray) {
        jQuery('.kindnessTxt').attr('txt', phraseArray);
        var ctx = this;
        if (phraseArray[0] == "The Italian tradition of caffè sospeso or pending coffee. You pay for two cups, one for you and one in advance as an anonymous act of charity for someone who can't afford it.") {
            jQuery('.prev .arrow').hide();
        }
        else {
            jQuery('.prev .arrow').show();
        }
    };
    /*
    * HELP
    * Changes .kindnessTxt to display help
    * On .kindnessTxt change attr help to INT stage (to be caught by control())
    * @param - INT stage - what stage of help are we on
    * @param - STRING prevNext - whether user has prev or next in stage 2
    */
    HelpComponent.prototype.help = function (stage, prevNext) {
        // change arrow style
        jQuery('.arrow').css({ 'font-weight': 'bold', 'color': 'red', 'top': '40%' });
        // change accept 
        var imgHeight = jQuery('.accept').height();
        jQuery('.accept p').html('<img width="' + imgHeight + 'px" src="./img/icons/return.svg"> stop help');
        //  this.intGenerator();         
        if (jQuery('#sonnyGif').attr('char') == 'badBro') {
            jQuery('.kindnessTxt').css({ 'color': 'white' });
        }
        else {
            jQuery('.kindnessTxt').css({ 'font-family': 'kindness', 'color': 'black' });
        }
        jQuery('.handLeft,.handRight').show();
        jQuery('.kindnessTxt').css('font-family', 'kindness');
        jQuery('.kindnessEdit').attr('editKindness', 'false');
        if (stage == 1) {
            this.typedContent(['<b><i>HELP 1/3</b></i><br> Welcome!! <br> Kindness ideas are displayed in this area... <br> Click left or right to continue.']);
        }
        else if (stage == 2) {
            this.typedContent(['<b><i>HELP 2/3</b></i><br> Great!! <br> This is how you go to ' + prevNext + ' kindness. <br> Click left or right to continue.']);
        }
        else if (stage == 3) {
            var acceptSuggestion = 'accept', editIcon = '<div class="menuItem" style="float: left; margin-right: -50px;">\
               <a><img src="./img/icons/edit.png" style="filter: invert(100%);">\
               <p>edit</p>\
               </a>\
               </div>', inputEdit = '<textarea style="width: 50vw; text-align: left; float: right;margin-top: 10px; font-family: kindness; font-size: 5vw; margin-left: 25px;">to edit a suggestion to your liking </textarea>';
            this.typedContent(['<b><i>HELP 3/3</b></i><br> Click ' + acceptSuggestion + ' to take on a suggestion or click ' + editIcon + ' ' + inputEdit]);
        }
        else {
            this.stopHelp();
            jQuery('.handLeft, .handRight').hide();
            return;
        }
        jQuery(".kindnessTxt").attr('help', stage);
        // kindnessTxt vertical & horizontal positison on page
        this.swiperComponent.kindnessDimension();
        jQuery('.realStopHelp').show();
        // change .kindnessCal
        jQuery('.helpMenu').hide();
        jQuery('.customKindness').fadeOut();
        // make control bits visible
        // jQuery('.control').css('background', 'rgba(0,0,0,0.1)');
        var currentKindness = jQuery('.swiper-slide-active').html();
        jQuery('.swiper-slide-active').attr('temp', currentKindness);
        if (jQuery('.sonnyDialogue').attr('generatorMode') == 'compassion') {
            jQuery('.swiper-slide-active').html('Compassion exercises will appear here. Slide left or right with your finger or click \'scroll for next\' to see more.');
        }
        else {
            jQuery('.swiper-slide-active').html('Kindness suggestions will appear here. Slide left or right with your finger or click \'scroll for next\' to see more.');
        }
    };
    /*
    * STOP HELP
    * Change the attr on .kindnessTxt to 'false'
    * Bring back kindness ideas
    * Change .stopHelp back too helpMenu
    */
    HelpComponent.prototype.stopHelp = function () {
        jQuery('.helpMenu p').html('help');
        jQuery('.accept p').html('accept');
        // change back arrow style
        jQuery('.arrow').css({ 'font-weight': 'auto', 'color': 'black', 'top': '50%' });
        if (jQuery('#sonnyGif').attr('char') == 'badBro') {
            jQuery('.kindnessTxt').css({ 'font-family': 'evil', 'color': 'white' });
        }
        else {
            jQuery('.kindnessTxt').css({ 'font-family': 'kindness', 'color': 'black' });
        }
        jQuery(".kindnessTxt").attr('help', 'false');
        jQuery('.kindnessEdit').attr('editKindness', 'false');
        jQuery('.realStopHelp').hide();
        //  jQuery('.control').css('background', 'rgba(0,0,0,0)');
        jQuery(".kindnessTxt").attr('help') != "false";
        jQuery('.handLeft, .handRight').hide();
        jQuery('.helpMenu').show();
        var phraseArray = this.generatorBackend.deliverTask('int');
        // continue with generator      
        this.typedContent(phraseArray);
        // kindnessTxt vertical & horizontal positison on page
        this.swiperComponent.kindnessDimension();
        var currentKindness = jQuery('.swiper-slide-active').attr('temp');
        jQuery('.swiper-slide-active').html(currentKindness);
        if (jQuery('.sonnyDialogue').attr('generatorMode') != 'compassion') {
            jQuery('.customKindness').fadeIn();
        }
    };
    HelpComponent = __decorate([
        core_1.Directive({}), 
        __metadata('design:paramtypes', [swiper_component_1.SwiperComponent, generator_component_1.GeneratorBackend])
    ], HelpComponent);
    return HelpComponent;
}());
exports.HelpComponent = HelpComponent;
//# sourceMappingURL=help.component.js.map