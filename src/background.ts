// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';
const paths = ['com'];
const genConditions = (list) => {
  return list.map((word) => {
    return new chrome.declarativeContent.PageStateMatcher({
      pageUrl: {hostContains: word},
    })
  });
}
chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: genConditions(paths),
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});
