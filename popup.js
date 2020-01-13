// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

const script = `
  /**
   * 获取video元素
   * @returns HtmlVideoElement
   */
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
  /**
   * 开启画中画
   * @param {HTMlVideoElement} video 
   */
  function pictureInPicture(video) {
    video.requestPictureInPicture()
    .then(() => {
      video.play();
    });
  }
  /**
   * 检测视频发生变化
   * @param {HTMLVideoElement} video 
   */
  function observe(video) {
    if (observe.__ob__) {
      observe.__ob__.disconnect();
    }
    observe.__ob__ = new MutationObserver(function() {
      init();
    });
    observe.__ob__.observe(video, { attributes: true });
  }

  /**
   * 程序入口
   */
  function init() {
    const video = getVideoObj();
    if (video) {
      observe(video);
      pictureInPicture(video);
    } else {
      setTimeout(init, 1000);
    }
  }
  init();
`;

submitPipRequest.onclick = function(element) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
        tabs[0].id,
        {code: script});
  });
};