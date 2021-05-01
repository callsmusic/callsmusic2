const { spawn } = require("child_process");

const getFfmpegArgs = (input) => {
  return (
    "-y -nostdin " +
    `-i ${input} ` +
    "-c copy " +
    "-acodec pcm_s16le " +
    "-f s16le " +
    "-ac 1 " +
    "-ar 48000 " +
    "pipe:1"
  ).split(/\s/g);
};

module.exports = (input) => {
  return spawn("ffmpeg", getFfmpegArgs(input)).stdout;
};
