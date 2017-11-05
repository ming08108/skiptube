
var timesToSkip = [[0,10], [30,40], [60,65]];


var video = $(".html5-main-video").first()[0];
console.log(video);

video.ontimeupdate = function() {

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
};


timesToSkip.forEach((time) => {
    highlight(time[0], time[1]-time[0]);
});