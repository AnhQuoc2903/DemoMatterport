import MenuHandler from "./Menu.js";
import { embedLink } from "../../data.js";

const menuFooter = document.querySelector("#menuFooter");
const room = document.querySelector(".room");
const headerToggle = document.getElementById("headerToggle");
const headerActions = document.getElementById("headerActions");

// toggle menu
if (headerToggle) {
  headerToggle.addEventListener("click", () => {
    headerActions.classList.toggle("show");
  });
}

let i = 0;
let lenghth = Object.keys(embedLink).length - 1;

window.onload = function () {
  new MenuHandler("menuMain");

  const audioPopup = document.getElementById("audioPopup");
  audioPopup.classList.add("active");
  const btnYes = document.getElementById("btnAudioYes");
  const btnNo = document.getElementById("btnAudioNo");

  function startWebsite(enableAudio) {
    window.isAudioEnabled = enableAudio;
    window.startMuted = !enableAudio;
    window.isAudioEnabled = enableAudio;

    audioPopup.classList.remove("active");
    menuFooter.classList.add("show");
    room.classList.add("show");

    if (!enableAudio) {
      const volumeIcon = document.querySelector(".sound-icon i");
      const soundText = document.querySelector(".sound-text");

      if (volumeIcon) {
        volumeIcon.className = "fa-solid fa-volume-xmark";
      }

      if (soundText) {
        soundText.innerText = "Đã tắt âm thanh";
      }
    }

    let timeInterval = setInterval(() => {
      if (i === lenghth) {
        clearInterval(timeInterval);
      }

      let key = Object.keys(embedLink)[i];

      let iframeRoom = document.querySelector(`#${key} iframe`);

      if (iframeRoom) {
        iframeRoom.setAttribute("src", embedLink[key]);
      }

      i++;
    }, 5000);

    const nav1Active = document.querySelector(".nav-item.active");

    if (nav1Active) {
      if (!enableAudio) {
        const oldOnclick = nav1Active.getAttribute("onclick");

        nav1Active.removeAttribute("onclick");

        nav1Active.click();

        if (oldOnclick) {
          nav1Active.setAttribute("onclick", oldOnclick);
        }
      } else {
        nav1Active.click();
      }
    }
  }

  btnYes.addEventListener("click", () => {
    startWebsite(true);
  });

  btnNo.addEventListener("click", () => {
    startWebsite(false);
  });

  handleClickAbout();
};

function handleClickAbout() {
  const aboutElm = document.querySelector(".header-about");

  const aboutUs = document.getElementById("about-us");

  const buttonClose = document.querySelector("#about-us .buttonClose");

  // mở popup
  if (aboutElm) {
    aboutElm.addEventListener("click", () => {
      aboutUs.classList.add("show");
    });
  }

  // đóng popup
  if (buttonClose) {
    buttonClose.addEventListener("click", () => {
      aboutUs.classList.remove("show");
    });
  }

  // click nền tối để đóng
  aboutUs.addEventListener("click", (e) => {
    if (e.target === aboutUs) {
      aboutUs.classList.remove("show");
    }
  });
}
