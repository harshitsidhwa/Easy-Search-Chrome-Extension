function getSelectionText() {
    var text = "";
    var activeEl = document.activeElement;
    var activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;
    if (
      (activeElTagName == "textarea") || (activeElTagName == "input" &&
      /^(?:text|search|password|tel|url)$/i.test(activeEl.type)) &&
      (typeof activeEl.selectionStart == "number")
    ) {
        text = activeEl.value.slice(activeEl.selectionStart, activeEl.selectionEnd);
    } else if (window.getSelection) {
        text = window.getSelection().toString();
    }
    return text;
}
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse){
    if(request.message ==="clicked_browser_action"){
      try
      {
        var text = getSelectionText();
        console.log(text);
        chrome.runtime.sendMessage({"message": "open_new_tab", "url": text});
      }
      catch(err)
      {
          alert("Please Highlight/Select Something to Search");
      }
    }
  }
);
