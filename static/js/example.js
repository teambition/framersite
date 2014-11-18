(function() {
  var getParameterByName, loadScript;

  getParameterByName = function(name) {
    var regex, results;
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    results = regex.exec(location.search);
    if (results == null) {
      return "";
    } else {
      return decodeURIComponent(results[1].replace(/\+/g, " "));
    }
  };

  loadScript = function(path, callback) {
    return $.ajax({
      url: path,
      dataType: "text",
      success: function(data) {
        eval(data);
        return callback(data);
      },
      error: function(err) {
        console.log("err", err);
        return callback(err);
      }
    });
  };

  $(document).ready(function() {
    var exampleName, showExample;
    exampleName = getParameterByName("name");
    $("head").append($("<base href=\"/static/examples/" + exampleName + "/\">"));
    $('head').append($("<link rel=\"stylesheet\" type=\"text/css\" href=\"/static/examples/" + exampleName + "/framer/style.css\">"));
    loadScript("framer/framer.js", function() {
      return loadScript("app.js", function() {});
    });
    showExample = function(exampleName) {
      if (typeof ga !== "undefined" && ga !== null) {
        ga("send", "pageview", "/examples/" + exampleName);
      }
      $("#code").attr("src", "code.html?name=" + exampleName);
      return $("#example").attr("src", "/example/index.html?name=" + exampleName);
    };
    if (!window.location.hash.slice(1)) {
      window.location.hash = "carousel-onboarding.framer";
      return loadExample("carousel-onboarding.framer");
    }
  });

}).call(this);
