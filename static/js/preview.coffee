loadExample = (exampleName) ->
	if ga?
		ga("send", "pageview", "http://projects.framerjs.com/examples/#{exampleName}")

	$("#code").attr "src", "code.html?name=#{exampleName}"
	$("#example").attr "src", "http://projects.framerjs.com/static/examples/#{exampleName}"
	$("a.download").attr "href", "http://projects.framerjs.com/static/examples/#{exampleName}.zip"


$(document).ready ->

	exampleName = window.location.hash[1..]
	loadExample exampleName
	document.title = exampleName

	$(".btn-close").hide()	

	$(".btn-code").click ->		
		$("#example").toggleClass "with-code"
		$("#code").toggleClass "show-code"
		$(".btn-code").hide()	
		$(".btn-close").show()	

	$(".btn-close").click ->		
		$("#example").toggleClass "with-code"
		$("#code").toggleClass "show-code"
		$(".btn-close").hide()	
		$(".btn-code").show()	

	if exampleName.indexOf("#code") > -1
		$("#code").addClass "with-code"
		$("#example").addClass "with-code"	
		$(".btn-code").hide()		
