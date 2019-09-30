

class Dialog {
  constructor(dialogText, confirmButtonText) {
      this.dialogText = dialogText;
      this.confirmButtonText = confirmButtonText;
      console.log(dialogText);
  }

// To-Do: controls extrahieren
  toggleDialog(callback){
    var dialog = document.querySelector('dialog'),
      dialogText = document.getElementById('dialog-text'),
      closebutton = document.getElementById('close-dialog'),
      confirmButton = document.getElementById('confirm-dialog'),
      pagebackground = document.querySelector('body');

    console.log(dialog);
    dialogText.innerHTML = this.dialogText;
    confirmButton.innerHTML= this.confirmButtonText;

    if (!dialog.hasAttribute('open')) {
      // show the dialog
      dialog.setAttribute('open','open');
      // after displaying the dialog, focus the closebutton inside it
      //closebutton.focus();
      console.log(callback);
      closebutton.addEventListener('click', this.toggleDialog.bind(callback));
      //this.closeDialog.bind(dialog)
      confirmButton.addEventListener('click', callback);
      confirmButton.addEventListener('click', this.toggleDialog.bind(callback));

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
