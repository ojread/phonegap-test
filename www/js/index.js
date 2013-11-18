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
		//contacts.find();
	}
};



var accelerometer = {
	watchID: null,
	min: 9.8,
	max: 9.8,

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
		// Show debug values.
		document.getElementById("x").innerHTML = acceleration.x;
		document.getElementById("y").innerHTML = acceleration.y;
		document.getElementById("z").innerHTML = acceleration.z;

		// Calculate vector length.
		var total = Math.sqrt(
			acceleration.x * acceleration.x +
			acceleration.y * acceleration.y +
			acceleration.z * acceleration.z
		);

		//if (total < this.min) this.min = total;
		document.getElementById("min").innerHTML = this.min;

		//if (total > this.max) this.max = total;
		document.getElementById("max").innerHTML = this.max;

		document.getElementById("total").innerHTML = total;
	},

	error: function() {
		document.getElementById("x").innerHTML = "Error";
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


/*var contacts = {

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

};*/