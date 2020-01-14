import React from 'react';
import ReactDOM from 'react-dom';
import {stateMachine, Commands} from './constants';

function sendCommand(command: Commands) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    if (tabs[0].id) {
      chrome.tabs.sendMessage(tabs[0].id, {command});
    }
  });
}

function pipPlay() {
  sendCommand('play');
}
function originalPlayerPlay() {
  sendCommand('original-player-play');
}
function nextVideoPipPlay() {
  sendCommand('play-next');
}

const Popup = () => {
  const [state, setState] = React.useState<keyof typeof stateMachine>('idle');
  const [multiVideo, setMultiVideo] = React.useState(false);
  React.useEffect(() => {
    chrome.runtime.onMessage.addListener(function(request) {
      if (request.state) {
        setState(request.state);
      }
    });

    chrome.runtime.onMessage.addListener(function(request) {
      if (request.multiVideo === true) {
        setMultiVideo(true);
      }
    });
  }, []);
  return (
    <div style={{
      width: '200px'
    }}>
      {state === 'idle' && <button className="btn" onClick={pipPlay}>画中画播放</button>}
      {state === 'playing' && (
        <button className="btn" onClick={originalPlayerPlay}>播放器播放</button>
      )}
      {multiVideo && (
        <>
          <div>
            发现当前页面上有多于1个视频，如果当前播放的视频不正确，请尝试选择下一个视频
          </div>
          <button className="btn" onClick={nextVideoPipPlay}>下一个视频</button>
        </>
      )}
    </div>
  );
};

ReactDOM.render(<Popup />, document.getElementById('root'));
