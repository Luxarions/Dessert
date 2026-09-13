// assets/scripts/utils/fs-helper.js
// ============================================================
// FS-HELPER — file system helpers used by all scripts
// ============================================================

const fs = require('fs');
const path = require('path');
const logger = require('./logger');

const fsHelper = {
  // ---------- Ensure folder exists ----------
  ensureDir: (dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      logger.debug(`Created folder: ${dir}`);
    }
    return dir;
  },

  // ---------- Check if folder has files with given extensions ----------
  hasFiles: (dir, extensions = []) => {
    if (!fs.existsSync(dir)) return false;

    const files = fs.readdirSync(dir);
    if (extensions.length === 0) return files.length > 0;

    return files.some(file =>
      extensions.some(ext => file.toLowerCase().endsWith(ext))
    );
  },

  // ---------- Get files by extension ----------
  getFiles: (dir, extensions = []) => {
    if (!fs.existsSync(dir)) return [];

    const files = fs.readdirSync(dir);
    if (extensions.length === 0) return files;

    return files.filter(file =>
      extensions.some(ext => file.toLowerCase().endsWith(ext))
    );
  },

  // ---------- Get base name (no extension) ----------
  baseName: (file) => path.basename(file, path.extname(file)),

  // ---------- Remove folder recursively ----------
  removeDir: (dir) => {
    if (fs.existsSync(dir)) {
      fs.rmSync(dir, { recursive: true, force: true });
      logger.debug(`Removed folder: ${dir}`);
    }
  },

  // ---------- Remove files matching pattern ----------
  removeFiles: (dir, pattern) => {
    if (!fs.existsSync(dir)) return;

    const files = fs.readdirSync(dir);
    const regex = new RegExp(pattern);

    files.forEach(file => {
      if (regex.test(file)) {
        fs.unlinkSync(path.join(dir, file));
        logger.debug(`Removed file: ${file}`);
      }
    });
  },

  // ---------- Copy file ----------
  copy: (src, dest) => {
    fsHelper.ensureDir(path.dirname(dest));
    fs.copyFileSync(src, dest);
  },

  // ---------- Write file ----------
  write: (filePath, content) => {
    fsHelper.ensureDir(path.dirname(filePath));
    fs.writeFileSync(filePath, content, 'utf8');
  },

  // ---------- Read file ----------
  read: (filePath) => {
    return fs.readFileSync(filePath, 'utf8');
  },

  // ---------- Get file size in human-readable format ----------
  fileSize: (filePath) => {
    const bytes = fs.statSync(filePath).size;
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  }
};

module.exports = fsHelper;
