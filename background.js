chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
  });
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "open_new_tab" ) {
      if(request.url!=""){
      var res = "https://www.google.com/search?q=" + encodeURI(request.url);
      chrome.tabs.create({"url": res});
    }
    else {
      alert("Please Highlight/Select Something to Search");
    }
    }
  }
);
