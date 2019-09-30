import { Event, Observable } from "./Observable.js";
import Dialog from "./Dialog.js";
import RecorderView from "./RecorderView.js";


function initRecorder(recorder){
  initControls(recorder);
  initView(recorder);
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


function initControls(recorder){
  recorder.controls = {
    stopButton: recorder.el.querySelector(".button.stop"),
    pauseButton: recorder.el.querySelector(".button.pause"),
    recordBox: recorder.el.querySelector(".recordBox"),
  };
  recorder.controls.stopButton.style.visibility = 'hidden';
  recorder.controls.pauseButton.style.visibility = 'hidden';

}

function initView(recorder){
  recorder.recorderView = new RecorderView(recorder.controls);
}

function initEvents(recorder) {
  recorder.controls.stopButton.addEventListener("click", recorder.onStopButtonClicked.bind(recorder));
  recorder.controls.pauseButton.addEventListener("click", recorder.onPauseButtonClicked.bind(recorder));
  recorder.controls.recordBox.addEventListener("click", recorder.startRecording.bind(recorder));
  //recorder.controls.playButton.addEventListener("click", recorder.playButton.bind(recorder));

}

class AudioRecorder extends Observable{
  constructor(el, showAnnotationField, audioList) {
    super();
    this.el = el;
    this.audioList = audioList;
    console.log(showAnnotationField);
    this.showAnnotationField = showAnnotationField;
    initRecorder(this);
  }


  startRecording(){
    if (recordedAudio.src) {
      this.audioList.add(recordedAudio.src); // Add current recording to Audio list.
      this.showAnnotationField(false);
      recordedAudio.style.visibility = 'hidden';
    }
    if (!this.controls.recordBox.classList.contains('recording')) {
      this.controls.recordBox.classList.add('recording');
      this.controls.stopButton.style.visibility = 'visible';
      this.controls.pauseButton.style.visibility = 'visible';
    }
    this.recorderView.onRecordingStarted();

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
      recordedAudio.style.visibility = 'visible';
      recordedAudio.src = URL.createObjectURL(audioBlob);
      recordedAudio.controls=true;
      recordedAudio.autoplay=false;
      //this.recorderView.onRecordingStoped(this.showAnnotationField);
      if(this.controls.recordBox.classList.contains('recording')|| this.controls.pauseButton.classList.contains('paused')){
        this.controls.recordBox.classList.remove('recording');
        this.controls.stopButton.style.visibility = 'hidden';
        this.controls.pauseButton.style.visibility = 'hidden';
        // console.log(this.controls.pauseButton.parentNode);
        // this.mediaRecorder.stop();
        this.showAnnotationField();
      }
    });
  }

  onStopButtonClicked() {
      if(this.controls.recordBox.classList.contains('recording') || this.controls.pauseButton.classList.contains('paused')){
      let dialog = new Dialog('Möchten sie die Aufnahme wirklich stoppen?', 'Aufnahme stoppen');
      dialog.toggleDialog(this.stopRecording.bind(this));
  }

}

  stopRecording(){
    this.mediaRecorder.stop();
  }

  onPauseButtonClicked() {
    this.recorderView.onPauseButtonClicked();
    //this.mediaRecorder.pause(), this.mediaRecorder.resume()

  }


}
export {AudioRecorder};

export default AudioRecorder;
