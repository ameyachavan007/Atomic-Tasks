const {app, BrowserWindow} = require('electron');
const windowStateKeeper = require('electron-window-state')

let mainWindow

function createWindow () {

    let state = windowStateKeeper({
        defaultWidth:850, defaultHeight:500
    })

    mainWindow = new BrowserWindow ({ 
        width: 350, height: 660,
         frame:false,
        
        webPreferences: {nodeIntegration: true, enableRemoteModule: true,}
    })

    mainWindow.loadFile('renderer/onBoarding.html')

    //set the default menu gone
    mainWindow.setMenu(null);
    state.manage(mainWindow)

    mainWindow.webContents.openDevTools();

    mainWindow.on('closed', () => {
        mainWindow = null;
    })

    
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
    if (mainWindow == null) createWindow()
})