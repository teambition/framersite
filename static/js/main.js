
$(document).ready(function() {

	$(".feature-banners a").hover(function() {
			$(this).toggleClass("is-active");
	});

	var pageSidebar, homeNav, pagesNav, exampleBlock, exampleDevices;
	pageSidebar = $('.sidebar');
	homeNav = $('.home nav.top');
	pagesNav = $('.narrow nav.top')
	exampleBlock = $('.examples');
	exampleDevices = $('.device-left, .device-right');

	$(exampleBlock).hover(
		function() {
			$(exampleDevices).toggleClass("shrink");
		}
	);

	var playCarouselVideo = false
	var videoElement = $("#carousel-video-examples").get(0)

	$(window).scroll(function() {

		var scrollPos = $(this).scrollTop();

		if ($(window).scrollTop() > 420) {
			$(pageSidebar).addClass('sticky');
		} else {
			$(pageSidebar).removeClass('sticky');
		}
		
		// Sticky nav on home
		if ($(window).scrollTop() > 800) {
			$(topNav).addClass('sticky').removeClass('fade-out');
		}
		else if ($(topNav).hasClass('sticky') && scrollPos <= 800) {
			$(topNav).removeClass('sticky').addClass('fade-out');
		}
		if (scrollPos < 600) {
			$(topNav).removeClass('fade-out');
		}

		if (playCarouselVideo == false && videoElement) {
			if (scrollPos > 1100) {
				videoElement.play()
				playCarouselVideo = true
			}
		}

	});
});
		

// /* ========================= */

function isMobile() {
	return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

function setupDownloadLink() {

	var downloadClass = ".prepare-download"
	var sparkleHost = "http://studio.update.framerjs.com"

	var downloadLink = sparkleHost + "/archive";

	$.get(sparkleHost + "/latest.txt", function(result) {
		downloadLink = sparkleHost + "/" + result;
	})

	if (isMobile()) {

		// If we are on mobile we pop up an email to not forget to check out the download
		$(downloadClass).attr("href", 
			"mailto:?subject=Check Out Framer Studio&body=Don't forget to check out Framer: http://framerjs.com");

	} else {

		// If we are on desktop we replace the download links with the latest version of framer
		$(downloadClass).click(function(event) {
			event.preventDefault()
			setTimeout(function() { window.location.href = downloadLink; }, 500)
			ga('send', 'event', 'Download', 'Framer Studio', downloadLink)
		})
	}
}

$(document).ready(setupDownloadLink)

// /* ========================= */
	 
// $(document).ready(function() {

// 	var carouselNode = document.getElementById('carousel');

// 	if (carouselNode) {

// 		setTimeout(function() {
// 			document.getElementById('carousel-inapp').play();
// 		}, 1000);

// 		$(window).scroll(function() {
// 			if ($(window).scrollTop() > 1400){
// 				 document.getElementById('carousel').play();
// 			}	 
// 		});
		
// 		$('.screen').click(function() {
// 			document.getElementById('carousel').play();
// 		});

// 	}

// 	$("code").each(function(i, node) {

// 		// Set the default language to coffee script
// 		if (!node.getAttribute("data-language")) {
// 			node.setAttribute("data-language", "coffeescript");
// 		}

// 		// Strip empty lines at the beginning and end
// 		node.innerHTML = node.innerHTML.replace(/^\s+|\s+$/g, '');

// 	})
	
// });
		





