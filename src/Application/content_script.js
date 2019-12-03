import './setup-container';
import {container} from "tsyringe";
import {dispatchEvent, listenEvent} from "./event-util";
import RepoAccessHistory from "../Domain/ValueObjects/RepoAccessHistory";

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



listenEvent('storage_get', (payloadJson) => {
	// TODO: postMessageでクロージャが持っていけない模様
	const payload = JSON.parse(payloadJson);
	console.log(payload);
	chrome.storage.local.get(payload.key, payload.cb);
});
listenEvent('storage_set', (p) => chrome.storage.local.set.bind(this, p.data, p.cb));