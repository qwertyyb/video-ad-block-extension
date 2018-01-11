var qiniu = require("qiniu");


var key='test.mp4';



//需要填写你的 Access Key 和 Secret Key
var accessKey = 'ee6pZ2JdJFo_ghWAbpX1CpX3nXUSDvXagOINEqjb',
    secretKey = 'J415z4sBMq6tnlCaTm9UKpl_onGt6pG3UiTls1u6',
    //要上传的空间
    bucket = 'cdns',
    //上传到七牛后保存的文件名
    key = 'adblock/videoAdBlock.crx',
    //要上传文件的本地路径
    localFile = "videoAdBlock.crx";

//构建上传策略函数
function getUpToken(bucket, key) {
    var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    var putPolicy = new qiniu.rs.PutPolicy({
        scope: bucket+":"+key,
        expires: 600
    });
    var uploadToken = putPolicy.uploadToken(mac);
    return uploadToken;
}

function uploadFile(localFile, key, token) {
    // 七牛配置
    var config = new qiniu.conf.Config();
    // 空间对应的机房
    config.zone = qiniu.zone.Zone_z0;
    // 是否使用https域名
    // config.useHttpsDomain = true;
    // 上传是否使用cdn加速
    config.useCdnDomain = false;

    var formUploader = new qiniu.form_up.FormUploader(config);
    var putExtra = new qiniu.form_up.PutExtra();
    // 文件上传
    formUploader.putFile(token, key, localFile, putExtra, function(err,
        respBody, respInfo) {
        if (err) {
            throw err;
        }
    
        if (respInfo.statusCode == 200) {
            console.log("上传成功:" + respBody);
        } else {
            console.log(respInfo.statusCode);
            console.log(respBody);
        }
    });
}

//生成上传 Token
token = getUpToken(bucket, key);
uploadFile(localFile, key, token);