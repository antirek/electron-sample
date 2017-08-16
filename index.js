const {app, Tray, Menu, BrowserWindow} = require('electron')

const path = require('path')
const url = require('url')

let mainWindow, tray, force_quit

const {express, createCallWindow} = require('./express')

function createWindow () {
  mainWindow = new BrowserWindow({ width: 700, height: 500, resizable: false, center: true, show: false})
  mainWindow.loadURL('http://localhost:3000');
  mainWindow.hide()

  // Open the DevTools.
  //mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  /*
  mainWindow.on('closed', function () {
    mainWindow = null
  })
  */

  mainWindow.on('close', function (event) {
    if (force_quit) {
      app.quit()
    } else {
      event.preventDefault()
      mainWindow.hide()
    }
    return false
  })
}

function createTray () {
  tray = new Tray(path.join(__dirname, 'icon.png'))
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Show', 
      click: () => {
        toggleWindow()
      }
    },
    {
      label: 'Exit', 
      accelerator: 'CmdOrCtrl+Q', 
      click: () => {
        force_quit = true; 
        app.quit();
      }
    }
  ])

  tray.setToolTip('Notifier')
  tray.setContextMenu(contextMenu)

  tray.on('right-click', toggleWindow)
  tray.on('double-click', toggleWindow)
  tray.on('click', toggleWindow)
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

app.on('ready', () => {
  express();
  createTray()
  createWindow()
  createCallWindow()
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.


const toggleWindow = () => {
  if (mainWindow.isVisible()) {
    mainWindow.hide()
  } else {
    showWindow()
  }
}

const showWindow = () => {
  mainWindow.show()
  mainWindow.focus()
}
