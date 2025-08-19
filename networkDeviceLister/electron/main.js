const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { scan } = require('./backend/networkScan');

const isDev = !app.isPackaged;

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  if (isDev) {
    win.loadURL('http://localhost:5173');
    win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(__dirname, '../dist/index.html'));
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.handle('scan-network', async () => {
  return new Promise((resolve, reject) => {
    scan((err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
});
