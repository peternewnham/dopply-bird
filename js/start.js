(function() {

  var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia || navigator.msGetUserMedia;

  var start = document.querySelector('#start');
  var alertWaiting = document.querySelector('#start_waiting');
  var alertError = document.querySelector('#start_error');
  var alertSuccess = document.querySelector('#start_success');
  var alertUnsupported = document.querySelector('#start_unsupported');
  var alertFirefox = document.querySelector('#start_firefox');

  var btnPlay = document.querySelector('#start_play');
  var actionPlay = function() {
    btnPlay.removeEventListener('click', actionPlay, true);
    document.body.removeChild(start);
    game.onload();
  };
  btnPlay.addEventListener('click', actionPlay, true);

  var mediaSuccess = function(stream) {
    doppler.setStream(stream);
    alertSuccess.style.display = 'block';
    alertWaiting.style.display = 'none';
    alertError.style.display = 'none';
  };

  var mediaError = function() {
    alertSuccess.style.display = 'none';
    alertWaiting.style.display = 'none';
    alertError.style.display = 'block';
  };

  if (!!getUserMedia) {
    if (/firefox/i.test(navigator.userAgent)) {
      alertFirefox.style.display = 'block';
      alertWaiting.style.display = 'none';
    }
    else {
      getUserMedia.call(navigator, {
        audio: {
          optional: [
            {
              echoCancellation: false
            }
          ]
        }
      }, mediaSuccess, mediaError);
    }
  }
  else {
    alertUnsupported.style.display = 'block';
    alertWaiting.style.display = 'none';
  }

})();