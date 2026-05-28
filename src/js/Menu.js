import { $$, $ } from "./index.js";
import { dataJson, videoSrcs, srcVoidMC } from "../../data.js";
export default class MenuHandler {
  constructor(element) {
    this.element = element;
    this.modulesAddScene = [];
    this.first = true;
    this.langguague = "vi";
    // this.initMenu();
    this.handleMenuHeader();
    // this.handleClosePop();
    this.handleMultiLanguague();

    this.handleMuteVolume();
    // this.moduleLoader = new ModuleLoader();
    // this.moduleLoader.createScene();
    // const moduleNames = dataJson.map((i) => i.name);
    this.muteState = !window.startMuted;
    this.mcState = true;
    // let i = 0;
    // let length = moduleNames.length;
    // let withMobile = window.innerWidth;
    // if (withMobile > 844) {
    //     const timeInterval = setInterval(() => {
    //         if (i === length - 1) clearInterval(timeInterval);
    //         this.moduleLoader.loadModule(moduleNames[i]);
    //         i++;
    //     }, 5000)
    // }
    this.videoSrcs = { ...videoSrcs };

    this.srcVoidMC = { ...srcVoidMC };
  }

  initMenu() {
    this.menu = document.querySelector(`.${this.element}`);
    this.menuChild = this.menu.children;
    if (this.menuChild) {
      this.handleEvent();
    }
  }

  handleMenuHeader() {
    const menuHeader = $$(".nav-item");
    const roomItems = $$(".room-item");
    this.menuHeader = menuHeader;
    this.roomItems = roomItems;
    menuHeader.forEach((i) => {
      i.addEventListener("click", (event) => this.handleClickItem(i, event));
    });
  }
  handleErrorVideo(err) {
    console.trace("err play video => ", err);
  }
  handleClickItem(elm, evt) {
    this.menuHeader.forEach((i) => i.classList.remove("active"));
    $$(".menuitem-box").forEach((i) => i.classList.remove("active"));
    elm.classList.add("active");
    let room = elm.getAttribute("data-room");
    if (room) {
      const audioMap = {
        room0: "audio0",
        room1: "audio1",
        room2: "audio2",
        room3: "audio4",
        room4: "audio3",
        room5: "audio5",
        room6: "audio6",
        room7: "audio7",
      };

      if (!window.startMuted && this.muteState) {
        playAudio(audioMap[room]);
      }

      let videos = $$(".video-mc");

      videos.forEach((i) => {
        i.classList.add("hidden");
        i.pause();
      });

      const roomElm = $(`.${room}`);

      this.roomItems.forEach((i) => i.classList.add("hidden"));

      if (roomElm) {
        roomElm.classList.add("show");
        roomElm.classList.remove("hidden");
      }

      let menuItem = document.querySelector(`#${room}-menu`);

      if (menuItem) {
        menuItem.classList.add("active");
      }
    }
  }

  handleEvent() {
    let length = this.menuChild.length;
    const popup = $("#popup");
    const descContentPopup = $(".descContentPopup");
    const module3dLoadTitle = $(".module3dLoad-title");

    for (let i = 0; i < length; i++) {
      const elm = this.menuChild[i];
      if (elm) {
        elm.addEventListener("click", (e) => {
          let moduleName = e.target.getAttribute("data-name");
          if (moduleName) {
            popup.classList.toggle("show");
            let desc = dataJson.find((i) => i["name"] === moduleName);
            if (desc && desc.detail) {
              descContentPopup.innerText = desc.detail[this.langguague]["desc"];
              module3dLoadTitle.innerText =
                desc.detail[this.langguague]["title"];
            }
          }
        });
      }
    }
  }

  handleMultiLanguague() {
    const langs = $$(".icon-trans");
    langs.forEach((i) => {
      i.addEventListener("click", (e) => {
        let lang = i.getAttribute("data-languague");
        this.langguague = lang;
        this.forceUpdateLanguague(lang);
      });
    });
  }

  forceUpdateLanguague(lang) {
    let translate = document.querySelectorAll(".translation");
    translate.forEach((i) => {
      let text = i.getAttribute(`data-translate-${lang}`);
      i.innerText = text;
    });
  }

  // loadModule(moduleName) {
  //     const scene = this.moduleLoader.scene;
  //     let esxited = false;
  //     scene.children.forEach(i => {
  //         if (i.isObjectCustom) {
  //             i.visible = false;
  //         }
  //         if (i.nameObject && i.nameObject === moduleName) {
  //             i.visible = true;
  //             esxited = true;
  //         }
  //     })

  //     if (esxited) return;
  //     this.moduleLoader.loadModule(moduleName, true);
  // }

  handleClosePop() {
    const btnClose = $(".buttonClose");
    const popup = $("#popup");
    btnClose.addEventListener("click", () => {
      popup.classList.toggle("show");
    });
  }

  handleMuteVolume() {
    const btnVolume = $(".header-mute");

    btnVolume.addEventListener("click", () => {
      const volumeIcon = $(".sound-icon i");
      const soundText = $(".sound-text");

      // ===== ĐANG BẬT -> TẮT =====
      if (this.muteState) {
        stopAudio();

        volumeIcon.className = "fa-solid fa-volume-xmark";
        soundText.innerText = "Đã tắt âm thanh";

        this.muteState = false;

        window.startMuted = true;
      }

      // ===== ĐANG TẮT -> BẬT =====
      else {
        const activeRoom = document.querySelector(".nav-item.active");

        if (activeRoom) {
          const roomId = activeRoom.getAttribute("data-room");

          const audioMap = {
            room0: "audio0",
            room1: "audio1",
            room2: "audio2",
            room3: "audio4",
            room4: "audio3",
            room5: "audio5",
            room6: "audio6",
            room7: "audio7",
          };

          playAudio(audioMap[roomId]);
        }

        volumeIcon.className = "fa-solid fa-volume-high";
        soundText.innerText = "Âm thanh đang bật";

        this.muteState = true;

        window.startMuted = false;
      }
    });
  }
}
