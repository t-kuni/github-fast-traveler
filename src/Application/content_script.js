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
		dispatchEvent("on_loaded_hotkeys", hotkeys);
	});
});


const historyRepo = container.resolve('IRepoAccessHistoryRepository');
const pageContext = container.resolve('PageContextDetector');

if (pageContext.hasRepoOwnerName() && pageContext.hasRepoName) {
	const histories = historyRepo.get();
	histories.push(new Array)
}