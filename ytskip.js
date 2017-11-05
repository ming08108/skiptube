
$( document ).ready(function() {
    var video = $(".html5-main-video").first()[0];
    console.log(video);
    video.currentTime = video.getCurrentTime() + 10;
    console.log("Skipped ahead 10 seconds");
});

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

video.addEventListener("seeking", function() { xhttp.open("GET", "demoserver/timestart?t="+video.currentTime, true); }, true);

video.addEventListener("seeked", function() { xhttp.open("GET", "demoserver/timeend?t="+video.currentTime, true); }, true);


};
