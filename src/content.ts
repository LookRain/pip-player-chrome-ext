import { stateMachine, Commands } from "./constants";

(function() {
  interface HTMLVideoElementNew extends HTMLVideoElement {
    requestPictureInPicture: () => Promise<any>;
  }

  let state: keyof typeof stateMachine = "idle";
  const transition = (
    action: "PLAY" | "SUCCESS" | "FAIL" | "QUIT" | "PLAY"
  ) => {
    const currentState = stateMachine[state];
    if (action in currentState) {
      state = (currentState as any)[action];
    }
    chrome.runtime.sendMessage({ state });
  };

  const reset = () => {
    state = "idle";
    chrome.runtime.sendMessage({ state });
  };

  const siteToQuerySelectorMap = {
    douyu: '[id^="__video"]',
    huya: "#huya_video",
    huomao: "#live-video"
  };

  let currentVideoIndex = 0;

  function getVideoEl() {
    const origin = document.location.origin;
    let video: HTMLVideoElementNew | null;

    const matchedSite = Object.keys(
      siteToQuerySelectorMap
    ).find(sitePartialName => origin.includes(sitePartialName));

    if (matchedSite) {
      video = document.querySelector(
        siteToQuerySelectorMap[
          matchedSite as keyof typeof siteToQuerySelectorMap
        ]
      );
    } else {
      video = document.querySelector("video") as HTMLVideoElementNew;
    }

    // if there're more than 1 <video> in the DOM, tell popup to display message and enable button to select next video
    if (document.querySelectorAll("video").length > 1) {
      chrome.runtime.sendMessage({ multiVideo: true });
    }

    return video;
  }
  /**
   * 开启画中画
   * @param {HTMlVideoElement} video
   */
  async function pictureInPicture(video: HTMLVideoElementNew) {
    try {
      transition("PLAY");
      await video.requestPictureInPicture();
      video.play();
      transition("SUCCESS");
    } catch (err) {
      transition("FAIL");
      reset();
      setTimeout(init, 1000);
    }
  }

  function init() {
    const video = getVideoEl();

    if (video) {
      // const observer = new MutationObserver(async () => {
      //   transition('PLAY');
      //   init();
      // });
      // observer.observe(video as HTMLVideoElementNew, {attributes: true});
      // observe(video);
      pictureInPicture(video);
    } else {
      setTimeout(init, 1000);
    }

    return video;
  }

  let observing = false;
  /**
   * Play the default <video> in PIP
   */
  function onPipPlay() {
    init();
  }
  /**
   * Quit pip for the default <video>
   */
  async function onOriginalPlayerPlay() {
    await (document as any).exitPictureInPicture();
    transition("QUIT");
  }
  /**
   * For multiple <video> in the page, if played incorrectly, use this
   */
  function onNextVideoPipPlay() {
    const len = document.querySelectorAll("video").length;
    currentVideoIndex >= len - 1
      ? (currentVideoIndex = 0)
      : currentVideoIndex++;
    const video = document.querySelectorAll("video")[currentVideoIndex];
    pictureInPicture(video as HTMLVideoElementNew);
  }
  /**
   * Mute video
   */
  function onMute() {}
  /**
   * Turn on continuous play
   */
  function onContinuousPlay(active: boolean) {}

  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    const command: Commands = request.command;
    if (command === "play") {
      onPipPlay();
    }
    if (command === "original-player-play") {
      onOriginalPlayerPlay();
    }
    if (command === "play-next") {
      onNextVideoPipPlay();
    }
  });
})();
