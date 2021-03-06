
const { ipcRenderer } = require('electron');

function renderPDF(pdfSource) {
	const viewerElement = document.getElementById('viewer');
	WebViewer({
 	   path: '../public/lib',
 	   initialDoc: pdfSource,
 	}, viewerElement).then(instance => {
	   instance.disableElements([ 'downloadButton', 'printButton', 'themeChangeButton' ]);
	})
}

ipcRenderer.on('pdfSrc', (event,text) => {
    renderPDF(text)
});

ipcRenderer.on('title', (event,text) => {
	document.getElementById('nmapp').innerHTML = text;
});