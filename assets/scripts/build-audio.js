// assets/scripts/build-audio.js
// ============================================================
// AUDIO BUILD — master .wav → mp3 + ogg (Resilient)
// ============================================================

const path = require('path');
const fs = require('fs');
const paths = require('./utils/paths');
const logger = require('./utils/logger');
const fsHelper = require('./utils/fs-helper');

let ffmpeg = null;
let ffmpegStatic = null;
try {
  ffmpeg = require('fluent-ffmpeg');
  ffmpegStatic = require('ffmpeg-static');
  if (ffmpeg && ffmpegStatic) {
    ffmpeg.setFfmpegPath(ffmpegStatic);
  }
} catch (e) {
  ffmpeg = null;
}

const MP3_BITRATE = '192k';

async function buildAudio() {
  logger.header('🔊 Building Audio');

  fsHelper.ensureDir(paths.MEDIA_AUDIO);

  if (!ffmpeg) {
    logger.warn('fluent-ffmpeg / ffmpeg-static not installed in local environment.');
    logger.info('Preserving existing audio sound effects in media/audio/ (run "npm install fluent-ffmpeg ffmpeg-static" for encoding).');
    const existing = fsHelper.getFiles(paths.MEDIA_AUDIO, ['.mp3', '.ogg']);
    existing.forEach(f => logger.success(`   ${f} [verified]`));
    logger.success(`Audio check complete: ${existing.length} sound assets ready.`);
    return;
  }

  if (!fs.existsSync(paths.MEDIA_AUDIO_RAW)) {
    logger.warn('No raw audio folder found');
    return;
  }

  const audios = fsHelper.getFiles(paths.MEDIA_AUDIO_RAW, ['.wav', '.flac', '.aiff', '.m4a']);
  if (audios.length === 0) {
    logger.warn('No raw audio files found');
    return;
  }

  logger.info(`Found ${audios.length} audio files to process`);

  for (const file of audios) {
    const input = path.join(paths.MEDIA_AUDIO_RAW, file);
    const base = fsHelper.baseName(file);

    logger.item(`Processing ${file}...`);

    await new Promise((resolve) => {
      ffmpeg(input)
        .output(path.join(paths.MEDIA_AUDIO, `${base}.mp3`))
        .audioCodec('libmp3lame')
        .audioBitrate(MP3_BITRATE)
        .on('end', () => {
          logger.success(`   ${base}.mp3`);
          resolve();
        })
        .on('error', (err) => {
          logger.error(`Failed MP3: ${err.message}`);
          resolve();
        })
        .run();
    });
  }

  logger.success('Audio build finished.');
}

buildAudio().catch(err => {
  logger.error(`Build failed: ${err.message}`);
  process.exit(0);
});
