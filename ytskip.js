
var timesToSkip = [];
var gun = new Gun('https://gunjs.herokuapp.com/gun');


console.log(video);


var video = $(".html5-main-video").first()[0];


function init(){
    $(".testclass").remove();
    $(".underclass").remove();
    timeinseconds = $('.html5-main-video')[0].duration;
    pixelLength = $('.ytp-progress-list').width();
    video = $(".html5-main-video").first()[0];
    console.log("Loaded the video's data!");
    key = String(location.href.match("v=[^&]+"));
    if (typeof gunUpdate != 'undefined')
    	gunUpdate.off();
    timesToSkip = [];

    gunUpdate = gun.get(key).map().val(function(item, key){ // print them back out
        console.log("item", item);
        timesToSkip.push([item.start, item.end]);
        highlight(item.start, item.end-item.start);
    });

}

init();
video.addEventListener('loadeddata', init, false);



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





console.log('time in seconds ' + timeinseconds);
var buttonid = 1;
var highlight = function(startTime, length){
	var skipPercent = length/timeinseconds;

	var startPercent = startTime/timeinseconds;
	var left = startPercent*pixelLength;

	var width = skipPercent*pixelLength;
	console.log('left ' + left);
	console.log('width ' + width);
	$('.ytp-progress-list').append('<div class="ytp-play-progress testclass ytp-swatch-background-color" style="left:' + left +'px; width: '+width+'px; background-color: blue;"></div>');
	$('.ytp-chrome-bottom').prepend('<button id="button' + buttonid +'" class="underclass ytp-play-progress ytp-swatch-background-color " style="left:' + left +'px; width: '+width+'px; background-color: blue; height: 10px; border: none;"></button>');
function handler(testid) {

		$("#"+testid).remove();
		/* ... */
		console.log("IT WORKS");
	}

	$(document).ready(function() {
		$(".underclass").click(function(){

			var id = this.id;
			console.log(id);
			handler(id);

		});
	});
	buttonid++;
};


video.addEventListener("seeking", function() { 
    console.log([currtime,video.currentTime]);

    if(currtime < video.currentTime){
   
        gun.get(key).set({start:currtime, end:video.currentTime});
    }
    
}, true);



