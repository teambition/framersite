(function() {
  $(document).ready(function() {
    var exampleName, loadExample;
    loadExample = function(exampleName) {
      if (typeof ga !== "undefined" && ga !== null) {
        ga("send", "pageview", "/examples/" + exampleName);
      }
      $("#code").attr("src", "code.html?name=" + exampleName);
      $("#example").attr("src", "/static/examples/" + exampleName);
      return $("a.download").attr("href", "/static/examples/" + exampleName + ".zip");
    };
    exampleName = window.location.hash.slice(1);
    loadExample(exampleName);
    $(".btn-code").click(function() {
      $("#example").toggleClass("with-code");
      return $("#code").toggleClass("show-code");
    });
    if (exampleName.indexOf("#code") > -1) {
      $("#code").addClass("show-code");
      return $("#example").addClass("with-code");
    }
  });

}).call(this);
