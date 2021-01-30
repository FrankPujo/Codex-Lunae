const fs = require('fs');
const { ipcRenderer } = require('electron');

let openedFilePath;

const codeElm = document.getElementById('code');

ipcRenderer.on('fileOpened', (event, { contents, filePath }) => {
	openedFilePath = filePath;
	codeElm.value = contents;
	codeElm.style.display = 'inline-block';
	document.getElementById('code').value = contents;
	document.getElementById('file-path').innerText = filePath;
	console.log(contents);
});

ipcRenderer.on('saveFile', (event) => {
	const currentCodeValue = codeElm.value;
	fs.writeFileSync(openedFilePath, currentCodeValue, 'utf-8');
});

ipcRenderer.on('copying', (event) => {
    document.execCommand('copy');
});

ipcRenderer.on('pasting', (event) => {
    document.execCommand('paste');
});