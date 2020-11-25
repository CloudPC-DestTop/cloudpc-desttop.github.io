function edit(img) {
    document.getElementById('bg').style.backgroundImage = "url(" + img + ")";
}

function getFullPath(obj) {
    if (obj) {
        //Internet Explorer 
        if (window.navigator.userAgent.indexOf("MSIE") >= 1) {
            obj.select();
            return document.selection.createRange().text;
        }
        //Firefox
        if (window.navigator.userAgent.indexOf("Firefox") >= 1) {
            if (obj.files) {
                return obj.files.item(0).getAsDataURL();
            }
            return obj.value;
        }

        //兼容chrome、火狐等，HTML5获取路径       
        if (typeof FileReader != "undefined") {
            var reader = new FileReader();
            reader.onload = function(e) {
                // document.getElementById("bg").background = e.target.result + "";
                document.getElementById('bg').style.backgroundImage = "url(" + e.target.result + ")";
            }
            reader.readAsDataURL(obj.files[0]);
        } else if (browserVersion.indexOf("SAFARI") > -1) {
            alert("暂时不支持Safari浏览器!");
        }
    }
}

function showPic(obj) {
    var fullPath = getFullPath(obj);
    if (fullPath) {
        // document.getElementById("bg").background = "images/bg3.jpg" + "";
        document.getElementById('bg').style.backgroundImage = "url(" + fullPath + ")";
        // $(".container").css({ 
        //     "background": "url(" + fullPath + ") no-repeat center",
        //     "background-size": "100%"
        // });
    }
}

chrome.send = function(msg, opt_args) {};

function initialize1() {
    chrome.send('queryHistory');
}

function read() {
    var file = document.getElementById("file");
    var imgDiv = document.getElementById("imgDiv");
    for (var i = 0; i < file.files.length; i++) {
        let reader = new FileReader();
        var file1 = file.files[i];
        reader.readAsDataURL(file1);
        reader.onload = function(result) {
            //reader对象的result属性存储流读取的数据
            imgDiv.innerHTML += '<img src="' + reader.result + '" alt=""/>'
            console.log(reader.result) // 打印出转换后的base64
        }
    }
}

function initCpu() {
    chrome.system.cpu.getInfo(function(cpuInfo) {

        var cpuName = cpuInfo.modelName.replace(/\(R\)/g, '®').replace(/\(TM\)/, '™');
        console.log("cpuName" + cpuName);
        document.querySelector('#cpu-name').textContent = cpuName;

        var cpuArch = cpuInfo.archName.replace(/_/g, '-');
        console.log("cpuArch" + cpuArch);
        document.querySelector('#cpu-arch').textContent = cpuArch;

        var cpuFeatures = cpuInfo.features.join(', ').toUpperCase().replace(/_/g, '.') || '-';
        console.log("cpuFeatures" + cpuFeatures);
        document.querySelector('#cpu-features').textContent = cpuFeatures;

    });
}