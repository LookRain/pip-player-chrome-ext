// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

const script = `let id;
  const orgin = document.location.origin;
  if (origin.includes('douyu')) id = '__video';
  if (origin.includes('huya')) id = 'huya_video';
  if (origin.includes('huomao')) id = 'live-video';
  console.log(id);
  document.getElementById(id).requestPictureInPicture();
  document.getElementById(id).play();`;

submitPipRequest.onclick = function(element) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
        tabs[0].id,
        {code: script});
  });
};