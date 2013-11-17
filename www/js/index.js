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
		app.receivedEvent('deviceready');

		accelerometer.startWatching();
	},
	// Update DOM on a Received Event
	receivedEvent: function(id) {
		var parentElement = document.getElementById(id);
		var listeningElement = parentElement.querySelector('.listening');
		var receivedElement = parentElement.querySelector('.received');

		listeningElement.setAttribute('style', 'display:none;');
		receivedElement.setAttribute('style', 'display:block;');

		console.log('Received Event: ' + id);
	}
};



var accelerometer = {
	watchID: null,
	lastAcceleration: null,
	sensitivity: 5,

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
		if (this.lastAcceleration) {
			deltaX = acceleration.x - lastAcceleration.x;
			deltaY = acceleration.y - lastAcceleration.y;
			deltaZ = acceleration.z - lastAcceleration.z;

			if (deltaX>this.sensitivity ||
				deltaY>this.sensitivity ||
				deltaZ>this.sensitivity) {
				alert("POW!");
			}
		}

		// Save values.
		this.lastAcceleration = acceleration;

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
}