document.addEventListener("DOMContentLoaded", async () => {
    await loadLayout();
    fixPathForCurrentPage();
    initHeader();
    initChatWidget();
});

async function loadLayout() {
    const isSubPage = window.location.pathname.includes("/page/");
    const basePath = isSubPage ? "../" : "./";

    const header = document.getElementById("header");
    const footer = document.getElementById("footer");

    if (header) {
        try {
            const res = await fetch(`${basePath}container/header.html`);
            header.innerHTML = await res.text();
        } catch (error) {
            header.innerHTML = `
                <div style="padding:16px;background:#ffe0e0;color:#900;">
                    Không tải được header. Hãy chạy bằng Live Server.
                </div>
            `;
        }
    }

    if (footer) {
        try {
            const res = await fetch(`${basePath}container/footer.html`);
            footer.innerHTML = await res.text();
        } catch (error) {
            footer.innerHTML = `
                <div style="padding:16px;background:#ffe0e0;color:#900;">
                    Không tải được footer. Hãy chạy bằng Live Server.
                </div>
            `;
        }
    }
}

function fixPathForCurrentPage() {
    const isSubPage = window.location.pathname.includes("/page/");
    const basePath = isSubPage ? "../" : "./";

    const logoImages = document.querySelectorAll(".header-logo img, .footer-brand img");
    logoImages.forEach(img => {
        img.src = `${basePath}images/IPD8.png`;
    });

    const homeLinks = document.querySelectorAll('a[href="./index.html"]');
    homeLinks.forEach(link => {
        link.href = `${basePath}index.html`;
    });

    const aboutLinks = document.querySelectorAll('a[href="./page/gioithieu.html"]');
    aboutLinks.forEach(link => {
        link.href = isSubPage ? "./gioithieu.html" : "./page/gioithieu.html";
    });

    const onlineLearningLinks = document.querySelectorAll('a[href="./page/hoc-truc-tuyen.html"]');
    onlineLearningLinks.forEach(link => {
        link.href = isSubPage ? "./hoc-truc-tuyen.html" : "./page/hoc-truc-tuyen.html";
    });
}

function initHeader() {
    const header = document.getElementById("siteHeader");
    const menuToggle = document.getElementById("menuToggle");
    const mobileMenu = document.getElementById("mobileMenu");

    if (!header) return;

    const currentPath = window.location.pathname;
    const navLinks = header.querySelectorAll(".nav-link, .mobile-menu a");
    navLinks.forEach(link => {
        link.classList.remove("active");

        const href = link.getAttribute("href") || "";
        const isHome = currentPath.endsWith("/") || currentPath.endsWith("/index.html");
        const isOnline = currentPath.includes("hoc-truc-tuyen.html");

        if ((isHome && href.includes("index.html")) || (isOnline && href.includes("hoc-truc-tuyen.html"))) {
            link.classList.add("active");
        }
    });

    function handleScroll() {
        if (window.scrollY > 30) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener("click", () => {
            menuToggle.classList.toggle("active");
            mobileMenu.classList.toggle("active");
        });

        const mobileLinks = mobileMenu.querySelectorAll("a");
        mobileLinks.forEach(link => {
            link.addEventListener("click", () => {
                menuToggle.classList.remove("active");
                mobileMenu.classList.remove("active");
            });
        });
    }
}

function initChatWidget() {
    const chatWidget = document.getElementById("chatWidget");
    const chatToggle = document.getElementById("chatToggle");
    const chatClose = document.getElementById("chatClose");
    const chatPanel = document.getElementById("chatPanel");
    const chatForm = document.getElementById("chatForm");
    const chatInput = document.getElementById("chatInput");
    const chatMessages = document.getElementById("chatMessages");

    if (!chatWidget || !chatToggle || !chatPanel) return;

    function setChatOpen(isOpen) {
        chatWidget.classList.toggle("active", isOpen);
        chatPanel.setAttribute("aria-hidden", String(!isOpen));
        chatToggle.setAttribute("aria-label", isOpen ? "Đóng chat" : "Mở chat");
    }

    chatToggle.addEventListener("click", () => {
        setChatOpen(!chatWidget.classList.contains("active"));
    });

    if (chatClose) {
        chatClose.addEventListener("click", () => setChatOpen(false));
    }

    chatPanel.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => setChatOpen(false));
    });

    if (chatForm && chatInput && chatMessages) {
        chatForm.addEventListener("submit", event => {
            event.preventDefault();

            const message = chatInput.value.trim();
            if (!message) return;

            appendChatMessage(message, "user");
            chatInput.value = "";

            window.setTimeout(() => {
                appendChatMessage(
                    "IPD8 đã nhận tin nhắn. Ba mẹ có thể để lại thông tin ở form, đội ngũ sẽ liên hệ tư vấn sớm.",
                    "bot"
                );
            }, 450);
        });
    }

    function appendChatMessage(message, type) {
        const item = document.createElement("div");
        item.className = `chat-message ${type}`;
        item.textContent = message;
        chatMessages.appendChild(item);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

