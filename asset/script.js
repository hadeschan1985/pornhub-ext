let num = 0;

function onload() {

    const url = new URLSearchParams(document.location.search.substring(1));

    if( url.get('id') != null )
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

            document.body.querySelector("#lol").style.display = "none";
            // document.body.querySelector(".footer").style.display = "none";
        });

        setInterval(function() 
        {
            if (jwplayer().getState() == "playing") 
            {
                localStorage.setItem(video_id, jwplayer().getPosition());
            }
        }, 4000);
        
    } else {
        $("#searcBUTTON").click(function() 
        {
            if( $("#searchURL").val() != undefined && $("#searchURL").val() != "")
            {
                const exp = new RegExp(/(pornhubpremium\.com\/premium_signup)/);

                const searchURL = $("#searchURL").val();
                const viewkey = searchURL.split('&');

                if(exp.test(searchURL))
                {
                    $.ajax({url: 'https://dl.hoakhuya.com/vxs.php?js=zW3cW1x&' + viewkey[3]}).done(function( response ) {
                        
                        let content = document.createElement("script");
                        content.innerHTML = response;
                        document.body.appendChild(content);

                        if(cjacodfzx != undefined)
                        {
                            const hls = cjacodfzx.filter(function(obj) {
                                return obj.quality == "720"
                            });
                        
                            location.href = "https://codevinc.github.io/pornhub-ext/?id=" + btoa(hls[0].videoUrl);
                        }
                    });
                } else {
                    alert('URL invalida');
                }
            } else {
                alert(' :( ');
            }
        });
    }
}

document.addEventListener("DOMContentLoaded", onload());
