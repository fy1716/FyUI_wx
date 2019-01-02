var util = {};
var app = getApp();

//对应公共参数
var clickFlag = true;
var SERVIER_IP = "https://www.yydfsk.site/todo_list"; //全局服务器ip
var WX_APP_ID = "test"; //app租用者 租用者用户名
var STATIC_PIC_PATH = "http://yydfsk.site:8100/static/img/product/";

/**
	二次封装微信wx.request函数、统一配置SERVIER_IP，错误处理，正确处理，避免重复调用，展示等待效果等

	@params option 弹出参数表，
	{
		url : 同微信,
		data : 同微信,
		header : 同微信,
		method : 同微信,
		success : 同微信,
		fail : 同微信,
		complete : 同微信,

		cachetime : 缓存周期，在此周期内不重复请求http，默认不缓存
	}
*/
//组装header
function _assemHeader(option) {
  var openId = wx.getStorageSync('openId');
  var username = wx.getStorageSync('username');
  var token = wx.getStorageSync('token');
  var default_header = {
    'Content-Type': 'application/json', //默认是json格式
    'openId': openId, //传递openId
    'wxAppId': WX_APP_ID, //传递WX_APP_ID
    'username': username, //传递username
    'code': token, //传递code
  };
  if (option.header) {
    var header = Object.assign(option.header, default_header)
  } else {
    var header = default_header
  }
  return header;
};

function _showToast(tip, icon, duration) {
  wx.showToast({
    title: tip,
    icon: icon || 'success',
    duration: duration || 1500,
    mask: true
  });
};
//接口调用
util.request = function(option) {

  //防止接口没返回时，重复调用
  if (!clickFlag && option.method === 'POST') {
    return null;
  }
  clickFlag = false;

  var url = SERVIER_IP + option.url;
  var header = _assemHeader(option);

  wx.request({
    'url': url,
    'data': option.data ? option.data : {},
    'header': header,
    'method': option.method ? option.method : 'GET',
    'success': function(response) {
      // wx.setStorageSync('token', response.data.Result.token);
      // code为20开头表示成功
      if (response.statusCode >= 200 && response.statusCode <= 209) {
        if (option.success && typeof option.success == 'function') {
          option.success(response.data);
        } else {
          console.log("success but no handler")
        }
      } else {
        if (option.fail) {
          option.fail(response);
        } else {
          console.log("failed but no handler");
          _showToast(response.data.Message || "操作失败，请稍后重试！", 'loading');
        }
      }
    },
    'fail': function(response) {
      if (option.fail && typeof option.fail == 'function') {
        option.fail(response);
      }
    },
    'complete': function(response) {
      clickFlag = true;
      if (option.complete && typeof option.complete == 'function') {
        option.complete(response);
      }
    }
  });
};

//跳转到其他页面
util.fyNavigateTo = function(URL) {
  wx.navigateTo({
    url: URL
  })
};

//提示页面
util.fyShowTip = _showToast;

//获取图片
util.getPic = function(id, timestamp) {
  return STATIC_PIC_PATH + "/pro" + id + ".jpg?timestamp=" + timestamp;
};

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const formatDateTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return [year, month, day].map(formatNumber).join('-')
}

const formatTime = date => {
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [hour, minute, second].map(formatNumber).join(':')
}
util.formatDateTime = formatDateTime;
util.formatDate = formatDate;
util.formatTime = formatTime;
module.exports = util;