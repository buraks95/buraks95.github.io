import AudioRecorder from "./AudioRecorder.js";
import Dialog from "./Dialog.js";
import AnnotationManager from "./Managers/AnnotationManager.js";
import DownloadManager from "./Managers/DownloadManager.js";

var audioRecorder,
 annotationSaverManager,
 annotationSaver,
 downloadStarter,
 downloadManager;

function init() {
	initButtons();
	initRecorder();
	initTime();
}

function initButtons() {
	initDownload();
	initAnnotations();
	initDeleteRec();
}

function initDownload() {
	console.log("init download");
	let downloadStarter = document.querySelector(".dataInputField");
	downloadManager = new DownloadManager (downloadStarter);
}

function initRecorder() {
	console.log("init recorder");
	let audioElement = document.querySelector(".recorder");
	audioRecorder = new AudioRecorder(audioElement, showAnnotationField);
}

// TODO: extract in view module or delete
function showAnnotationField(){
	console.log('bam bam');
	annotationSaver.style.visibility = 'visible';
}


function initAnnotations() {
	console.log("init annotations");
	annotationSaver = document.querySelector(".annotationField");
	annotationSaver.style.visibility = 'hidden';
	annotationSaverManager = new AnnotationManager(annotationSaver);
}

function initDeleteRec(){
	let deleteButton = document.querySelector("#deleteButton");
	deleteButton.addEventListener("click", onDeleteButtonClicked);

}

function onDeleteButtonClicked(){
	let dialog = new Dialog('Möchten sie die Aufnahme wirklich löschen?', 'Aufnahme löschen');
		dialog.toggleDialog(refreshPage);
}

function refreshPage(){
	window.location.reload(false);
}


function initTime() {
	console.log("initTime");
	var dateToday = new Date();
	var d = dateToday.getDate();
	var m = dateToday.getMonth() + 1;
	var y = dateToday.getFullYear();
	var h = dateToday.getHours();
	var min = dateToday.getMinutes();
	var datum;
	if (min < 10) {
		datum = d + "." + m + "." + y + " - " + h + ":" + "0" + min;
	} else {
		datum = d + "." + m + "." + y + " - " + h + ":" + min;
	}
	document.getElementById('showDate').innerHTML = "Dateiname: " + datum;
}



init();