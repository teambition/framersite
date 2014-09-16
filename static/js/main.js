
$(document).ready(function() {

	$(".feature-banners a").hover(
		function() {
			$(this).toggleClass("is-active");
		}
	);

	var docsSidebar, topNav, exampleBlock, exampleDevices;
	docsSidebar = $('.docs .sidebar');
	topNav = $('.home nav.top');
	exampleBlock = $('.examples');
	exampleDevices = $('.device-left, .device-right');

	$(exampleBlock).hover(
		function() {
			$(exampleDevices).toggleClass("shrink");
		}
	);


	$(window).scroll(function() {

		var windowScrollPos = $(window).scrollTop();
		var shouldShowHeaderSticky = windowScrollPos > 800;

		// Swtich between sticky and not
		if (shouldShowHeaderSticky) {
			if (shouldShowHeaderSticky == true) {
				topNav.addClass("sticky")
				topNav.removeClass("fade-out")
			} else {
				topNav.removeClass("sticky")
				topNav.addClass("fade-out")
			}
		}

		headerSticky = shouldShowHeaderSticky;

		// Hard override for when we reach the top
		if (windowScrollPos > 100) {
			topNav.removeClass("fade-out")
		}


		if (windowScrollPos > 330) {
			docsSidebar.addClass('sticky')
		} else {
			docsSidebar.removeClass('sticky')
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
		





