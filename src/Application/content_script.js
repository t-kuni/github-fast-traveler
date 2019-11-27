import './setup-container';
import {container} from "tsyringe";

// 受信
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	const response = request.message + ' through the content_script';
	sendResponse(response);
});

const scriptElem = document.createElement('script');
scriptElem.src = chrome.runtime.getURL('dist/embedded_script.js');
scriptElem.onload = function() {
	this.remove();
};
(document.head || document.documentElement).appendChild(scriptElem);


const hotkeyRepo = container.resolve('IHotkeyRepository');
hotkeyRepo.get().then((hotkeys) => {
	console.log(hotkeys);
});

// window.addEventListener("message", function(event) {
// 	console.log('called listener!!!!');
// 	if (event.source !== window)
// 		return;
//
// 	if (event.data.type && event.data.type === "initialized_view") {
// 		vm = event.data.payload.vm;
// 	}
// });