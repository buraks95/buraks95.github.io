function ManageAudioList() {
  this.firstAudio = [];

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
    let div = document.createElement("div");
    let audio = document.createElement("audio");
    audio.src = objAudio.src;
    audio.controls = true;
    div.appendChild(audio);
    return div;
  }

}

export default ManageAudioList;
