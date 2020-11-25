// Registering Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').then(function(registration) {
        setInterval(function() {
            console.log('setInterval');
            registration.update();
        }, 30 * 1000);
        // 注册成功
        console.log('成功-ServiceWorker registration successful with scope: ', registration.scope);
    }).catch(function(err) {
        // 注册失败 :(
        console.log('失败-ServiceWorker registration failed: ', err);
    });
};

const width = 640;
const height = 480;
const video = document.getElementById('video');

//访问摄像头
if (navigator.mediaDevices.getUserMedia || navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia) {
    //调用用户媒体设备, 访问摄像头
    getUserMedia({
        video: {
            width: width,
            height: height
        }
    }, success, error);
} else {
    alert('不支持访问用户媒体');
}

//访问用户媒体设备的兼容方法
function getUserMedia(constraints, success, error) {
    if (navigator.mediaDevices.getUserMedia) {
        //最新的标准API
        navigator.mediaDevices.getUserMedia(constraints).then(success).catch(error);
    } else if (navigator.webkitGetUserMedia) {
        //webkit核心浏览器
        navigator.webkitGetUserMedia(constraints, success, error)
    } else if (navigator.mozGetUserMedia) {
        //firfox浏览器
        navigator.mozGetUserMedia(constraints, success, error);
    } else if (navigator.getUserMedia) {
        //旧版API
        navigator.getUserMedia(constraints, success, error);
    }
}

//成功回调
function success(stream) {
    console.log('成功');
    //兼容webkit核心浏览器
    // const CompatibleURL = window.URL || window.webkitURL;
    //将视频流设置为video元素的源
    // video.src = CompatibleURL.createObjectURL(stream);
    video.srcObject = stream;
    video.play();
    // setInterval(drawCanvasImage, 10)
}

//失败回调
function error(error) {
    alert(error);
    console.log("失败-访问用户媒体设备失败", error);
}

function drawCanvasImage() {
    const canvas = document.getElementById('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, width, height, 0, 0, width, height);
    //获取图片，数据格式为base64
    const imageData = canvas.toDataURL("image/png");
}

function takePhotos() {
    const canvas = document.getElementById('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, width, height, 0, 0, width, height);
    //获取图片，数据格式为base64
    const imageData = canvas.toDataURL("image/png");
    // document.getElementById("bg").background = imageData + "";
    document.getElementById("bg").style.backgroundImage = "url(" + imageData + ")";
}
document.getElementById('take').addEventListener('click', takePhotos, false);


document.onkeydown = function(event) {
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if (e && e.keyCode == 27) { // 按 Esc 
        //要做的事情
        console.log("esc!");
        // toggleHandle();
    }
    if (e && e.keyCode == 121) { // 按 F10
        //要做的事情
        console.log("F10");
        toggleHandle();
    }
    if (e && e.keyCode == 122) { // 按 F11
        //要做的事情
        console.log("F11");
        // alert("F11");
    }
};

function toggleHandle() {
    let element = document.documentElement;
    if (element.webkitRequestFullScreen) {
        element.webkitRequestFullScreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
    console.log("toggleHandle---4");
}