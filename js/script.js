$(window).on('load', function () { // makes sure the whole site is loaded 
    $('#status').fadeOut(); // will first fade out the loading animation 
    $('#preloader').delay(500).fadeOut('slow'); // will fade out the white DIV that covers the website. 
    checkTouchScreen();
})

$(document).ready(function () {
    ! function (t) {
        function i(i, a) {
            this.settings = t.extend(!0, e, a), this.$context = i, this.domAudio = this.$context.find("audio")[0], this.$domPlaylist = this.$context.find(".jAudio--playlist"), this.$domControls = this.$context.find(".jAudio--controls"), this.$domVolumeBar = this.$context.find(".jAudio--volume"), this.$domDetails = this.$context.find(".jAudio--details"), this.$domStatusBar = this.$context.find(".jAudio--status-bar"), this.$domProgressBar = this.$context.find(".jAudio--progress-bar-wrapper"), this.$domTime = this.$context.find(".jAudio--time"), this.$domElapsedTime = this.$context.find(".jAudio--time-elapsed"), this.$domTotalTime = this.$context.find(".jAudio--time-total"), this.$domThumb = this.$context.find(".jAudio--thumb"), this.currentState = "pause", this.currentTrack = this.settings.defaultTrack, this.currentElapsedTime = void 0, this.timer = void 0, this.init()
        }
        var a = "jAudio",
            e = {
                playlist: [],
                defaultAlbum: void 0,
                defaultArtist: void 0,
                defaultTrack: 0,
                autoPlay: !1,
                debug: !1
            };
        i.prototype = {
            init: function () {
                var t = this;
                t.renderPlaylist(), t.preLoadTrack(), t.highlightTrack(), t.updateTotalTime(), t.events(), t.debug(), t.domAudio.volume = 1
            },
            play: function (t) {
                var i = this;
                i.domAudio.play(), "play" !== i.currentState && (clearInterval(i.timer), i.timer = setInterval(i.run.bind(i), 50), i.currentState = "play", t.data("action", "pause"), t.removeClass("jAudio--control-play"), t.addClass("jAudio--control-pause"), t.toggleClass("active"))
            },
            pause: function (t) {
                var i = this;
                i.domAudio.pause(), clearInterval(i.timer), i.currentState = "pause", t.data("action", "play"), t.removeClass("jAudio--control-pause"), t.addClass("jAudio--control-play"), t.toggleClass("active")
            },
            stop: function () {
                var t = this;
                t.domAudio.pause(), t.domAudio.currentTime = 0, t.animateProgressBarPosition(), clearInterval(t.timer), t.updateElapsedTime(), t.currentState = "stop"
            },
            prev: function () {
                var t, i = this;
                t = 0 === i.currentTrack ? i.settings.playlist.length - 1 : i.currentTrack - 1, i.changeTrack(t)
            },
            next: function () {
                var t, i = this;
                t = i.currentTrack === i.settings.playlist.length - 1 ? 0 : i.currentTrack + 1, i.changeTrack(t)
            },
            preLoadTrack: function () {
                var t = this,
                    i = t.settings.defaultTrack;
                t.changeTrack(i), t.stop()
            },
            changeTrack: function (t) {
                var i = this;
                i.currentTrack = t, i.domAudio.src = i.settings.playlist[t].file, ("play" === i.currentState || i.settings.autoPlay) && i.play(), i.highlightTrack(), i.updateThumb(), i.renderDetails()
            },
            events: function () {
                var i = this;
                i.$domControls.on("click", ".jAudio--control", function () {
                    var a = t(this),
                        e = a.data("action");
                    switch (e) {
                        case "prev":
                            i.prev.call(i, a);
                            break;
                        case "next":
                            i.next.call(i, a);
                            break;
                        case "pause":
                            i.pause.call(i, a);
                            break;
                        case "stop":
                            i.stop.call(i, a);
                            break;
                        case "play":
                            i.play.call(i, a)
                    }
                }), i.$domPlaylist.on("click", ".jAudio--playlist-item", function () {
                    var a = t(this),
                        e = (a.data("track"), a.index());
                    i.currentTrack !== e && i.changeTrack(e)
                }), i.$domProgressBar.on("click", function (t) {
                    i.updateProgressBar(t), i.updateElapsedTime()
                }), t(i.domAudio).on("loadedmetadata", function () {
                    i.animateProgressBarPosition.call(i), i.updateElapsedTime.call(i), i.updateTotalTime.call(i)
                })
            },
            getAudioSeconds: function (t) {
                var i = this,
                    t = t % 60;
                return t = i.addZero(Math.floor(t), 2), t = 60 > t ? t : "00"
            },
            getAudioMinutes: function (t) {
                var i = this,
                    t = t / 60;
                return t = i.addZero(Math.floor(t), 2), t = 60 > t ? t : "00"
            },
            addZero: function (t, i) {
                for (var t = String(t); t.length < i;) t = "0" + t;
                return t
            },
            removeZero: function (t, i) {
                for (var t = String(t), a = 0; i > a && "0" === t[0];) t = t.substr(1, t.length), a++;
                return t
            },
            highlightTrack: function () {
                var t = this,
                    i = t.$domPlaylist.children(),
                    a = "active";
                i.removeClass(a), i.eq(t.currentTrack).addClass(a)
            },
            renderDetails: function () {
                var t = this,
                    i = t.settings.playlist[t.currentTrack],
                    a = (i.file, i.thumb, i.trackName),
                    e = i.trackArtist,
                    r = (i.trackAlbum, "");
                r += "<div class='song_name'>", r += "<span>" + a + "</span>", r += "</div>", r += "<div class='artist_name'>", r += "<span>" + e + "</span>", r += "</div>", t.$domDetails.html(r)
            },
            renderPlaylist: function () {
                var i = this,
                    a = "";
                t.each(i.settings.playlist, function (t, i) {
                    {
                        var e = i.file,
                            r = i.thumb,
                            o = i.trackName,
                            s = i.trackArtist;
                        i.trackAlbum
                    }
                    trackDuration = "00:00", a += "<div class='jAudio--playlist-item' data-track='" + e + "'><div class='jAudio--playlist-meta'><h6 class='jAudio--playlist-meta-track-name'>" + o + "</h6><p class='jAudio--playlist-meta-track-artist'>" + s + "</p></div></div>"
                }), i.$domPlaylist.html(a)
            },
            run: function () {
                var t = this;
                t.animateProgressBarPosition(), t.updateElapsedTime(), t.domAudio.ended && t.next()
            },
            animateProgressBarPosition: function () {
                var t = this,
                    i = 100 * t.domAudio.currentTime / t.domAudio.duration + "%",
                    a = {
                        width: i
                    };
                t.$domProgressBar.children().eq(0).css(a)
            },
            updateProgressBar: function (t) {
                var i, a, e, r = this;
                t.offsetX && (i = t.offsetX), void 0 === i && t.layerX && (i = t.layerX), a = i / r.$domProgressBar.width(), e = r.domAudio.duration * a, r.domAudio.currentTime = e, r.animateProgressBarPosition()
            },
            updateElapsedTime: function () {
                var t = this,
                    i = t.domAudio.currentTime,
                    a = t.getAudioMinutes(i),
                    e = t.getAudioSeconds(i),
                    r = a + ":" + e;
                t.$domElapsedTime.text(r)
            },
            updateTotalTime: function () {
                var t = this,
                    i = t.domAudio.duration,
                    a = t.getAudioMinutes(i),
                    e = t.getAudioSeconds(i),
                    r = a + ":" + e;
                t.$domTotalTime.text(r)
            },
            updateThumb: function () {
                var t = this,
                    i = t.settings.playlist[t.currentTrack].thumb,
                    a = {
                        "background-image": "url(" + i + ")"
                    },
                    b = {
                        "background-image": "url(https://s30.postimg.org/shr4aygpt/default_album_art_blue2.jpg)"
                    };
                if (i !== "") {
                    t.$domThumb.css(a)
                } else {
                    t.$domThumb.css(b)
                }
            },
            debug: function () {
                var t = this;
                t.settings.debug && console.log(t.settings)
            }
        }, t.fn[a] = function (a) {
            var e = function () {
                return new i(t(this), a)
            };
            t(this).each(e)
        }
        console.log(i);
    }(jQuery);


    (function () {

        var t = {
            playlist: [{
                file: "http://www.michaelmammoliti.com/_projects/audioJS/songs/01.mp3",
                thumb: "",
                trackName: "Dusk",
                trackArtist: "Tobu & Syndec",
                trackAlbum: "Single",
      }, {
                file: "http://www.michaelmammoliti.com/_projects/audioJS/songs/02.mp3",
                thumb: "http://www.michaelmammoliti.com/_projects/audioJS/artworks/02.jpg",
                trackName: "Blank",
                trackArtist: "Disfigure",
                trackAlbum: "Single",
      }, {
                file: "http://www.michaelmammoliti.com/_projects/audioJS/songs/03.mp3",
                thumb: "http://www.michaelmammoliti.com/_projects/audioJS/artworks/03.jpg",
                trackName: "Fade",
                trackArtist: "Alan Walker",
                trackAlbum: "Single",
      }]
        }

        $(".jAudio").jAudio(t);

    })();
    (function () {
        $('.back_btn').on('click', function () {
            $('.player_playlist').toggleClass('playlist_on');
            $('.glyphicon-menu-left').toggleClass('back_btn_on');
            $('.waves').toggleClass('waves_up');
            $('.album_wrap').toggleClass('album_up');
            $('.song_playing').toggleClass('song_playing_up');
            $('.timeline_wrap').toggleClass('timeline_wrap_up');
            $('.player_btns').toggleClass('player_btns_up');
            $('.line_played').toggleClass('line_played_up');
            $('.full_line').toggleClass('full_line_up');
            $('.time_of_song').toggleClass('time_of_song_up');
            $('.jAudio--progress-bar-pointer').toggleClass('jAudio--progress-bar-pointer_up');
        })
    })();

    (function () {
        $('.hamburger-menu').on('click', function () {
            $('.bar').toggleClass('animate');
            $('.hamburger-menu').toggleClass('slide');
            $('.back_btn').toggleClass('slide');
            $('.nav_menu').toggleClass('open');
            $('.player_fade').toggleClass('player_fade_on');
        })
    })();

    (function () {
        $('.play_btn').on('click', function () {
            $('#play_circle').toggleClass('glyphicon-play').toggleClass('glyphicon-pause');
            $('#npAction').text(function (i, text) {
                return text === "PAUSED..." ? "NOW PLAYING" : "PAUSED...";
            })
        })
    })();

    (function () {
        $('.random_btn').on('click', function () {
            $('.random_btn').toggleClass('random_btn_on');
        })
    })();

    (function () {
        $('.repeat_btn').on('click', function () {
            $('.repeat_btn').toggleClass('repeat_btn_on');

        })
    })();

    // отменить выделение текста
    function preventSelection(element) {
        var preventSelection = false;

        function addHandler(element, event, handler) {
            if (element.attachEvent)
                element.attachEvent('on' + event, handler);
            else
            if (element.addEventListener)
                element.addEventListener(event, handler, false);
        }

        function removeSelection() {
            if (window.getSelection) {
                window.getSelection().removeAllRanges();
            } else if (document.selection && document.selection.clear)
                document.selection.clear();
        }

        function killCtrlA(event) {
            var event = event || window.event;
            var sender = event.target || event.srcElement;
            if (sender.tagName.match(/INPUT|TEXTAREA/i))
                return;
            var key = event.keyCode || event.which;
            if (event.ctrlKey && key == 'A'.charCodeAt(0)) // 'A'.charCodeAt(0) можно заменить на 65
            {
                removeSelection();
                if (event.preventDefault)
                    event.preventDefault();
                else
                    event.returnValue = false;
            }
        } 
        addHandler(element, 'mousemove', function () {
            if (preventSelection)
                removeSelection();
        });
        addHandler(element, 'mousedown', function (event) {
            var event = event || window.event;
            var sender = event.target || event.srcElement;
            preventSelection = !sender.tagName.match(/INPUT|TEXTAREA/i);
        }); 
        addHandler(element, 'mouseup', function () {
            if (preventSelection)
                removeSelection();
            preventSelection = false;
        }); 
        addHandler(element, 'keydown', killCtrlA);
        addHandler(element, 'keyup', killCtrlA);
    }
    preventSelection(document);
});

function checkTouchScreen() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        $('body').addClass('touch-screen');
        return true;
    } else {
        $('body').removeClass('touch-screen');
        return false;
    }
}