// assets/scripts/utils/logger.js
// ============================================================
// LOGGER — colored, timestamped, consistent output (Zero-Dependency Resilient)
// ============================================================

let chalk;
try {
  chalk = require('chalk');
} catch (e) {
  // Graceful fallback to native ANSI terminal colors if chalk isn't installed
  const c = (code) => (s) => `\x1b[${code}m${s}\x1b[0m`;
  chalk = {
    gray: c('90'),
    blue: c('34'),
    green: c('32'),
    yellow: c('33'),
    red: c('31'),
    magenta: c('35'),
    cyan: c('36'),
    bold: c('1'),
    hex: () => c('35'),
    bgHex: () => ({ black: { bold: c('45;30;1') } })
  };
}

const timestamp = () => {
  const now = new Date();
  const timeStr = `[${now.getHours().toString().padStart(2, '0')}:` +
    `${now.getMinutes().toString().padStart(2, '0')}:` +
    `${now.getSeconds().toString().padStart(2, '0')}]`;
  return chalk.gray ? chalk.gray(timeStr) : timeStr;
};

const logger = {
  // ---------- Section header ----------
  header: (title) => {
    console.log('\n\x1b[45m\x1b[30m\x1b[1m' + ` ${title} ` + '\x1b[0m');
  },

  // ---------- Info ----------
  info: (msg) => {
    console.log(`${timestamp()} \x1b[34mℹ\x1b[0m  ${msg}`);
  },

  // ---------- Success ----------
  success: (msg) => {
    console.log(`${timestamp()} \x1b[32m✅\x1b[0m ${msg}`);
  },

  // ---------- Warning ----------
  warn: (msg) => {
    console.log(`${timestamp()} \x1b[33m⚠️  ${msg}\x1b[0m`);
  },

  // ---------- Error ----------
  error: (msg) => {
    console.log(`${timestamp()} \x1b[31m❌ ${msg}\x1b[0m`);
  },

  // ---------- Debug ----------
  debug: (msg) => {
    if (process.env.DEBUG) {
      console.log(`${timestamp()} \x1b[35m🐛\x1b[0m \x1b[90m${msg}\x1b[0m`);
    }
  },

  // ---------- Indented item ----------
  item: (msg) => {
    console.log(`        \x1b[90m→\x1b[0m ${msg}`);
  },

  // ---------- Blank line ----------
  blank: () => console.log(''),

  // ---------- Big banner ----------
  banner: (text) => {
    const line = '═'.repeat(text.length + 4);
    console.log('\n\x1b[35m' + `╔${line}╗`);
    console.log(`║  ${text}  ║`);
    console.log(`╚${line}╝\x1b[0m\n`);
  },

  // ---------- Progress counter ----------
  progress: (current, total, label) => {
    console.log(
      `${timestamp()} \x1b[36m[${current}/${total}]\x1b[0m ${label}`
    );
  }
};

module.exports = logger;
