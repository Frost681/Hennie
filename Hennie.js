    window.onload = function () {
    const loadingScreen = document.getElementById("loadingScreen");
    const mainContent = document.getElementById("mainContent");
    const popup = document.getElementById("popup");
    const popupImage = document.getElementById("popupImage");
    const popupText = document.getElementById("popupText");
    const popupAudioWrapper = document.getElementById("popupAudio");
    const popupAudio = popupAudioWrapper.querySelector("audio");
    const nextPageBtn = document.getElementById("nextBtn");
    const volumeControl = document.getElementById("volume");
    const rainScene = document.getElementById("rainScene");
    const backBtn = document.getElementById("backBtn");
    const bgMusic = document.getElementById("bg-music");

    let currentPage = 0;
    let musicStarted = false;
    let rainCreated = false;
    let typingTimeouts = [];

    const notebookPages = [
      { text: "Thế giới rộng lớn vậy mà tớ với cậu vẫn tìm được nhau... ", audio: "music/Hennie.m4a" },
      { text: "Tớ hông biết khi cậu vào được đây là cậu đang thế nào nhưng mà ngay tại đây tớ sẽ chỉ tập trung về cậu thôi nên đây sẽ giống như là một nơi để tớ bày tỏ các suy nghĩ của tớ về cậu á. Mà trước khi vào, tớ muốn nhắn gửi đến cậu rằng cuộc sống được tạo nên từ những lời tạm biệt, nếu có gặp gỡ thì sẽ có chia ly, đối với tớ gặp nhau ắt có duyên và nếu lựa chọn rời đi thì có nghĩa là đã hết duyên rồi nhưng hông vì vậy mà tớ sẽ rời xa cậu, tớ sẽ bên cạnh cậu khi cậu cần dù trong bất kì hình dạng nào, khi cậu có chuyện gì tớ sẽ đến và ôm lấy cậu như cậu đã làm với tớ và dù thế nào chúng ta vẫn chỉ là con người yếu ớt có thể sống nay chết mai nhưng như vậy sẽ làm cho chúng ta quý trọng mạng sống hơn, dù chúng ta có nhiều khuyết điểm hay mọi việc hông suôn sẻ nhưng bên cạnh đó còn có ưu điểm mà chúng ta thường hông quan tâm đến và vì mọi chuyện hông suôn sẻ nên mới có ta của ngày hôm nay, dù là chỉ vì vài lời nói mà có thể khiến tinh thần của chúng ta rớt xuống tận hố sâu nhưng vì vậy mà cậu có thể biết rằng lời nói có sức sát thương rất cao, dù đôi lúc ta vô tình làm tổn thương ai đó mà chúng ta hông biết nhưng sâu xa trong đó vẫn có tình thương của chúng ta, dù là con người rất tệ nhưng mà như vậy mới là con người, như vậy mới là chúng ta, và vì đã trải qua nhiều chuyện mới có chúng ta, mới có Kim của ngày hôm nay á và tớ muốn cảm ơn Kim vì cậu đã tồn tại và sống đến bây giờ, nếu cậu cảm thấy cuộc sống vô nghĩa thì mong cậu sẽ nhớ đến tớ vì cậu đã cứu rỗi tớ á, nên là đừng suy nghĩ quá nhiều nhé:3. ", audio:"music/Datto Music.mp3" },
      { text: "Vào chuyện chính thôi nhỉ:33. Tớ là kẻ chẳng ra gì nhưng mà chỉ cần nghĩ đến cậu, tớ lại thấy ngày mai sẽ trở nên tuyệt vời, thực sự cậu đã cứu rỗi cuộc đời và con tim của tớ á vì cậu là người duy nhất tớ từng được cảm nhận được hơi ấm của con người và cũng là người đầu tiên chịu ngồi lắng nghe tớ nói, cậu là người đã làm cho cuộc đời tớ có ý nghĩa hơn và chính vì vậy mà tớ luôn muốn có thể giúp cậu khi có thể nhưng mà bên cạnh đó tớ nghĩ là tớ là vật cản nên tớ luôn muốn rời đi trong im lặng để hông còn làm phiền cậu nữa, nhưng mà mỗi khi nhìn thấy cậu phiền lòng chuyện gì thì tớ lại hông thể mặc kệ được, vì những lúc đấy tớ nghĩ không có ai để sẻ chia hẳn phải cô đơn lắm, nỗi cô đơn của cậu, sự vắng vẻ quanh tớ, dù không thể làm nó biến mất nhưng chẳng phải ta có thể cùng nhau sẻ chia sao:3. Thật ra thì tớ muốn cậu hạnh phúc, tớ muốn cậu có thể chia sẻ với ai đó những điều cậu yêu thương, những điều mà cậu luôn kìm nén trong tim. Không quan trọng đó là ai, dù đó là bất kì ai chỉ cần ở bên cậu và làm cậu hạnh phúc. Như vậy là đủ... ", audio: "music/Datto Music2.mp3" },
      { text: "Dạo đây tớ có dọn phòng và xem lại những thứ cậu đã tặng cho tớ thì thật sự tớ vui lắm, cuộc đời tớ thật sự may mắn vì đã gặp cậu và được làm người có thể lắng nghe các muộn phiền của cậu đồng thời là người được cậu lắng nghe các câu chuyện của tớ, cho dù sau này ta không còn là bạn của nhau, dù sau này không còn liên lạc và đi các con đường khác nhau thì tớ mong là cậu sẽ luôn hạnh phúc trên con đường cậu đã chọn á. "},
      { text: "Đến đây là hết những gì tớ muốn chia sẻ với cậu rồi:3. Lời cuối cùng tớ muốn nói là chúc cậu ngày càng hạnh phúc nha, nụ cười của cậu đẹp lắm á, nó đủ sức để cứu rỗi một con người á:33. Nếu cậu buồn thì cậu cứ khóc cho đã đi rồi sau đó hãy đứng lên và bước tiếp nhé. Thiên thần của tớ.:3 ", audio: "music/Hoàng Hôn Chiều Hạ.mp3"}
      
    ];

    function clearTypingEffect() {
      typingTimeouts.forEach(t => clearTimeout(t));
      typingTimeouts = [];
    }

    function typeTextEffect(element, text, speed = 40) {
      clearTypingEffect();
      element.innerHTML = '';
      let index = 0;
      function typeChar() {
        if (index < text.length) {
          const char = text.charAt(index);
          if (char === '<') {
            const close = text.indexOf('>', index);
            element.innerHTML += text.slice(index, close + 1);
            index = close + 1;
          } else {
            element.innerHTML += char;
            index++;
          }
          typingTimeouts.push(setTimeout(typeChar, speed));
        }
      }
      typeChar();
    }

    function displayNotebookPage(pageIndex) {
      const page = notebookPages[pageIndex];
      if (page.image) popupImage.src = page.image;
      else popupImage.src = "";

      if (page.text) typeTextEffect(popupText, page.text);
      else popupText.innerHTML = "";

      if (page.audio) {
        popupAudio.src = page.audio;
        popupAudio.play();
      } else {
        popupAudio.pause();
        popupAudio.removeAttribute("src");
      }

      bgMusic.pause();
      musicStarted = false;
    }

    function openPopup() {
      currentPage = 0;
      displayNotebookPage(currentPage);
      popup.classList.remove("hidden", "fade-out");
      popup.style.opacity = "1";
    }

    function closePopup() {
      popup.classList.add("hidden");
      clearTypingEffect();
      popupAudio.pause();
      popupAudio.currentTime = 0;
      if (!musicStarted) {
        bgMusic.play();
        musicStarted = true;
      }
    }

    nextPageBtn.addEventListener("click", () => {
      if (currentPage < notebookPages.length - 1) {
        currentPage++;
        displayNotebookPage(currentPage);
      }
    });

    popup.addEventListener("click", (event) => {
      if (event.target === popup) closePopup();
    });

    popupAudio.addEventListener("ended", () => {
      if (!musicStarted) {
        bgMusic.play();
        musicStarted = true;
      }
    });

    popupImage.addEventListener("click", () => {
      popupImage.classList.toggle("zoomed");
    });

    volumeControl.addEventListener("input", () => {
      const volume = parseFloat(volumeControl.value);
      bgMusic.volume = volume;
      popupAudio.volume = volume;
    });

    function createRainDrops() {
      for (let i = 0; i < 100; i++) {
        const drop = document.createElement("div");
        drop.className = "raindrop";
        drop.style.left = Math.random() * 100 + "vw";
        drop.style.animationDuration = 0.5 + Math.random() * 0.5 + "s";
        rainScene.appendChild(drop);
      }
    }

    function showRainScene() {
      mainContent.classList.add("hidden");
      rainScene.style.display = "block";
      musicStarted = false;
      if (!rainCreated) {
        createRainDrops();
        rainCreated = true;
      }
    }

    function backToRoom() {
      rainScene.style.display = "none";
      mainContent.classList.remove("hidden");
      bgMusic.play();
      musicStarted = true;
    }

    document.querySelector(".notebookBtn")?.addEventListener("click", openPopup);
    document.querySelector(".doorBtn")?.addEventListener("click", showRainScene);
    backBtn.addEventListener("click", backToRoom);

    setTimeout(() => {
      loadingScreen.classList.add("hidden");
      mainContent.classList.remove("hidden");
      document.querySelector(".fade-in")?.classList.add("visible");
      bgMusic.play();
      musicStarted = true;
    }, 2000);
  };
const computer = document.querySelector('.computer');
const chatbox = document.getElementById('chatbox');

// Các câu random
const texts = [
    "Nếu tớ có thể trở thành ngôi sao thì tớ có thể dõi theo cậu từ trên trời cao...",
    "Nếu có lỗi xảy ra mong cậu hãy bỏ qua:')",
    "Tớ mong cậu có thể sống hạnh phúc...",
];

let typingInterval; // để clear interval typing
let index = 0;
let selectedText = "";

computer.addEventListener('mouseenter', () => {
    chatbox.textContent = '';
    index = 0;
    // Random 1 câu
    selectedText = texts[Math.floor(Math.random() * texts.length)];

    typingInterval = setInterval(() => {
        if (index < selectedText.length) {
            chatbox.textContent += selectedText[index];
            index++;
        } else {
            clearInterval(typingInterval);
        }
    }, 50); // tốc độ gõ chữ (ms)
});

computer.addEventListener('mouseleave', () => {
    clearInterval(typingInterval);
});

