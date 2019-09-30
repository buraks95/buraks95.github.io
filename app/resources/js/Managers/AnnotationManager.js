import { Event, Observable } from "../Observable.js";

var annoText="";
//var allAnnos =[""];
var currentT = "";
//document.getElementById("comments").innerHTML = allAnnos.join("\r\n");

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
      currentT = hours + ':' + mins + ':' + secs + ' hrs';
    } else {
      currentT = mins + ':' + secs + ' mins';
    }
    document.getElementById('timeOutput').innerHTML = "Time "+currentT;
  }))
}

function initAnnotationManager(annotationField){
  annotationField.elements = {
  annotationButton: annotationField.el.querySelector(".saveAnnotation"),
  annotationContent: annotationField.el.querySelector("#annotation"),
  annotationFail: annotationField.el.querySelector("#anmerkungFail"),
  }
  annotationField.elements.annotationButton.addEventListener("click", annotationField.saveAnnotationsClicked.bind(annotationField));
}

class AnnotationManager extends Observable {
  constructor(el) {
    super();
    this.el = el;
    initAnnotationManager(this);
  }

  saveAnnotationsClicked() {
    if(this.elements.annotationContent.value!=0 && currentT != ""){
        annoText= currentT +  " : " + this.elements.annotationContent.value+"\n";
        this.createNewComment(annoText);
        this.elements.annotationFail.innerHTML = "Anmerkung gespeichert."
        this.elements.annotationContent.value = '';
    } else {
        if(this.elements.annotationContent.value==0){
          this.elements.annotationFail.innerHTML = "Anmerkung einfügen!"
        } else {
          this.elements.annotationFail.innerHTML = "Zeitangabe fehlt."
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
