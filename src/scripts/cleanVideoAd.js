/*
 * @Author: qwertyyb 
 * @Date: 2018-01-10 16:25:56 
 * @Last Modified by: qwertyyb
 * @Last Modified time: 2018-01-11 00:13:57
 */

// ,--^----------,--------,-----,-------^--,  
//   | |||||||||   `--------'     |          O  
//   `+---------------------------^----------|  
//     `_,-------, _________________________|  
//       / XXYXXX /`|     /  
//      / XXYXXX /  `   /  
//     / XXBXXX /______(   
//    / XXXXXX /  
//   / XXXXXX /  
//  (________(  
//   `------'   

/**
 * 扩展腾讯移动分析，添加触发事件方法
 * 
 * @param {string} eventId (事件ID)
 * @param {object} params (参数)
 */
MtaH5.emit = function(eventId, params) {
    MtaH5.clickStat(eventId, params)
}

var VideoAdCleaner = {
	version: '20180105',
	status: 'stopped',
	blockCount: 0,
	// these urls will be cancelled
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

	// these urls will be redirected
	redirectList: [
		{
	        reg: /^http:\/\/static\.youku\.com(\/v[\d\.]*)?\/v\/swf\/loaders?[^\.]*\.swf/,
	        replace: "http://7xv7aw.com1.z0.glb.clouddn.com/adblock/player/youku.swf"
	    },
		 
	    {
	        reg: /^http:\/\/static\.youku\.com(\/v[\d\.]*)?\/v\/swf\/(q?player[^\.]*|\w{13})\.swf/,
	        replace: "http://7xv7aw.com1.z0.glb.clouddn.com/adblock/player/youku.swf"
	    },  
		 
	    {
	        reg: "static.youku.com/.*/v/swf/upsplayer/player_yknpsv.swf",
	        replace: "http://7xv7aw.com1.z0.glb.clouddn.com/adblock/player/youku.swf"
	    },
		 
	    {
	        reg: "static.youku.com/.*/v/swf/upsplayer/loader.swf$",
	        replace: "http://7xv7aw.com1.z0.glb.clouddn.com/adblock/player/youku.swf"
	    },	 
		 
		{
	        reg: "static.youku.com/.*/v/swf/upsplayer/player_yk.swf",
	        replace: "http://7xv7aw.com1.z0.glb.clouddn.com/adblock/player/youku.swf"
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
	        replace: "http://7xv7aw.com1.z0.glb.clouddn.com/adblock/player/sohu.swf"
	    },
	    {
	        reg: "[http|https]://tv.sohu.com/upload/swf/.*/Main.swf",
	        replace: "http://7xv7aw.com1.z0.glb.clouddn.com/adblock/player/sohu.swf"
	    },
	      //qq
	    {
	        reg: ".*livew.l.qq.com/livemsg.*ad_type=.*",
	        replace: "https://livew.l.qq.com/livemsg?ty=web&ad_type=0"
	    },
	      //k6	  
	    {
	        reg: "player.ku6cdn.com/default/common/player/.*/player.swf",
	        replace: "http://7xv7aw.com1.z0.glb.clouddn.com/adblock/player/ku6.swf?adss=0"
	    },
	      //17173
	    {
	        reg: "http://f.v.17173cdn.com/.*flash/PreloaderFileFirstpage.swf.*",
	        replace: "http://7xv7aw.com1.z0.glb.clouddn.com/adblock/player/17173.swf"
	    },
	    {
	        reg: "http://f.v.17173cdn.com/.*flash/Player_file.swf.*",
	        replace: "http://7xv7aw.com1.z0.glb.clouddn.com/adblock/player/17173.swf"
	    },
	    {
	        reg: "http://f.v.17173cdn.com/.*flash/PreloaderFile.swf.*",
	        replace: "http://7xv7aw.com1.z0.glb.clouddn.com/adblock/player/17173.swf"
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
	        replace: "http://7xv7aw.com1.z0.glb.clouddn.com/adblock/player/iqiyi.swf"
	    },	
		  
		{
	        reg: "http://t7z.cupid.iqiyi.com/show2.*e=.*",
	        replace: "http://t7z.cupid.iqiyi.com/"
	    },	
	],

	// proxy request about crossdomain.xml 
	setProxy: function () {
		if (this._isProxying) {
			return
		}
		chrome.proxy.settings.set({
			value: {
				mode: "pac_script",
				pacScript: {
					data: "function FindProxyForURL(url, host) {\n  var reg = /http:.*\\/crossdomain\\.xml/;\n   if(reg.test(url)){\n        return 'PROXY play.g3proxy.lecloud.com:80';\n   }\n return 'DIRECT';\n}"
				}
			},
			scope: "regular"
		})
		this._isProxying = true
		setTimeout(this.clearProxy.bind(this), 3000)
	},

	// clear proxy
	clearProxy: function() {
		if (!this._isProxying) {
			return
		}
		chrome.proxy.settings.get({
		    incognito: !1
		}, function (c) {
		   	if (c.levelOfControl == "controlled_by_this_extension") {
		    	chrome.proxy.settings.clear({
		        	scope: "regular"
		    	})
		    }
		});
		this._isProxying = false
	},
	start: function() {
		// cancel these request
		chrome.webRequest.onBeforeRequest.addListener(
			this._cancelRequst.bind(this), {urls: this.blockList}, ['blocking'])
		
		// proxy and redirect request
		chrome.webRequest.onBeforeRequest.addListener(
			this._redirectRequest.bind(this), {urls: ['http://*/*', 'https://*/*']}, ['blocking'])

		this.updateStatus('running')
	},
	stop: function() {
		chrome.webRequest.onBeforeRequest.removeListener(_this._cancelRequst)
		chrome.webRequest.onBeforeRequest.removeListener(_this._redirectRequest)
		this.clearProxy()

		this.updateStatus('stopped')
	},
	updateStatus: function(newValue) {
		if (this.status === newValue) {
			return
		}
		this.status = newValue
		var icon = '../icons/on.png'
		switch (newValue) {
			case 'running': icon = '../icons/on.png'
			break
			case 'stopped': icon = '../icons/off.png'
			break
		}
		chrome.browserAction.setIcon({
			path: icon
		})
	},
	updateBlockCountStatus: function(count) {
		this.blockCount = count
		chrome.browserAction.setBadgeText({
			text: count.toString()
		})
	},
	_cancelRequst: function(details) {
		this.updateBlockCountStatus(this.blockCount+1)
		this.pushToMtaH5(details.url)
		return {cancel: true}
	},
	_redirectRequest: function(details) {
		// if (/^http:\/\/player\.letvcdn\.com\/.*p\/.*\/newplayer\/LetvPlayer\.swf.*baidushort.*/i.test(details.url)) {
		// 	this.updateBlockCountStatus(this.blockCount+1)
		// 	return
		// }
	    if (details.url.toLowerCase().indexOf("crossdomain.xml") != -1) {
	    	this.setProxy()
	    	return
	    }
	    for (var i = 0, len=this.redirectList.length; i < len; i++) {
	  		var item = this.redirectList[i]
	  		if (details.url.match(item.reg)) {
				var arr = details.url.split('?')
				this.updateBlockCountStatus(this.blockCount+1)
				this.pushToMtaH5(details.url, item.reg)
		    	return {
		      		redirectUrl: item.replace + (arr.length > 1 ? '' : '?' + arr[1])
		    	}
	  		}
	  	}
	},
	pushToMtaH5: function(url, match) {
		if (match) {
			MtaH5.clickStat('ads', {
				match: match,
				url: url
			})
		} else {
			MtaH5.clickStat('ads', {url: url})
		}
	}
}
/**
 * @param  {string} errMsg
 * @param  {string} errUrl
 * @param  {number} errLineNo
 * @param  {number} errColNo
 * @param  {Error} err
 */
window.onerror = function (errMsg, errUrl, errLineNo, errColNo, err) {
	chrome.browserAction.setIcon({
		path: 'icons/err.png'
	})
	MtaH5.emit('err', {
		row: errLineNo,
		column: errColNo,
		msg: errMsg,
		stack: err.stack,
		file: errUrl
	})
}
VideoAdCleaner.start()
