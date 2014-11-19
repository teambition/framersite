$(document).ready ->

	loadExample = (exampleName) ->
		if ga?
			ga("send", "pageview", "/examples/#{exampleName}")

		$("#code").attr "src", "code.html?name=#{exampleName}"
		$("#example").attr "src", "/static/examples/#{exampleName}"
		$("a.download").attr "href", "/static/examples/#{exampleName}.zip"

	exampleName = window.location.hash[1..]
	
	loadExample exampleName

	$(".btn-code").click ->		
		$("#example").toggleClass "with-code"
		$("#code").toggleClass "show-code"

	if exampleName.indexOf("#code") > -1
		$("#code").addClass "show-code"
		$("#example").addClass "with-code"			
