/* When clicking the learn navigation icons, load page from that point */
if ($('body').hasClass('learn')) {
	$('body.subpage.learn').scrollTop($('.learn-nav').offset().top);
	$('body.subpage.learn.basics').scrollTop(0);
}

$(document).ready(function() {
	$(".feature-banners a").hover(function() {
			$(this).toggleClass("is-active");
	});

	$("nav .more").click(function(event) { 
		  event.stopPropagation();
		$('.more-dropdown').toggleClass("appear");
	});
	$(".more-dropdown a:first-child").hover(function() { 
		$('.more-dropdown').toggleClass("on-hover");
	});

	$(document).click(function() { 
		$('.more-dropdown').removeClass("appear");
	});

	var learnSidebar, topNav, exampleBlock, exampleDevices;
	learnSidebar = $('.subpage.learn .sidebar');
	topNavHome = $('.home nav.top');
	topNavPages = $('.learn nav.top');
	exampleBlock = $('.examples');
	exampleDevices = $('.device-left, .device-right');

	/* Hover on devices within Examples Block */
	$(exampleBlock).hover(
		function() {
			$(exampleDevices).toggleClass("shrink");
		}
	);

	var playCarouselVideo = false
	var videoElement = $("#carousel-video-examples").get(0)

	$(window).scroll(function() {
		$('.more-dropdown').removeClass("appear");

		var scrollPos = $(window).scrollTop();
		// Sidebar Sticky ----------------
		if ($(window).scrollTop() > 646) {
			$(learnSidebar).addClass('sticky');
		} else {
			$(learnSidebar).removeClass('sticky');
		}

		// Top Navigation ----------------
		if ($(window).scrollTop() > 800) {
			$(topNavHome).addClass('sticky').removeClass('fade-out');
		}
		else if ($(topNavHome).hasClass('sticky') && scrollPos <= 800) {
			$(topNavHome).removeClass('sticky').addClass('fade-out');
		}
		if (scrollPos < 600) {
			$(topNavHome).removeClass('fade-out');
		}

		// Top Nav on Learn and Docs
		if ($(window).scrollTop() > 440) {
			$(topNavPages).addClass('sticky').removeClass('fade-out');
		}
		else if ($(topNavPages).hasClass('sticky') && scrollPos <= 440) {
			$(topNavPages).removeClass('sticky').addClass('fade-out');
		}
		if (scrollPos < 439) {
			$(topNavPages).removeClass('fade-out');
		}

		if (playCarouselVideo == false && videoElement) {
			if (scrollPos > 1100) {
				videoElement.play()
				playCarouselVideo = true
			}
		}

	});
	
});

function scrollFix() {
	window.setTimeout(function() {
		$(".docs .sidebar").css("padding-right", "1px")
		window.setTimeout(function() {
			$(".docs .sidebar").css("padding-right", "0px")
		}, 0)
	}, 0)
}

// Extremely nasty hack to work around browser bug. If you click a href link the scrolling stops working in the sidebar. By forcing it to redraw (set margin property) it starts working again
$(document).ready(function() {
	$(".sub-section").click(scrollFix)
	$(".docs .sidebar").hover(scrollFix)
})

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

