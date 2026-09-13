// assets/scripts/utils/logger.js
// ============================================================
// LOGGER — colored, timestamped, consistent output
// ============================================================

const chalk = require('chalk');

const timestamp = () => {
  const now = new Date();
  return chalk.gray(
    `[${now.getHours().toString().padStart(2, '0')}:` +
    `${now.getMinutes().toString().padStart(2, '0')}:` +
    `${now.getSeconds().toString().padStart(2, '0')}]`
  );
};

const logger = {
  // ---------- Section header ----------
  header: (title) => {
    console.log('\n' + chalk.bgHex('#FFB6C1').black.bold(` ${title} `));
  },

  // ---------- Info ----------
  info: (msg) => {
    console.log(`${timestamp()} ${chalk.blue('ℹ')}  ${msg}`);
  },

  // ---------- Success ----------
  success: (msg) => {
    console.log(`${timestamp()} ${chalk.green('✅')} ${msg}`);
  },

  // ---------- Warning ----------
  warn: (msg) => {
    console.log(`${timestamp()} ${chalk.yellow('⚠️')}  ${chalk.yellow(msg)}`);
  },

  // ---------- Error ----------
  error: (msg) => {
    console.log(`${timestamp()} ${chalk.red('❌')} ${chalk.red(msg)}`);
  },

  // ---------- Debug ----------
  debug: (msg) => {
    if (process.env.DEBUG) {
      console.log(`${timestamp()} ${chalk.magenta('🐛')} ${chalk.gray(msg)}`);
    }
  },

  // ---------- Indented item ----------
  item: (msg) => {
    console.log(`        ${chalk.gray('→')} ${msg}`);
  },

  // ---------- Blank line ----------
  blank: () => console.log(''),

  // ---------- Big banner ----------
  banner: (text) => {
    const line = '═'.repeat(text.length + 4);
    console.log('\n' + chalk.hex('#FFB6C1')(`╔${line}╗`));
    console.log(chalk.hex('#FFB6C1')(`║  ${text}  ║`));
    console.log(chalk.hex('#FFB6C1')(`╚${line}╝`) + '\n');
  },

  // ---------- Progress counter ----------
  progress: (current, total, label) => {
    console.log(
      `${timestamp()} ${chalk.cyan(`[${current}/${total}]`)} ${label}`
    );
  }
};

module.exports = logger;
