var VideoAdCleaner = {
	version: '20171201',
	blockList: [
		"http://*/*/*/*/letv-gug/*/ver_*-avc-*-aac-*.letv*",
		"http://*.letvimg.com/lc*_gugwl/*/*/*/*/*",
		"http://*.letvimg.com/lc*_diany/*/*/*/*/*",
		"http://*/*/js/ikuAdapterNew.js*",
		"http://*/vmind.qqvideo.tc.qq.com/*.mp4?vkey=*",
		"http://*.gtimg.com/qqlive/*",
		"http://valf.atm.youku.com/vf*&site=1&rt=*&p=1&vl=*",
		"http://valp.atm.youku.com/*",
		"http://valb.atm.youku.com/*",
		"http://valc.atm.youku.com/*",
		"http://valt.atm.youku.com/*",
		"http://valo.atm.youku.com/*",
		"http://valf.atm.youku.com/vf?aw=*",
		"http://valf.atm.youku.com/vf?site=*",
		"http://*/vlive.qqvideo.tc.qq.com/*.mp4?vkey=*",
		"http://*/variety.tc.qq.com/*.mp4?vkey=*"
	],
	redirectList: [
		{
	        reg: /^http:\/\/static\.youku\.com(\/v[\d\.]*)?\/v\/swf\/loaders?[^\.]*\.swf/,
	        replace: "http://adclear.b0.upaiyun.com/pc_v4/spz/player3.swf"
	    },
		 
	    {
	        reg: /^http:\/\/static\.youku\.com(\/v[\d\.]*)?\/v\/swf\/(q?player[^\.]*|\w{13})\.swf/,
	        replace: "http://adclear.b0.upaiyun.com/pc_v4/spz/player3.swf"
	    },  
		 
	    {
	        reg: "static.youku.com/.*/v/swf/upsplayer/player_yknpsv.swf",
	        replace: "http://adclear.b0.upaiyun.com/pc_v4/spz/player3.swf"
	    },
		 
	    {
	        reg: "static.youku.com/.*/v/swf/upsplayer/loader.swf$",
	        replace: "http://adclear.b0.upaiyun.com/pc_v4/spz/player3.swf"
	    },	 
		 
		{
	        reg: "static.youku.com/.*/v/swf/upsplayer/player_yk.swf",
	        replace: "http://adclear.b0.upaiyun.com/pc_v4/spz/player3.swf"
	    },	
		 
	    {
	        reg: "adclear.b0.upaiyun.com/pc_v4/spz/danmu.swf",
	        replace: "http://static.youku.com/v20170322.0/v/swf/upsplayer/danmu.swf"
	    },	 
		 
	      //LETV
	    {
	        reg: "ark.letv.com/.*ark=.*",
	        replace: "http://ark.letv.com/s?ark=120"
	    },

	      //Sohu
	    {
	        reg: "http://220.181.90.161/wp8player/Main.swf",
	        replace: "http://adclear.b0.upaiyun.com/pc_v4/plugin/data/sohu160908.swf"
	    },
	    {
	        reg: "[http|https]://tv.sohu.com/upload/swf/.*/Main.swf",
	        replace: "http://adclear.b0.upaiyun.com/pc_v4/plugin/data/sohu160908.swf"
	    },
	      //qq
	    {
	        reg: ".*livew.l.qq.com/livemsg.*ad_type=.*",
	        replace: "https://livew.l.qq.com/livemsg?ty=web&ad_type=0"
	    },
	      //k6	  
	    {
	        reg: "player.ku6cdn.com/default/common/player/.*/player.swf",
	        replace: "http://adclear.b0.upaiyun.com/pc_v4/plugin/data/ku6-player.swf?adss=0"
	    },
	      //17173
	    {
	        reg: "http://f.v.17173cdn.com/.*flash/PreloaderFileFirstpage.swf.*",
	        replace: "http://adclear.b0.upaiyun.com/pc_v4/plugin/data/adsafeplugin001/17173.swf"
	    },
	    {
	        reg: "http://f.v.17173cdn.com/.*flash/Player_file.swf.*",
	        replace: "http://adclear.b0.upaiyun.com/pc_v4/plugin/data/adsafeplugin001/17173.swf"
	    },
	    {
	        reg: "http://f.v.17173cdn.com/.*flash/PreloaderFile.swf.*",
	        replace: "http://adclear.b0.upaiyun.com/pc_v4/plugin/data/adsafeplugin001/17173.swf"
	    },
	    {
	        reg: ".*adsafeplugin001/SM.swf",
	        replace: "http://f.v.17173cdn.com/20160926/flash/SM.swf"
	    },
	    {
	        reg: ".*adsafeplugin001/FilePlayer.swf",
	        replace: "http://f.v.17173cdn.com/20160926/flash/FilePlayer.swf"
	    },
		  
	    {
	        reg: "http://www.iqiyi.com/common/flashplayer/.*/.*df.swf",
	        replace: "http://adclear.b0.upaiyun.com/pc_v4/spz/iqiyi.swf"
	    },	
		  
		{
	        reg: "http://t7z.cupid.iqiyi.com/show2.*e=.*",
	        replace: "http://t7z.cupid.iqiyi.com/"
	    },	
	],
	setProxy () {
		if (this._isProxying) {
			return
		}
		chrome.proxy.settings.set({
			value: {
				mode: "pac_script",
				pacScript: {
					data: "function FindProxyForURL(url, host) {\n  var regexpr = /http:.*\\/crossdomain\\.xml/;\n   if(regexpr.test(url)){\n        return 'PROXY play.g3proxy.lecloud.com:80';\n   }\n return 'DIRECT';\n}"
				}
			},
			scope: "regular"
		})
		this._isProxying = true
		setTimeout(this.clearProxy, 3000)
	},
	clearProxy () {
		if (!this._isProxying) {
			return
		}
		chrome.proxy.settings.get({
		    incognito: !1
		}, function (c) {
		   	if (c.levelOfControl == "controlled_by_this_extension") {
		    	chrome.proxy.settings.clear({
		        	scope: "regular"
		    	});
		    }
		});
		this._isProxying = false
	},
	init () {
		var _this = this
		// cancel these request
		chrome.webRequest.onBeforeRequest.addListener(
			_this._cancelRequst.bind(this), {urls: this.blockList}, ['blocking'])
		
		// proxy and redirect request
		chrome.webRequest.onBeforeRequest.addListener(
			_this._redirectRequest.bind(this), {urls: ['http://*/*', 'https://*/*']}, ['blocking'])
	},
	stop () {
		chrome.webRequest.onBeforeRequest.removeListener(_this._cancelRequst)
		chrome.webRequest.onBeforeRequest.removeListener(_this._redirectRequest)
	},
	_cancelRequst (details) {
		return {cancel: true}
	},
	_redirectRequest (details) {
		if (/^http:\/\/player\.letvcdn\.com\/.*p\/.*\/newplayer\/LetvPlayer\.swf.*baidushort.*/i.test(details.url)) {
	    	return
		}
	    if (details.url.toLowerCase().indexOf("crossdomain.xml") != -1) {
	    	this.setProxy()
	    	return
	    }
	    for (var i = 0, len=this.redirectList.length; i < len; i++) {
	  		var item = this.redirectList[i]
	  		if (details.url.match(item.reg)) {
		    	var arr = details.url.split('?')
		    	return {
		      		redirectUrl: item.replace + (arr.length > 1 ? '' : '?' + arr[1])
		    	}
	  		}
	  	}
	}
}

console.log(VideoAdCleaner.version)
VideoAdCleaner.init()
