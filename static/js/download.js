(function() {

var FramerSite = {};

var _downloadLink = null;

FramerSite.getDownloadLink = function(callback) {

	if (_downloadLink) {
		return callback(_downloadLink);
	}

	var sparkleHost = "//studio.update.framerjs.com"

	$.get(sparkleHost + "/latest.txt?date=" + Date.now(), function(result) {
		_downloadLink = sparkleHost + "/" + result + "?mp_id=" + mixpanel.get_distinct_id();
		callback(_downloadLink)
	})
}

FramerSite.doDownload = function() {
	FramerSite.getDownloadLink(function(downloadLink) {

		// Resirect to the download link in one second
		setTimeout(function() { window.location = downloadLink; }, 1000)

		// Record the event in google analytics
		ga('send', 'event', 'Download', 'Framer Studio', downloadLink)

		// Record the event in mixpanel
		mixpanel.track("page.download", {
			"title": document.title,
			"url": window.location.pathname,
			"link": downloadLink
		})
	})
}

FramerSite.verifyEmailAddress = function(email, callback) {

	// This function verifies the email address and will return a response like:
	// {address: "koen@mac.com", did_you_mean: null, is_valid: true, parts: Object}
	// It might also return "timout" if it could not verify the email for more than 5 seconds

	var success = false;
	var mailGunApiKey = "pubkey-6aa8daa73bf18270e2e1586cbbccbcdd";

	// Trim the whitespace
	email = $.trim(email);

	// Start the request to mailgun
	$.ajax({
		type: "GET",
		url: 'https://api.mailgun.net/v2/address/validate?callback=?',
		data: {address:email, api_key:mailGunApiKey},
		dataType: "jsonp",
		crossDomain: true,
		success: function(data, status_text) {
			success = true;
			callback(data);
		}
	});

	// Set a timeout function so we always get some result
	setTimeout(function() {
		if (success) {
			return;
		}
		callback("timeout")
	}, 5000);

}

FramerSite.registerNameAndEmailNewsletter = function(name, email, callback) {
	// Sign up this person for our email news letter
	$.ajax({
		url: "http://podium.createsend.com/t/d/s/jujtid/",
		method: "POST",
		dataType: "jsonp",
		data: {"cm-name": name, "cm-jujtid-jujtid": email},
		success: function(data) {
			callback(data);
		}
	});
}

FramerSite.registerNameAndEmailMixpanel = function(name, email, callback) {
	mixpanel.people.set({
		"$name": name,
		"$email": email
	});
}

FramerSite.registerNameAndEmail = function(name, email, callback) {
	FramerSite.registerNameAndEmailNewsletter(name, email, function() {})
	FramerSite.registerNameAndEmailMixpanel(name, email, function() {})
}

window.FramerSite = FramerSite;

})()
