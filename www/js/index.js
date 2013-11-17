/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
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
        navigator.accelerometer.getCurrentAcceleration(onSuccess, onError);
    
        app.receivedEvent('deviceready');
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





var SPEED = 10;                 // Canvas redraw speed in milliseconds and accelerometer frequency
var DISTANCE_FACTOR = .1;       // Factor to adjust accelerometer values to screen distance. Cordova 1.6 changed to values to be Android compatible which appeared to be * 10. For Cordova 1.5 make this value 1.
var ax = 0;                     // Acceleration x axis (Accelerometer value adjusted for direction)
var ay = 0;                     // Acceleration y axis (Accelerometer value adjusted for direction)
var watchID;                    // Accelerometer.watchAcceleration return value. 
var playing = true;             // Boolean if animation is playing.

/* Start watching the accelerometer */
function startWatch() {
    var options = { frequency: SPEED };
    watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
}

// Stop watching the accelerometer
function stopWatch() {
    if (watchID) {
        navigator.accelerometer.clearWatch(watchID);
        watchID = null;
    }
}

/* Accelerometer data callback */
function onSuccess( acceleration ) {
    // Set drawing acceleration values
    ax = acceleration.x * DISTANCE_FACTOR * -1; // -1 to change direction for Cordova 1.6. Removed for Cordova 1.5.
    ay = acceleration.y * DISTANCE_FACTOR ;// Add * -1 for Cordova 1.5;

	document.getElementById("vx").value = vx;
	document.getElementById("vy").value = vy;

    // Optional ouput for understanding accelerator values.
    console_log.innerHTML = 
    'Acceleration X: ' + acceleration.x + '<br />' +
    'Acceleration Y: ' + acceleration.y + '<br />' +
    'Acceleration Z: ' + acceleration.z + '<br />' +
    'Timestamp: '      + acceleration.timestamp ;
}

/*  Accelerometer error callback */
function onError() {
    alert("Accelerometer Error");
}

function toggleAccelerometer() {
	if (playing) {
		stop();
	} else {
		start();
	}
}

function start() {
	playing = true;
	vx = 0;
	vy = 0;
	startWatch();
}

function stop() {
	stopWatch();
	playing = false;
}