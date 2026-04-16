function extractFromUrl() {
  // URLparsing.js??서 ??용
  // URL??서 username??repositoryName 추출
  const url = new URL(window.location.href);

  // ??스????름??서 username 추출
  // ?? "weniv.github.io"??서 "weniv" 추출
  const hostnameParts = url.hostname.split(".");
  const username = hostnameParts.length > 2 ? hostnameParts[0] : "";

  // pathname????용??여 repositoryName 추출
  // ?? "/reponame"??서 "reponame" 추출
  const pathParts = url.pathname.split("/").filter((part) => part.length > 0);
  const repositoryName = pathParts.length > 0 ? pathParts[0] : "";

  return {
    username: username,
    repositoryName: repositoryName,
  };
}

function convertSourceToImage(source) {
  // convertIpynbToHtml.js??서 ??용
  // Base64 ????지 ??이????별????한 ??규 ??현??
  const base64ImageRegex = /!\[.*?\]\(data:image\/(png|jpeg);base64,(.*?)\)/g;

  // ????지 ??이???? 찾고, ??매치??????????지 ??그 ??성
  return source.replace(base64ImageRegex, (match, fileType, imageData) => {
    return `<img src="data:image/${fileType};base64,${imageData}" alt="Embedded Image" />`;
  });
}

function escapeHtml(text) {
  // convertIpynbToHtml.js??서 ??용
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function normalizeCategoryName(category = "") {
  const normalized = category.trim().toLowerCase();

  if (normalized === "machine learning" || normalized === "meachine learning") {
    return "meachine learning";
  }

  return category.trim();
}

function extractFileInfo(filename) {
  // render.js??서 ??용
  // ??일 ??름??서 ??보 추출??는 ??수

  // ??규 ??현??을 ??용??여 ??짜, ??목, 카테고리, ??네?? ??????보 추출
  const regex =
    /^\[(\d{8})\]_\[(.*?)\]_\[(.*?)\]_\[(.*?)\]_\[(.*?)\]_\[(.*?)\].(md|ipynb)$/;
  const matches = filename.match(regex);
  // console.log(`extractFileInfo: ${matches}`);

  if (matches) {
    const thumbnailName = matches[4] && matches[4] !== ".jpg" ? matches[4] : "";
    const authorId = matches[6] !== "" ? parseInt(matches[6], 10) : 0;

    return {
      date: matches[1],
      title: matches[2],
      category: normalizeCategoryName(matches[3]),
      thumbnail: thumbnailName ? "img/" + thumbnailName : "",
      thumbnailName,
      // description: matches[5].length > 25 ? matches[5].substring(0, 25) + '...' : matches[5],
      description: matches[5],
      author: Number.isNaN(authorId) ? 0 : authorId,
      fileType: matches[7],
    };
  }
  return null;
}

function formatDate(dateString) {
  // render.js??서 ??용
  // YYYYMMDD ??식??문자??을 받아 YYYY/MM/DD ??식??로 변??
  const year = dateString.substring(0, 4);
  const month = dateString.substring(4, 6);
  const day = dateString.substring(6, 8);

  return `${year}/${month}/${day}`;
}
