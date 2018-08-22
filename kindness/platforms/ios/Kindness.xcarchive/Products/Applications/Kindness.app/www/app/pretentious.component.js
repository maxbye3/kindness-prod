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
var boat_component_1 = require('./boat.component');
var sonny_component_1 = require('./sonny.component');
var badBroDialogue_directive_1 = require('./badBroDialogue.directive');
var weather_component_1 = require('./weather.component');
var PretentiousComponent = (function () {
    function PretentiousComponent(boatComponent, sonnyComponent, badBroDialogue, weatherComponent) {
        this.boatComponent = boatComponent;
        this.sonnyComponent = sonnyComponent;
        this.badBroDialogue = badBroDialogue;
        this.weatherComponent = weatherComponent;
    }
    /*
    * REMOVE SCENE
    */
    PretentiousComponent.prototype.removeScene = function () {
        jQuery("#kindness #kindnessText").html('<img _ngcontent-svj-1="" src="./img/icons/heart.png" width="40px"> Kindness');
        // remove interval
        clearInterval(this.moveDecor);
        // need to creae pretentious graphics container containes hands and thorns
        jQuery(".pretentiousContainer").html("<div class='thornContainer'></div><div class='handsContainer'></div>");
        // UI Changes
        jQuery(".preventHands").hide();
        jQuery(".furniture").show();
        jQuery('#kindness').removeClass('evilTxt');
        // Text Change
        jQuery(".intention").html("make an intention");
        jQuery(".orTxt").removeClass("pretentiousTxt");
        jQuery("#whoText").removeClass("pretentiousTxt").html('<img src="./img/icons/heart.png" width="40px"> For Who');
        jQuery("#kindnessText").removeClass("pretentiousTxt").html('\
      <span class="compassionNum" style="margin-left: 14.5px; margin-top: 2px;"></span>\
      <span class="compassionDay">DAY</span>\
      <img src="./img/icons/heart.png" style="height: .75em; margin-right: 3px;">\
      Today\'s mission \
      ');
        /* CHANGE kindnessCal STYLE
         * Change colour to white
         * Move to top left of screen
        */
        jQuery('.menuItem').css({ "-webkit-filter": "invert(0%)", 'filter': 'invert(0%)' });
        jQuery(".kindnessCal").css({ "top": "auto", "bottom": "0px", "right": "0px" });
        // jQuery(".kindnessCal .menuItem img").css({"-webkit-filter": "invert(100%)","filter": "invert(100%)"});
        jQuery(".themeButton").removeClass("pretentiousTxt pretentiousSubmit");
        jQuery('#inputPerson').attr('placeholder', 'Who did you do a kindness for?');
        jQuery('#inputKindness').attr('placeholder', "What was today's kindness?");
        jQuery(".thornContainer").hide();
        jQuery(".handsContainer").hide();
        // mock going straight into evil mode
        // $('#sonnyIcon').click();
        // $('.square-radio').click();
    };
    /*
    * Replace Task
    * From submit-kidness
    * Just forward to badBro
    */
    PretentiousComponent.prototype.replaceTask = function () {
        this.badBroDialogue.dialogue('exit', ["You accomplish something even more narcissistic?!", "Enter it below..."]);
        jQuery(".sonnyContainer").attr("outroAllowed", 'true');
    };
    /*
    * GO BACK
    * From help component
    * Just forwards to badBro dialogue
    */
    PretentiousComponent.prototype.goBack = function () {
        var badBroIcon = "<img src='./img/icons/badBro.png' style='height: 25px;border: #473939 solid 0.5px;padding: 5px; filter: invert(100%);'>";
        this.badBroDialogue.dialogue('exit', ["I'm out. Hit " + badBroIcon + " if you're hard enough..."]);
        jQuery(".sonnyContainer").attr("outroAllowed", 'true');
    };
    /*
    * CHANGE THEME
    * BadBro remarks on you changing the teme
    */
    PretentiousComponent.prototype.changeTheme = function () {
        this.badBroDialogue.dialogue('exit', ["Changing the theme?", "Nothing is cooler than this one.."]);
    };
    /*
    * WINNING
    * From submit-kindness
    * Just forwards to badBro with random
    */
    PretentiousComponent.prototype.winning = function () {
        var _this = this;
        var badBroIcon = "<img src='./img/icons/badBro.png' style='height: 25px;border: #473939 solid 0.5px;padding: 5px; filter: invert(100%);'>";
        var random = Math.floor(Math.random() * (3 - 1 + 1) + 1); // spits back a number between 1 & 3
        switch (random) {
            case 1:
                this.badBroDialogue.dialogue('winning', ["Whatever..."]);
                break;
            case 2:
                this.badBroDialogue.dialogue('winning', ["Party hard!!"]);
                break;
            case 3:
                this.badBroDialogue.dialogue('winning', ["Crushed it!!"]);
                break;
        }
        this.weatherComponent.rainSkulls();
        var laughOnce = true;
        // force a sonny laugh
        var sonnyImg = document.getElementById("sonnyGif");
        setTimeout(function () {
            if (laughOnce) {
                sonnyImg.src = "./img/badBro/laughing.gif?t=" + new Date().getTime();
                laughOnce = false;
            }
        }, 100);
        setTimeout(function () {
            jQuery(".sonnyContainer").attr("outroAllowed", 'true');
            _this.badBroDialogue.badBroAction('exit');
            laughOnce = true;
        }, 4500);
    };
    /*
    * ENTER BAD BRO
    * Check if Sonny is present and make him exit and then introduce badBro
    * @param STRING - action - forwarded over to sonnyGone
    */
    PretentiousComponent.prototype.intBad = function (action) {
        var _this = this;
        // try initial sonny check      
        if (this.sonnyComponent.sonnyPresent == false) {
            this.sonnyGone(action);
        }
        else {
            // wait for sonny to go
            var waitingForSonny = setInterval(function () {
                if (_this.sonnyComponent.sonnyPresent == false) {
                    // intro badBro
                    clearTimeout(waitingForSonny); // clear timeout
                    _this.sonnyGone(action);
                }
            }, 500);
        }
    };
    /*
      * SONNY GONE
      * Change help menu to badBro
      * If sonny is gone
      * Check if BadBro can introduction animation - skip if can't
      * Whether to greet first time or help
      * @param STRING - action - 'greet' or 'help' depending on state
      */
    PretentiousComponent.prototype.sonnyGone = function (action) {
        var _this = this;
        if (action != 'greet' && jQuery(".sonnyContainer").attr("introAllowed") == 'false') {
            this.badBroDialogue.dialogue('idle', ["What's happenin'"]);
        }
        setTimeout(function () {
            if (action == 'greet') {
                _this.badBroDialogue.greeting(); // launch greeting
            }
            else if (jQuery(".sonnyContainer").attr("introAllowed") == 'true') {
                _this.badBroDialogue.dialogue('idle', ["What's happenin'"]);
            }
            jQuery(".sonnyContainer").attr("outroAllowed", 'true'); // let dialogue stay
        }, 0);
    };
    /*
    * PRETENTIOUS SCENE
    * Make UI changes
    * Create hand and thorn animation
    * Setup BadGuy (NOT DONE YET)
    */
    PretentiousComponent.prototype.intScene = function () {
        jQuery(".menuItem").css({ "-webkit-filter": "invert(100%)", "filter": "invert(100%)" });
        jQuery("#kindness #kindnessText").html('<img _ngcontent-svj-1="" src="./img/icons/heart.png" width="40px" class="verticalFlip"> UnKind');
        jQuery(".sonnyContainer").hide();
        jQuery('#kindness').addClass('evilTxt');
        jQuery(".settingsMenuItem img").attr('src', './img/icons/badBro.png');
        jQuery('.narcissimTxt').html('Sick of being narcissistic?');
        jQuery('#sonnyStatic').hide().attr('char', 'badBro');
        // jQuery('.callChar p .txt').html('Call BadBro');
        jQuery('.callChar p .icon img').attr('src', './img/icons/more.png');
        this.sonnyComponent.sonnyPresent = false;
        jQuery('.calBg,#sonnyIcon').show();
        //jQuery("#themeSelected").html("pretentious");
        this.boatComponent.moveBoat('pretentious');
        jQuery('.summerShip').hide();
        jQuery('.pretentiousShip').show();
        // UI Changes
        jQuery(".preventHands,.badBroDialogue").show();
        jQuery(".smoke,.house,.furniture,.sonnyDialogue").hide();
        // Text Change
        jQuery(".intention").html("make an intention");
        jQuery(".orTxt").addClass("pretentiousTxt");
        jQuery("#kindnessText").addClass("pretentiousTxt").html("What deed did you slay?");
        // jQuery("#whoText").addClass("pretentiousTxt").html("Whose mind did this blow?");
        /* CHANGE kindnessCal STYLE
         * Change colour to white
         * Move to top left of screen
        */
        // jQuery(".menuItem").css({"-webkit-filter": "invert(100%)","filter": "invert(100%)"});
        //jQuery(".kindnessCal").css({"right": "60px"});
        // jQuery(".kindnessCal .menuItem img").css({"-webkit-filter": "invert(100%)","filter": "invert(100%)"});
        jQuery(".themeButton").addClass("pretentiousTxt pretentiousSubmit");
        jQuery('#inputPerson').attr('placeholder', '');
        jQuery('#inputKindness').attr('placeholder', '');
        this.intBad('greet'); // make badBro appear           
        // need to creae pretentious graphics container containes hands and thorns
        jQuery(".pretentiousContainer").html("<div class='thornContainer'></div><div class='handsContainer'></div>");
        // jQuery(".pretentiousContainer").html("<div class='handsContainer'></div>");
        // remove snow
        document.getElementById("snowContainer1").style.display = "none";
        document.getElementById("snowContainer2").style.display = "none";
        /*
        * INFINITE THORNS &
        * Append thorn images
        * Append hand images
        * Position thorns
        * Position hands
        * Move thorns
        * Move hands
        * Reset thorns (when second thorn == top 170px)
        * Reset hands ()
        */
        // append hand image
        jQuery(".thornContainer").html("\
        <img class='thorns' src='img/scenes/pretentious/throns.gif'>\
        ");
        var timeInterval = 5000;
        function moveHands(timeInterval) {
            // append thorn image
            jQuery(".handsContainer").html("\
        <img class='handsTop' src='img/scenes/pretentious/flaming-fist.gif'>\
        <img class='handsMiddle' src='img/scenes/pretentious/flaming-fist.gif'>\
        <img class='handsBottom' src='img/scenes/pretentious/flaming-fist.gif'>\
        ");
            /* PRETENTIOUS DECOR
            * Position and animate hands and thorns
            * Determine type of decor and position w/ parameters
            * Add jQuery linear animation
            * @Param STRING type - what type of decor (hand or thorn)
            * @Param INT top - top position for hands and thorns
            * @Param INT middle - middle position for hands and thorns
            * @Param INT bottom - bottom position for hands and thorns
            * @Param INT animate - animation speed for thorns and hands
            */
            function pretentiousDecor(type, top, middle, bottom, animate) {
                // position hands
                var handProperties = {
                    "right": "0px",
                    "width": "75px",
                    "position": "absolute",
                    "z-index": "10",
                    "opacity": ".7"
                };
                if (type == "hands") {
                    // position hands
                    jQuery(".handsTop").css(handProperties).css({ "top": top + "px" });
                    jQuery(".handsMiddle").css(handProperties).css({ "top": middle + "px" });
                    jQuery(".handsBottom").css(handProperties).css({ "top": bottom + "px" });
                    // move hands
                    jQuery(".handsTop,.handsMiddle,.handsBottom").animate({
                        top: "-=" + animate
                    }, timeInterval, "linear");
                }
            }
            if (jQuery(window).height() <= 750) {
                pretentiousDecor("hands", 0, 400, 800, 400);
            }
            else {
                // pretentiousDecor("thorns",422,1180,1938,758);
                pretentiousDecor("hands", 0, 700, 1400, 700);
            }
        }
        //initial
        moveHands(timeInterval);
        //repeat
        this.moveDecor = setInterval(function () {
            moveHands(timeInterval);
        }, timeInterval);
    };
    PretentiousComponent = __decorate([
        core_1.Component({
            selector: 'pretentious-component',
            providers: [badBroDialogue_directive_1.BadBroDialogue, boat_component_1.BoatComponent, sonny_component_1.SonnyComponent, weather_component_1.WeatherComponent]
        }), 
        __metadata('design:paramtypes', [boat_component_1.BoatComponent, sonny_component_1.SonnyComponent, badBroDialogue_directive_1.BadBroDialogue, weather_component_1.WeatherComponent])
    ], PretentiousComponent);
    return PretentiousComponent;
}());
exports.PretentiousComponent = PretentiousComponent;
//# sourceMappingURL=pretentious.component.js.map