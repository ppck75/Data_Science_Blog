function waitForMathJax(maxWaitMs = 5000) {
  return new Promise((resolve) => {
    const start = Date.now();

    (function check() {
      if (window.MathJax && window.MathJax.typesetPromise) {
        resolve(true);
        return;
      }

      if (Date.now() - start > maxWaitMs) {
        resolve(false);
        return;
      }

      setTimeout(check, 50);
    })();
  });
}

function preprocessMathDelimiters(text) {
  if (!text) {
    return text;
  }

  return text
    .replace(/\\\[/g, "\\\\[")
    .replace(/\\\]/g, "\\\\]")
    .replace(/\\\(/g, "\\\\(")
    .replace(/\\\)/g, "\\\\)");
}

async function typesetMath() {
  const ready = await waitForMathJax();
  if (!ready) {
    return;
  }

  try {
    const target = document.getElementById("contents") || document.body;
    if (window.MathJax.typesetClear) {
      window.MathJax.typesetClear([target]);
    }
    await window.MathJax.typesetPromise([target]);
  } catch (error) {
    console.error("MathJax typeset error:", error);
  }
}

function getPostEntries(source = blogList) {
  return source
    .map((post) => {
      const info = extractFileInfo(post.name);
      return info ? { post, info } : null;
    })
    .filter(Boolean);
}

function getPostSummary(postInfo) {
  return (
    postInfo.description ||
    "데이터 분석과 머신러닝 학습 내용을 정리한 글입니다."
  );
}

function getReadableText(rawText) {
  if (!rawText) {
    return "";
  }

  try {
    const notebook = JSON.parse(rawText);
    if (Array.isArray(notebook.cells)) {
      return notebook.cells
        .map((cell) => (Array.isArray(cell.source) ? cell.source.join(" ") : ""))
        .join(" ");
    }
  } catch (error) {
    // Plain markdown/text path.
  }

  return rawText
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[.*?\]\(.*?\)/g, " ")
    .replace(/\[(.*?)\]\(.*?\)/g, "$1")
    .replace(/[#>*_~\-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function estimateReadTime(rawText) {
  const readable = getReadableText(rawText);
  const characterCount = readable.replace(/\s/g, "").length;
  const minutes = Math.max(1, Math.ceil(characterCount / 550));
  return `예상 읽기 ${minutes}분`;
}

function getCategoryCounts(source = blogList) {
  const counts = {};

  getPostEntries(source).forEach(({ info }) => {
    counts[info.category] = (counts[info.category] || 0) + 1;
  });

  return counts;
}

function sortCategoriesByCount(counts = {}) {
  return Object.keys(counts).sort((a, b) => {
    if (counts[b] !== counts[a]) {
      return counts[b] - counts[a];
    }
    return a.localeCompare(b);
  });
}

function closeCategoryOverview() {
  const toggleButton = document.getElementById("category-toggle-button");
  const overlay = document.getElementById("category-overview-overlay");
  if (!overlay) {
    return;
  }

  overlay.classList.remove("is-open");
  overlay.hidden = true;
  document.body.style.overflow = "";
  toggleButton?.classList.remove("is-active");
}

function renderCategoryOverviewList(currentCategory = null) {
  const list = document.getElementById("category-overview-list");
  const totalNode = document.getElementById("category-overview-total");
  if (!list || !totalNode) {
    return;
  }

  const counts = getCategoryCounts();
  const categories = sortCategoriesByCount(counts);
  totalNode.textContent = String(blogList.length);
  list.innerHTML = "";

  const allButton = document.createElement("button");
  allButton.type = "button";
  allButton.classList.add(...categoryItemStyle.split(" "));
  if (!currentCategory) {
    allButton.classList.add("is-active");
  }
  allButton.innerHTML = `<span class="sidebar-category-name">All posts</span><span class="${categoryItemCountStyle}">(${blogList.length})</span>`;
  allButton.addEventListener("click", () => {
    closeCategoryOverview();
    renderBlogList();
  });
  list.appendChild(allButton);

  categories.forEach((category) => {
    const item = document.createElement("button");
    item.type = "button";
    item.classList.add(...categoryItemStyle.split(" "));
    if (category === currentCategory) {
      item.classList.add("is-active");
    }
    item.innerHTML = `<span class="sidebar-category-name">${category}</span><span class="${categoryItemCountStyle}">(${counts[category]})</span>`;
    item.addEventListener("click", () => {
      closeCategoryOverview();
      search(category, "category");
    });
    list.appendChild(item);
  });
}

function openCategoryOverview(currentCategory = null) {
  const toggleButton = document.getElementById("category-toggle-button");
  const overlay = document.getElementById("category-overview-overlay");
  if (!overlay || !toggleButton) {
    return;
  }

  renderCategoryOverviewList(currentCategory);
  if (blogList.length === 0 && !isInitData) {
    initDataBlogList().then(() => renderCategoryOverviewList(currentCategory));
  }
  overlay.hidden = false;
  requestAnimationFrame(() => {
    overlay.classList.add("is-open");
  });
  document.body.style.overflow = "hidden";
  toggleButton.classList.add("is-active");
}

function initializeCategoryOverviewToggle() {
  const toggleButton = document.getElementById("category-toggle-button");
  const overlay = document.getElementById("category-overview-overlay");
  const closeButton = document.getElementById("category-overview-close");
  if (!toggleButton || !overlay || !closeButton || toggleButton.dataset.bound === "true") {
    return;
  }

  toggleButton.addEventListener("click", () => {
    if (overlay.hidden) {
      openCategoryOverview();
      return;
    }
    closeCategoryOverview();
  });

  closeButton.addEventListener("click", closeCategoryOverview);

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
      closeCategoryOverview();
    }
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !overlay.hidden) {
      closeCategoryOverview();
    }
  });

  toggleButton.dataset.bound = "true";
}

function syncCategoryToggleVisibility(mode = "detail") {
  const toggleButton = document.getElementById("category-toggle-button");
  if (!toggleButton) {
    return;
  }

  const showOnDesktop = mode === "list";
  toggleButton.classList.toggle("is-hidden", !showOnDesktop);
  if (!showOnDesktop) {
    closeCategoryOverview();
  }
}

function countCategoryPosts(category) {
  return getPostEntries().filter(({ info }) => info.category === category).length;
}

function getTopCategories(limit = 5) {
  return Object.entries(getCategoryCounts())
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit);
}

function findPostByName(postName) {
  return blogList.find((post) => post.name === postName) || null;
}

function resolvePostDownloadUrl(post) {
  if (!post) {
    return "";
  }

  if (!isLocal && localDataUsing) {
    return `${url.origin}/${siteConfig.repositoryName}${post.download_url}`;
  }

  return post.download_url;
}

function resolveMenuDownloadUrl(menu) {
  if (!menu) {
    return "";
  }

  if (!isLocal && localDataUsing) {
    return `${url.origin}/${siteConfig.repositoryName}${menu.download_url}`;
  }

  return menu.download_url;
}

const missingThumbnailText = "\uC774\uBBF8\uC9C0 \uC5C6\uC74C";

function createThumbnailPlaceholder(className, label = "") {
  const placeholder = document.createElement("div");
  placeholder.className = `${className} media-placeholder`;
  placeholder.setAttribute("role", "img");
  placeholder.setAttribute("aria-label", label || missingThumbnailText);

  const badge = document.createElement("span");
  badge.className = "media-placeholder-badge";
  badge.textContent = missingThumbnailText;
  placeholder.appendChild(badge);

  if (label) {
    const name = document.createElement("span");
    name.className = "media-placeholder-name";
    name.textContent = label;
    placeholder.appendChild(name);
  }

  return placeholder;
}

function createThumbnailNode({ src = "", label = "", alt = "", className = "" }) {
  if (!src) {
    return createThumbnailPlaceholder(className, label);
  }

  const image = document.createElement("img");
  image.className = className;
  image.src = src;
  image.alt = alt || label || "thumbnail";
  image.addEventListener(
    "error",
    () => {
      image.replaceWith(createThumbnailPlaceholder(className, label));
    },
    { once: true }
  );

  return image;
}

function getHomeIntro() {
  const categories = getTopCategories(4).map(([category]) => category).join(", ");
  return `머신러닝, 딥러닝, 데이터 분석 학습 기록을 축적하는 개인 아카이브입니다. ${
    categories ? `최근에는 ${categories} 주제를 중심으로 정리하고 있습니다.` : ""
  }`;
}

function createHeroChip(text) {
  const chip = document.createElement("span");
  chip.className = "hero-chip";
  chip.textContent = text;
  return chip;
}

function createHeroStat(value, label) {
  const stat = document.createElement("div");
  stat.className = "hero-stat";

  const strong = document.createElement("strong");
  strong.textContent = value;
  stat.appendChild(strong);

  const span = document.createElement("span");
  span.textContent = label;
  stat.appendChild(span);

  return stat;
}

function createSidebarHead(kicker, title) {
  const head = document.createElement("div");
  head.className = "sidebar-card-head";
  head.innerHTML = `<div><p class="sidebar-card-kicker">${kicker}</p><h3 class="sidebar-card-title">${title}</h3></div>`;
  return head;
}

function createSidebarStatItem(label, value) {
  const item = document.createElement("div");
  item.className = "sidebar-stat-item";

  const labelNode = document.createElement("span");
  labelNode.className = "sidebar-stat-label";
  labelNode.textContent = label;
  item.appendChild(labelNode);

  const valueNode = document.createElement("strong");
  valueNode.className = "sidebar-category-name";
  valueNode.textContent = value;
  item.appendChild(valueNode);

  return item;
}

function createSidebarPostLink(entry) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "sidebar-post-link";
  button.addEventListener("click", () => openPost(entry.post, entry.info));

  const body = document.createElement("div");

  const title = document.createElement("div");
  title.className = "sidebar-post-title";
  title.textContent = entry.info.title;
  body.appendChild(title);

  const meta = document.createElement("div");
  meta.className = "sidebar-post-date";
  meta.textContent = `${entry.info.category} · ${formatDate(entry.info.date)}`;
  body.appendChild(meta);

  button.appendChild(body);

  const arrow = document.createElement("span");
  arrow.className = "sidebar-post-meta";
  arrow.textContent = "→";
  button.appendChild(arrow);

  return button;
}

function setBlogLayoutMode(mode = "detail") {
  const shell = document.querySelector(".blog-shell");
  const sidebar = document.getElementById("sidebar-column");
  const contents = document.getElementById("contents");
  if (!shell || !sidebar) {
    return;
  }

  const isWideMode = mode === "list" || mode === "about-me";
  shell.classList.toggle("is-wide-view", isWideMode);
  contents?.classList.toggle("is-about-me-view", mode === "about-me");
  sidebar.hidden = isWideMode;
  syncCategoryToggleVisibility(mode);
}

function renderHomeHero(source = blogList) {
  const hero = document.getElementById("home-hero");
  hero.innerHTML = "";

  const entries = getPostEntries(source);
  if (entries.length === 0) {
    hero.classList.add("is-hidden");
    return;
  }

  hero.classList.remove("is-hidden");

  const latestEntry = entries[0];
  const counts = getCategoryCounts();
  const topCategories = getTopCategories(5);

  const heroShell = document.createElement("div");
  heroShell.className = "home-hero-shell";

  const heroCard = document.createElement("section");
  heroCard.className = "hero-card";

  const kicker = document.createElement("p");
  kicker.className = "hero-kicker";
  kicker.textContent = "Personal Data Science Archive";
  heroCard.appendChild(kicker);

  const title = document.createElement("h2");
  title.className = "hero-title";
  title.textContent = siteConfig.blogTitle || "Data Science Blog";
  heroCard.appendChild(title);

  const summary = document.createElement("p");
  summary.className = "hero-summary";
  summary.textContent = getHomeIntro();
  heroCard.appendChild(summary);

  const heroMetaRow = document.createElement("div");
  heroMetaRow.className = "hero-meta-row";
  heroMetaRow.appendChild(createHeroChip(`${users[0].username}의 아카이브`));
  heroMetaRow.appendChild(
    createHeroChip(`최근 업데이트 ${formatDate(latestEntry.info.date)}`)
  );
  heroMetaRow.appendChild(
    createHeroChip(`카테고리 ${Object.keys(counts).length}개`)
  );
  heroCard.appendChild(heroMetaRow);

  const statGrid = document.createElement("div");
  statGrid.className = "hero-stat-grid";
  statGrid.appendChild(createHeroStat(blogList.length, "published posts"));
  statGrid.appendChild(
    createHeroStat(Object.keys(counts).length, "tracked categories")
  );
  statGrid.appendChild(
    createHeroStat(getTopCategories(1)[0]?.[0] || "-", "main topic")
  );
  heroCard.appendChild(statGrid);

  const categoryList = document.createElement("div");
  categoryList.className = "hero-category-list";
  topCategories.forEach(([category]) => {
    const pill = document.createElement("button");
    pill.type = "button";
    pill.className = "hero-category-pill";
    pill.textContent = category;
    pill.addEventListener("click", () => search(category, "category"));
    categoryList.appendChild(pill);
  });
  heroCard.appendChild(categoryList);

  const heroPanel = document.createElement("aside");
  heroPanel.className = "hero-panel";

  const panelLabel = document.createElement("p");
  panelLabel.className = "hero-panel-label";
  panelLabel.textContent = "Latest article";
  heroPanel.appendChild(panelLabel);

  const feature = document.createElement("article");
  feature.className = "hero-feature";
  feature.addEventListener("click", () => openPost(latestEntry.post, latestEntry.info));

  const featureThumb = createThumbnailNode({
    src: latestEntry.info.thumbnail,
    label: latestEntry.info.thumbnailName,
    alt: latestEntry.info.thumbnailName || latestEntry.info.title,
    className: "hero-feature-thumb",
  });
  feature.appendChild(featureThumb);

  const featureCategory = document.createElement("span");
  featureCategory.className = "hero-feature-category";
  featureCategory.textContent = latestEntry.info.category;
  feature.appendChild(featureCategory);

  const featureTitle = document.createElement("h3");
  featureTitle.className = "hero-feature-title";
  featureTitle.textContent = latestEntry.info.title;
  feature.appendChild(featureTitle);

  const featureSummary = document.createElement("p");
  featureSummary.className = "hero-feature-summary";
  featureSummary.textContent = getPostSummary(latestEntry.info);
  feature.appendChild(featureSummary);

  const featureMeta = document.createElement("div");
  featureMeta.className = "hero-feature-meta";
  featureMeta.textContent = `${formatDate(latestEntry.info.date)} · ${latestEntry.info.fileType.toUpperCase()}`;
  feature.appendChild(featureMeta);

  const featureAction = document.createElement("span");
  featureAction.className = "hero-action";
  featureAction.textContent = "최신 글 읽기";
  feature.appendChild(featureAction);

  heroPanel.appendChild(feature);

  heroShell.appendChild(heroCard);
  heroShell.appendChild(heroPanel);
  hero.appendChild(heroShell);
}

function renderSidebarExtras(context = {}) {
  const sidebarExtras = document.getElementById("sidebar-extras");
  sidebarExtras.innerHTML = "";

  const introCard = document.createElement("section");
  introCard.className = "sidebar-card sidebar-intro";

  const introTitle = document.createElement("h3");
  introTitle.className = "sidebar-intro-title";
  introTitle.textContent = siteConfig.blogTitle || "Data Science Blog";
  introCard.appendChild(introTitle);

  const introText = document.createElement("p");
  introText.className = "sidebar-intro-text";
  introText.textContent = getHomeIntro();
  introCard.appendChild(introText);
  sidebarExtras.appendChild(introCard);

  if (context.currentPost) {
    const contextCard = document.createElement("section");
    contextCard.className = "sidebar-card";
    contextCard.appendChild(createSidebarHead("Current", "This topic"));

    const statList = document.createElement("div");
    statList.className = "sidebar-stat-list";
    statList.appendChild(
      createSidebarStatItem("카테고리", context.currentPost.category)
    );
    statList.appendChild(
      createSidebarStatItem(
        "같은 카테고리 글",
        `${countCategoryPosts(context.currentPost.category)}개`
      )
    );
    statList.appendChild(
      createSidebarStatItem("작성일", formatDate(context.currentPost.date))
    );
    contextCard.appendChild(statList);
    sidebarExtras.appendChild(contextCard);
  }

  const recentCard = document.createElement("section");
  recentCard.className = "sidebar-card";
  recentCard.appendChild(createSidebarHead("Recently", "Latest posts"));

  const recentList = document.createElement("div");
  recentList.className = "sidebar-post-list";
  getPostEntries()
    .slice(0, 5)
    .forEach((entry) => {
      recentList.appendChild(createSidebarPostLink(entry));
    });
  recentCard.appendChild(recentList);
  sidebarExtras.appendChild(recentCard);

  const topicCard = document.createElement("section");
  topicCard.className = "sidebar-card";
  topicCard.appendChild(createSidebarHead("Topics", "Top categories"));

  const topicList = document.createElement("div");
  topicList.className = "sidebar-tag-list";
  getTopCategories(8).forEach(([category, count]) => {
    const tag = document.createElement("button");
    tag.type = "button";
    tag.className = "sidebar-tag";
    tag.textContent = `${category} (${count})`;
    tag.addEventListener("click", () => search(category, "category"));
    topicList.appendChild(tag);
  });
  topicCard.appendChild(topicList);
  sidebarExtras.appendChild(topicCard);
}

function search(keyword, kinds) {
  closeCategoryOverview();
  const normalizedKeyword = keyword ? keyword.toLowerCase().trim() : "";

  if (blogList.length === 0) {
    if (!isInitData) {
      initDataBlogList().then(() => search(keyword, kinds));
    }
    return;
  }

  if (!normalizedKeyword) {
    const searchInput = document.getElementById("search-input");
    const searchKeyword = searchInput.value.toLowerCase();
    const searchResult = blogList.filter((post) =>
      post.name.toLowerCase().includes(searchKeyword)
    );
    renderBlogList(searchResult);
    return;
  }

  if (kinds === "category") {
    const searchResult = blogList.filter((post) => {
      const postInfo = extractFileInfo(post.name);
      return postInfo && postInfo.category.toLowerCase() === normalizedKeyword;
    });
    renderBlogList(searchResult);
    return;
  }

  const searchResult = blogList.filter((post) =>
    post.name.toLowerCase().includes(normalizedKeyword)
  );
  renderBlogList(searchResult);
}

async function renderMenu() {
  document.getElementById("menu").innerHTML = "";
  initializeCategoryOverviewToggle();

  blogMenu.forEach((menu) => {
    const link = document.createElement("a");
    link.classList.add(...menuListStyle.split(" "));
    link.classList.add(`${menu.name}`);
    link.dataset.menuName = menu.name;
    link.dataset.menuDownloadUrl = menu.download_url;
    link.href = menu.download_url;
    link.innerText = menu.name.split(".")[0];

    link.onclick = (event) => {
      event.preventDefault();

      if (menu.name === "blog.md") {
        renderBlogList();
        const nextUrl = new URL(origin);
        nextUrl.searchParams.set("menu", menu.name);
        window.history.pushState({}, "", nextUrl);
      } else {
        renderOtherContents(menu);
      }
    };

    document.getElementById("menu").appendChild(link);
  });

  const searchButton = document.getElementById("search-button");
  const searchCont = document.querySelector(".search-cont");
  let searchInputShow = false;

  window.addEventListener("click", (event) => {
    if (window.innerWidth > 768) {
      return;
    }

    if (event.target === searchButton) {
      searchInputShow = !searchInputShow;
      searchButton.classList.toggle("active", searchInputShow);
      searchCont.classList.toggle("hidden", !searchInputShow);
      searchCont.classList.toggle("block", searchInputShow);
      return;
    }

    if (event.target !== searchCont) {
      searchButton.classList.remove("active");
      searchCont.classList.add("hidden");
      searchInputShow = false;
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      searchButton.classList.add("active");
      searchCont.classList.remove("hidden");
      searchInputShow = true;
      return;
    }

    searchButton.classList.remove("active");
    searchCont.classList.add("hidden");
  });

  const searchInput = document.getElementById("search-input");
  searchInput.onkeyup = (event) => {
    if (event.key === "Enter") {
      search();
    }
  };

  searchInput.onclick = (event) => {
    event.stopPropagation();
  };

  document.querySelector(".search-inp-btn").onclick = (event) => {
    event.stopPropagation();
    search();
  };

  const resetInputButton = document.querySelector(".reset-inp-btn");
  searchInput.addEventListener("input", () => {
    resetInputButton.classList.toggle("hidden", !searchInput.value);
  });
  resetInputButton.addEventListener("click", (event) => {
    event.stopPropagation();
    searchInput.value = "";
    resetInputButton.classList.add("hidden");
  });
}

function createCardElement(fileInfo, index) {
  const isFeatured = index === 0;
  const card = document.createElement("article");
  card.classList.add(
    ...(isFeatured ? bloglistFirstCardStyle : bloglistCardStyle).split(" ")
  );

  const img = createThumbnailNode({
    src: fileInfo.thumbnail,
    label: fileInfo.thumbnailName,
    alt: fileInfo.thumbnailName || fileInfo.title,
    className: isFeatured ? bloglistFirstCardImgStyle : bloglistCardImgStyle,
  });
  card.appendChild(img);

  const cardBody = document.createElement("div");
  cardBody.classList.add(...bloglistCardBodyStyle.split(" "));
  if (isFeatured) {
    cardBody.classList.add("blog-card-featured-body");
  }

  const category = document.createElement("button");
  category.type = "button";
  category.classList.add(...bloglistCardCategoryStyle.split(" "));
  if (isFeatured) {
    category.classList.add("blog-card-category-large");
  }
  category.textContent = fileInfo.category;
  category.onclick = (event) => {
    event.stopPropagation();
    search(fileInfo.category, "category");
  };
  cardBody.appendChild(category);

  const title = document.createElement("h2");
  title.classList.add(...bloglistCardTitleStyle.split(" "));
  if (isFeatured) {
    title.classList.add("blog-card-featured-title");
  }
  title.textContent = fileInfo.title;
  cardBody.appendChild(title);

  const description = document.createElement("p");
  description.classList.add(
    ...(isFeatured
      ? bloglistFirstCardDescriptionStyle
      : bloglistCardDescriptionStyle
    ).split(" ")
  );
  description.textContent = getPostSummary(fileInfo);
  cardBody.appendChild(description);

  const metaRow = document.createElement("div");
  metaRow.className = isFeatured ? "blog-card-featured-meta" : "blog-card-meta";

  const authorDiv = document.createElement("div");
  authorDiv.classList.add(...bloglistCardAuthorDivStyle.split(" "));

  const authorImg = document.createElement("img");
  authorImg.src = users[fileInfo.author]["img"];
  authorImg.alt = users[fileInfo.author]["username"];
  authorImg.classList.add(...bloglistCardAuthorImgStyle.split(" "));
  authorDiv.appendChild(authorImg);

  const author = document.createElement("span");
  author.classList.add(...bloglistCardAuthorStyle.split(" "));
  author.textContent = users[fileInfo.author]["username"];
  authorDiv.appendChild(author);
  metaRow.appendChild(authorDiv);

  const date = document.createElement("span");
  date.classList.add(...bloglistCardDateStyle.split(" "));
  date.textContent = formatDate(fileInfo.date);
  metaRow.appendChild(date);

  cardBody.appendChild(metaRow);
  card.appendChild(cardBody);

  return card;
}

function createEmptyState(message) {
  const empty = document.createElement("div");
  empty.className = "sidebar-card";
  empty.style.gridColumn = "1 / -1";

  const title = document.createElement("h3");
  title.className = "sidebar-card-title";
  title.textContent = "검색 결과가 없습니다.";
  empty.appendChild(title);

  const text = document.createElement("p");
  text.className = "sidebar-intro-text";
  text.textContent = message;
  empty.appendChild(text);

  return empty;
}

function openPost(post, postInfo = extractFileInfo(post.name), shouldPushState = true) {
  setBlogLayoutMode("detail");
  document.getElementById("contents").style.display = "block";
  document.getElementById("blog-posts").style.display = "none";
  document.getElementById("pagination").style.display = "none";
  document.getElementById("home-hero").classList.add("is-hidden");
  renderBlogCategory(postInfo.category);
  renderSidebarExtras({ currentPost: postInfo });
  window.scrollTo({ top: 0, behavior: "smooth" });

  fetch(resolvePostDownloadUrl(post))
    .then((response) => response.text())
    .then((text) =>
      postInfo.fileType === "md"
        ? styleMarkdown("post", text, postInfo)
        : styleJupyter("post", text, postInfo)
    )
    .then(() => {
      if (!shouldPushState) {
        return;
      }

      const nextUrl = new URL(origin);
      nextUrl.searchParams.set("post", post.name);
      window.history.pushState({}, "", nextUrl);
    });
}

function renderPostByName(postName, shouldPushState = false) {
  const post = findPostByName(postName);
  if (post) {
    openPost(post, extractFileInfo(post.name), shouldPushState);
    return;
  }

  const postInfo = extractFileInfo(postName);
  if (!postInfo) {
    styleMarkdown("post", "# Error\n파일명을 확인해주세요.");
    return;
  }

  setBlogLayoutMode("detail");
  document.getElementById("contents").style.display = "block";
  document.getElementById("blog-posts").style.display = "none";
  document.getElementById("pagination").style.display = "none";
  document.getElementById("home-hero").classList.add("is-hidden");
  renderBlogCategory(postInfo.category);
  renderSidebarExtras({ currentPost: postInfo });

  fetch(origin + "blog/" + postName)
    .then((response) => response.text())
    .then((text) =>
      postInfo.fileType === "md"
        ? styleMarkdown("post", text, postInfo)
        : styleJupyter("post", text, postInfo)
    )
    .then(() => {
      if (!shouldPushState) {
        return;
      }

      const nextUrl = new URL(origin);
      nextUrl.searchParams.set("post", postName);
      window.history.pushState({}, "", nextUrl);
    });
}

function renderBlogList(source = null, currentPage = 1) {
  const pageUnit = 10;
  const targetList = source === null ? blogList : source;
  const entries = getPostEntries(targetList);
  const categoryNames = [...new Set(entries.map(({ info }) => info.category))];
  const activeCategory = categoryNames.length === 1 ? categoryNames[0] : null;

  setBlogLayoutMode("list");
  document.getElementById("contents").style.display = "none";
  document.getElementById("blog-posts").style.display = "grid";
  document.getElementById("pagination").style.display = "flex";
  document.getElementById("blog-posts").innerHTML = "";

  renderHomeHero(targetList);
  renderBlogCategory(activeCategory);
  renderSidebarExtras();

  if (targetList.length === 0) {
    document.getElementById("home-hero").classList.add("is-hidden");
    document.getElementById("blog-posts").appendChild(
      createEmptyState("다른 키워드나 카테고리로 다시 찾아보세요.")
    );
    document.getElementById("pagination").style.display = "none";
    return;
  }

  const totalPage = Math.ceil(targetList.length / pageUnit);
  initPagination(totalPage);
  renderPagination(totalPage, currentPage, targetList);

  const startIndex = (currentPage - 1) * pageUnit;
  const endIndex = currentPage * pageUnit;

  targetList.slice(startIndex, endIndex).forEach((post, index) => {
    const postInfo = extractFileInfo(post.name);
    if (!postInfo) {
      return;
    }

    const cardElement = createCardElement(postInfo, index);
    cardElement.onclick = () => openPost(post, postInfo);
    document.getElementById("blog-posts").appendChild(cardElement);
  });
}

function renderOtherContents(menu) {
  const menuItem =
    typeof menu === "string"
      ? {
          download_url: origin + "menu/" + menu,
          name: menu.split("/")[menu.split("/").length - 1],
        }
      : menu;

  const isAboutMePage = menuItem.name === "about_me.md";

  setBlogLayoutMode(isAboutMePage ? "about-me" : "detail");
  document.getElementById("blog-posts").style.display = "none";
  document.getElementById("contents").style.display = "block";
  document.getElementById("pagination").style.display = "none";
  document.getElementById("home-hero").classList.add("is-hidden");

  if (isAboutMePage) {
    document.getElementById("category-list").innerHTML = "";
    document.getElementById("sidebar-extras").innerHTML = "";
  } else {
    renderBlogCategory();
    renderSidebarExtras();
  }

  fetch(resolveMenuDownloadUrl(menuItem))
    .then((response) => response.text())
    .then((text) => styleMarkdown("menu", text, undefined))
    .then(() => {
      const nextUrl = new URL(origin);
      nextUrl.searchParams.set("menu", menuItem.name);
      window.history.pushState({}, "", nextUrl);
    })
    .catch(() => {
      styleMarkdown("menu", "# Error\n파일명을 확인해주세요.");
    });
}

function renderBlogCategory(currentCategory = null) {
  const categoryContainer = document.getElementById("category-list");
  categoryContainer.innerHTML = "";
  categoryContainer.classList.add(...categoryContainerStyle.split(" "));

  const counts = getCategoryCounts();
  const categories = sortCategoriesByCount(counts);

  const allButton = document.createElement("button");
  allButton.type = "button";
  allButton.classList.add(...categoryItemStyle.split(" "));
  if (!currentCategory) {
    allButton.classList.add("is-active");
  }
  allButton.innerHTML = `<span class="sidebar-category-name">All posts</span><span class="${categoryItemCountStyle}">(${blogList.length})</span>`;
  allButton.addEventListener("click", () => renderBlogList());
  categoryContainer.appendChild(allButton);

  categories.forEach((category) => {
    const item = document.createElement("button");
    item.type = "button";
    item.classList.add(...categoryItemStyle.split(" "));
    if (category === currentCategory) {
      item.classList.add("is-active");
    }
    item.innerHTML = `<span class="sidebar-category-name">${category}</span><span class="${categoryItemCountStyle}">(${counts[category]})</span>`;
    item.addEventListener("click", () => search(category, "category"));
    categoryContainer.appendChild(item);
  });
}

function createCategoryStreamItem(entry) {
  const item = document.createElement("article");
  item.className = "category-stream-item";
  item.addEventListener("click", () => openPost(entry.post, entry.info));

  const body = document.createElement("div");

  const title = document.createElement("div");
  title.className = "category-stream-title";
  title.textContent = entry.info.title;
  body.appendChild(title);

  const description = document.createElement("div");
  description.className = "category-stream-desc";
  description.textContent = getPostSummary(entry.info);
  body.appendChild(description);

  item.appendChild(body);

  const badge = document.createElement("span");
  badge.className = "category-stream-badge";
  badge.textContent = entry.info.fileType.toUpperCase();
  item.appendChild(badge);

  const date = document.createElement("span");
  date.className = "category-stream-date";
  date.textContent = formatDate(entry.info.date);
  item.appendChild(date);

  return item;
}

function createRelatedCard(entry) {
  const card = document.createElement("article");
  card.className = "related-card";
  card.addEventListener("click", () => openPost(entry.post, entry.info));

  const thumb = createThumbnailNode({
    src: entry.info.thumbnail,
    label: entry.info.thumbnailName,
    alt: entry.info.thumbnailName || entry.info.title,
    className: "related-card-thumb",
  });
  card.appendChild(thumb);

  const title = document.createElement("h4");
  title.className = "related-card-title";
  title.textContent = entry.info.title;
  card.appendChild(title);

  const meta = document.createElement("div");
  meta.className = "related-card-meta";
  meta.textContent = `${entry.info.category} · ${formatDate(entry.info.date)}`;
  card.appendChild(meta);

  return card;
}

function createAuthorCard(currentPost) {
  const card = document.createElement("section");
  card.className = "post-module";

  const authorWrap = document.createElement("div");
  authorWrap.className = "author-card";

  const avatar = document.createElement("img");
  avatar.className = "author-card-avatar";
  avatar.src = users[currentPost.author]["img"];
  avatar.alt = users[currentPost.author]["username"];
  authorWrap.appendChild(avatar);

  const body = document.createElement("div");
  body.className = "author-card-body";
  body.innerHTML = `<h3>${siteConfig.blogTitle || "Data Science Blog"}</h3><p>${getHomeIntro()}</p>`;
  authorWrap.appendChild(body);

  const action = document.createElement("button");
  action.type = "button";
  action.className = "author-card-action";
  action.textContent = "블로그 홈 보기";
  action.addEventListener("click", () => renderBlogList());
  authorWrap.appendChild(action);

  card.appendChild(authorWrap);
  return card;
}

function getRelatedEntries(currentPost, limit = 4) {
  const entries = getPostEntries().filter(
    ({ info }) => info.title !== currentPost.title
  );
  const sameCategory = entries.filter(
    ({ info }) => info.category === currentPost.category
  );
  const recentDifferent = entries.filter(
    ({ info }) => info.category !== currentPost.category
  );
  return [...sameCategory, ...recentDifferent].slice(0, limit);
}

function appendPostDetailModules(contentsDiv, currentPost) {
  const existing = contentsDiv.querySelector(".post-footer-stack");
  if (existing) {
    existing.remove();
  }

  const footer = document.createElement("section");
  footer.className = "post-footer-stack";

  const sameCategoryPosts = getPostEntries()
    .filter(
      ({ info }) =>
        info.category === currentPost.category && info.title !== currentPost.title
    )
    .slice(0, 5);

  if (sameCategoryPosts.length > 0) {
    const categoryModule = document.createElement("section");
    categoryModule.className = "post-module";

    const head = document.createElement("div");
    head.className = "post-module-header";
    head.innerHTML = `<div><p class="post-module-kicker">Category</p><h3 class="post-module-title">이 블로그 ${currentPost.category} 카테고리 글</h3></div><span class="post-module-arrow">→</span>`;
    head.replaceChildren(head.firstElementChild || head.firstChild);
    categoryModule.appendChild(head);

    const list = document.createElement("div");
    list.className = "category-stream";
    sameCategoryPosts.forEach((entry) => {
      list.appendChild(createCategoryStreamItem(entry));
    });
    categoryModule.appendChild(list);
    footer.appendChild(categoryModule);
  }

  const relatedPosts = getRelatedEntries(currentPost, 4);
  if (relatedPosts.length > 0) {
    const relatedModule = document.createElement("section");
    relatedModule.className = "post-module";

    const head = document.createElement("div");
    head.className = "post-module-header";
    head.innerHTML =
      '<div><p class="post-module-kicker">Continue reading</p><h3 class="post-module-title">관련글</h3></div>';
    relatedModule.appendChild(head);

    const grid = document.createElement("div");
    grid.className = "related-grid";
    relatedPosts.forEach((entry) => {
      grid.appendChild(createRelatedCard(entry));
    });
    relatedModule.appendChild(grid);
    footer.appendChild(relatedModule);
  }

  footer.appendChild(createAuthorCard(currentPost));
  contentsDiv.appendChild(footer);
}

function initPagination(totalPage) {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";
  pagination.classList.add(...paginationStyle.split(" "));

  if (totalPage <= 1) {
    pagination.style.display = "none";
    return;
  }

  pagination.style.display = "flex";

  const prevButton = document.createElement("button");
  prevButton.type = "button";
  prevButton.id = "page-prev";
  prevButton.classList.add(...pageMoveButtonStyle.split(" "));

  const pageNav = document.createElement("nav");
  pageNav.id = "pagination-list";
  pageNav.classList.add(...pageNumberListStyle.split(" "));

  for (let i = 0; i < Math.min(totalPage, 7); i += 1) {
    const page = document.createElement("button");
    page.type = "button";
    page.classList.add(...pageNumberStyle.split(" "));
    pageNav.appendChild(page);
  }

  const nextButton = document.createElement("button");
  nextButton.type = "button";
  nextButton.id = "page-next";
  nextButton.classList.add(...pageMoveButtonStyle.split(" "));

  pagination.append(prevButton, pageNav, nextButton);
}

function getPaginationLabels(totalPage, currentPage) {
  if (totalPage <= 7) {
    return Array.from({ length: totalPage }, (_, index) => index + 1);
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, "...", totalPage];
  }

  if (currentPage > totalPage - 4) {
    return [
      1,
      "...",
      totalPage - 4,
      totalPage - 3,
      totalPage - 2,
      totalPage - 1,
      totalPage,
    ];
  }

  return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPage];
}

function renderPagination(totalPage, currentPage, targetList = null) {
  if (totalPage <= 1) {
    return;
  }

  const prevButton = document.getElementById("page-prev");
  const nextButton = document.getElementById("page-next");
  const pageList = document.querySelectorAll("#pagination nav button");

  prevButton.disabled = currentPage === 1;
  nextButton.disabled = currentPage === totalPage;

  prevButton.onclick = () => {
    renderBlogList(targetList, currentPage - 1);
  };
  nextButton.onclick = () => {
    renderBlogList(targetList, currentPage + 1);
  };

  const labels = getPaginationLabels(totalPage, currentPage);
  pageList.forEach((page, index) => {
    const label = labels[index];
    page.textContent = label;
    page.classList.toggle("is-active", label === currentPage);

    if (label === "...") {
      page.disabled = true;
      return;
    }

    page.disabled = false;
    page.onclick = () => {
      renderBlogList(targetList, label);
    };
  });
}

async function initialize() {
  await initDataBlogMenu();
  renderMenu();

  await initDataBlogList();
  renderBlogCategory();
  renderSidebarExtras();

  const searchKey = url.search.split("=")[1];
  const queryType = url.search.split("=")[0];

  if (!searchKey || searchKey === "blog.md") {
    renderBlogList();
    return;
  }

  if (queryType === "?menu") {
    renderOtherContents(searchKey);
    return;
  }

  if (queryType === "?post") {
    const postNameDecode = decodeURI(searchKey).replaceAll("+", " ");
    renderPostByName(postNameDecode, false);
  }
}

initialize();
