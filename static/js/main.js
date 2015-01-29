/* When clicking the learn navigation icons, load page from that point */
if ($('body').hasClass('learn')) {
	$('body.subpage.learn').scrollTop($('.learn-nav').offset().top);
	$('body.subpage.learn.basics').scrollTop(0);
}

$(document).ready(function() {
	/* Overlay Video */
	$(".video-banner").click(function() { 
		$(".video-overlay").addClass("show");
		$(".video-overlay iframe").attr("src", "//www.youtube.com/embed/mqk9Fw8FKLY?autoplay=1&amp;rel=0&amp;controls=0&amp;showinfo=0");
	});

	$(".video-overlay img").click(function() { 
		$(".video-overlay").removeClass("show");
		$(".video-overlay iframe").attr("src", "");
	});

	$(".feature-banners a").hover(function() {
			$(this).toggleClass("is-active");
	});

	/* FF Fix */
	if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
    	$("body").addClass("is-firefox");
	}

	/* Footah */
	$("footer").click(function() { 
		if ($("footer input").is(':focus')) {
			$("footer input").addClass("focus");
		} else {
			$("footer input").removeClass("focus");
		}
	});

	$("nav .more").click(function(event) { 
		  event.stopPropagation();
		$('.more-dropdown').toggleClass("appear");
		$("nav .more").toggleClass("active");
	});
	$(".more-dropdown a:first-child").hover(function() { 
		$('.more-dropdown').toggleClass("on-hover");
	});

	$(document).click(function() { 
		$('.more-dropdown').removeClass("appear");
		$("nav .more").removeClass("active");
	});

	var learnSidebar, topNav, exampleBlock, exampleDevices;
	learnSidebar = $('.subpage.learn .sidebar');
	topNavHome = $('.home nav.top');
	topNavPages = $('.learn nav.top, .teach nav.top, .jobs nav.top, .pricing nav.top');
	exampleBlock = $('.examples');
	exampleDevices = $('.device-left, .device-right');

	/* Hover on devices within Examples Block */
	$(exampleBlock).hover(
		function() {
			$(exampleDevices).toggleClass("shrink");
		}
	);

	var playCarouselVideo = false
	var videoOne = $(".video-example").get(0)
	var videoTwo = $(".video-example").get(1)
	var videoThree = $(".video-example").get(2)
	var isAndroid = navigator.userAgent.indexOf('Android') >= 0;

	if (isAndroid) {
		videoOne.remove();
		videoTwo.remove();
		videoThree.remove();
	}

	$(".device-htc").hover(function() {
		videoOne.play();
		videoTwo.pause();
		videoThree.pause();
	});
	$(".device-iphone5c").hover(function() {
		videoThree.play();
		videoOne.pause();
		videoTwo.pause();
	});
	$(".device-iphone6").hover(function() {
		videoTwo.play();
		videoOne.pause();
		videoThree.pause();
	});


	$(window).scroll(function() {
		$('.more-dropdown').removeClass("appear");

		var scrollPos = $(window).scrollTop();
		var docHeight = $('.container .content-inner').height() - 104;

		// Sidebar Sticky ----------------
		if ($(window).scrollTop() > 646) {
			$(learnSidebar).addClass('sticky');
		} else {
			$(learnSidebar).removeClass('sticky');
		}
		if ($(window).scrollTop() > docHeight) {
			$(learnSidebar).addClass('from-bottom');
		} else {
			$(learnSidebar).removeClass('from-bottom');
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
		if ($(topNavPages).hasClass('sticky') && scrollPos <= 440) {
			$(topNavPages).removeClass('sticky').addClass('fade-out');
		}
		// if ($(topNavPages).hasClass('fade-out') && $(window).scrollTop() > docHeight+96) {
		// 	$(topNavPages).removeClass('fade-out');
		// }
		if (scrollPos < 439) {
			$(topNavPages).removeClass('fade-out');
		}

		if (playCarouselVideo == false) {
			if (scrollPos > 900) {
				videoTwo.play();
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

// function setupDownloadLink() {

// 	var downloadClass = ".prepare-download"
// 	var sparkleHost = "//studio.update.framerjs.com"

// 	var downloadLink = sparkleHost + "/archive";

// 	$.get(sparkleHost + "/latest.txt?date=" + Date.now(), function(result) {
// 		downloadLink = sparkleHost + "/" + result + "?mp_id=" + mixpanel.get_distinct_id();
// 	})

// 	if (isMobile()) {

// 		// If we are on mobile we pop up an email to not forget to check out the download
// 		$(downloadClass).attr("href", 
// 			"mailto:?subject=Check Out Framer Studio&body=Don't forget to check out Framer: http://framerjs.com");

// 	} else {

// 		// If we are on desktop we replace the download links with the latest version of framer
// 		$(downloadClass).click(function(event) {
// 			event.preventDefault()
// 			setTimeout(function() { window.location.href = downloadLink; }, 1000)
// 			ga('send', 'event', 'Download', 'Framer Studio', downloadLink)

// 			mixpanel.track("page.download", {
// 				"title": document.title,
//     			"url": window.location.pathname,
//     			"link": downloadLink
// 			})
// 		})
// 	}
// }

// $(document).ready(setupDownloadLink)

