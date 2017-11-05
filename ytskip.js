
var timesToSkip = [];
var gun = new Gun('https://gunjs.herokuapp.com/gun');

var video = $(".html5-main-video").first()[0];
console.log(video);
video.addEventListener('loadeddata', function() {
    console.log("Loaded the video's data!");
}, false);

var key = String(location.href.match("v=[^&]+"));
console.log(key);

gun.get(key).map().val(function(item, key){ // print them back out
  console.log("item", item);
  timesToSkip.push([item.start, item.end]);
  highlight(item.start, item.end-item.start);

});

var currtime;

video.ontimeupdate = function() {
    currtime = video.currentTime
    timesToSkip.forEach(function(time){
        var cTime = video.currentTime;            
        if(cTime > time[0] && cTime < time[1]){
            video.currentTime = time[1];
        }
    }); 
};


var pixelLength = $('.ytp-progress-list').width();

var timeinseconds = $('.html5-main-video')[0].duration;
console.log('time in seconds ' + timeinseconds);
var highlight = function(startTime, length){
	var skipPercent = length/timeinseconds;

	var startPercent = startTime/timeinseconds;
	var left = startPercent*pixelLength;

	var width = skipPercent*pixelLength;
	console.log('left ' + left);
	console.log('width ' + width);
	$('.ytp-progress-list').append('<div class="ytp-play-progress testclass ytp-swatch-background-color" style="left:' + left +'px; width: '+width+'px; background-color: blue;"></div>');
	$('div#player.style-scope.ytd-watch').prepend('<button class="underclass ytp-play-progress ytp-swatch-background-color " style="left:' + left +'px; width: '+width+'px; background-color: blue; height: 10px"></button>');
function handler() {
		/* ... */
		console.log("IT WORKS");
	}

	$(document).ready(function() {
		$(".underclass").click(handler);
	});
};

video.addEventListener("seeking", function() { 
    console.log([currtime,video.currentTime]);

    if(currtime < video.currentTime){
        highlight(currtime,video.currentTime-currtime);
        gun.get(key).set({start:currtime, end:video.currentTime});
    }
    
}, true);



