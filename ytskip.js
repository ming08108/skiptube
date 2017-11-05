function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}


var timesToSkip = [];
var gun = new Gun();
var isScrub = true;

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

    gunUpdate = gun.get(key).map().val(function(item, k){ // print them back out
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
            isScrub = false;
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

	buttonid++;
};


video.addEventListener("seeking", function() { 
    console.log([currtime,video.currentTime]);
    if(isScrub){
      if(currtime < video.currentTime){
          gun.get(key).path(guid()).put({start:currtime, end:video.currentTime});
      }
    }else{isScrub=true;}
    
}, true);



setTimeout(()=>{$(".title").before($("<table id='skipTable'></table>"));
                gun.get(key).map().val(function(item, k){ // print them back out
                    $("#skipTable").append($(`<tr>
                        <th>` + item.start.toString() + `</th>
                        <th>` + item.end.toString() + `</th>
                        <th><button class="delete" id="` + k + `">Delete</button></th>
                    </tr>`));
                    $("#" + k).click(function(){
                        console.log(this.id);
                        gun.get(key).path(this.id).put(null);
                    });
                });
                
}, 2000);
