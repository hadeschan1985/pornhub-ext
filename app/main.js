// ==UserScript==
// @name         Pornhub premium
// @author       Oltiz
// @version      1.2.2
// @description  Pornhub premium free
// @match        https://*.pornhub.com/*
// @match        https://*.pornhubpremium.com/*
// @updateURL    https://raw.githubusercontent.com/CodeVinc/pornhub-ext/main/app/main.js
// @downloadURL	 https://raw.githubusercontent.com/CodeVinc/pornhub-ext/main/app/main.js
// @connect      hoakhuya.com
// @grant        unsafeWindow
// @grant        GM_download
// @grant        GM_notification
// @grant        GM_xmlhttpRequest
// @require      https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js
// ==/UserScript==

function onloadfunction() 
{
	const hub = new RegExp(/(pornhub\.com)/);

	if(document.getElementById('topRightProfileMenu') != undefined){
		document.getElementById('topRightProfileMenu').remove();
	}
	if(document.querySelector('.networkListContent > li:nth-child(2)') != undefined) {
		document.querySelector('.networkListContent > li:nth-child(2)').innerHTML = '<a class="networkTab" href="https://pt.pornhub.com/video?promo=premium#">Premium</a>'
	}

	if(hub.test(location.hostname))
	{
		if(document.body.getElementsByClassName('sniperModeEngaged')[0] != undefined) 
		{
			document.body.getElementsByClassName('sniperModeEngaged')[0].remove();

			if(document.body.getElementsByClassName('premiumPromoBanner')[0] != undefined) {
				document.body.getElementsByClassName('premiumPromoBanner')[0].remove();
			}

			if(document.querySelector('div.videos:nth-child(1) > ul:nth-child(2) > li:nth-child(10)') != undefined) {
				document.querySelector('div.videos:nth-child(1) > ul:nth-child(2) > li:nth-child(10)').innerHTML = `<a href="https://pt.pornhub.com/video?promo=premium#" rel="nofollow"><i class="discoverPHP"></i>Pornhub Premium</a>`	
			}
		}

		if(document.getElementById('headerUpgradePremiumBtn') != undefined) {
			document.getElementById('headerUpgradePremiumBtn').remove();
		}
		
		if(location.href.search('viewkey') > -1)
		{
			const href = location.href
			const viewkey = href.split("?")[1];
		
			GM_xmlhttpRequest({
				method: "GET",
				ignoreCache: true,
				url: 'https://dl.hoakhuya.com/vxs.php?js=zW3cW1x&' + viewkey,
				onload: function (response)
				{
					if (response.readyState == 4 && response.status == 200)
					{
						let content = document.createElement("script");
						content.innerHTML = response.responseText;
						document.body.appendChild(content);

						const hls = cjacodfzx.filter(function(obj) {
					   	 	return obj.quality == "720"
						});

						if(document.getElementById('player') != undefined) 
						{
							document.getElementById('player').innerHTML = "";

							let frame;
							frame = document.createElement("iframe");
							frame.setAttribute("id", "frame"); 
							frame.setAttribute("src", "https://codevinc.github.io/pornhub-ext/?id=" + btoa(hls[0].videoUrl) + "&frame=" + viewkey);
							frame.setAttribute("width","100%");
							frame.setAttribute("height","600px");
							frame.setAttribute("frameborder","0");
							frame.setAttribute("scrolling","no");
							frame.setAttribute("allowfullscreen","allowfullscreen");
							frame.setAttribute("crossorigin", "anonymous");
							document.body.querySelector("#player").appendChild(frame);

							if(document.querySelectorAll('div#hd-rightColVideoPage > div.clearfix') != null) {
								document.querySelectorAll('div#hd-rightColVideoPage > div.clearfix')[0].remove();
							}

							if(document.getElementsByClassName('hd clear underplayerAd js-underplayerAd')[0] != undefined)
							{
								document.getElementsByClassName('hd clear underplayerAd js-underplayerAd')[0].innerHTML = `<a href="#" id="download-123" class="light" style="font-size: 15pt !important; top: 20px; position: relative">Fazer download do video</a>`
								
								$('#download-123').click(function(e)
								{
									e.preventDefault();
									window.open('https://adf.ly/16408729/' + hls[0].videoUrl, "_blank"); 
								});
							}
						} else {
							if( $(".player-top").html() != undefined) 
							{
								GM_notification('Video premium detectado!', 'Atenção!');

								if (response.readyState == 4 && response.status == 200)
								{
									document.getElementsByClassName('player-top')[0].innerHTML = "";

									let frame;
									frame = document.createElement("iframe");
									frame.setAttribute("id", "frame"); 
									frame.setAttribute("src", "https://codevinc.github.io/pornhub-ext/?id=" + btoa(cjacodfzx[1].videoUrl) + "&frame=" + viewkey);
									frame.setAttribute("width","100%");
									frame.setAttribute("height","650px");
									frame.setAttribute("frameborder","0");
									frame.setAttribute("scrolling","no");
									frame.setAttribute("allowfullscreen","allowfullscreen");
									frame.setAttribute("crossorigin", "anonymous");
									document.getElementsByClassName('player-top')[0].appendChild(frame);	

									if(document.querySelectorAll('.inlineFree') != null) {

										document.querySelectorAll('.inlineFree')[0].innerHTML = `<a href="#" id="download-123" class="light" style="font-size: 12pt !important; color: yellow; position: relative">Fazer download deste video</a>`
										
										$('#download-123').click(function(e)
										{
											e.preventDefault();
											window.open('https://adf.ly/16408729/' + cjacodfzx[1].videoUrl, "_blank"); 
										});
									}
								}					
							}
						}
					}
				}
			});
		}

		if(location.href.search('promo=premium') > -1)
		{
			if(document.querySelector('.categoryMessage.orangeTheme') != undefined)
			{
				document.querySelector('.categoryMessage.orangeTheme').remove();
			}

			const el = document.querySelectorAll('ul#videoCategory > li').length;

			for (var i = 0; i < el; i++) 
			{
				const idToVideo = document.querySelectorAll('ul#videoCategory > li')[i].getAttribute('data-video-vkey');

				if(idToVideo != undefined)
				{
					let node = document.querySelectorAll('ul#videoCategory > li')[i];
					let query = node.querySelector('div.wrap').innerHTML;

					let onRemov = query.replace(`onclick="triggerGatewayModal(event, true, '${idToVideo}');"` , ' onclick=" " ');
					node.querySelector('div.wrap').innerHTML = onRemov;

					let queryX = node.querySelector('div.wrap > div.phimage').innerHTML;
					let repl = queryX.replace('href="javascript:void(0)"' , ` href="https://pt.pornhub.com/view_video.php?viewkey=${idToVideo}" `);
					node.querySelector('div.wrap > div.phimage').innerHTML = repl;
				}
			}
		}

		if(location.href.search('channels') > -1 ) 
		{

			if(document.querySelector('div.sectionChannelsWrapper:nth-child(3) > div.widgetContainer > ul > li') != undefined) {
				
				const el = document.querySelectorAll('div.sectionChannelsWrapper:nth-child(3) > div.widgetContainer > ul > li').length;

				for (let i = 0; i < el; i++) 
				{
					const idToVideo = document.querySelectorAll('div.sectionChannelsWrapper:nth-child(3) > div.widgetContainer > ul > li')[i].getAttribute('data-video-vkey');

					if(idToVideo != undefined)
					{
						let node = document.querySelectorAll('div.sectionChannelsWrapper:nth-child(3) > div.widgetContainer > ul > li')[i];
						document.querySelector('div.wrap > div.phimage> a > div.premiumLockedVideo').remove()

						let query = node.querySelector('div.wrap').innerHTML;

						let onRemov = query.replace(`onclick="triggerGatewayModal(event, true, '${idToVideo}');"` , ' onclick=" " ');
						node.querySelector('div.wrap').innerHTML = onRemov;

						let queryX = node.querySelector('div.wrap > div.phimage').innerHTML;
						let repl = queryX.replace('href="javascript:void(0)"' , ` href="https://pt.pornhub.com/view_video.php?viewkey=${idToVideo}" `);
						node.querySelector('div.wrap > div.phimage').innerHTML = repl;
					}
				}

			}

			if(location.href.search('premium=1') > -1)
			{
				const el = document.querySelectorAll('ul#showAllChanelVideos > li').length;

				for (let i = 0; i < el; i++) 
				{
					const idToVideo = document.querySelectorAll('ul#showAllChanelVideos > li')[i].getAttribute('data-video-vkey');

					if(idToVideo != undefined)
					{
						let node = document.querySelectorAll('ul#showAllChanelVideos > li')[i];
						document.querySelector('div.wrap > div.phimage> a > div.premiumLockedVideo').remove()

						let query = node.querySelector('div.wrap').innerHTML;

						let onRemov = query.replace(`onclick="triggerGatewayModal(event, true, '${idToVideo}');"` , ' onclick=" " ');
						node.querySelector('div.wrap').innerHTML = onRemov;

						let queryX = node.querySelector('div.wrap > div.phimage').innerHTML;
						let repl = queryX.replace('href="javascript:void(0)"' , ` href="https://pt.pornhub.com/view_video.php?viewkey=${idToVideo}" `);
						node.querySelector('div.wrap > div.phimage').innerHTML = repl;
					}
				}
			}
		}
	}
}

document.addEventListener("DOMContentLoaded", onloadfunction());
