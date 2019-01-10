// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';



const script = `
  if (document.location.origin.includes('douyu')) {
    try {
      document.querySelector('[id^="__video"]').requestPictureInPicture();
      document.querySelector('[id^="__video"]').play();
    } catch (err) {
      document.querySelector('video').requestPictureInPicture();
      document.querySelector('video').play();
    }
  }
  else if (document.location.origin.includes('huya')) {
    try {
      document.getElementById('huya_video').requestPictureInPicture();
      document.getElementById('huya_video').play();
    } catch (err) {
      document.querySelector('video').requestPictureInPicture();
      document.querySelector('video').play();
    }
  }
  else if (document.location.origin.includes('huomao')) {
    try {
      document.getElementById('live-video').requestPictureInPicture();
      document.getElementById('live-video').play();
    } catch (err) {
      document.querySelector('video').requestPictureInPicture();
      document.querySelector('video').play();
    }
  }
  else {
    document.querySelector('video').requestPictureInPicture();
    document.querySelector('video').play();
  }
  `;

submitPipRequest.onclick = function(element) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
        tabs[0].id,
        {code: script});
  });
};