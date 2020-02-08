function JBVideoPlayer(args) {
    if (!args) args = {};

    var _self = this;
    this.container = document.getElementById(args.containerID) || document.getElementById("videoContainer");
    this.video = document.getElementById("projectVideo");
    this.progressBar = document.getElementById("updatingBar");
    this.progressBarContainer = document.getElementById("progressNav");
    this.progressBarContainerWidth = this.progressBarContainer.offsetWidth;
    
    this.isPlaying = false;

    this.buttonOpen = document.getElementById('open-video-btn');
    this.buttonClose = document.getElementById('close-video-btn');

    this.videoDuration = 0;
    this.currentSeconds = 0;
    this.videoDurationContainers = document.getElementsByClassName("videoDurationContainer");
    this.currentSecondsContainer = document.getElementById("currentSecondsContainer");

    this.init = function(){
        this.addListeners();
    }

    this.animateRAF = function(){
        requestAnimationFrame(_self.animateRAF);
        _self.renderVideo();
    }

    this.renderVideo = function(){
        if (this.isPlaying) {
            this.updateBarWidth(this.currentSeconds);
        }
    }
    
    this.getMinutes = function(duration){
        var minutesResult = Math.floor(duration/60);

        if(minutesResult >= 10){
            return minutesResult
        }
        else{
            return "0" + minutesResult
        }
    }
    this.getSeconds = function(duration){
        var secondsResult = Math.floor(duration%60);
        if(secondsResult >= 10){
            return secondsResult
        }
        else{
            return "0" + secondsResult
        }
    }

    this.getTimeString = function(minutes, seconds){
        return minutes + "." + seconds;
    }

    this.updateBarWidth = function(currentSecond){
        var _barWidth =  currentSecond / this.video.duration;
        var _inlineWidth = "scaleX(" + _barWidth + ")";
        this.progressBar.style.transform = _inlineWidth;
    }


    this.addListeners = function(){
        window.addEventListener('resize', function(){
            _self.progressBarContainerWidth = _self.progressBarContainer.offsetWidth;
        });

        this.buttonOpen.addEventListener("click", function() {
            _self.container.classList.add('show-video');
            _self.video.play();
            _self.isPlaying=true;
        });
        
        this.buttonClose.addEventListener("click", function() {
            _self.container.classList.remove('show-video');
            _self.video.pause();
            _self.isPlaying=false;
        });
        
        this.video.addEventListener("click", function(){
            if(_self.isPlaying==true){
                _self.video.pause();
                _self.isPlaying=false;
            }
            else{
                _self.video.play();
                _self.isPlaying=true;
            }
        });
        
        this.video.addEventListener("loadedmetadata", function(){
            _self.videoDuration = _self.video.duration;

            for (var i = 0; i < _self.videoDurationContainers.length; i++) {
                _self.videoDurationContainers[i].innerHTML = _self.getTimeString(_self.getMinutes(_self.videoDuration), _self.getSeconds(_self.videoDuration));
            }

            _self.animateRAF();
            _self.updateBarWidth(0);
        });

        this.video.addEventListener("timeupdate", function(){
            _self.currentSeconds = _self.video.currentTime;
            _self.currentSecondsContainer.innerHTML = _self.getTimeString(_self.getMinutes(_self.currentSeconds), _self.getSeconds(_self.currentSeconds));
        });

        this.progressBarContainer.addEventListener('click', function(e){
            _self.progressBar.classList.add('jump');
            var _percentageClicked = (e.layerX * 100) / _self.progressBarContainerWidth;
            var _newVideoTime = (_percentageClicked * _self.video.duration) / 100;

            _self.updateBarWidth(_newVideoTime);
            _self.video.currentTime = _newVideoTime;
            setTimeout(function(){
                _self.progressBar.classList.remove('jump');
            }, 200);
        });
    }
}







