import { Event, Observable } from "../Observable.js";

function initDownloadManager(dataInputField){

  dataInputField.btnBox = {
  downloadButton: dataInputField.el.querySelector(".saveRec")
  }
  dataInputField.btnBox.downloadButton.addEventListener("click", dataInputField.downloadClicked.bind(dataInputField));
}

class DownloadManager extends Observable {
  constructor(el) {
    super();
    this.el = el;
    initDownloadManager(this);
  }

  downloadClicked() {
    var dateToday = new Date(),
     d = dateToday.getDate(),
     m = dateToday.getMonth() + 1,
     y = dateToday.getFullYear(),
     h = dateToday.getHours(),
     min = dateToday.getMinutes(),
     datum;
    if (min < 10) {
      datum = d + "." + m + "." + y + " - " + h + ":" + "0" + min;
    } else {
      datum = d + "." + m + "." + y + " - " + h + ":" + min;
    }
    var dataName;
    if(document.getElementById("dateiname").value != 0){
      dataName= document.getElementById("dateiname").value;
    }
    else{
      dataName = datum;
    }

    var node = document.getElementById("comments");
    var x = node.textContent;
    let notesString ="";
    let zip = new JSZip()
    notesString = "Leiter des Interviews: " + document.getElementById("conductor").value + "\n" +
    "Interviewpartner: " + document.getElementById("partner").value + "\n" +
    "Raum: " + document.getElementById("room").value + "\n" +
    "Schlagwörter: " + document.getElementById("keywords").value + "\n" + "\n" +
    "Notizen: " + document.getElementById("notes-input").value+ "\n" + "\n" +
    x + "\n" + "\n" ;

    notesString = notesString.replace(/\n/g, "\r\n");
    zip.file(dataName + " - notes.txt", notesString);

    var xhr = new XMLHttpRequest(); 
    xhr.open('GET', recordedAudio.src, true);
    xhr.responseType = 'blob';
    xhr.onload = function(e) {
      if (this.status == 200) {
        var myBlob = this.response;
        zip.file(dataName + ".mp3", myBlob, {binary:true});
        zip.generateAsync({type:"blob"}).then(function(content) {
          saveAs(content, dataName +".zip");
        });
      }
    };
  xhr.send();
  }
}

export default DownloadManager;