const fs = require('fs');
const { ipcRenderer } = require('electron');

let openedFilePath;

const codeElm = document.getElementById('code');

ipcRenderer.on('fileOpened', (event, { contents, filePath }) => {
    content = contents
	openedFilePath = filePath;
	codeElm.value = contents;
	codeElm.style.display = 'inline-block';
	document.getElementById('code').value = contents;
	document.getElementById('file-path').innerText = filePath;
	console.log(contents);
    
    var fileExtension = filePath.split(".").pop();
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

ipcRenderer.on('cutting', (event) => {
    document.execCommand('cut');
});

ipcRenderer.on('undoing', (event) => {
    document.execCommand('undo');
});

ipcRenderer.on('allselecting', (event) => {
    document.execCommand('selectAll')
});

/*
ipcRenderer.on('wrapping', (event, { wrapping } => {
    var code = document.getElementById('code');
    if (wrapping) {
        code.wrap = 'on';
        console.log('on now!!!');
    } else {
        code.wrap = 'off';
    }
});

ipcRenderer.on('archive', (event) => {
    const oldFile = openedFilePath;
    var arch1 = document.createElement("P");
    function deArch() {
        codeElm.value = content;
        document.getElementById('file-path').innerText = openedFilePath;
    };
    arch1.innerText = oldFile;
    arch1.onclick = deArch();
});


function selectSyntax() {
    var selector = document.getElementById('lang-chooser');
    var synLang = selector.value;
    
    return synLang
};
*/

document.getElementById('code').addEventListener('keydown', function(e) {
  if (e.key == 'Tab') {
    e.preventDefault();
    var start = this.selectionStart;
    var end = this.selectionEnd;

    // set textarea value to: text before caret + tab + text after caret
    this.value = this.value.substring(0, start) +
      "\t" + this.value.substring(end);

    // put caret at right position again
    this.selectionStart =
      this.selectionEnd = start + 1;
  }
});