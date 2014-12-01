(function() {
  var loadExample;

  loadExample = function(exampleName, exampleNameNoHash) {
    if (typeof ga !== "undefined" && ga !== null) {
      ga("send", "pageview", "http://framerjs.com/examples/" + exampleName);
    }
    $("#code").attr("src", "code.html?name=" + exampleName);
    $("#example").attr("src", "http://projects.framerjs.com/static/examples/" + exampleName);
    $(".btn-dl").attr("href", "http://projects.framerjs.com/static/examples/" + exampleNameNoHash + ".zip");
    return $(".btn-open").attr("href", "http://framer.link/projects.framerjs.com/static/examples/" + exampleNameNoHash + ".zip");
  };

  $(document).ready(function() {
    var exampleName, exampleNameNoHash;
    exampleName = window.location.hash.slice(1);
    exampleNameNoHash = window.location.hash.slice(1);
    if (exampleName.indexOf("#code") > -1) {
      document.title = window.location.hash.slice(1, -5);
      exampleNameNoHash = window.location.hash.slice(1, -5);
    }
    loadExample(exampleName, exampleNameNoHash);
    document.title = exampleName;
    $(".btn-close").hide();
    $(".btn-code").click(function() {
      $("#example").toggleClass("with-code");
      $("#code").toggleClass("show-code");
      $(".btn-code").hide();
      return $(".btn-close").show();
    });
    $(".btn-close").click(function() {
      $("#example").toggleClass("with-code");
      $("#code").toggleClass("show-code");
      $(".btn-close").hide();
      return $(".btn-code").show();
    });
    if (exampleName.indexOf("#code") > -1) {
      $("#code").addClass("with-code");
      $("#example").addClass("with-code");
      return $(".btn-code").hide();
    }
  });

}).call(this);
