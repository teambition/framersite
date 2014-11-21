(function() {
  var loadExample;

  loadExample = function(exampleName) {
    if (typeof ga !== "undefined" && ga !== null) {
      ga("send", "pageview", "/examples/" + exampleName);
    }
    $("#code").attr("src", "code.html?name=" + exampleName);
    $("#example").attr("src", "/static/examples/" + exampleName);
    return $("a.download").attr("href", "/static/examples/" + exampleName + ".zip");
  };

  $(document).ready(function() {
    var exampleName;
    exampleName = window.location.hash.slice(1);
    loadExample(exampleName);
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
      $(".btn-code").hide();
    }
    return $("#code").contents().find("body").addClass("test");
  });

}).call(this);
