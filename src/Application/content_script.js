import '../setup_container';
import {container} from "tsyringe";
import {dispatchEvent, listenEvent} from "../events";
import RepoAccessHistory from "../Domain/ValueObjects/RepoAccessHistory";
import {EVENT} from './../events'

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

listenEvent('on_show_repo_find_modal', async () => {
	const historyRepo = container.resolve('IRepoAccessHistoryRepository');
	const histories = await historyRepo.get();
	dispatchEvent("on_loaded_repo_access_histories", histories);
});

const historyRepo = container.resolve('IRepoAccessHistoryRepository');
const pageContext = container.resolve('PageContextDetector');

if (pageContext.hasRepoOwnerName() && pageContext.hasRepoName()) {
	(async () => {
		let histories = await historyRepo.get();

		if (histories === null) {
			histories = [];
		}

		const user = pageContext.getRepoOwnerName();
		const repo = pageContext.getRepoName();
		histories.push(new RepoAccessHistory(1, user, repo));

		historyRepo.save(histories);
	})();
}



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