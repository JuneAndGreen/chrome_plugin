'use strict';

chrome.browserAction.onClicked.addListener(function(evt) {
  chrome.tabs.create({
    url: 'background/index.html'
  });
});