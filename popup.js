// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

const script = `
  function getVideoObj() {
    const origin = document.location.origin;
    try {
      if (origin.includes('douyu')) {
        video = document.querySelector('[id^="__video"]');
      } else if (origin.includes('huya')) {
        video = document.getElementById('huya_video');
      } else if (origin.includes('huomao')) {
        video = document.getElementById('live-video');
      } else {
        throw new Error('normal video')
      }    
    } catch(err) {
      video = document.querySelector('video');
    }
    return video;
  }
  video.requestPictureInPicture()
    .then(() => {
      video.play();
    });
  `;

submitPipRequest.onclick = function(element) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
        tabs[0].id,
        {code: script});
  });
};