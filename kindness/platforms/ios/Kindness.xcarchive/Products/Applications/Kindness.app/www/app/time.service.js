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
var challenge_component_1 = require('./challenge.component');
var alternateKindnessView_component_1 = require('./alternativeHome/alternateKindnessView.component');
var TimeService = (function () {
    function TimeService(challengeComponent) {
        this.challengeComponent = challengeComponent;
    }
    /*
    * RETURN TO MAIN
    * If Cal then slide up
    * If in settings then go back
    */
    TimeService.prototype.returnMain = function () {
        // check if we're at top of page
        if ($(window).scrollTop() != 0) {
            $('html, body').animate({ scrollTop: 0 }, 'slow');
            $('.calView').fadeOut('fast');
        }
        if ($('#settingsView').css('display') != 'none') {
            $('#sonnyIcon').show();
            $(".settings").show().css("animation", "settingsOutro 1s");
            setTimeout(function () {
                $(".settings").hide();
            }, 500);
        }
    };
    /*
    * BACK TO DONE
    */
    TimeService.prototype.backToDone = function () {
        if ($('#kindnessView').attr('kindnessComplete') == 'true') {
            $('.missionView').hide();
            $('.classicView').hide();
            // show done view
            $('#doneView').show();
            document.getElementById("doneView").className = "";
            document.getElementById("doneView").className += " intro";
        }
    };
    /*
    * Check for new day
    * If kindness generator or compassion flow true then don't reset app just return
    * Go through date array and compare dates with today's
    * If there isn't a match then:
      * Check if iteration is possible
    * If there is a match then:
      * Kindness has already been done today
    * @param dayCheck - STRING - what view is currently present (kindnessView)
    */
    TimeService.prototype.dayCheck = function (classname) {
        // FUDGING - completion of kindness challenge       
        // localStorage.setItem("dateArray", '["15/9/2017", "14/9/2017", "13/9/2017"]');
        // localStorage.setItem("kindnessArray",'["Challenge 10","Challenge 9","Challenge 8"]');
        // localStorage.setItem("compassionChallenge","5");
        // FUDGING - kindness compassion to 10:       
        // localStorage.setItem("dateArray", '["6/6/2017", "6/6/2017", "6/6/2017", "6/6/2017", "6/6/2017", "6/6/2017", "6/6/2017", "6/6/2017", "6/6/2017"]');
        // localStorage.setItem("kindnessArray",'["Challenge 10","Challenge 9","Challenge 8","Challenge 7","Compassion 6","Compassion 5","Compassion 5","Compassion 3","Compassion 2","Compassion 1"]');
        /*
        * RESET MODE
        * If left on either compassion or kindness generator then resume from there
        * Disable the attr
        * Don't do rest of time service
        */
        function resetMode(mode) {
            if ($('#' + mode).attr('active') == 'true') {
                $('#' + mode).show();
                return;
            }
        }
        resetMode('kindness-generator');
        resetMode('compassion-flow');
        this.returnMain();
        $('.goToCal,.orTxt, .intentionTask, .completeContainer').show();
        // update clock time to midnight
        $('.hoursLeft').html(24 - this.returnTime());
        // always start as nice guy
        $('.narcissimTxt').html('Tired of being nice?');
        $(".settingsMenuItem img").attr('src', './img/icons/sonny.png');
        $(".kindnessCal").show();
        $('.speechDiv').show();
        $('#sonnyGif').attr('mentioned', 'true');
        $(".square-radio").removeClass("square-radio--clicked");
        // don't go to custom kindness screen
        $('#kindnessView').attr('customKindness', 'false');
        // change #sonnyIcon
        $('#sonnyIcon img').attr('src', './img/icons/more.png');
        $('#sonnyIcon img').css('margin-top', '0px');
        $('#sonnyIcon p').html('more');
        // sonny icon when clicked goes to settings
        $('#sonnyIcon').attr('settings', 'true');
        // change .kindnessCal
        $('.kindnessCal img').attr('src', './img/caly/chatIdle.png');
        $('.kindnessCal p').html('check progress');
        $('.kindnessCal .menuItem').css('padding', '2px 5px');
        //  $('.kindnessCal img').css('marginTop',($('.goToCal').height()  ) - ($('.goToCal img').height()  ));
        // add class to calander
        $('.kindnessCal .menuItem').addClass('goToCal');
        // sonny click goes to calander
        $('.kindnessCal .menuItem').attr('goCal', 'true');
        if (!localStorage.getItem("kindnessArray")) {
            var emptyArr = [], dateArray = [];
        }
        else {
            dateArray = JSON.parse(localStorage.getItem("dateArray"));
        }
        $(".sonnyContainer").attr("destroyBubble", "false");
        var matched = false;
        for (var i = 0; i <= dateArray.length; i++) {
            if (dateArray[i] == this.formatDateNow() && !matched) {
                // console.log('done view');
                $('#kindnessView').attr('kindnessComplete', 'true');
                matched = true;
                // if theme undefined then go to summer
                var theme = $(".skipContainer").attr('theme');
                if (!theme) {
                    $(".skipContainer").attr('theme', 'summer');
                }
                // force the screen to #doneView
                $('#kindnessView').hide();
                // remove kindness view
                document.getElementById(classname).className = "";
                document.getElementById(classname).className += " outro";
                this.backToDone();
                // $("doneView").attr('welcome','true');
                $('#kindnessView').fadeOut();
                return;
            }
            else if (!matched) {
                // console.log('kindness view');          
                $('#kindnessView').attr('kindnessComplete', 'false');
                matched = true;
                // go to summer theme
                $(".skipContainer").attr('theme', 'summer');
                // remove kindness view                    
                document.getElementById(classname).className = "";
                document.getElementById(classname).className += " outro";
                // remove done view
                $('#doneView').hide();
                // $('#kindnessView').show();
                document.getElementById("kindnessView").className = "";
                document.getElementById("kindnessView").className += " intro";
                $("#kindness-generator").show();
                document.getElementById("kindness-generator").className = "";
                document.getElementById("kindness-generator").className += " intro";
                $(".compassionDay").attr('firstCompassion', 'true');
                // analytics as page one
                $('#sonnyGif').attr('onclick', 'analytics("Kindness_To_Do")').click();
                var today = this.returnDate(); // new Date();
                var dd = today.getDate();
                var hasfailed = this.challengeComponent.checkFailure(dateArray, dd);
                if (hasfailed != true) {
                    localStorage.setItem("compassionIteration", "false");
                }
                localStorage.setItem("compassionIteration", "true");
            }
        }
    };
    TimeService.prototype.returnDay = function () {
        return new Date().getDay();
    };
    TimeService.prototype.returnTime = function () {
        return new Date().getHours();
    };
    TimeService.prototype.returnDate = function () {
        return new Date();
    };
    /*
   * Format date.now() into day/month/year
   */
    TimeService.prototype.formatDateNow = function () {
        var today = this.returnDate(); // new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = 0 + dd;
        }
        if (mm < 10) {
            mm = 0 + mm;
        }
        return mm + '/' + dd + '/' + yyyy;
    };
    TimeService = __decorate([
        core_1.Directive({
            providers: [challenge_component_1.ChallengeComponent, alternateKindnessView_component_1.AlternativeKindness]
        }),
        core_2.Injectable(), 
        __metadata('design:paramtypes', [challenge_component_1.ChallengeComponent])
    ], TimeService);
    return TimeService;
}());
exports.TimeService = TimeService;
//# sourceMappingURL=time.service.js.map