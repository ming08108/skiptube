
$( document ).ready(function() {
    var video = $(".html5-main-video").first()[0];
    console.log(video);
    video.currentTime = video.getCurrentTime() + 10;
    console.log("Skipped ahead 10 seconds");
});
