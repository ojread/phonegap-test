var app = {
	// Application Constructor
	initialize: function() {
		this.bindEvents();
	},
	// Bind Event Listeners
	//
	// Bind any events that are required on startup. Common events are:
	// 'load', 'deviceready', 'offline', and 'online'.
	bindEvents: function() {
		document.addEventListener('deviceready', this.onDeviceReady, false);
	},
	// deviceready Event Handler
	//
	// The scope of 'this' is the event. In order to call the 'receivedEvent'
	// function, we must explicity call 'app.receivedEvent(...);'
	onDeviceReady: function() {
		accelerometer.startWatching();
		contacts.find();
	}
};



var accelerometer = {
	watchID: null,
	min: null,
	max: null,

	startWatching: function() {
		var options = {
			frequency: 200
		};

		this.watchID = navigator.accelerometer.watchAcceleration(
			this.success,
			this.error,
			options
		);
	},

	success: function(acceleration) {
		// Calculate vector length.
		var total = Math.sqrt(
			acceleration.x * acceleration.x +
			acceleration.y * acceleration.y +
			acceleration.z * acceleration.z
		);

		$("#total").text(total);

		if (null === accelerometer.min || total < accelerometer.min)
			accelerometer.min = total;
		$("#min").text(accelerometer.min);

		if (null === accelerometer.max || total > accelerometer.max)
			accelerometer.max = total;
		$("#max").text(accelerometer.max);
	},

	error: function() {
		$("#x").text = "Error";
	},

	stopWatching: function() {
		if (watchID) {
        	navigator.accelerometer.clearWatch(watchID);
        	watchID = null;
		}
	},

	reset: function() {
		this.min = 9.8;
		this.max = 9.8;
	}
};


var contacts = {

	find: function() {
		// Contact fields to search.
		var fields = ["displayName", "name"];

		// Find all contacts.
		var options = new ContactFindOptions();
		options.filter = "";
		options.multiple = true;

		navigator.contacts.find(
			fields,
			this.findSuccess,
			this.findError,
			options
		);
	},

	findSuccess: function(contacts) {
		var output = "";
		for (var i=0; i<contacts.length; i++) {
			output += contacts[i].displayName + ", ";
		}
		$("#contacts").html(output);
	},

	findError: function(error) {
		$("#contacts").text("Error: " + error);
	}

};