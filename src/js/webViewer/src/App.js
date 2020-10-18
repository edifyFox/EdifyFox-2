
const { ipcRenderer } = require('electron');

function renderPDF(pdfSource) {
	const viewerElement = document.getElementById('viewer');
	WebViewer({
 	   path: '../public/lib',
 	   initialDoc: pdfSource,
 	}, viewerElement).then(instance => {
	   // Interact with APIs here.
	   // See https://www.pdftron.com/documentation/web/guides/basic-functionality for more info/
	})
}

ipcRenderer.on('pdfSrc', (event,text) => {
    renderPDF(text)
});

ipcRenderer.on('title', (event,text) => {
    console.log(text);
});