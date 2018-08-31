import {Directive, ElementRef} from '@angular/core';
import { Injectable } from '@angular/core';

declare var $ : any;

@Directive({        
    providers: []
})

@Injectable()
export class TimeService  {
   
    constructor() {}
    
    
    returnDay(){
       return new Date().getDay();
    }
    
    returnTime(){
       return new Date().getHours();
    } 
    
    returnDate(){
       return new Date();
    }   

    /* Return Date Array 
    If kindness array is empty then date array returns empty 
    otherwise return date array 
    */
    getDateArray(){
      if(!localStorage.getItem("kindnessArray")){        
        return [];            
      } 
      else{
        return JSON.parse(localStorage.getItem("dateArray"));
      }
    }
    
    /*
    * Format date.now() into day/month/year
    */
    formatDateNow(){
     var today = this.returnDate(); // new Date();
     var dd = today.getDate();
     var mm = today.getMonth()+1; //January is 0!
     var yyyy = today.getFullYear();
    
    if(dd<10){
        dd=0+dd;
    } 
    if(mm<10){
        mm=0+mm;
    } 
    
    return mm+'/'+dd+'/'+yyyy; 
    }

   
}