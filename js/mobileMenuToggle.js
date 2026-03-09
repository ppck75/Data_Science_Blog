const menuButton = document.getElementById("menu-button");
const menu = document.getElementById("menu");

/*
모바일 환경에서 menu, 이 menu는 이벤트 위임으로 최적화하면 불필요한 코드가 많은 함수입니다. 시간상 최적화하지 않고 넘깁니다.
*/
const mobileMenu = document.getElementById("mobileMenu");

window.addEventListener("click", (event) => {
    if (event.target === menuButton || menuButton.contains(event.target)) {
        if (mobileMenu.innerHTML === "") {
            mobileMenu.innerHTML = menu.innerHTML;
            const menuItems = mobileMenu.querySelectorAll("a");
            menuItems.forEach((item, index) => {
                item.classList.add(...mobileMenuStyle.split(" "));
                if (index == 0) {
                    item.classList.add("mt-1.5");
                }
                item.style.animation = `slideDown forwards ${index * 0.2}s`;
            });
        } else {
            mobileMenu.innerHTML = "";
        }
    } else {
        const menuItem = event.target.closest("a");
        if (!menuItem || !mobileMenu.contains(menuItem)) {
            mobileMenu.innerHTML = "";
            return;
        }

        event.preventDefault();
        const menuName = menuItem.dataset.menuName;
        const menuDownloadUrl = menuItem.dataset.menuDownloadUrl;
        if (!menuName) {
            mobileMenu.innerHTML = "";
            return;
        }

        if (menuName === "blog.md") {
            if (blogList.length === 0) {
                // 블로그 리스트 로딩
                initDataBlogList().then(() => {
                    renderBlogList();
                });
            } else {
                renderBlogList();
            }
            // console.log(origin)
            const url = new URL(origin);
            url.searchParams.set("menu", menuName);
            window.history.pushState({}, "", url);
            mobileMenu.innerHTML = "";
        } else {
            renderOtherContents({
                name: menuName,
                download_url: menuDownloadUrl || origin + "menu/" + menuName,
            });
            mobileMenu.innerHTML = "";
        }
    }
});
