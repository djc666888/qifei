*/

const $ = new Env('i 茅台');
const notify = $.isNode() ? require('./sendNotify') : '';
const MT_INFO = '028e7f96f6369cafe1d105579c5b9377';
const nowDate = parseInt((new Date().getTime() / 1000).toString());  // 当前时间戳
const zeroDate = (nowDate - (nowDate % 86400) - 3600 * 8) * 1000;  // 今日零点时间戳
let productInfo = [], message = '', CookieArr = [], Cookie = '', DeviceID = '';

let MT_PROVINCE = $.getdata('MT_PROVINCE') || '广东省';
let MT_CITY = $.getdata('MT_CITY') || '广州市';
let MT_DISTRICT = $.getdata('MT_DISTRICT') || '';
let MT_ITEM_BLACK = $.getdata('MT_ITEM_BLACK') || '2478|10056';
let MT_TOKENS = $.getdata('MT_TOKENS') || '';
let MT_VERSION = $.getdata('MT_VERSION') || '1.4.9';
let MT_USERAGENT = $.getdata('MT_USERAGENT') || 'iOS;16.1.2;Apple;?unrecognized?';
let MT_R = $.getdata('MT_R') || 'clips_OlU6TmFRag5rCXwbNAQ/Tz1SKlN8THcecBp/HGhHdw==';

if ($.isNode()) {
  MT_PROVINCE = process.env.MT_PROVINCE ? process.env.MT_PROVINCE : MT_PROVINCE;
  MT_CITY = process.env.MT_CITY ? process.env.MT_CITY : MT_CITY;
  MT_DISTRICT = process.env.MT_DISTRICT ? process.env.MT_DISTRICT : MT_DISTRICT;
  MT_ITEM_BLACK = process.env.MT_ITEM_BLACK ? process.env.MT_ITEM_BLACK : MT_ITEM_BLACK;
  MT_TOKENS = process.env.MT_TOKENS ? process.env.MT_TOKENS : MT_TOKENS;
  MT_VERSION = process.env.MT_VERSION ? process.env.MT_VERSION : MT_VERSION;
  MT_USERAGENT = process.env.MT_USERAGENT ? process.env.MT_USERAGENT : MT_USERAGENT;
  MT_R = process.env.MT_R ? process.env.MT_R : MT_R;
}

!(async () => {
  if (isGetCookie = typeof $request !== `undefined`) {
    GetCookie();
    $.done();
  }

  function GetCookie() {
    if ($request && $request.headers) {
      if (($request.headers['MT-Token'] && $request.headers['MT-Device-ID']) || ($request.headers['mt-token'] && $request.headers['mt-device-id'])) {
        let new_MT_Token = $request.headers['MT-Token'] || $request.headers['mt-token'];
        let new_Device_ID = $request.headers['MT-Device-ID'] || $request.headers['mt-device-id'];
        let old_MT_Token = MT_TOKENS.split(',') ? MT_TOKENS.split(',')[1] : '';
        if (old_MT_Token !== new_MT_Token) {
          $.setdata(new_Device_ID + ',' + new_MT_Token, 'MT_TOKENS');
          $.msg($.name, `🎉 Token获取成功`, `${new_Device_ID + ',' + new_MT_Token}`);
        } else {
          $.log(`无需更新 MT-Token:\n${new_Device_ID + ',' + new_MT_Token}\n`);
        }
      }
      if ($request.headers['MT-APP-Version'] || $request.headers['mt-app-version']) {
        $.MT_VERSION = $request.headers['MT-APP-Version'] || $request.headers['mt-app-version'];
        $.setdata($.MT_VERSION, `MT_VERSION`);
        $.log(`🎉 MT_VERSION 写入成功:\n${$.MT_VERSION}\n`);
      }
      if ($request.headers['User-Agent'] || $request.headers['user-agent']) {
        $.MT_USERAGENT = $request.headers['User-Agent'] || $request.headers['user-agent'];
        $.setdata($.MT_USERAGENT, `MT_USERAGENT`);
        $.log(`🎉 MT_USERAGENT 写入成功:\n${$.MT_USERAGENT}\n`);
      }
      if ($request.headers['MT-R'] || $request.headers['mt-r']) {
        $.MT_R = $request.headers['MT-R'] || $request.headers['mt-r'];
        $.setdata($.MT_R, `MT_R`);
        $.log(`🎉 MT_R 写入成功:\n${$.MT_R}\n`);
      }
    }
  }
