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
	//lastAcceleration: null,

	startWatching: function() {
		var options = {
			frequency: 100
		};

		this.watchID = navigator.accelerometer.watchAcceleration(
			this.success,
			this.error,
			options
		);
	},

	success: function(acceleration) {
		// Compare to last measurements if available.
		/*if (this.lastAcceleration) {
			deltaX = acceleration.x - lastAcceleration.x;
			deltaY = acceleration.y - lastAcceleration.y;
			deltaZ = acceleration.z - lastAcceleration.z;

			if (deltaX>this.sensitivity ||
				deltaY>this.sensitivity ||
				deltaZ>this.sensitivity) {
				document.getElementById("dropped").innerHTML = "Dropped!";
			}
		}

		// Save values.
		this.lastAcceleration = acceleration;*/

		var total = acceleration.x + acceleration.y + acceleration.z;
		document.getElementById("total").innerHTML = total;

		if (total < 5) {
			document.getElementById("dropped").innerHTML = "Dropped!";
		}

		// Show debug values.
		document.getElementById("x").innerHTML = acceleration.x;
		document.getElementById("y").innerHTML = acceleration.y;
		document.getElementById("z").innerHTML = acceleration.z;
	},

	error: function() {
		document.getElementById("x").innerHTML = "Error";
	},

	stopWatching: function() {
		if (watchID) {
        	navigator.accelerometer.clearWatch(watchID);
        	watchID = null;
		}
	}
};


var contacts = {

	find: function() {
		var fields = ["displayName", "name"];
		var options = new ContactFindOptions();
		options.filter = "An";
		navigator.contacts.find(
			fields,
			function(contacts) {
				document.getElementById("contacts").innerHTML =
					"Found " + contacts.length + " contacts.";
			},
			function(contactError) {
				document.getElementById("contacts").innerHTML =
					"Error";
			},
			options
		);
	}

};