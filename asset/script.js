let num = 0;

function onload() {

    const url = new URLSearchParams(document.location.search.substring(1));

    if(url.get('id') != null && url.get('frame') != null )
    {
        const video = window.atob(url.get('id'));
        const video_id = url.get('frame');

        const jw = jwplayer("player_div");

        jw.setup({
            "title": "PornHub Premium | By Oltiz",
            "file": video,
            "width": "100%",
            "height": "100%",
            "autostart": true,
            "primary": "html5",
            "mute": false
        });

        jwplayer().on('ready', function () {

            if (localStorage.getItem(video_id) != null) 
            {
                document.getElementsByTagName("video")[0].currentTime = localStorage.getItem(video_id);
            }

            document.body.querySelector(".main-content").style.display = "none";
            document.body.querySelector(".footer").style.display = "none";
        });

        setInterval(function() 
        {
            if (jwplayer().getState() == "playing") 
            {
                localStorage.setItem(video_id, jwplayer().getPosition());
            }
        }, 4000);
        
    } else {
        if( document.body.getElementsByClassName("main-content")[0] != null) {
            document.body.getElementsByClassName("main-content")[0].innerText = "Faça o Download e instale a extensão no seu Google Chrome!\nhttps://github.com/CodeVinc/pornhub-ext/releases/tag/1.1"+
            "\n\nQual quer duvida consulte o grupo ofical no telegram! \nhttps://t.me/joinchat/OupwRVOm-s9tZozr2FzVpw";
        }
    }
}

document.addEventListener("DOMContentLoaded", onload());