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
  omx = spawn('omxplayer', "./video/video.mp4");
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