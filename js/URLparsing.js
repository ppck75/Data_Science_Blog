const defaultTitle = "WENIVLOG";
const url = new URL(window.location.href);
const origin = url.origin + url.pathname;
const pathParts = url.pathname.split("/").filter((part) => part.length > 0);
const isLocal = url.hostname === "127.0.0.1" || url.hostname === "localhost";

if (window.location.pathname.endsWith("/index.html")) {
  pathParts.pop();
  const newPath = window.location.pathname.replace(/index\.html$/, "");
  history.replaceState(null, "", newPath);
}

function bindBlogTitleNavigation() {
  const blogTitle = document.getElementById("blog-title");
  blogTitle.innerText = siteConfig.blogTitle || defaultTitle;
  document.title = siteConfig.blogTitle || defaultTitle;

  blogTitle.onclick = () => {
    if (isLocal) {
      const mainUrl = new URL(`http://127.0.0.1${url.port ? ":" + url.port : ""}`);
      window.history.pushState({}, "", mainUrl);
      renderBlogList();
      return;
    }

    if (!siteConfig.username || !siteConfig.repositoryName) {
      const urlConfig = extractFromUrl();
      siteConfig.username = siteConfig.username || urlConfig.username;
      siteConfig.repositoryName =
        siteConfig.repositoryName || urlConfig.repositoryName;
    }

    const mainUrl = new URL(
      `https://${siteConfig.username}.github.io/${siteConfig.repositoryName}/`
    );
    window.history.pushState({}, "", mainUrl);
    renderBlogList();
  };
}

bindBlogTitleNavigation();

window.addEventListener("popstate", () => {
  const currentUrl = new URL(window.location.href);
  const queryType = currentUrl.search.split("=")[0];
  const queryValue = currentUrl.search.split("=")[1];

  if (!queryValue || queryValue === "blog.md") {
    renderBlogList();
    return;
  }

  if (queryType === "?menu") {
    renderOtherContents(decodeURI(queryValue));
    return;
  }

  if (queryType === "?post") {
    const postName = decodeURI(queryValue).replaceAll("+", " ");
    renderPostByName(postName, false);
  }
});
