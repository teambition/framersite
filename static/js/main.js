
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
		var scrollPos = $(this).scrollTop();

		if ($(window).scrollTop() > 330) {
			$(docsSidebar).addClass('sticky');
		} else {
			$(docsSidebar).removeClass('sticky');
		}
		
		if ($(window).scrollTop() > 800) {
			$(topNav).addClass('sticky').removeClass('fade-out');
		}
		else if ($(topNav).hasClass('sticky') && scrollPos <= 800) {
			$(topNav).removeClass('sticky').addClass('fade-out');
		}

		if (scrollPos < 600) {
			$(topNav).removeClass('fade-out');
		}

	});
});
		

// /* ========================= */

// function isMobile() {
// 	return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
// }

// function setupDownloadLink() {

// 	if (isMobile()) {
// 		var mobileLink = "mailto:?subject=Check Out Framer Studio&body=Don't forget to check out Framer: http://framerjs.com"
// 		$("a.downloadfs").attr("href", mobileLink);

// 	} else {

// 		// var sparkleHost = "http://framerstudio-update.s3-website-us-east-1.amazonaws.com"
// 		var sparkleHost = "http://studio.update.framerjs.com"

// 		$.get(sparkleHost + "/latest.txt", function(result) {
			
// 			var downloadLink = sparkleHost + "/" + result;

// 			$("a.downloadfs").click(function(event) {

// 				event.preventDefault()

// 				ga('send', 'event', 'Download', 'Framer Studio', downloadLink);

// 				setTimeout(function() {
// 					window.location.href = downloadLink;
// 				}, 500);

// 			});
// 		});
		
// 	};
// };

// $(document).ready(function() {
// 	setupDownloadLink();
// })

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
		





