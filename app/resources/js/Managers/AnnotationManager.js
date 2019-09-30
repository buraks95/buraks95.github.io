import { Event, Observable } from "../Observable.js";

var annoText="";
var allAnnos =[""];
var currentT = "";
document.getElementById("comments").innerHTML = allAnnos.join("\r\n");

window.onload = function(){
  var audio = [...document.getElementsByTagName('audio')];
  audio.forEach(el => el.addEventListener('seeked', function(e) {
    var hours = Math.floor(e.target.currentTime / 3600);
    var mins = Math.floor(e.target.currentTime / 60);
    var secs = Math.floor(e.target.currentTime % 60);

    if (secs < 10){
      secs = '0' + String(secs);
    }
    if(hours >= 1){
      currentT = hours + ':' + mins + ':' + secs;
    } else {
      currentT = mins + ':' + secs;
    }
    document.getElementById('timeOutput').innerHTML = "Time "+currentT;
  }))
}

function initAnnotationManager(annotationField){
  annotationField.annotationInput = {
  annotationButton: annotationField.el.querySelector(".saveAnnotation")
  }
  annotationField.annotationInput.annotationButton.addEventListener("click", annotationField.saveAnnotationsClicked.bind(annotationField));
}

class AnnotationManager extends Observable {
  constructor(el) {
    super();
    this.el = el;
    initAnnotationManager(this);
  }

  saveAnnotationsClicked() {
    if(document.getElementById("annotation").value!=0 && currentT != ""){
        annoText= currentT + " : " + document.getElementById("annotation").value+"\n";

        //löschen??
        allAnnos.push(annoText);

        //löschen??
        var comment = allAnnos.join("\r\n");
        this.createNewComment(annoText);
        document.getElementById('anmerkungFail').innerHTML = "Anmerkung gespeichert."
        // comment = '';
        document.getElementById("annotation").value = '';
    } else {
        if(document.getElementById("annotation").value==0){
          document.getElementById('anmerkungFail').innerHTML = "Anmerkung einfügen!"
        } else {
          document.getElementById('anmerkungFail').innerHTML = "Zeitangabe fehlt."
        }
     }
   }

   createNewComment(comment){
     var newComment = document.createElement("div");
     document.getElementById("comments").appendChild(newComment);
     newComment.classList.add('comment');
     newComment.innerHTML = comment;
   }
}

export default AnnotationManager;
