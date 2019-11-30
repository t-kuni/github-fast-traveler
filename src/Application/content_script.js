import './setup-container';
import {container} from "tsyringe";
import {dispatchEvent, listenEvent} from "./event-util";

const scriptElem = document.createElement('script');
scriptElem.src = chrome.runtime.getURL('dist/embedded_script.js');
scriptElem.onload = function() {
	this.remove();
};
(document.head || document.documentElement).appendChild(scriptElem);

listenEvent('on_loaded_embedded_script', () => {
	const hotkeyRepo = container.resolve('IHotkeyRepository');
	hotkeyRepo.get().then((hotkeys) => {
		console.log('hotkeys', hotkeys);

		dispatchEvent("on_loaded_hotkeys", hotkeys);
	}).catch((error) => {
		console.log('error', error);
	});
});
