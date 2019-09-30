function initControlsView(controls){
  console.log(controls);
  controls.stopButton.style.visibility='hidden';
  controls.pauseButton.style.visibility='hidden';
}

class RecorderView{
  constructor(controls){
    this.controls = controls;
    initControlsView(this.controls);
  }

  onRecordingStarted(){
    if(!this.controls.recordBox.classList.contains('recording')){
      this.controls.recordBox.classList.add('recording');
      this.controls.stopButton.style.visibility='visible';
      this.controls.pauseButton.style.visibility='visible';
    }
  }
  onRecordingStoped(showAnnotationField){
    if(this.controls.recordBox.classList.contains('recording')|| this.controls.pauseButton.classList.contains('paused')){
      this.controls.recordBox.classList.remove('recording');
      this.controls.pauseButton.parentNode.removeChild(this.controls.pauseButton);
      this.controls.stopButton.parentNode.removeChild(this.controls.stopButton);
      showAnnotationField();
      this.controls.recordBox.style.pointerEvents = 'none';
    }
  }

  onStopButtonClicked(dialogCallback){
      if(this.controls.recordBox.classList.contains('recording') || this.controls.pauseButton.classList.contains('paused')){
        dialogCallback;
      }
  }

  onPauseButtonClicked(pauseCallback, resumeCallback){
    if(this.controls.recordBox.classList.contains('recording')){
      this.controls.recordBox.classList.remove('recording');
      if(!this.controls.pauseButton.classList.contains('paused')){
        this.changeIcon(this.controls.pauseButton);
        this.controls.pauseButton.classList.add('paused');
        //pauseCallback();

      }

    } else if(!this.controls.recordBox.classList.contains('recording')){
        this.controls.recordBox.classList.add('recording');
        if(this.controls.pauseButton.classList.contains('paused')){
          this.changeIcon(this.controls.pauseButton);
          this.controls.pauseButton.classList.remove('paused');
          //resumeCallback();
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
export default RecorderView;
