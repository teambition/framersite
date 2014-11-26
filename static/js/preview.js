(function() {
  var loadExample;

  loadExample = function(exampleName) {
    if (typeof ga !== "undefined" && ga !== null) {
      ga("send", "pageview", "http://projects.framerjs.com/examples/" + exampleName);
    }
    $("#code").attr("src", "code.html?name=" + exampleName);
    $("#example").attr("src", "http://projects.framerjs.com/static/examples/" + exampleName);
    return $("a.download").attr("href", "http://projects.framerjs.com/static/examples/" + exampleName + ".zip");
  };

  $(document).ready(function() {
    var exampleName;
    exampleName = window.location.hash.slice(1);
    document.title = loadExample(exampleName);
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
