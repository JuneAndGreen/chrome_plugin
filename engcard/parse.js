'use strict';

let id = chrome.contextMenus.create({
	title: 'xxx',
	onclick: function() {
		alert(0)
	}
}, (err) => {
	console.log(err);
});