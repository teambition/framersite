$('#topbar img').click( function(){
	$("#sidebar").toggleClass("appear");
});

$(document).ready(function() {
	
	var docsSidebar = document.querySelector('.docs .sidebar');
	var topNav = document.querySelector('.home nav.top');

	$(window).scroll(function() {
		if ($(window).scrollTop() > 296){
			 $(docsSidebar).addClass('sticky');
		}	 
		else {
			$(docsSidebar).removeClass('sticky');
		}
		if ($(window).scrollTop() > 664){
			 $(topNav).addClass('sticky');
		}
		else {
			$(topNav).removeClass('sticky');
			$(topNav).addClass('fade-out');
		}

	});
	
});
		

/* ========================= */

function isMobile() {
	return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

function setupDownloadLink() {

	if (isMobile()) {
		var mobileLink = "mailto:?subject=Check Out Framer Studio&body=Don't forget to check out Framer: http://framerjs.com"
		$("a.downloadfs").attr("href", mobileLink);

	} else {

		// var sparkleHost = "http://framerstudio-update.s3-website-us-east-1.amazonaws.com"
		var sparkleHost = "http://studio.update.framerjs.com"

		$.get(sparkleHost + "/latest.txt", function(result) {
			
			var downloadLink = sparkleHost + "/" + result;

			$("a.downloadfs").click(function(event) {

				event.preventDefault()

				ga('send', 'event', 'Download', 'Framer Studio', downloadLink);

				setTimeout(function() {
					window.location.href = downloadLink;
				}, 500);

			});
		});
		
	};
};

$(document).ready(function() {
	setupDownloadLink();
})

/* ========================= */
	 
$(document).ready(function() {

	var carouselNode = document.getElementById('carousel');

	if (carouselNode) {

		setTimeout(function() {
			document.getElementById('carousel-inapp').play();
		}, 1000);

		$(window).scroll(function() {
			if ($(window).scrollTop() > 1400){
				 document.getElementById('carousel').play();
			}	 
		});
		
		$('.screen').click(function() {
			document.getElementById('carousel').play();
		});

	}

	$("code").each(function(i, node) {

		// Set the default language to coffee script
		if (!node.getAttribute("data-language")) {
			node.setAttribute("data-language", "coffeescript");
		}

		// Strip empty lines at the beginning and end
		node.innerHTML = node.innerHTML.replace(/^\s+|\s+$/g, '');

	})
	
});
		





