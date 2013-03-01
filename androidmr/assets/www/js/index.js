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
//Matthew Richter AVF 1302 February 27, 2013/>

// global variable for device platform 
//var devicePlatform = device.platform;

//default phone types to default
var isAndroid = false;
var isIphone = false;
var isBlackberry = false;
var isWindows = false;
var devicePlatform;
var geoTime;

// device ready listener - phonegap needs the device to be ready before calls are made - after device ready we're checking the device connection and getting the geoloacation information 
document.addEventListener("deviceready", onDeviceReady, false);	

function onDeviceReady() {
        
        
        navigator.compass.getCurrentHeading(onSuccess, onError);
        getGeoTime();
        checkDevice();
    }




function onSuccess(heading) {
	alert("Heading: " + heading.magneticHeading);
}

function onError(compassError) {
	alert("Compass Error: " + compassError.code);
}

// Var/function to check the users connection type 
var checkConnection = function() {
        var networkState = navigator.connection.type;

        var states = {};
        states[Connection.UNKNOWN]  = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI]     = 'WiFi connection';
        states[Connection.CELL_2G]  = 'Cell 2G connection';
        states[Connection.CELL_3G]  = 'Cell 3G connection';
        states[Connection.CELL_4G]  = 'Cell 4G connection';
        states[Connection.NONE]     = 'No network connection';

        alert('Connection type: ' + states[networkState]);
    }
    
// var/function created to check what type of device the user is using - the function is called after the decvice is ready and the article page deviceType is dynamically populated with the retrieved information. 
var checkDevice = $(function(device) {
	$.getJSON("http://api.usatoday.com/open/articles/topnews/tech?count=10&days=6&page=1&encoding=json&api_key=75rfk6x5m993y7qbcbyrdyvj",
	function(data) {
		console.log(data);
		$("#deviceInfo").html("<h2>device information</h2>")
			.append("<p>" +		
		                      'Device Name: '  + device.name + '<br />' + 
		                      'Device Cordova: '  + device.cordova + '<br />' + 
  	                          'Device Platform: ' + device.platform + '<br />' + 
  	                          'Device UUID: '     + device.uuid     + '<br />' + 
  	                          'Device Model: '    + device.model     + '<br />' + 
  	                          'Device Version: '  + device.version  + '<br />' + 
                            "</P>");
		$("#device-usa").html("<p>Current Data Retrieved!</p>");
		for (i=0, j=data.stories.length; i<j; i++) {
			$("#deviceusa")
				.append("<li>" + 
				"<p>" + data.stories[i].title +"<br />" +
					data.stories[i].pubDate + "<br />" +  data.stories[i].link + "</p>" +
					"</li>");
		}
	});
});

//$("#geo-time").html("<p>" + position.timestamp + "</p>");
//function getGeoTime
//var getGeoTime = function onSuccess(position) {
//	$("#geo-time").append("<a>" + position.timestamp + "</a>");
//}

/*onload function calling getArticles() passing in "week1" as the current article to be displayed to the related section on the right when in tablet mode and falling down to the bottom in portrait mode on a tablet.
*/
$(window).load(function(){
    getArticles('week1');
    
});

// ajax call to get twitter api info and populate the twitter article in the app
$(function() {
	$.getJSON("http://search.twitter.com/search.json?q=responsive%20design&rpp=10&include_entities=true&result_type=mixed&callback=?",
	function (data) {
		console.log(data);
		$("#data-tweet").html("<p>Current Data Retrieved!</p>");
		for (i=0, j=data.results.length; i<j; i++) {
			$("#datatweet")
				.append("<li>" + 
				"<p>" + "<img src= '" + data.results[i].profile_image_url +"' /><br />" +
					data.results[i].text + "," + data.results[i].from_user_name + ", <em>" + data.results[i].created_at + "</em>" +
					"</p>" +
					"</li>");
		}
	});
});
// ajax call to get usa today api info and populate the twitter article in the app
$(function() {
	$.getJSON("http://api.usatoday.com/open/articles/topnews/tech?count=10&days=6&page=1&encoding=json&api_key=75rfk6x5m993y7qbcbyrdyvj",
	function(data) {
		console.log(data);
		
		$("#data-usa").html("<p>Current Data Retrieved!</p>");
		for (i=0, j=data.stories.length; i<j; i++) {
			$("#datausa")
				.append("<li>" + 
				"<p>" + data.stories[i].title +"<br />" +
					data.stories[i].pubDate + "<br />" +  data.stories[i].link + "</p>" +
					"</li>");
		}
	});
});


// function working with all navigation links linking to all articles and displaying the one retrieved while hiding the others
var getArticles = function(id) {
	var articles = $("article");
	
	for (i = 0; i < articles.length; i++) {
		var art = articles[i];
		if (id == art.id) {
			art.style.display = "inherit";
		} else {
			art.style.display = "none";
		}
	}
	return(false);
}

/* below each var is associated with each navigational link passing the article ID in to the getArticle function. Jenifer I tried like heck to do this in JQuery and could not get it to work. My reading online in pursuit of a solution lead me to the possible cause of using $("#foo") always recalling the $(window).load every time the factory was called.
*/
var n1 = document.getElementById("dt");
	n1.onclick = function(){
	return getArticles("deviceType");
};	
var n2 = document.getElementById("c");
	n2.onclick = function(){
	return getArticles("connect");
};	
var n3 = document.getElementById("cd");
	n3.onclick = function(){
	return getArticles("compassDegree");
};	
var n4 = document.getElementById("g");
	n4.onclick = function(){
	return getArticles("geo");
};	
var n5 = document.getElementById("n");
	n5.onclick = function(){
	return getArticles("video");
};	
var w1 = document.getElementById("wk1");
	w1.onclick = function(){
	return getArticles("week1");
};	
var w2 = document.getElementById("wk2");
	w2.onclick = function(){
	return getArticles("week2");
};	
var w3 = document.getElementById("wk3");
	w3.onclick = function(){
	return getArticles("week3");
};	
var t = document.getElementById("tw");
	t.onclick = function(){
	return getArticles("tweet");
};
var u = document.getElementById("us");
	u.onclick = function(){
	return getArticles("usatoday");
};


