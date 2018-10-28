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
var edit_component_1 = require('../generator/edit.component');
var core_2 = require('@angular/core');
var generator_component_1 = require('../generator.component');
var SwiperComponent = (function () {
    function SwiperComponent(editComponent, generatorBackend) {
        this.editComponent = editComponent;
        this.generatorBackend = generatorBackend;
    }
    SwiperComponent.prototype.populateData = function (data) {
        jQuery('.sliderComponent .swiper-wrapper').html('');
        // console.log('data length is ' + data.length);
        jQuery('.sliderComponent .swiper-wrapper').html('<div class="swiper-slide" slide="' + 0 + '">' + data[0] + '</div>');
        for (var i = 1; i < this.generatorBackend.data.length; i++) {
            if (!data[i] || data[i] < 40) {
                jQuery('.sliderComponent .swiper-wrapper').append('<div class="swiper-slide slide="' + i + '""> Tap to continue </div>');
            }
            else {
                jQuery('.sliderComponent .swiper-wrapper').append('<div class="swiper-slide slide="' + i + '"">' + data[i] + '</div>');
            }
        }
        if (data.length < 20) {
            for (var i = 1; i < this.generatorBackend.data.length; i++) {
                jQuery('.sliderComponent .swiper-wrapper').append('<div class="swiper-slide slide="' + i + '""> Tap to continue </div>');
            }
        }
    };
    SwiperComponent.prototype.enableSlider = function (data, type) {
        var slideNum = parseInt(localStorage.getItem('intentionNum'));
        if (type == 'compassion' || type == 'evil' || !slideNum) {
            slideNum = 0;
            var tempNum = 0;
        }
        else {
            tempNum = slideNum + 1;
        }
        if (type == 'compassion') {
            // setTimeout(() => {
            jQuery('.audioContainer0').html("<audio style='width:95%' controls><source src='audio/audio0.mp3' type='audio/mpeg'></audio>");
            jQuery('.audioContainer1').html("<audio style='width:95%' controls><source src='audio/audio1.mp3' type='audio/mpeg'></audio>");
            jQuery('.audioContainer2').html("<audio style='width:95%' controls><source src='audio/audio2.mp3' type='audio/mpeg'></audio>");
            jQuery('.audioContainer3').html("<audio style='width:95%' controls><source src='audio/audio3.mp3' type='audio/mpeg'></audio>");
        }
        // enable swipe
        jQuery('.swiper-container').show();
        var mySwiper = new Swiper('.swiper-container', {
            direction: 'horizontal',
            // Navigation arrows
            nextButton: '.next',
            initialSlide: slideNum + 1,
            prevButton: '.prev',
            onTouchStart: function (slider) {
                // console.log('initial slider: ' + slider.activeIndex); 
                if (slider.activeIndex == 1) {
                    jQuery('.sonnyDialogue').attr('resetSwiper', 'false');
                }
                if (jQuery('.sonnyDialogue').attr('resetSwiper') == 'compassion' || jQuery('.sonnyDialogue').attr('resetSwiper') == 'evil') {
                    slider.slideTo(0, 1000);
                }
            },
            onTransitionEnd: function (slider) {
                // console.log('slider: ' + slider.activeIndex); 
                if (slider.activeIndex == 1) {
                    jQuery('.sonnyDialogue').attr('resetSwiper', 'false');
                }
                if (jQuery('.sonnyDialogue').attr('resetSwiper') == 'compassion' || jQuery('.sonnyDialogue').attr('resetSwiper') == 'evil') {
                    slider.slideTo(0, 1000);
                }
                if (jQuery('.sonnyDialogue').attr('generatorMode') == 'compassion') {
                    data.length = 4;
                    if (slider.activeIndex > 3) {
                        slider.slideTo(0, 1000);
                    }
                }
                if (slider.activeIndex == 0) {
                    jQuery('.prev').hide();
                }
                else {
                    jQuery('.prev').show();
                }
                // console.log('data.length: ' + data.length);
                if (slider.activeIndex == data.length - 1) {
                    jQuery('.next').hide();
                }
                else {
                    jQuery('.next').show();
                }
                var sounds = document.getElementsByTagName('audio');
                for (var i = 0; i < sounds.length; i++)
                    sounds[i].pause();
                jQuery('.sliderComponent').attr('currentSlide', slider.activeIndex - 1);
                // var topPos = jQuery('.sliderComponent').position().top + jQuery('.sliderComponent h1').height() + jQuery('.swiper-slide-active').height();
                // jQuery('.customKindness').css('top', topPos);
                // console.log(topPos);
                if (slider.activeIndex == 4) {
                    jQuery('.launchBroraid').click();
                }
            }
        });
    };
    SwiperComponent.prototype.kindnessContainerHeight = function (overlapActive) {
        var windowHeight = jQuery(window).height();
        var txtHeight = (windowHeight / 2.5);
        jQuery('.sliderComponent').css('top', txtHeight);
        setTimeout(function () {
            // if .sliderComponent meets .accept then bump up
            var sliderHeight = jQuery('.swiper-container').height();
            var acceptTop = jQuery('.accept').position().top;
            var sliderTop = jQuery('.sliderComponent').position().top;
            var overlap = acceptTop - (sliderTop + sliderHeight);
            if (overlapActive && overlap < 0) {
                jQuery('.sliderComponent').css('top', sliderTop + overlap);
            }
            jQuery('.sliderComponent').css('opacity', '1');
        }, 500);
    };
    SwiperComponent.prototype.arrowContainerHeight = function () {
        var assignedScrollSpace = (jQuery(window).width() - jQuery('.swiper-slide').width()) / 2;
        var actualScrollSpace = jQuery('.next').width();
        var needsCorrection = assignedScrollSpace - actualScrollSpace;
        if (needsCorrection <= 0) {
            var fixedHeight = jQuery('.sliderComponent').position().top - jQuery('.next').height();
        }
    };
    SwiperComponent.prototype.kindnessDimension = function () {
        /*
         * KINDNESS (TEXT) WIDTH
         * .kindnessContainer horizontal position on page
         */
        jQuery('.kindnessContainer').css('left', '0px');
        var txtWidth = jQuery('.kindnessContainer').width(), windowWidth = jQuery(window).width();
        txtWidth = (windowWidth / 2) - (txtWidth / 2);
        jQuery('.kindnessContainer').css('left', txtWidth);
        /*
         *  KINDNESS (TEXT) HEIGHT
         *  .kindnessContainer vertical position on page
         *  based on kindnessTxt
         */
        var txtHeight = jQuery('.kindnessTxt').height(), windowHeight = jQuery(window).height();
        txtHeight = (windowHeight / 2) - (txtHeight / 2);
        jQuery('.kindnessContainer').css('top', txtHeight);
    };
    SwiperComponent = __decorate([
        core_1.Component({
            selector: 'swiper-component',
            templateUrl: 'app/generator/swiper.component.html',
            styleUrls: ['app/generator/swiper.component.css'],
            providers: [edit_component_1.EditComponent]
        }),
        core_2.Injectable(), 
        __metadata('design:paramtypes', [edit_component_1.EditComponent, generator_component_1.GeneratorBackend])
    ], SwiperComponent);
    return SwiperComponent;
}());
exports.SwiperComponent = SwiperComponent;
//# sourceMappingURL=swiper.component.js.map