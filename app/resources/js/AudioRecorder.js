import { Event, Observable } from "./Observable.js";
import Dialog from "./Dialog.js";


function initRecorder(recorder){
  initControls(recorder);
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
   console.log('getUserMedia supported.');
   navigator.mediaDevices.getUserMedia (
      {
         audio: true
      })
      .then(function(stream) {
        initEvents(recorder);
      })
      .catch(function(err) {
         console.log('The following getUserMedia error occured: ' + err);
         alert('Um diese Anwendung zu nutzen, musst du den Zugriff auf dein Mikrofon erlauben.');
      }
   );
  } else {
   console.log('getUserMedia not supported on your browser!');
  }
}

//To-Do: show stop and pause button only when recording
function initControls(recorder){
  recorder.controls = {
    stopButton: recorder.el.querySelector(".button.stop"),
    pauseButton: recorder.el.querySelector(".button.pause"),
    recordBox: recorder.el.querySelector(".recordBox"),
    //playButton: recorder.el.querySelector(".button.play")
  };
  recorder.controls.stopButton.style.visibility='hidden';
  recorder.controls.pauseButton.style.visibility='hidden';



}

function initEvents(recorder, showAnnotationField) {
  recorder.controls.stopButton.addEventListener("click", recorder.onStopButtonClicked.bind(recorder));
  recorder.controls.pauseButton.addEventListener("click", recorder.onPauseButtonClicked.bind(recorder));
  recorder.controls.recordBox.addEventListener("click", recorder.startRecording.bind(recorder));
  //recorder.controls.playButton.addEventListener("click", recorder.playButton.bind(recorder));
}

class AudioRecorder extends Observable{
  constructor(el, showAnnotationField) {
    super();
    this.el = el;
    console.log(showAnnotationField);
    this.showAnnotationField = showAnnotationField;
    initRecorder(this);
  }


//To-Do: animated circle
  startRecording(){
    console.log("Aufnahme starten");
  	 if(!this.controls.recordBox.classList.contains('recording')){
  		 this.controls.recordBox.classList.add('recording');
       this.controls.stopButton.style.visibility='visible';
       this.controls.pauseButton.style.visibility='visible';
  	 }

    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        this.mediaRecorder = new MediaRecorder(stream);
        this.mediaRecorder.start();

        const audioChunks = [];

        this.mediaRecorder.addEventListener("dataavailable", event => {
          audioChunks.push(event.data);
        });

        this.initStopEvent(audioChunks);

    });
  }

  initStopEvent(audioChunks){
    this.mediaRecorder.addEventListener("stop", () => {
      const audioBlob = new Blob(audioChunks,  { 'type' : 'audio/mpeg;' });
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      recordedAudio.src = URL.createObjectURL(audioBlob);
      recordedAudio.controls=true;
      recordedAudio.autoplay=false;
      if(this.controls.recordBox.classList.contains('recording')|| this.controls.pauseButton.classList.contains('paused')){
        this.controls.recordBox.classList.remove('recording');
        this.controls.pauseButton.parentNode.removeChild(this.controls.pauseButton);
        this.controls.stopButton.parentNode.removeChild(this.controls.stopButton);
        // console.log(this.controls.pauseButton.parentNode);
        // this.mediaRecorder.stop();
        this.showAnnotationField();
        this.controls.recordBox.style.pointerEvents = 'none';
      }

      //audio.play();
    });

  }

//To-Do: diable pause button when stop button is clicked
  onStopButtonClicked() {
    console.log(this);
    if(this.controls.recordBox.classList.contains('recording') || this.controls.pauseButton.classList.contains('paused')){
      let dialog = new Dialog('Möchten sie die Aufnahme wirklich stoppen?', 'Aufnahme stoppen');
      dialog.toggleDialog(this.stopRecording.bind(this));
    }
  }

  stopRecording(){
    this.mediaRecorder.stop();
  }

//To-Do: outsource layout code
  onPauseButtonClicked() {
    console.log("pause button clicked");
    if(this.controls.recordBox.classList.contains('recording')){
      this.controls.recordBox.classList.remove('recording');
      if(!this.controls.pauseButton.classList.contains('paused')){
        console.log(this.controls.pauseButton);
        this.changeIcon(this.controls.pauseButton);
        this.controls.pauseButton.classList.add('paused');
        this.mediaRecorder.pause();
      }


    } else if(!this.controls.recordBox.classList.contains('recording')){
        this.controls.recordBox.classList.add('recording');
        if(this.controls.pauseButton.classList.contains('paused')){
          this.changeIcon(this.controls.pauseButton);
          this.controls.pauseButton.classList.remove('paused');
          this.mediaRecorder.resume();
        }
    }
  }

  changeIcon(pauseButton){
    console.log(pauseButton);
    if(pauseButton.className=="far fa-pause-circle fa-5x pause button"){
      pauseButton.className = "fas fa-microphone-slash fa-5x pause button paused";
    }else{
      pauseButton.className = "far fa-pause-circle fa-5x pause button";
    }
  }
}
export default AudioRecorder;
