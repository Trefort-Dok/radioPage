document.addEventListener('DOMContentLoaded', function () {


  function queryToken() {
    return fetch('http://localhost:3000/queryToken')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const accessToken = data.accessToken;
        console.log(data.accessToken);
        return accessToken; // Return the retrieved access token
        
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

    window.onSpotifyWebPlaybackSDKReady = () => {
        const token = 'BQBMLCzgLW4BpxwFfFjbCeA4bUpFvZW-Pzw3ZeEi9LhMHf3oYbJbeEvCUuamLxYmg-UBwpHErPQ0pdArjQNiGWmi3rfKaSDWowvTgWb3EjGG6Z1bZRXGoG2fTFtMru7bef2EvoCpqzBDyu_lmYm11chDTlU2GL_rJ9NVWD7JXPvPdhejHQ-RlCSyIZkZgxN54Hw3DbwsciW_9oiUHJQv7aR3Iayy';
        const player = new Spotify.Player({
            name: 'Web Playback SDK Quick Start Player',
            getOAuthToken: cb => { cb(token); },
            volume: 0.5
        });

        // Ready
        player.addListener('ready', ({ device_id }) => {
            console.log('Ready with Device ID', device_id);
        });

        // Not Ready
        player.addListener('not_ready', ({ device_id }) => {
            console.log('Device ID has gone offline', device_id);
        });

        player.addListener('initialization_error', ({ message }) => {
            console.error(message);
        });

        player.addListener('authentication_error', ({ message }) => {
            console.error(message);
        });

        player.addListener('account_error', ({ message }) => {
            console.error(message);
        });

        document.getElementById('togglePlay').onclick = function() {
          player.togglePlay();
        };

        player.connect();
    }
});