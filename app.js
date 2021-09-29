/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-commonjs */

const { app, BrowserWindow, screen } = require('electron');
const path = require('path');
const Store = require('electron-store');

const args = process.argv.slice(1);
const dev = args.some(val => val === '--devtest');

let window;
let locale;
let url;

// get locale
if (!dev) {
  const i18n = require('./angular.json').projects['text-clock'].i18n;
    let lang;
    try {
      // Detect if environment LANG is set
      // if it is defined, convert LANG from ie 'en_US.UTF-8' to 'en-US'
      // if not defined, set it to the source locale
      lang = process.env['LANG'] ? process.env['LANG'].split('.')[0].replace('_', '-') : i18n.sourceLocale.code;
    } catch (e) {
      // LANG was populated with something else than a standard locale code
      lang = i18n.sourceLocale.code;
    }
    // Check if exact LANG exists in our locales
    const exactLocale = Object.keys(i18n.locales).includes(lang) && lang;
    // Make the short version, convert ie 'en-US' to 'en'
    const shortLang = lang.split('-')[0];
    // This matches 'fr-CA' to 'fr' if 'fr-CA' is not defined but 'fr' is
    const approximateLocale = Object.keys(i18n.locales).includes(shortLang) && shortLang;
    // Define locale by either the exact, approximate, or source locale in this order
    locale = exactLocale || approximateLocale || i18n.sourceLocale.code;
    console.info('selected language: ' + locale);
}

app.commandLine.appendSwitch('touch-events', 'enabled');

function createWindow() {
  
  const mainScreen = screen.getPrimaryDisplay();

  window = new BrowserWindow({
    width: dev ? 640 : mainScreen.size.width,
    height: dev ? 480 : mainScreen.size.height,
    frame: dev,
    backgroundColor: '#000',
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
    },
    icon: path.join(__dirname, 'dist', 'assets', 'icon', 'icon.png'),
  });

  if (dev) {
    url = 'http://localhost:4200';
    window.webContents.openDevTools();
  } else {
    url = `file://${__dirname}/dist/text-clock/${locale}/index.html`;
    window.setFullScreen(true);
  }
  
  window.loadURL(url);

  window.on('closed', () => {
    window = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  app.quit();
});

app.on('activate', () => {
  if (window === null) {
    createWindow();
  }
});


