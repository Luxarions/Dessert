// assets/scripts/build-audio.js
// ============================================================
// AUDIO BUILD — master .wav → mp3 + ogg
// ============================================================

const ffmpeg = require('fluent-ffmpeg');
const ffmpegStatic = require('ffmpeg-static');
const path = require('path');
const fs = require('fs');
const paths = require('./utils/paths');
const logger = require('./utils/logger');
const fsHelper = require('./utils/fs-helper');

ffmpeg.setFfmpegPath(ffmpegStatic);

// ---------- Config ----------
const MP3_BITRATE = '192k';
const OGG_QUALITY = 6;

// ---------- Main ----------
async function buildAudio() {
  logger.header('🔊 Building Audio');

  if (!fs.existsSync(paths.MEDIA_AUDIO_RAW)) {
    logger.warn('No raw audio folder found');
    logger.info(`Expected: ${paths.MEDIA_AUDIO_RAW}`);
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

    // ---------- MP3 ----------
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
          logger.error(`   MP3 failed: ${err.message}`);
          resolve();
        })
        .run();
    });

    // ---------- OGG ----------
    await new Promise((resolve) => {
      ffmpeg(input)
        .output(path.join(paths.MEDIA_AUDIO, `${base}.ogg`))
        .audioCodec('libvorbis')
        .audioQuality(OGG_QUALITY)
        .on('end', () => {
          logger.success(`   ${base}.ogg`);
          resolve();
        })
        .on('error', (err) => {
          logger.error(`   OGG failed: ${err.message}`);
          resolve();
        })
        .run();
    });

    // ---------- Copy master WAV for archive ----------
    fsHelper.copy(input, path.join(paths.MEDIA_AUDIO, `${base}.wav`));

    logger.blank();
  }

  logger.success(`Audio build complete: ${audios.length} processed`);
}

// Run
buildAudio().catch(err => {
  logger.error(`Build failed: ${err.message}`);
  process.exit(1);
});
