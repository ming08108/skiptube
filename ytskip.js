

var video = $(".html5-main-video").first()[0];
var timeinseconds = $('.html5-main-video')[0].duration;
var pixelLength = $('.ytp-progress-list').width();
var timesToSkip;
var buttonid = 1;
var highlightid = 1;
var currtime;
//var getAds
//var makeAds


var skipAd = function(time, id){
    console.log('trying to add a skipad button at ' + time)
    var data = $('<div id = "button' + id+'" data-starttime = "'+time[0]+'" data-endtime = "'+time[1]+'" class="buttonwrapper videoAdUiSkipContainer html5-stop-propagation" style="opacity: 1;"><button id = "'+id+'" class="videoAdUiSkipButton videoAdUiAction videoAdUiFixedPaddingSkipButton"><div class="videoAdUiSkipButtonExperimentalText videoAdUiFixedPaddingSkipButtonText">Skip Ad</div><div class="videoAdUiExperimentalSkipIcon videoAdUiFixedPaddingSkipButtonIcon"></div></button></div>').hide()
    jQuery(".ytp-player-content.ytp-iv-player-content").not(".videowall-endscreen").prepend(data)
    $(document).ready(function() {
        $(".videoAdUiSkipButton").click(function(){
            console.log("you clicked the skip button")
            console.log("attempting to skip to " + parseInt($("#button" + $(this).attr("id")).attr("data-endtime")));
            video.currentTime = parseInt($("#button" + $(this).attr("id")+'.buttonwrapper').attr("data-endtime"));
            $("#button" + $(this).attr("id")+'.buttonwrapper').hide()  
        });
    });
}
var highlight_bar = function(startTime, length, id){
    var skipPercent = length/timeinseconds;
    var startPercent = startTime/timeinseconds;
    var left = startPercent*pixelLength;
    var width = skipPercent*pixelLength;
    $('.ytp-progress-list').append('<div id ="' + id + '"' + 'class="ytp-play-progress testclass ytp-swatch-background-color" data-starttime = "'+startTime+'" data-length = "'+length+'" style="left:' + left +'px; width: '+width+'px; background-color: blue;"></div>');    
}

var makeAds = function(skiplist){
    
    for(var time in skiplist){
        skipAd(skiplist[time], highlightid);
        highlight_bar(skiplist[time][0], skiplist[time][1]-skiplist[time][0], highlightid);
        highlightid = highlightid + 1;
    }
}

video.ontimeupdate = function() {
    currtime = video.currentTime
    $(".buttonwrapper").each(function(){
        if(parseInt($(this).attr("data-starttime")) < currtime && parseInt($(this).attr("data-endtime")) > currtime){
            console.log("in bounds")
            $(this).show();
        }else{
            $(this).hide();
        }

    });
};

window.addEventListener("resize", function(){

    console.log("resizing")
    $(".testclass").each(function(){
        var startTime = parseInt($(this).attr("data-startTime"))
        var length = parseInt($(this).attr("data-length"))
        var pixelLength = $('.ytp-progress-list').width();
        var skipPercent = length/timeinseconds;
        var startPercent = startTime/timeinseconds;
        var left = startPercent*pixelLength;
        var width = skipPercent*pixelLength;
        $(this).attr("style", "left:" + left + "px; width: "+width+"px; background-color: blue;")

    });
        

});

video.addEventListener("seeking", function() { 
    console.log([currtime,video.currentTime]);
}, true);

var HttpClient = function() {
    this.get = function(aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() { 
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }

        anHttpRequest.open( "GET", aUrl, true );            
        anHttpRequest.send( null );
    }
}




function init(){

    $(".buttonwrapper").remove()
    $(".testclass").remove()
    $( document ).ready(function() {
        console.log( "ready!" );
        var vid = String(location.href.match("v=[^&]+")).substring(2);
        
    
        console.log(vid)
        var client = new HttpClient();
        client.get('https://hackillinois.freemerman.com/?id='+vid, function(response) {
            timesToSkip = response
            console.log(timesToSkip);
            makeAds(JSON.parse(timesToSkip));
            // do something with response
        });
        
    });
}
init();
video.addEventListener('loadeddata', init, false);
