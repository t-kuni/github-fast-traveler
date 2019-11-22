import hotkeys from 'hotkeys-js';

// 受信
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	const response = request.message + ' through the content_script';
	sendResponse(response);
});

hotkeys('ctrl+shift+f', function(event, handler){
	event.preventDefault()

	const keyword = 'test';

	const path = location.pathname;

	const url = 'https://github.com/search?q=' + keyword + '&type=Code';

	window.open(url);
});