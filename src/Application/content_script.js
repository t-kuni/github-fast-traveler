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


const historyRepo = container.resolve('IRepoAccessHistoryRepository');
const pageContext = container.resolve('PageContextDetector');

if (pageContext.hasRepoOwnerName() && pageContext.hasRepoName) {
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