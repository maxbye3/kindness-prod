import {Component, ElementRef} from '@angular/core';
import { Injectable } from '@angular/core';
import { TimeService } from './time.service';
declare var jQuery: any;

@Component({           
    providers: [TimeService]
})

@Injectable()
export class KindnessService {
    private kindnessArray = [];
    private whoArray = [];
    private dateArray = [];
    private emptyArr = [];

    
    constructor(private timeService: TimeService) {}

   /*
    * UPDATE STATE ARRAY
    * If done then kindness has been done for the day 
    * @param - STRING state - what state it's in
    */
    updateStateArray(state){
        localStorage.setItem("stateArray", state);
    }
    
    /*
    * LOAD STATE ARRAY
    */
    loadStateArray(){
        return localStorage.getItem("stateArray");
    }
    /*
    * LOAD ARRAYS
    */
    loadWhoArray(){
        if(!localStorage.getItem("whoArray")){
            return this.emptyArr;
        } 
        return JSON.parse(localStorage.getItem("whoArray"));
    }

    loadKindnessArray(){
        if(!localStorage.getItem("kindnessArray")){
            return this.emptyArr;
        } 
        return JSON.parse(localStorage.getItem("kindnessArray"));
    }

    loadDateArray(){
        if(!localStorage.getItem("kindnessArray")){
            return this.emptyArr;
        } 
        return JSON.parse(localStorage.getItem("dateArray"));
    }

   
    /*
    * STORE KINDNESS, RECEPTIENT & DATE DATA PER KIND ACTION
    * RETURNS ARRAY LENGTH
    */
    // saveData(who,kindness){
    saveData(kindness){   
        
        if(this.loadData() == 0){
            this.kindnessArray = [];
            //this.whoArray = [];
            this.dateArray = [];
        }

        this.kindnessArray.unshift(kindness);
        //this.whoArray.unshift(who);
        var now = this.timeService.formatDateNow();
        this.dateArray.unshift(now);
       
        localStorage.setItem("kindnessArray", JSON.stringify(this.kindnessArray));
        localStorage.setItem("whoArray", JSON.stringify(this.whoArray));
        localStorage.setItem("dateArray", JSON.stringify(this.dateArray));

    }

    

    /*
    * 
    * LOAD KINDNESS, RECEPTIENT & DATE DATA
    * RETURNS ARRAY LENGTH
    */
    loadData(){
        
        if(!localStorage.getItem("kindnessArray")){
            return 0;
        }
        
        this.kindnessArray = JSON.parse(localStorage.getItem("kindnessArray"));
        // this.whoArray = JSON.parse(localStorage.getItem("whoArray"));
        this.dateArray = JSON.parse(localStorage.getItem("dateArray"));
        return this.kindnessArray.length;
    }

}