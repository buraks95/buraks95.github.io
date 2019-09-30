

class Dialog {
  constructor(dialogText, confirmButtonText, callback) {
      this.dialogText = dialogText;
      this.confirmButtonText = confirmButtonText;

  }


  toggleDialog(callback){

    var container = document.querySelector('dialog'),
    dialogTextEl = document.getElementById('dialog-text'),
    pagebackground = document.querySelector('body'),
    closebutton = document.getElementById('close-dialog'),
    confirmButton = document.getElementById('confirm-dialog');

    dialogTextEl.innerHTML = this.dialogText;
    confirmButton.innerHTML= this.confirmButtonText;

    if (!container.hasAttribute('open')) {
      // show the dialog
      container.setAttribute('open','open');
      // after displaying the dialog, focus the closebutton inside it
      //closebutton.focus();

      closebutton.onclick = this.toggleDialog;
      confirmButton.onclick = ()=>{
      this.toggleDialog();
      callback()
      }

      var div = document.createElement('div');
		  div.id = 'backdrop';
		  document.body.appendChild(div);
    } else {
      dialog.removeAttribute('open');
      var div = document.querySelector('#backdrop');
      div.parentNode.removeChild(div);
    }

  }

}

export { Dialog};

export default Dialog;
