    $(function() {
        //本地存储功能
        var storage = window.localStorage;
        if (storage.url) {
            // $(".container ").css({
            //     "background ": "url( " + storage.url + ") no-repeat center ",
            //     "background-size ": "100% "
            // });
            document.getElementById('bg').style.backgroundImage = "url( " + storage.url + ") ";
        }

        var test = false;


        function requestFullScreen(element) {
            // 判断各种浏览器，找到正确的方法
            console.log("requestFullScreen! ");
            var requestMethod = element.requestFullScreen || //W3C
                element.webkitRequestFullScreen || //Chrome等
                element.mozRequestFullScreen || //FireFox
                element.msRequestFullScreen; //IE11
            if (requestMethod) {
                requestMethod.call(element);
                console.log("requestFullScreen2 ");
            } else if (typeof window.ActiveXObject !== "undefined ") { //for Internet Explorer
                var wscript = new ActiveXObject("WScript.Shell ");
                if (wscript !== null) {
                    wscript.SendKeys("{F11} ");

                }
            }
        }

        $("body ").contextmenu(function() {
            return false;
        });
        $("body ").click(function() {
            if (!isFullscreenForNoScroll()) {
                requestFullScreen(document.documentElement);
            }
        });

        function isFullscreenForNoScroll() {
            var explorer = window.navigator.userAgent.toLowerCase();
            if (explorer.indexOf('chrome') > 0) { //webkit
                if (document.body.scrollHeight === window.screen.height && document.body.scrollWidth === window.screen.width) {
                    return true;
                } else {
                    return false;
                }
            } else { //IE 9+  fireFox
                if (window.outerHeight === window.screen.height && window.outerWidth === window.screen.width) {
                    return true;
                } else {
                    return false;
                }
            }
        }

        // $("body ").click(function() {
        //     console.log("chrome.send2 ");
        //     console.log(chrome.send('getNumberOfDonuts')); // bake 5 donuts!
        // });
        window.onresize = function() {
            if (!checkFull()) {
                // 要执行的动作
                console.log("ESC OR F11");
                // requestFullScreen(document.documentElement);
            }
        }

        function checkFull() {
            var isFull =
                document.fullscreenElement ||
                document.mozFullScreenElement ||
                document.webkitFullscreenElement
            if (isFull === undefined) isFull = false
            return isFull
        }

        function pclock() {
            this.dom = $(".input input ");
            this.Animate = ["zoomOutDown ", "bounce ", "fadeInDown ", "lightSpeedIn ", "lightSpeedOut ", "flipInY ", "rotateOut ", "bounceInUp "];
        };
        pclock.prototype = {
            Class: function(a, b, c) {
                $(a).show().addClass(b);
                $(a).removeClass(c);
            },
            yanzhen: function() {
                var pwd = '123456'; //设置密码123456
                if (this.dom.val() == pwd) {
                    Lock.Class(".lock ", Lock.Animate[0]);
                } else {
                    this.dom.val(" ");
                    Lock.Class(".input input ", Lock.Animate[1]);
                    this.dom.attr({
                        "placeholder ": "密码错误 "
                    });
                }
            },
            //锁屏
            lockClick: function() {
                this.dom.blur(function() {
                    Lock.Class(this, " ", Lock.Animate[1]);
                    Lock.yanzhen();
                });
                $(window).keydown(function(a) {
                    Lock.Class(".input input ", " ", Lock.Animate[1]);
                    if (a.which == 13) {
                        Lock.yanzhen();
                    }
                })
                $(".n_lock ").click(function() {
                    Lock.dom.val(" ");
                    Lock.dom.attr({
                        "placeholder ": "请输入密码 "
                    });
                    Lock.Class(".lock ", Lock.Animate[2], Lock.Animate[0]);
                })
            },
            photoClick: function(dom, a, b, c) {
                $(dom).click(function() {
                    Lock.Class(a, b, c);
                });
            },
            //设置壁纸
            setPhoto: function() {
                $(".small_pic ").click(function() {
                    var that = $(this);
                    var imgUrl = that.find("img").attr("src");
                    // $(".container ").css({
                    //     "background ": "url( " + imgUrl + ") no-repeat center ",
                    //     "background-size ": "100% "
                    // });
                    document.getElementById('bg').style.backgroundImage = "url( " + imgUrl + ") ";
                    storage.url = imgUrl; // 把最后设置的壁纸存储到localstorage
                });
                $(".choose_local").click(function() {
                    console.log("choose_local");
                });
            },
            //作品
            Work: function() {
                //初始化
                function Zero() {
                    $(".works ul li ").css("width ", "98px ").stop();
                    $(".w_x ").hide();
                    $(".w_font ").show();
                    $(".w_content ").removeClass(Lock.Animate[7]).hide(500);
                };
                $(".n_work ").click(function() {
                    Lock.Class(".works ", " ", Lock.Animate[6]);
                    Lock.Class(".works ul li ", Lock.Animate[5]);
                    Zero();
                });
                $(".works ul li ").click(function() {
                    //此判断==防止冒泡
                    if ($(this).width() != "571 ") {
                        Zero();
                        var that = $(this);
                        $(this).find(".w_x ").show();
                        $(this).find(".w_font ").fadeOut(500);
                        $(this).animate({
                            "width ": "60% "
                        }, 1000, function() {
                            that.find(".w_content ").show().addClass(Lock.Animate[7]);
                        });
                    }
                });
                $(".w_x ").click(function() {
                    $(".works ").addClass(Lock.Animate[6]).hide(1000);
                });
            }
        }
        var Lock = new pclock();
        Lock.lockClick();
        Lock.photoClick(".n_photo ", ".photo ", Lock.Animate[3], Lock.Animate[4]);
        Lock.photoClick(".photo_exit ", ".photo ", Lock.Animate[4], Lock.Animate[3]);
        Lock.setPhoto();
        Lock.Work();
    });