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
				$("code").html result.replace("www.framerjs.com", "<a target='_blank' href='http://www.framerjs.com'>www.framerjs.com</a>")

				# Fix for chrome tab indenting issue
				if window.chrome 
					$("code").html result.replace(/\t/g, "  ").replace("www.framerjs.com", "<a target='_blank' href='http://www.framerjs.com'>www.framerjs.com</a>")
		
$(document).ready ->			
	exampleName = getParameterByName "name"
	loadCS exampleName