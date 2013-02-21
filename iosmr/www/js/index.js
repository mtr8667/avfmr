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
//<plugin name="Device" value="CDVDevice" />




document.addEventListener("deviceready", onDeviceReady, false);	



function onDeviceReady() {
        checkConnection();
        checkDevice(); 
    }

function checkConnection() {
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
var checkDevice = function() {
		
		
	$("#deviceType").html("<h2>device information</h2>")
			.append("<p>" +		
		                      'Device Name: '  + device.name + '<br />' + 
		                      'Device Cordova: '  + device.cordova + '<br />' + 
  	                          'Device Platform: ' + device.platform + '<br />' + 
  	                          'Device UUID: '     + device.uuid     + '<br />' + 
  	                          'Device Model: '    + device.model     + '<br />' + 
  	                          'Device Version: '  + device.version  + '<br />' + 
                            "</P>");
                           
}


//onload function calling getArticles() passing in "week1" as the current article to be displayed 
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


// function to get all navigation articles and display the one retrieved while hiding the others
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
var video = document.getElementById("movie");
  video.onclick = function() {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
};
	
//$("#apiTwitter").click(getArticles("tweet"));
