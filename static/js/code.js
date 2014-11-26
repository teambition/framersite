(function() {
  var getParameterByName, loadCS;

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

  loadCS = function(exampleName) {
    return $.ajax({
      url: "http://projects.framerjs.com/static/examples/" + exampleName + "/app.coffee",
      dataType: "text",
      success: function(data) {
        return Rainbow.color(data, "coffeescript", function(result) {
          $("code").html(result.replace("www.framerjs.com", "<a target='_blank' href='http://www.framerjs.com'>www.framerjs.com</a>"));
          if (window.chrome) {
            return $("code").html(result.replace(/\t/g, "  ").replace("www.framerjs.com", "<a target='_blank' href='http://www.framerjs.com'>www.framerjs.com</a>"));
          }
        });
      }
    });
  };

  $(document).ready(function() {
    var exampleName;
    exampleName = getParameterByName("name");
    return loadCS(exampleName);
  });

}).call(this);
