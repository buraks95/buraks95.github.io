import DownloadManager from "./Managers/DownloadManager.js";


function ManageAudioList() {
  this.firstAudio = [];
      var dataName = datum;


  this.add = (src) => {
    this.firstAudio.unshift({ src });
    console.log("add", src);
    this.fnRenderAudioList();
  }


  this.fnRenderAudioList = () => {
    let divAudioList = document.getElementById("divAudioList");
    divAudioList.innerHTML = "";
    this.firstAudio.forEach(objAudio => {
      divAudioList.appendChild(this.createAudioItem(objAudio));
    });

  }

  this.createAudioItem = (objAudio) => {
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
    if(document.getElementById("dateiname").value != 0){
      dataName= document.getElementById("dateiname").value;
    } else{
      dataName = datum;
    }

    let div = document.createElement("div");
    let audio = document.createElement("audio");
    let audioName = document.createElement("div");

    audioName.classList.add("audioName");

    audioName.innerHTML = dataName;
    audio.src = objAudio.src;
    audio.controls = true;

    div.classList.add("audioBox");
    div.appendChild(audioName);

    div.appendChild(audio);

    return div;
  }

}

export default ManageAudioList;
