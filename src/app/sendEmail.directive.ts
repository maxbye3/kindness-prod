import {Directive, OnInit} from '@angular/core';
declare var jQuery: any;

@Directive({
  selector: 'name-email'  
})

export class SendEmail {

  constructor() {}
  
  send(type,msg){
    
    // add href to .settingsBox    
    var href = 'mailto:kindnessapp@gmail.com?subject='+ type +'&body=' + msg;
    jQuery('.settingsBox a').attr('target','_blank').attr('href',href).click();
    
    // if web
    // jQuery.ajax({
    //   url: "https://formspree.io/maxbye@gmail.com", 
    //   method: "POST",
    //   data: {subject: type,message:msg},
    //   dataType: "json"
    // });
  }
}
