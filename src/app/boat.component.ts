import {Component, OnInit,  ElementRef, Input } from '@angular/core';
import { Injectable } from '@angular/core';
declare var jQuery: any;

@Component({
  selector: 'boat-component',
  templateUrl: 'app/settings.component.html',
  styleUrls: ['app/settings.component.css'],
})

@Injectable()
export class BoatComponent implements OnInit{

    constructor(
      ) {
    }

    ngOnInit(){      
    }

    /*
     * Graphic Check
     * Check what sort of boat it is
     * Sometimes when entering calander mode there's the wrong boat
     */
      graphicCheck(){
        if(jQuery(".skipContainer").attr('theme') == 'winter' || jQuery(".skipContainer").attr('theme') == 'summer'){
          jQuery('.pretentiousShip').hide();
          jQuery('.summerShip').show();
        }
        else{
          jQuery('.summerShip').hide();
          jQuery('.pretentiousShip').show();
        }
       }

    moveBoat(type){
    
      var boatImg, boatImgFlip, classname, interval1, interval2;
      clearInterval(interval1);
      clearInterval(interval2);
      
      if(type == 'pretentious'){
        classname = 'pretentious';
        boatImg = 'img/scenes/pretentious/pirateship.gif?' + new Date().getTime();
        boatImgFlip = 'img/scenes/pretentious/pirateship-flip.gif?' + new Date().getTime();
      }
      else if (type == 'summer'){
        classname = 'summer';
        boatImg = 'img/scenes/sailboat.png';
        boatImgFlip = 'img/scenes/sailboat-flip.png' 
      }
      else if ( type == 'winter'){
        classname = 'summer';
        boatImgFlip = 'img/sledder-reverse.gif?' + new Date().getTime();
        boatImg = 'img/sledder.gif?' + new Date().getTime();
        jQuery('.summerShip').show();
      }
      
     /*
      * BOAT ANIMATION
      * Move boat across screen without disrupting screen
      * Randomise boat movements      
      */                
       var boatSpeed = 12000;
       
       
       //var boatSpeed = 2000;
       // x-axis needs to start from 350px and end at -100px
       var startX = jQuery(window).width() + jQuery("."+classname+"Ship img").width(),
       endX = -300;
       
       // set boat css here to match boatSpeed
       jQuery("."+classname+"Ship img").css({
        "-webkit-transition": "-webkit-transform "+boatSpeed/1000+"s", /* Safari */
        "transition": "-webkit-transform "+boatSpeed/1000+"s",
        "transition-timing-function": "linear",
        "-webkit-transition-timing-function": "linear"
       });

       // after 2 seconds
       var startPos = startX; 
       boatTravel(startPos);
       setTimeout(function(){ 
        boatTravel(endX);         
       }, boatSpeed * .75);
       

       interval1 = setInterval(function(){
         boatTravel(startX);       
       }, 2*boatSpeed);
       
       setTimeout(function(){ 
         interval2 = setInterval(function(){
           boatTravel(endX);
         }, 2*boatSpeed);
       }, boatSpeed);
       
       function boatTravel(x){
          if(x == startX){            
            jQuery("."+classname+"Ship img").attr("src",boatImgFlip); // reverse image
          }
          else{
            jQuery("."+classname+"Ship img").attr("src",boatImg); // dont reverse image            
          }
          // y-axis needs to vary between 0px and 500px         
          var yAxis = Math.floor((Math.random() * jQuery(window).height()*.5));
          jQuery( "."+classname+"Ship img" ).css({
              "-webkit-transform":"translate("+x+"px,"+yAxis+"px)",
              "transform":"translate("+x+"px,"+yAxis+"px)",
              "opacity":"1",              
            });
    }
    }

}

