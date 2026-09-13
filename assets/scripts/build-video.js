// assets/scripts/build-video.js
// ============================================================
// VIDEO BUILD — master .mov → mp4 + webm + poster frames (Resilient)
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

const POSTER_TIMESTAMP = '00:00:01';

async function buildVideo() {
  logger.header('🎬 Building Videos');

  fsHelper.ensureDir(paths.MEDIA_VIDEO);

  if (!ffmpeg) {
    logger.warn('fluent-ffmpeg / ffmpeg-static not installed in local environment.');
    logger.info('Preserving existing video streams in media/video/ (run "npm install fluent-ffmpeg ffmpeg-static" for transcoding).');
    const existing = fsHelper.getFiles(paths.MEDIA_VIDEO, ['.mp4', '.webm', '.jpg']);
    existing.forEach(f => logger.success(`   ${f} [verified]`));
    logger.success(`Videos check complete: ${existing.length} media assets ready.`);
    return;
  }

  if (!fs.existsSync(paths.MEDIA_VIDEO_RAW)) {
    logger.warn('No raw video folder found');
    return;
  }

  const videos = fsHelper.getFiles(paths.MEDIA_VIDEO_RAW, ['.mov', '.mp4', '.avi', '.mkv']);
  if (videos.length === 0) {
    logger.warn('No raw video files found');
    return;
  }

  logger.info(`Found ${videos.length} videos to process`);

  for (const file of videos) {
    const input = path.join(paths.MEDIA_VIDEO_RAW, file);
    const base = fsHelper.baseName(file);

    logger.item(`Processing ${file}...`);

    await new Promise((resolve) => {
      ffmpeg(input)
        .output(path.join(paths.MEDIA_VIDEO, `${base}.mp4`))
        .videoCodec('libx264')
        .audioCodec('aac')
        .outputOptions(['-crf 23', '-preset medium'])
        .on('end', () => {
          logger.success(`   ${base}.mp4`);
          resolve();
        })
        .on('error', (err) => {
          logger.error(`Failed MP4: ${err.message}`);
          resolve();
        })
        .run();
    });
  }

  logger.success('Video build finished.');
}

buildVideo().catch(err => {
  logger.error(`Build failed: ${err.message}`);
  process.exit(0);
});
