var store = new StoreManager();

function resize() {
  const boxWidth = 663;
  const boxHeight = 884;
  const wrapperElement = document.getElementById('scalabel-wraper');
  const clientRect = wrapperElement.getBoundingClientRect();

  let scaleX = clientRect.width / boxWidth;
  let scaleY = clientRect.height / boxHeight;
  let scale = Math.min(scaleX, scaleY);

  let percent = $("#zoomBtn").val().split("%")[0];
  scale = scale * (percent / 100);

  $("#main-content-wrapper").css({
    transform: "translate(0%, 0%) " + "scale(" + scale + ")"
  });
}



function loadPage(pageNumber, callback) {
  const templatePath = templateConfig[pageNumber] && templateConfig[pageNumber].filePath || "";
  if (templatePath === '') { console.log("Can't find the page"); return; }
  $("#content-wrapper").load(templatePath, function () {

    /**
     * Navigation buttons functionality
     */
    store.addPreviousAnswersToInputboxes();
    store.bindEventListeners();
    const previousBtn = $("#previous-btn");
    const nextBtn = $("#next-btn");

    if (pageNumber === 0) {
      previousBtn.prop('disabled', true);
      nextBtn.prop('disabled', false);
    } else if ((pageNumber + 1) === templateConfig.length) {
      previousBtn.prop('disabled', false);
      nextBtn.prop('disabled', true);
    } else {
      previousBtn.prop('disabled', false);
      nextBtn.prop('disabled', false);
    }

    $('.thumbnail-wrapper').each(function () {
      $(this).css({ "outline": "unset" });
    });
    $(`[data-page-number=${pageNumber + 1}]`).css({ "outline": "2px solid #ffffff" });

    /**
     * Change page number in the top bar.
     */
    //  $("#page-number-change").val(pageNumber + 1);
    $("#goBtn").val(pageNumber + 1).change();

    if (typeof callback === 'function') { callback(); }
  });

}

/**
 * @param {function} getCurrentPageNumber gets page number from store manager calss instance
 * @param  {object} templateConfig list of all the pages
 * This function is invoked when the index.html is mounted.
 */
function init(self) {
  store.bindGlobalEvents();
  $("#hmh-header").load('./templates/header.html', () => {
    const currentPageNumber = store.getCurrentPageNumber();
    loadPage(currentPageNumber - 1, resize);

    /**
     * Thumbnail Images Start
     */

    templateConfig.map((ele) => {
      $(`<div tabindex="0" role="button" data-page-number=${ele.pageNumber} class="thumbnail-wrapper"><img src=${ele.thumbnailUrl} alt="${ele.pageNumber}" /></div><div style="width: 100%;color: #fff;text-align: center;">${ele.pageNumber}</div>`).appendTo('#nav-bar-container')
    });

    $('.thumbnail-wrapper').click(function () {
      const pageNumber = $(this).attr("data-page-number");
      store.setPageNumber(parseInt(pageNumber));
      loadPage(pageNumber - 1, resize);
    });
    $('.thumbnail-wrapper').keydown(function (e) {
      if (e.which == 13 || e.which == 32) {
        const pageNumber = $(this).attr("data-page-number");
        store.setPageNumber(parseInt(pageNumber));
        loadPage(pageNumber - 1, resize);
      }
    });

    /**
     * Thumbnail Images Start
     */

    $("#total-number-of-pages").text(`of ${templateConfig.length}`)

    $("input").on("input", function (e) {
      console.log(e)
    });
    $("#goBtn").on("input", function (e) {
      if (e.target.value.trim() === "") {
        $("#goBtn").val(1).change();
        return;
      }
      const numberCheck = /^[1-2]{0,1}$/;
      let page = store.getCurrentPageNumber();
      if (numberCheck.test(e.target.value)) {
        page = e.target.value.replace(/\D/g, '');
        if (page <= templateConfig.length) {
          store.setPageNumber(parseInt(page));
          loadPage(parseInt(page) - 1, resize);
        } else {
          page = store.getCurrentPageNumber();
        }
      } else {
        $("#goBtn").val(page).change();
      }
    });

    /**
     * Navigate to previous page
     */
    $("#previous-btn").click(function () {
      const pageNumber = store.getCurrentPageNumber() - 1;
      store.setPageNumber(pageNumber);
      loadPage(pageNumber - 1, resize);
    });

    /**
     * Navigate to next page
     */

    
    // $("#next-btn").click(function () {
    //   const pageNumber = store.getCurrentPageNumber() + 1;
    //   store.setPageNumber(pageNumber);
    //   loadPage(pageNumber - 1, resize);
    // });
    $("#btnSideToggle").click(function () {
      if ($('nav').hasClass('slide')) {
        $("main").css("width", '100%');
      } else {
        $("main").css("width", 'calc(100% - 200px)');
      }
      $("nav").toggleClass('slide');
      // $("#previous-btn").toggleClass('left-margin');

    });
    $("#btnFullScreen").on("click", function () {
      document.fullScreenElement && null !== document.fullScreenElement || !document.mozFullScreen && !document.webkitIsFullScreen ? document.documentElement.requestFullScreen ? document.documentElement.requestFullScreen() : document.documentElement.mozRequestFullScreen ? document.documentElement.mozRequestFullScreen() : document.documentElement.webkitRequestFullScreen && document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT) : document.cancelFullScreen ? document.cancelFullScreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitCancelFullScreen && document.webkitCancelFullScreen();

      $(this).children().remove();
      if (window.innerHeight == screen.height) {
        $(this).append('<i class="fa-solid fa-expand" aria-hidden="true"></i><span>Maximize</span>');
      } else {
        $(this).append('<i class="fa-solid fa-compress"></i><span>Minimize</span>');
      }
    });
    $("#btnThemeToggle").click(function () {
      const themeName = $(this).attr('data-theme');
      $(this).children().remove();
      if (themeName === 'day') {
        $(this).attr('data-theme', 'night');
        $(this).append('<i aria-hidden="true" class="fac fa-themeLight"></i><span>Theme</span>');
      } else {
        $(this).attr('data-theme', 'day');
        $(this).append('<i aria-hidden="true" class="fa-solid fa-circle-half-stroke"></i><span>Theme</span>');
      }
      $("body").toggleClass("dark");
    })
  });

  $("#hmh-footer").load('./templates/footer.html', () => {

    $("#btnZoomOut").click(function () {
      $("#btnZoomIn").removeAttr('disabled');
      var percent = $("#zoomBtn").val();
      var matrix = $('.page-container').css('transform');
      var values = matrix.split('(')[1];
      values = values.split(')')[0];
      values = values.split(',');
      var a = values[0];
      var b = values[1];

      var scale = Math.sqrt(a * a + b * b);
      var percentage = percent.split("%")[0];
      if (percentage > 25) {
        scale = scale * 0.83;
        percentage = Math.ceil(percentage * 0.83);
        if (percentage <= 25) {
          percentage = 25;
          $("#btnZoomOut").attr('disabled', true);
        }
        $('.page-container').css('transform', 'translate(0%, 0%) scale(' + scale + ')');
        $("#zoomBtn option:nth(0)").attr("value", percentage).html(percentage + '%');
        $("#zoomBtn").val(percentage).change();
        var width = $(".page-container").width();
        var scaledWidth = width * scale;
        var wrapperWidth = $("#content-wrapper").width();
        if (scaledWidth > wrapperWidth) {
          $(".page-container").css({ "margin": '0px', "transform-origin": "top left" });
        } else {
          $(".page-container").css({ "margin": '0px auto', "transform-origin": "top" });
        }
      }
    });
    $("#btnZoomIn").click(function () {
      $("#btnZoomOut").removeAttr('disabled');
      var percent = $("#zoomBtn").val();
      var matrix = $('.page-container').css('transform');
      var values = matrix.split('(')[1];
      values = values.split(')')[0];
      values = values.split(',');
      var a = values[0];
      var b = values[1];

      var scale = Math.sqrt(a * a + b * b);
      var percentage = percent.split("%")[0];
      if (percentage < 400) {
        scale = scale * 1.20;
        percentage = Math.ceil(percentage * 1.20);
        if (percentage >= 400) {
          percentage = 400;
          $("#btnZoomIn").attr('disabled', true);
        }
        $('.page-container').css('transform', 'translate(0%, 0%) scale(' + scale + ')');
        $("#zoomBtn option:nth(0)").attr("value", percentage).html(percentage + '%');
        $("#zoomBtn").val(percentage).change();
        var width = $(".page-container").width();
        var scaledWidth = width * scale;
        var wrapperWidth = $("#content-wrapper").width();
        if (scaledWidth > wrapperWidth) {
          $(".page-container").css({ "margin": '0px', "transform-origin": "top left" });
        } else {
          $(".page-container").css({ "margin": '0px auto', "transform-origin": "top" });
        }
      }
    });
  });
}


$(document).ready(function () {
  /**
   * Invoked when file is launched.
   * @param  {} this
   */
  init(this);
  // $(window).resize(function () { resize(); });
});