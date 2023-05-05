document.addEventListener("DOMContentLoaded", function(event) {
    var inputSearch =document.getElementById("keyword");
    inputSearch.onkeydown = function(event){
        if (event.keyCode == 13){
            loadVideo(this.value);
        }
    }
    loadVideo("Đen Vâu");
});

var modal = document.getElementById('myModal');

var span = document.getElementsByClassName("close")[0];

var videoFrame = document.getElementById("video-frame");
span.onclick = function() {
    closeVideo();
}

window.onclick = function(event) {
    if (event.target == modal){
        closeVideo();
    }
}

function loadVideo(keyword){
    var YOUTUBE_API = "https://content.googleapis.com/youtube/v3/search?q=" + keyword + "&type=video&maxResults=9&part=snippet&key=AIzaSyCO_f4mE8n4Pw1R0XN3xUZO1tXUAXHuCHw"

    var xhr = new XMLHttpRequest();
    xhr.open("GET", YOUTUBE_API, true);
    xhr.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            var respondseJson = JSON.parse(this.respondseText);
            var htmlContent = "";

            for (var i=0; i< respondseJson.items.length; i++) {
                if (
                    respondseJson.items[i].id.kind == 'youtube#channel'){
                    continue;
                }
                var videoId = respondseJson.items[i].if.videoId;
                var videoTitle = respondseJson.items[i].snippet.title;
                var videoDescription = respondseJson.items[i].snippet.description;
                var videoThumbnail = respondseJson.items[i].snippet.thumbnail.medium.url;
                htmlContent += '<div class="video" onclick="showvideo(\'' + videoId + '\')">'
                htmlcontent += '<img src="' + videoThubnail + '">'
                htmlContent += '<div class="title">' + videoTitle + '</div>'
                htmlcontent += '</div>'
            }
            document.getElementById("list-video").innerHTML = htmlContent;
        } else if (this.readyState == 4){
            console.log("Fails");
        }
    };
    xhr.send();
}
function closeVideo(){
    modal.style.display = "none";
    videoFrame.src = "";
}
function showVideo(videoId){
    videoFrame.src = "http://www.youtube.com/embed/" + videoId + "?autoplay=1";
    setTimeout(function(){
        modal.style.display = "block";
    }, 300);
}