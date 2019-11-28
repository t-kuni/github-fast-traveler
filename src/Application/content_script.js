import './setup-container';
import {container} from "tsyringe";
import hotkeys from "hotkeys-js";
import {dispatchEvent, listenEvent} from "./event-util";

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

listenEvent('on_loaded_embedded_script', () => {
	const hotkeyRepo = container.resolve('IHotkeyRepository');
	hotkeyRepo.get().then((hotkeys) => {
		dispatchEvent("on_loaded_hotkeys", hotkeys);
	});
});
