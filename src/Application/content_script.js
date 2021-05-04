import '../setup_container';
import {container} from "tsyringe";
import {dispatchEvent, listenEvent} from "../events";
import RepoAccessHistory from "../Domain/ValueObjects/RepoAccessHistory";
import {EVENT} from './../events';

//
// Inject Embedded Script
//
const scriptElem = document.createElement('script');
scriptElem.src = chrome.runtime.getURL('dist/embedded_script.js');
scriptElem.onload = function() {
	this.remove();
};
(document.head || document.documentElement).appendChild(scriptElem);

//
// Save Repo History
//
const historyRepo = container.resolve('IRepoAccessHistoryRepository');
const pageContext = container.resolve('PageContextDetector');

if (pageContext.hasRepoOwnerName() && pageContext.hasRepoName()) {
	(async () => {
		let histories = await historyRepo.get();

		const user = pageContext.getRepoOwnerName();
		const repo = pageContext.getRepoName();
		histories = histories.addHistory(new RepoAccessHistory(user, repo));

		historyRepo.save(histories);
	})();
}

//
// Save User Name
//
const userNameRepo = container.resolve('IUserNameRepository');
Promise.all([userNameRepo.has(), pageContext.getLoginName()])
	.then((results) => {
		const [hasLoginName, loginName] = results;
		if (!hasLoginName && loginName) {
			userNameRepo.save(loginName);
		}
	});

//
// Init Listener
//
listenEvent('on_loaded_embedded_script', () => {
	const hotkeyRepo = container.resolve('IHotkeyRepository');
	hotkeyRepo.get().then((hotkeys) => {
		dispatchEvent("on_loaded_hotkeys", hotkeys);
	});
});
listenEvent(EVENT.GET_STORAGE, (payload) => {
	chrome.storage.local.get(payload.key, (result) => {
		dispatchEvent(payload.listenerID, result);
	});
});
listenEvent(EVENT.SET_STORAGE, (payload) => {
	chrome.storage.local.set(payload.data, (result) => {
		dispatchEvent(payload.listenerID, result);
	});
});