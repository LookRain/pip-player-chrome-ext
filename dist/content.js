parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"eKDL":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.stateMachine={idle:{PLAY:"attemptingToPlay"},attemptingToPlay:{SUCCESS:"playing",FAIL:"error"},playing:{QUIT:"idle"},error:{PLAY:"attemptingToPlay"}};
},{}],"hNRT":[function(require,module,exports) {
"use strict";var e=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))(function(o,i){function u(e){try{a(r.next(e))}catch(t){i(t)}}function c(e){try{a(r.throw(e))}catch(t){i(t)}}function a(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n(function(e){e(t)})).then(u,c)}a((r=r.apply(e,t||[])).next())})},t=this&&this.__generator||function(e,t){var n,r,o,i,u={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function c(i){return function(c){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;u;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return u.label++,{value:i[1],done:!1};case 5:u.label++,r=i[1],i=[0];continue;case 7:i=u.ops.pop(),u.trys.pop();continue;default:if(!(o=(o=u.trys).length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){u=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){u.label=i[1];break}if(6===i[0]&&u.label<o[1]){u.label=o[1],o=i;break}if(o&&u.label<o[2]){u.label=o[2],u.ops.push(i);break}o[2]&&u.ops.pop(),u.trys.pop();continue}i=t.call(e,u)}catch(c){i=[6,c],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,c])}}};Object.defineProperty(exports,"__esModule",{value:!0});var n=require("./constants");!function(){var r="idle",o=function(e){var t=n.stateMachine[r];e in t&&(r=t[e]),chrome.runtime.sendMessage({state:r})},i=function(){r="idle",chrome.runtime.sendMessage({state:r})},u={douyu:'[id^="__video"]',huya:"#huya_video",huomao:"#live-video"},c=0;function a(n){return e(this,void 0,void 0,function(){return t(this,function(e){switch(e.label){case 0:return e.trys.push([0,2,,3]),o("PLAY"),[4,n.requestPictureInPicture()];case 1:return e.sent(),n.play(),o("SUCCESS"),[3,3];case 2:return e.sent(),o("FAIL"),i(),setTimeout(l,1e3),[3,3];case 3:return[2]}})})}function l(){var e=function(){var e,t=document.location.origin,n=Object.keys(u).find(function(e){return t.includes(e)});return e=n?document.querySelector(u[n]):document.querySelector("video"),document.querySelectorAll("video").length>1&&chrome.runtime.sendMessage({multiVideo:!0}),e}();return e?a(e):setTimeout(l,1e3),e}chrome.runtime.onMessage.addListener(function(n,r,i){var u,s=n.command;"play"===s&&l(),"original-player-play"===s&&function(){e(this,void 0,void 0,function(){return t(this,function(e){switch(e.label){case 0:return[4,document.exitPictureInPicture()];case 1:return e.sent(),o("QUIT"),[2]}})})}(),"play-next"===s&&(u=document.querySelectorAll("video").length,c>=u-1?c=0:c++,a(document.querySelectorAll("video")[c]))})}();
},{"./constants":"eKDL"}]},{},["hNRT"], null)
//# sourceMappingURL=/content.js.map