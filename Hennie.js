document.addEventListener("DOMContentLoaded", () => {
    // Loading và hiệu ứng fade-in
    setTimeout(() => {
        const loadingScreen = document.getElementById("loadingScreen");
        const content = document.querySelector(".content");

        loadingScreen.style.opacity = "0";
        setTimeout(() => {
            loadingScreen.style.display = "none";
            content.classList.remove("hidden");

            const fadeElements = document.querySelectorAll(".fade-in");
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                    }
                });
            }, { threshold: 0.2 });

            fadeElements.forEach(el => observer.observe(el));
        }, 500);
    }, 3000);

    // Điều chỉnh âm lượng
    const volumeControl = document.getElementById("volume");
    const bgMusic = document.getElementById("bg-music");
    if (volumeControl && bgMusic) {
        volumeControl.oninput = (e) => {
            bgMusic.volume = e.target.value;
        };
    }

    // --- Popup notebook ---
    const popup = document.getElementById("popup");
    const popupImage = document.getElementById("popupImage");
    const popupText = document.getElementById("popupText");
    const popupMusic = document.getElementById("popupMusic");
    const closePopup = document.getElementById("closePopup");
    const nextBtn = document.getElementById("nextBtn");

    const popupPages = [
        {
            image: "image/Screenshot (9).png",
            text: "Chào cậu! Đây là một góc nhỏ để tớ lưu giữ những điều đáng yêu~",
            music: "music/Hennie.m4a"
        },
        {
            image: "image/photo2.jpg",
            text: "Trang thứ hai nè, có tấm ảnh tớ rất thích~",
        },
        {
            text: "Còn đây là vài suy nghĩ vu vơ của tớ khi đêm xuống...",
        }
    ];
    let currentPage = 0;

    window.openPopup = () => {
        popup.classList.remove("hidden");
        updatePopupContent();
    };

    closePopup.addEventListener("click", () => {
        popup.classList.add("hidden");
    });

    popup.addEventListener("click", (e) => {
        if (e.target === popup) {
            popup.classList.add("hidden");
        }
    });

    if (popupImage) {
        popupImage.addEventListener("click", () => {
            const overlay = document.getElementById("imageOverlay");
            const enlarged = document.getElementById("enlargedImage");
            enlarged.src = popupImage.src;
            overlay.classList.remove("hidden");
        });
    }

    document.getElementById("closeOverlay").addEventListener("click", () => {
        document.getElementById("imageOverlay").classList.add("hidden");
    });

    document.getElementById("imageOverlay").addEventListener("click", (e) => {
        if (e.target === e.currentTarget) {
            e.currentTarget.classList.add("hidden");
        }
    });

    function updatePopupContent() {
        const page = popupPages[currentPage];

        if (page.image) {
            popupImage.src = page.image;
            popupImage.classList.remove("hidden");
        } else {
            popupImage.classList.add("hidden");
        }

        popupText.innerHTML = `<p>${page.text}</p>`;

        if (page.music) {
            popupMusic.src = page.music;
            popupMusic.load();
            popupMusic.play().catch(() => {
                console.log("Tự động phát nhạc bị chặn bởi trình duyệt.");
            });
        } else {
            popupMusic.pause();
            popupMusic.src = "";
        }
    }

    nextBtn.addEventListener("click", () => {
        currentPage = (currentPage + 1) % popupPages.length;
        updatePopupContent();
    });

    // --- Cảnh mưa ---
    const doorBtn = document.querySelector('.doorBtn');
    const rainScene = document.getElementById("rainScene");
    const mainContent = document.getElementById("mainContent");

    if (doorBtn) {
        doorBtn.addEventListener("click", () => {
            mainContent.classList.add("fade-out");
            setTimeout(() => {
                mainContent.style.display = "none";
                rainScene.style.display = "block";
                showRainScene();
            }, 1000);
        });
    }

    function generateRain() {
        rainScene.innerHTML = "";
        for (let i = 0; i < 100; i++) {
            const drop = document.createElement("div");
            drop.className = "raindrop";
            drop.style.left = Math.random() * 100 + "%";
            drop.style.animationDuration = (Math.random() * 1 + 1) + "s";
            drop.style.opacity = Math.random();
            rainScene.appendChild(drop);
        }
    }

    function showRainScene() {
        const mainContent = document.getElementById("mainContent");
        const rainScene = document.getElementById("rainScene");
        const backBtn = document.getElementById("backBtn");
    
        mainContent.classList.add("fade-out-smooth");
    
        setTimeout(() => {
            mainContent.style.display = "none";
            mainContent.classList.remove("fade-out-smooth", "visible");
    
            generateRain();
            rainScene.style.display = "block";
            rainScene.classList.remove("hidden");
            rainScene.classList.add("fade-in-smooth", "visible");
    
            // Hiện nút quay lại
            if (backBtn) {
                backBtn.style.display = "block";
                backBtn.style.opacity = "6";
            }
        }, 1000);
    }
    
    // Nút quay lại từ cảnh mưa
document.getElementById("backBtn").addEventListener("click", () => {
    const rainScene = document.getElementById("rainScene");
    const mainContent = document.getElementById("mainContent");
    const backBtn = document.getElementById("backBtn");

    rainScene.classList.remove("fade-in-smooth");
    rainScene.classList.add("fade-out-smooth");

    setTimeout(() => {
        rainScene.style.display = "none";
        rainScene.innerHTML = ""; // Xoá mưa cũ

        // Ẩn nút quay lại
        if (backBtn) {
            backBtn.style.display = "none";
        }

        mainContent.style.display = "block";
        mainContent.classList.remove("fade-out-smooth", "hidden");
        mainContent.classList.add("fade-in-smooth", "visible");
    }, 1000);
});
});
