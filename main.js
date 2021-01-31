const { app, BrowserWindow, Menu } = require('electron');
const fs = require('fs');
const { dialog } = require('electron');

let win;
const template = [
	{
		label: 'File',
		submenu: [
			{
				id: 'save-file',
				enabled: false,
				accelerator: 'Ctrl+S',
				label: 'Save File',
				click: async () => {
					win.webContents.send('saveFile');
				},
			},
			{
				label: 'Open File',
				accelerator: 'Ctrl+O',

				click: async () => {
					const { filePaths } = await dialog.showOpenDialog({ properties: ['openFile'] });
					const file = filePaths[0];
					const contents = fs.readFileSync(file, 'utf-8');
					win.webContents.send('fileOpened', {
						contents,
						filePath: file,
					});
					const saveFileItem = menu.getMenuItemById('save-file');
					saveFileItem.enabled = true;
				},
			},
		],
	},
    {
        label: 'Modify',
        submenu: [
            {
                id: 'copy',
                accelerator: 'Ctrl+C',
                label: 'Copy',
                click: async () => {
                    win.webContents.send('copying');
                },
            },
            {
                id: 'paste',
                accelerator: 'Ctrl+V',
                label: 'Paste',
                click: async () => {
                    win.webContents.send('pasting');
                },
            },
        ],
    },
    {
        label: 'Info',
        submenu: [
            {
                label: 'Show version',
                click: async () => {
                    var infos = require("./package.json")
                    var vers = infos.version
                    dialog.showMessageBox({
                    type: 'info',
                    title: 'Version',
                    message: 'The version is: ' + vers
                    });
                },
            },
        ],
    },
];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

function createWindow() {
	win = new BrowserWindow({
		width: 1000,
		height: 800,
		webPreferences: {
			nodeIntegration: true,
		},
	});

	win.loadFile('index.html');
	win.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});