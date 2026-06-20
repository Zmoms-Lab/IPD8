document.addEventListener("DOMContentLoaded", async () => {
    await loadLayout();
    fixPathForCurrentPage();
    initHeader();
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
}

function initHeader() {
    const header = document.getElementById("siteHeader");
    const menuToggle = document.getElementById("menuToggle");
    const mobileMenu = document.getElementById("mobileMenu");

    if (!header) return;

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

