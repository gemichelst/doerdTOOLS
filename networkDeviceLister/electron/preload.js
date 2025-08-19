const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronScan', async () => {
  return await ipcRenderer.invoke('scan-network');
});
