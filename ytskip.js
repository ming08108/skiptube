
var timesToSkip = [[0,10], [30,40], [60,65]];


$( document ).ready(function() {
    var video = $(".html5-main-video").first()[0];
    console.log(video);

    video.ontimeupdate = function() {

        timesToSkip.forEach(function(time){
            console.log(time);
            var cTime = video.currentTime;            
            if(cTime > time[0] && cTime < time[1]){
                console.log(cTime);
                video.currentTime = time[1];
            }
        }); 
    };
    
    
});
