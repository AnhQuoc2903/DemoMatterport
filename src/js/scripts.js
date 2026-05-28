// function playAudio(id) {
//   // Dừng tất cả audio
//   document.querySelectorAll("audio").forEach(audio => {
//     audio.pause();
//     audio.currentTime = 0;
//   });

//   // Nếu có id được truyền vào thì phát
//   if (id) {
//     const selected = document.getElementById(id);
//     if (selected) {
//       selected.volume = 0.1;
//       selected.play();
//     }
//   }
// }

let currentAudio = null;

function playAudio(id) {
  // dừng audio cũ
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }

  const selected = document.getElementById(id);

  if (selected) {
    selected.volume = 0.1;

    selected.play().catch(() => {});

    currentAudio = selected;
  }
}

function stopAudio() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }
}

function goBackToFirstRoom(event) {
  event.stopPropagation();
  const firstRoom = document.getElementById("roomid0");
  if (firstRoom) {
    firstRoom.scrollIntoView({ behavior: "smooth", block: "center" });

    setTimeout(() => {
      firstRoom.click();
    }, 500);
  }
}

function showYoutubePopup() {
  const popup = document.getElementById("youtube-popup");
  popup.style.display = "block";

  document.querySelectorAll("video").forEach((video) => {
    video.pause();
    video.currentTime = 0;
  });

  document.querySelectorAll("iframe").forEach((iframe) => {
    if (!popup.contains(iframe)) {
      iframe.contentWindow.postMessage(
        '{"event":"command","func":"stopVideo","args":""}',
        "*",
      );
    }
  });
}

function closeYoutubePopup() {
  const popup = document.getElementById("youtube-popup");
  popup.style.display = "none";

  const iframe = popup.querySelector("iframe");
  if (iframe) {
    const src = iframe.src;
    iframe.src = "";
    iframe.src = src;
  }
}

window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    const btn = document.getElementById("btn-delay");
    if (btn) btn.style.display = "block";
  }, 15000);
});
