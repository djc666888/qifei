#!name=Spotify premium
#!desc=请勿转发.VX：PJ-xiaowangzi
# 功能: 1.去除语音广告 2.歌手/专辑列表正常展示 3.去除随机播放 4.无限切歌随意快进后退 5.解除14天地区登录限制.
[MITM]
hostname = %APPEND% spclient.wg.spotify.com

[Script]
spotify-json = type=http-request,pattern=^https:\/\/spclient\.wg\.spotify\.com\/(artistview\/v1\/artist|album-entity-view\/v2\/album)\/,requires-body=0,script-path=https://raw.githubusercontent.com/djc666888/qifei/main/js/3/soptify-json.js
spotify-proto = type=http-response,pattern=^https:\/\/spclient\.wg\.spotify\.com\/(bootstrap\/v1\/bootstrap|user-customization-service\/v1\/customize)$,requires-body=1,binary-body-mode=1,max-size=0,script-path=https://raw.githubusercontent.com/djc666888/qifei/main/js/3/spotify.js
