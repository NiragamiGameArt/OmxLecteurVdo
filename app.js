/*const express = require('express');
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
}*/
const { spawn } = require('child_process');
const readline = require('readline');

let omx;
let rl;
let isFullScreen = false;
let currentVideoIndex = 0;
let videoPaths = ['video/video.mp4', 'video/video2.mp4', 'video/video3.mp4'];

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

function volumeUp() {
  rl.write("+");
}

function volumeDown() {
  rl.write("-");
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
const playButton = document.getElementById('play-button');
playButton.addEventListener('click', playVideo);

const pauseButton = document.getElementById('pause-button');
pauseButton.addEventListener('click', pauseVideo);

const stopButton = document.getElementById('stop-button');
stopButton.addEventListener('click', stopVideo);

const volumeUpButton = document.getElementById('volume-up-button');
volumeUpButton.addEventListener('click', volumeUp);

const volumeDownButton = document.getElementById('volume-down-button');
volumeDownButton.addEventListener('click', volumeDown);

const nextVideoButton = document.getElementById('next-video-button');
nextVideoButton.addEventListener('click', nextVideo);

const prevVideoButton = document.getElementById('prev-video-button');
prevVideoButton.addEventListener('click', prevVideo);

const fullScreenButton = document.getElementById('fullscreen-button');
fullScreenButton.addEventListener('click', toggleFullScreen);