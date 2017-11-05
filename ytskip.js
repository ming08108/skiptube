
$( document ).ready(function() {
    var video = $(".html5-main-video").first()[0];
    console.log(video);
    video.currentTime = 45;
    console.log("Skipped to 45");
});
