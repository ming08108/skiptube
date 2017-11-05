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
var gun = new Gun("https://gunjs.herokuapp.com/gun");
var isScrub = true;

console.log(video);

var video = $(".html5-main-video").first()[0];


function init(){
    $(".title").before($("<table id='skipTable'></table>"));
    
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
        if(item == null){
            $("#"+k).remove();
        }
        else{
            console.log("item", item);
            timesToSkip.push([item.start, item.end]);
            highlight_bar(item.start, item.end-item.start,k);

            $("#skipTable").append($(`<tr id="` + k + `">
                <th>` + item.start.toString() + `</th>
                <th>` + item.end.toString() + `</th>
                <th><button class="delete" id="` + k + `">Delete</button></th>
            </tr>`));
            $("button#" + k).click(function(){
                console.log(this.id);
                gun.get(key).path(this.id).put(null);
                $("tr#" + k).remove();
            });
        }
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

var highlight_bar = function(startTime, length, id){
    var skipPercent = length/timeinseconds;
    var startPercent = startTime/timeinseconds;
    var left = startPercent*pixelLength;
    var width = skipPercent*pixelLength;
    $('.ytp-progress-list').append('<div id ="' + id + '"' + 'class="ytp-play-progress testclass ytp-swatch-background-color" style="left:' + left +'px; width: '+width+'px; background-color: blue;"></div>');    
}



console.log('time in seconds ' + timeinseconds);
var buttonid = 1;
var highlight = function(startTime, length){
	var skipPercent = length/timeinseconds;

	var startPercent = startTime/timeinseconds;
	var left = startPercent*pixelLength;

	var width = skipPercent*pixelLength;
	console.log('left ' + left);
	console.log('width ' + width);
	$('.ytp-chrome-bottom').prepend('<button data-startTime = "'+startTime+'" data-endtime = "'+length+'" id="button' + buttonid +'" class="underclass ytp-play-progress ytp-swatch-background-color " style="left:' + left +'px; width: '+width+'px; background-color: blue; height: 10px; border: none;"></button>');
	function handler(testid) {
		var sT = parseInt(document.getElementById(testid).getAttribute('data-starttime'));
        var eT = parseInt(document.getElementById(testid).getAttribute('data-starttime')) + parseInt(document.getElementById(testid).getAttribute('data-endtime'));
        
        gun.get(key).set({start:sT, end:eT});
        console.log(testid + " " + sT + " " + eT);
            
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
    if(isScrub){
      if(currtime < video.currentTime){
         // gun.get(key).set({start:currtime, end:video.currentTime});
         highlight(currtime,video.currentTime-currtime);
      }
    }else{isScrub=true;}
    
}, true);


