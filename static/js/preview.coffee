loadExample = (exampleName, exampleNameNoHash) ->
	if ga?
		ga("send", "pageview", "http://projects.framerjs.com/examples/#{exampleName}")

	$("#code").attr "src", "code.html?name=#{exampleName}"
	$("#example").attr "src", "http://projects.framerjs.com/static/examples/#{exampleName}"
	$(".btn-dl").attr "href", "http://projects.framerjs.com/static/examples/#{exampleNameNoHash}.zip"


$(document).ready ->

	exampleName = window.location.hash[1..]
	# For download link
	exampleNameNoHash = window.location.hash[1..-6]

	loadExample exampleName, exampleNameNoHash
	document.title = exampleName

	# For document title
	if exampleName.indexOf("#code") > -1
		document.title = window.location.hash[1..-6]


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
