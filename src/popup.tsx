import React from 'react';
import ReactDOM from 'react-dom';
const Popup = () => {
  return (
    <div>
      <h1>testtest</h1>
    </div>
  );
}

function init(element) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.executeScript(
      tabs[0].id,
      {code: './content.ts'});
  });
};

init();

ReactDOM.render(
  <Popup />,
  document.getElementById('root'),
)