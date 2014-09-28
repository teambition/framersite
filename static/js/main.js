$(document).ready(function() {
	$(".feature-banners a").hover(function() {
			$(this).toggleClass("is-active");
	});
	
	var sideBar, learnSidebar, topNav, exampleBlock, exampleDevices;
	sideBar = $('.sidebar');
	learnSidebar = $('.subpage .sidebar');
	topNav = $('.home nav.top');
	exampleBlock = $('.examples');
	exampleDevices = $('.device-left, .device-right');

	$(exampleBlock).hover(
		function() {
			$(exampleDevices).toggleClass("shrink");
		}
	);

	$('.subpage p img').unwrap();

	var playCarouselVideo = false
	var videoElement = $("#carousel-video-examples").get(0)

	$(window).scroll(function() {

		var scrollPos = $(this).scrollTop();

		// Sidebar Sticky ----------------
		if ($(window).scrollTop() > 330) {
			$(sideBar).addClass('sticky');
		} else {
			$(sideBar).removeClass('sticky');
		}

		if ($(window).scrollTop() > 710) {
			$(learnSidebar).addClass('sticky');
		} else {
			$(learnSidebar).removeClass('sticky');
		}

		// Top Navigation ----------------
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

