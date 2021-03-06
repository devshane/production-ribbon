/* global chrome, document, alert, console, location, $*/
'use strict';

document.addEventListener("page:load", function(){
  chrome.storage.local.get({productionURLs: []}, function (result) {
    if(result.productionURLs.indexOf(location.host) !== -1){
      displayRibbon();
    }
  });
});

var RIBBON_WRAPPER_ID = 'production-danger';

/*
Notify the background script that the tab has loaded.
*/
chrome.runtime.sendMessage({method: "tabLoaded"}, function(response) {});

/*
Fetch the ribbon wrapper.
*/
var getRibbon = function(){
  document.getElementById(RIBBON_WRAPPER_ID);
};

/*
Shows the ribbon if it existed.
If not, creates a new one and injects it to the current page.
*/
var displayRibbon = function(){
  var ribbonWrapper = document.getElementById(RIBBON_WRAPPER_ID);
  // if display is set to none;
  if(ribbonWrapper !== null){
    ribbonWrapper.style.display = '';
  }else{
    createRibbon();
  }
};

/*
Remove display none from the ribbon.
*/
var showRibbon = function(){
  document.getElementById(RIBBON_WRAPPER_ID).style.display = '';
};

/*
Creates a new ribbon.
*/
var createRibbon = function(){
  var ribbonWrapper = document.createElement("div");
  ribbonWrapper.className = 'danejurr-overlay danejurr-fixed danejurr-fadeIn';
  ribbonWrapper.id = "production-danger";

  var ribbon = document.createElement("div");
  ribbon.className = 'danejurr-message';

  var ribbonText = document.createElement("span");
  ribbonText.className = 'danejurr-message__text';

  var text = document.createTextNode("Production");

  document.body.appendChild(ribbonWrapper)
               .appendChild(ribbon)
               .appendChild(ribbonText)
               .appendChild(text);
};

/*
Sets display none on the ribbon.
*/
var hideRibbon = function(){
  document.getElementById(RIBBON_WRAPPER_ID).style.display = 'none';
};

/*
Fetch all the marked production hosts.
If the current location's host resides inside of the array, show the ribbon.
*/
chrome.storage.local.get({productionURLs: []}, function (result) {
    if(result.productionURLs.indexOf(location.host) !== -1){
      displayRibbon();
    }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if(request.method === 'displayRibbon'){
    displayRibbon();
  }else if(request.method === 'hideRibbon'){
    hideRibbon();
  }
});