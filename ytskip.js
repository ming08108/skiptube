
var timesToSkip = [];
var gun = new Gun('https://gunjs.herokuapp.com/gun');
//newTimes = [{start:0,end:10},{start:30,end:40},{start:60,end:65}]
newTimes = []


var video = $(".html5-main-video").first()[0];
console.log(video);

var key = location.href.match('\\?(v=[A-Za-z0-9]+)');
console.log(key);

var mGun = gun.get(key);

newTimes.forEach(function(item){
  gun.get(key).set(item);
});

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
};


video.addEventListener("seeking", function() { 
    console.log([currtime,video.currentTime]);

    if(currtime < video.currentTime){
        highlight(currtime,video.currentTime-currtime);
        gun.get(key).set({start:currtime, end:video.currentTime});
    }
    
}, true);



