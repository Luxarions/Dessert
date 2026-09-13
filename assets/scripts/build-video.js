// assets/scripts/build-video.js
// ============================================================
// VIDEO BUILD — master .mov → mp4 + webm + poster frames
// ============================================================

const ffmpeg = require('fluent-ffmpeg');
const ffmpegStatic = require('ffmpeg-static');
const path = require('path');
const fs = require('fs');
const paths = require('./utils/paths');
const logger = require('./utils/logger');
const fsHelper = require('./utils/fs-helper');

// Use bundled ffmpeg binary
ffmpeg.setFfmpegPath(ffmpegStatic);

// ---------- Config ----------
const POSTER_TIMESTAMP = '00:00:01';

// ---------- Main ----------
async function buildVideo() {
  logger.header('🎬 Building Videos');

  // Check raw folder
  if (!fs.existsSync(paths.MEDIA_VIDEO_RAW)) {
    logger.warn('No raw video folder found');
    logger.info(`Expected: ${paths.MEDIA_VIDEO_RAW}`);
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

    // ---------- MP4 ----------
    await new Promise((resolve, reject) => {
      ffmpeg(input)
        .output(path.join(paths.MEDIA_VIDEO, `${base}.mp4`))
        .videoCodec('libx264')
        .audioCodec('aac')
        .outputOptions([
          '-crf 23',
          '-preset medium',
          '-movflags +faststart',
          '-pix_fmt yuv420p'
        ])
        .on('end', () => {
          logger.success(`   ${base}.mp4`);
          resolve();
        })
        .on('error', (err) => {
          logger.error(`   MP4 failed: ${err.message}`);
          reject(err);
        })
        .run();
    }).catch(() => {});

    // ---------- WebM ----------
    await new Promise((resolve, reject) => {
      ffmpeg(input)
        .output(path.join(paths.MEDIA_VIDEO, `${base}.webm`))
        .videoCodec('libvpx-vp9')
        .audioCodec('libopus')
        .outputOptions([
          '-crf 30',
          '-b:v 0',
          '-deadline good',
          '-cpu-used 2'
        ])
        .on('end', () => {
          logger.success(`   ${base}.webm`);
          resolve();
        })
        .on('error', (err) => {
          logger.error(`   WebM failed: ${err.message}`);
          reject(err);
        })
        .run();
    }).catch(() => {});

    // ---------- Poster frame ----------
    await new Promise((resolve) => {
      ffmpeg(input)
        .screenshots({
          timestamps: [POSTER_TIMESTAMP],
          filename: `${base}-poster.jpg`,
          folder: paths.MEDIA_VIDEO,
          size: '1280x720'
        })
        .on('end', () => {
          logger.success(`   ${base}-poster.jpg`);
          resolve();
        })
        .on('error', () => {
          logger.warn(`   Poster failed for ${base}`);
          resolve();
        });
    });

    logger.blank();
  }

  logger.success(`Videos build complete: ${videos.length} processed`);
}

// Run
buildVideo().catch(err => {
  logger.error(`Build failed: ${err.message}`);
  process.exit(1);
});
