function detachNativeMarkdownBlocks(root) {
  const nativeBlocks = [];

  root.querySelectorAll("[data-native-markdown]").forEach((node, index) => {
    const placeholder = document.createElement("div");
    placeholder.setAttribute("data-native-markdown-placeholder", index);
    node.parentNode.replaceChild(placeholder, node);
    nativeBlocks.push({ placeholder, node });
  });

  return nativeBlocks;
}

function restoreNativeMarkdownBlocks(nativeBlocks) {
  nativeBlocks.forEach(({ placeholder, node }) => {
    placeholder.replaceWith(node);
  });
}

function applyCommonPostStyles(scope) {
  scope.querySelectorAll("h1").forEach((node) => {
    node.classList.add(...posth1Style.split(" "));
  });
  scope.querySelectorAll("h2").forEach((node) => {
    node.classList.add(...posth2Style.split(" "));
  });
  scope.querySelectorAll("h3").forEach((node) => {
    node.classList.add(...posth3Style.split(" "));
  });
  scope.querySelectorAll("h4").forEach((node) => {
    node.classList.add(...posth4Style.split(" "));
  });
  scope.querySelectorAll("h5").forEach((node) => {
    node.classList.add(...posth5Style.split(" "));
  });
  scope.querySelectorAll("h6").forEach((node) => {
    node.classList.add(...posth6Style.split(" "));
  });

  scope.querySelectorAll("p").forEach((node) => {
    node.classList.add(...postpStyle.split(" "));
  });
  scope.querySelectorAll("img").forEach((node) => {
    node.classList.add(...postimgStyle.split(" "));
  });
  scope.querySelectorAll("a").forEach((node) => {
    node.classList.add(...postaStyle.split(" "));
  });

  scope.querySelectorAll("ul").forEach((node) => {
    node.classList.add(...postulStyle.split(" "));
  });
  scope.querySelectorAll("ol").forEach((node) => {
    node.classList.add(...postolStyle.split(" "));
  });
  scope.querySelectorAll("li").forEach((node) => {
    node.classList.add(...postliStyle.split(" "));
  });

  scope.querySelectorAll("blockquote").forEach((node) => {
    node.classList.add(...postblockquoteStyle.split(" "));
  });

  scope.querySelectorAll("pre").forEach((pre) => {
    pre.classList.add(...postpreStyle.split(" "));

    const code = pre.textContent;
    const copyButton = document.createElement("button");
    copyButton.type = "button";
    copyButton.innerHTML = '<span class="sr-only">코드 복사</span>';
    copyButton.classList.add(...notebookcopyButtonStyle.split(" "));
    copyButton.setAttribute("id", "copy-button");

    copyButton.addEventListener("click", async (event) => {
      event.stopPropagation();
      try {
        await navigator.clipboard.writeText(code);
        alert("코드를 복사했습니다.");
      } catch (error) {
        console.error("Failed to copy text:", error);
        alert("코드 복사에 실패했습니다.");
      }
    });

    pre.appendChild(copyButton);
  });

  scope.querySelectorAll("code").forEach((node) => {
    node.classList.add(...postcodeStyle.split(" "));
  });

  scope.querySelectorAll("table").forEach((table) => {
    table.classList.add(...posttableStyle.split(" "));
    if (!table.parentElement.classList.contains("post-table-wrap")) {
      const wrapper = document.createElement("div");
      wrapper.classList.add("post-table-wrap");
      table.parentNode.insertBefore(wrapper, table);
      wrapper.appendChild(table);
    }
  });

  scope.querySelectorAll("thead").forEach((node) => {
    node.classList.add(...posttheadStyle.split(" "));
  });
  scope.querySelectorAll("th").forEach((node) => {
    node.classList.add(...postthStyle.split(" "));
  });
  scope.querySelectorAll("tbody").forEach((node) => {
    node.classList.add(...posttbodyStyle.split(" "));
  });
  scope.querySelectorAll("td").forEach((node) => {
    node.classList.add(...posttdStyle.split(" "));
  });

  scope.querySelectorAll("hr").forEach((node) => {
    node.classList.add(...posthrStyle.split(" "));
  });
  scope.querySelectorAll("em").forEach((node) => {
    node.classList.add(...postemStyle.split(" "));
  });
  scope.querySelectorAll("strong").forEach((node) => {
    node.classList.add(...poststrongStyle.split(" "));
  });
}

function buildPostHeader(titleInfo, rawText) {
  const titleSection = document.createElement("div");
  titleSection.classList.add(...postsectionStyle.split(" "));
  titleSection.setAttribute("id", "title_section");

  const category = document.createElement("a");
  category.classList.add(...postcategoryStyle.split(" "));
  category.textContent = titleInfo.category;
  category.onclick = (event) => {
    event.preventDefault();
    search(titleInfo.category, "category");
    const nextUrl = new URL(origin);
    nextUrl.searchParams.set("search", titleInfo.category);
    window.history.pushState({}, "", nextUrl);
  };
  titleSection.appendChild(category);

  const title = document.createElement("h1");
  title.classList.add(...posttitleStyle.split(" "));
  title.textContent = titleInfo.title;
  titleSection.appendChild(title);

  const summary = document.createElement("p");
  summary.className = "post-summary";
  summary.textContent =
    titleInfo.description ||
    "데이터 분석과 머신러닝 학습 내용을 정리한 글입니다.";
  titleSection.appendChild(summary);

  const authorDate = document.createElement("div");
  authorDate.classList.add(...postauthordateDivStyle.split(" "));
  titleSection.appendChild(authorDate);

  const authorDiv = document.createElement("div");
  authorDiv.classList.add(...postauthorDivStyle.split(" "));
  authorDate.appendChild(authorDiv);

  const authorImg = document.createElement("img");
  authorImg.src = users[titleInfo.author]["img"];
  authorImg.alt = users[titleInfo.author]["username"];
  authorImg.classList.add(...postauthorImgStyle.split(" "));
  authorDiv.appendChild(authorImg);

  const author = document.createElement("span");
  author.classList.add(...postauthorStyle.split(" "));
  author.textContent = users[titleInfo.author]["username"];
  authorDiv.appendChild(author);

  const date = document.createElement("span");
  date.classList.add(...postdateStyle.split(" "));
  date.textContent = formatDate(titleInfo.date);
  authorDate.appendChild(date);

  if (typeof estimateReadTime === "function") {
    const readTime = document.createElement("span");
    readTime.className = "post-meta-text";
    readTime.textContent = estimateReadTime(rawText);
    authorDate.appendChild(readTime);
  }

  const infoRow = document.createElement("div");
  infoRow.className = "post-info-row";

  const categoryChip = document.createElement("span");
  categoryChip.className = "post-info-chip";
  categoryChip.textContent = `${titleInfo.category} 카테고리`;
  infoRow.appendChild(categoryChip);

  if (typeof countCategoryPosts === "function") {
    const countChip = document.createElement("span");
    countChip.className = "post-info-chip";
    countChip.textContent = `같은 카테고리 글 ${countCategoryPosts(titleInfo.category)}개`;
    infoRow.appendChild(countChip);
  }

  const kindChip = document.createElement("span");
  kindChip.className = "post-info-chip";
  kindChip.textContent = titleInfo.fileType === "ipynb" ? "Notebook Post" : "Article";
  infoRow.appendChild(kindChip);

  titleSection.appendChild(infoRow);

  const image = document.createElement("img");
  image.src = titleInfo.thumbnail;
  image.alt = titleInfo.title;
  image.classList.add(...postimgtitleStyle.split(" "));
  titleSection.appendChild(image);

  return titleSection;
}

function renderIntoContents(root, nativeBlocks) {
  const contentsDiv = document.getElementById("contents");

  restoreNativeMarkdownBlocks(nativeBlocks);
  if (typeof cleanupCustomPageBehaviors === "function") {
    cleanupCustomPageBehaviors();
  }

  while (contentsDiv.firstChild) {
    contentsDiv.removeChild(contentsDiv.firstChild);
  }

  contentsDiv.appendChild(root);

  if (typeof initializeCustomPageBehaviors === "function") {
    initializeCustomPageBehaviors(contentsDiv);
  }

  if (typeof typesetMath !== "undefined") {
    typesetMath();
  }

  hljs.highlightAll();
  return contentsDiv;
}

function styleMarkdown(kinds, text, titleInfo = null) {
  const processedText =
    typeof preprocessMathDelimiters !== "undefined"
      ? preprocessMathDelimiters(text)
      : text;

  const tempDiv = document.createElement("div");
  tempDiv.className = "post-prose";
  tempDiv.innerHTML = marked.parse(processedText);

  const nativeMarkdownBlocks = detachNativeMarkdownBlocks(tempDiv);
  applyCommonPostStyles(tempDiv);

  if (kinds === "post") {
    const titleSection = buildPostHeader(titleInfo, text);
    tempDiv.insertBefore(titleSection, tempDiv.firstChild);
  }

  const contentsDiv = renderIntoContents(tempDiv, nativeMarkdownBlocks);

  if (kinds === "post" && typeof appendPostDetailModules === "function") {
    appendPostDetailModules(contentsDiv, titleInfo, text);
  }
}

function styleJupyter(kinds, text, titleInfo = null) {
  const tempDiv = document.createElement("div");
  tempDiv.className = "post-prose notebook-prose";
  tempDiv.innerHTML = convertIpynvToHtml(text);

  tempDiv.querySelectorAll(".markdown-cell").forEach((cell) => {
    applyCommonPostStyles(cell);
  });

  tempDiv.querySelectorAll("code").forEach((node) => {
    node.classList.add(...notebookcodeStyle.split(" "));
  });
  tempDiv.querySelectorAll("pre").forEach((node) => {
    node.classList.add(...notebookpreStyle.split(" "));
  });

  const nativeMarkdownBlocks = [];
  const contentsDiv = document.getElementById("contents");

  if (typeof cleanupCustomPageBehaviors === "function") {
    cleanupCustomPageBehaviors();
  }

  while (contentsDiv.firstChild) {
    contentsDiv.removeChild(contentsDiv.firstChild);
  }

  if (kinds === "post") {
    const titleSection = buildPostHeader(titleInfo, text);
    contentsDiv.appendChild(titleSection);
  }

  const downloadButton = document.createElement("button");
  downloadButton.type = "button";
  downloadButton.textContent = "Notebook Download";
  downloadButton.classList.add(...notebookdownloadButtonStyle.split(" "));
  downloadButton.addEventListener("click", (event) => {
    event.stopPropagation();
    const blob = new Blob([text], { type: "text/plain" });
    const nextUrl = window.URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = nextUrl;
    anchor.download = `${titleInfo.title}.ipynb`;
    anchor.click();
    window.URL.revokeObjectURL(nextUrl);
  });

  contentsDiv.appendChild(downloadButton);
  contentsDiv.appendChild(tempDiv);

  if (typeof initializeCustomPageBehaviors === "function") {
    initializeCustomPageBehaviors(contentsDiv);
  }

  if (typeof appendPostDetailModules === "function" && kinds === "post") {
    appendPostDetailModules(contentsDiv, titleInfo, text);
  }

  if (typeof typesetMath !== "undefined") {
    typesetMath();
  }

  hljs.highlightAll();
}
