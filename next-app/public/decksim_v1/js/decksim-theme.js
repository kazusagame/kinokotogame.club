"use strict";

(function () {
  setThemeToggle();
  setToolsToggle();
})();

function setThemeToggle() {
  /* ページ読み込み時に保存済みのテーマを読み込む処理。 */
  /* 未選択の場合はシステムからテーマを取得する。 */
  let initDarkMode = false;
  if (window.localStorage) {
    const darkMode = localStorage.getItem("DarkMode");
    if (darkMode === null) {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches === true) {
        initDarkMode = true;
      }
    } else if (darkMode === "true") {
      initDarkMode = true;
    }

    if (initDarkMode) {
      $("#theme-button-container .toggle.theme").addClass("checked");
      $("#theme-switch").prop("checked", true);
      $("html").addClass("Dark");
    } else {
      /* darkMode === "false" */
      $("#theme-button-container .toggle.theme").removeClass("checked");
      $("#theme-switch").prop("checked", false);
      $("html").removeClass("Dark");
    }
  }

  $("#theme-button-container .toggle.theme").on("click", function () {
    $(this).toggleClass("checked");
    if (!$(this).children("input").prop("checked")) {
      $(this).children("input").prop("checked", true).trigger("change");
    } else {
      $(this).children("input").prop("checked", false).trigger("change");
    }
  });

  $("#theme-switch").on("change", function () {
    if ($(this).prop("checked")) {
      // darkモード
      $("html").addClass("Dark");
      setLocalStorage("DarkMode", "true");
    } else {
      // lightモード
      $("html").removeClass("Dark");
      setLocalStorage("DarkMode", "false");
    }
  });
}

function setLocalStorage(key, value) {
  if (window.localStorage) {
    localStorage.setItem(key, value);
  }
}

function setToolsToggle() {
  $("#theme-button-container .toggle.tools").on("click", function () {
    $(this).toggleClass("checked");
    if (!$(this).children("input").prop("checked")) {
      $(this).children("input").prop("checked", true).trigger("change");
    } else {
      $(this).children("input").prop("checked", false).trigger("change");
    }
  });

  $("#tools-switch").on("change", function () {
    if ($(this).prop("checked")) {
      // ツール部OFF
      $("#tools").addClass("display-none");
      $("div.rowadd").addClass("display-none");
      $("div.rowdelete").addClass("display-none");
      $("div.rowUp").addClass("display-none");
      $("div.rowDown").addClass("display-none");
    } else {
      // ツール部ON
      $("#tools").removeClass("display-none");
      $("div.rowadd").removeClass("display-none");
      $("div.rowdelete").removeClass("display-none");
      $("div.rowUp").removeClass("display-none");
      $("div.rowDown").removeClass("display-none");
    }
  });
}
