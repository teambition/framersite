getParameterByName = (name) ->
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]")
	regex = new RegExp("[\\?&]" + name + "=([^&#]*)")
	results = regex.exec(location.search)
	(if not results? then "" else decodeURIComponent(results[1].replace(/\+/g, " ")))

loadCS = (exampleName) ->
	$.ajax
		url: "/static/examples/#{exampleName}/app.coffee"
		dataType: "text",
		success: (data) ->
			Rainbow.color data, "coffeescript", (result) ->
				$("code").html result.replace /\t/g, "  "
		

$(document).ready ->			
	exampleName = getParameterByName "name"
	loadCS exampleName
