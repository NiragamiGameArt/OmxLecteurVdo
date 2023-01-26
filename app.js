const express = require('express');
const { spawn } = require('child_process');
const readline = require('readline');

const app = express();
let omx;
let isPlaying = false;

app.use(express.static('public'));

app.get('/play/:path', (req, res) => {
  const { path } = req.params;
  if (isPlaying) {
    omx.kill();
  }
  omx = spawn('omxplayer', [path]);
  const rl = readline.createInterface({
    input: omx.stdout,
    output: omx.stdin
  });
  rl.on('line', (line) => {
    if (line.includes('have a nice day')) {
      isPlaying = false;
      rl.close();
    }
  });
  isPlaying = true;
  res.send('Playing video...');
});

app.get('/pause', (req, res) => {
  omx.stdin.write('p');
  res.send('Video paused.');
});

app.get('/stop', (req, res) => {
  omx.stdin.write('q');
  isPlaying = false;
  res.send('Video stopped.');
});

app.listen(3000, () => {
  console.log('Server started on port 3000.');
});
function playVideo() {
  omx = spawn('omxplayer', ['-o', 'hdmi', videoPaths[currentVideoIndex]]);
  rl = readline.createInterface({
    input: omx.stdout,
    output: omx.stdin
  });
}
function pauseVideo() {
  rl.write("p");
}

function stopVideo() {
  rl.write("q");
  omx.kill();
}
function nextVideo() {
  currentVideoIndex++;
  if (currentVideoIndex >= videoPaths.length) {
    currentVideoIndex = 0;
  }
  stopVideo();
  playVideo();
}

function prevVideo() {
  currentVideoIndex--;
  if (currentVideoIndex < 0) {
    currentVideoIndex = videoPaths.length - 1;
  }
  stopVideo();
  playVideo();
}
function toggleFullScreen() {
  if (isFullScreen) {
    rl.write("f");
    isFullScreen = false;
  } else {
    rl.write("z");
    isFullScreen = true;
  }
}