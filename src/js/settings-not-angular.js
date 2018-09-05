

/*
* MAX THIS IS FAKE
*/
function switchNow(ratio){
   
      if(ratio == "whoKind"){

        var whoKind = '<img src="./img/icons/messenger.png" width="4.5%"> Kindness / \
        <img src="./img/icons/heart.png" width="4.5%"> Who \
        <span style="border: white solid 2px; padding: 10px;" onclick="switchNow(\'kindWho\')">switch</span>';
        document.getElementById("whoKind").innerHTML = whoKind;

        $("#kindnessView #input").html('\
          <h1 id="kindnessText"> <img src="./img/icons/messenger.png" width="40px"> Kindness</h1>\
          <input class="input" type="text" id="inputKindness" placeholder="What was today\'s kindness?">\
          <h1 id="whoText"> <img src="./img/icons/heart.png" width="40px"> For Who</h1>\
          <input class="input" type="text" id="inputPerson" placeholder="Who did you do a kindness for?">\
        ');

        var inputKindness = document.getElementById("inputKindness").style;
        var inputPerson = document.getElementById("inputPerson").style;
        inputStyle(inputKindness);
        inputStyle(inputPerson);

      }
      else{
        var whoKind = '<img src="./img/icons/heart.png" width="4.5%"> Who / \
        <img src="./img/icons/messenger.png" width="4.5%"> Kindness \
        <span style="border: white solid 2px; padding: 10px;" onclick="switchNow(\'whoKind\')">switch</span>';
        document.getElementById("whoKind").innerHTML = whoKind;

        $("#kindnessView #input").html('\
        <h1 id="whoText"> <img src="./img/icons/heart.png" width="40px"> For Who</h1>\
          <input class="input" type="text" id="inputPerson" placeholder="Who did you do a kindness for?">\
          <h1 id="kindnessText"> <img src="./img/icons/messenger.png" width="40px"> Kindness</h1>\
          <input class="input" type="text" id="inputKindness" placeholder="What was today\'s kindness?">\
        ');

        var inputKindness = document.getElementById("inputKindness").style;
        var inputPerson = document.getElementById("inputPerson").style;
        inputStyle(inputKindness);
        inputStyle(inputPerson);
    }
}

/*
* STYLE THE INPUTS
*/
function inputStyle(input){
  input.margin = "0px";
  input.fontSize = "30px";
  input.background = "rgba(256,256,256,0.7)";
  input.padding = "5px";
  input.marginBottom = "30px";
  input.width = "100%";
  input.border = "none";
}
