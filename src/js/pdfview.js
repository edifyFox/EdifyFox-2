

// Getting a file through XMLHttpRequest as an arraybuffer and creating a Blob
var rhinoStorage = localStorage.getItem("pdfstr");
if (rhinoStorage) {
    // Reuse existing Data URL from localStorage
    test(rhinoStorage);
}
else {
    // Create XHR, Blob and FileReader objects
    var xhr = new XMLHttpRequest(),
        blob,
        fileReader = new FileReader();

    xhr.open("GET", "https://edifyfox.com/php/drs/test.pdf", true);
    // Set the responseType to arraybuffer. "blob" is an option too, rendering manual Blob creation unnecessary, but the support for "blob" is not widespread enough yet
    xhr.responseType = "arraybuffer";

    xhr.addEventListener("load", function () {
        if (xhr.status === 200) {
            // Create a blob from the response
            blob = new Blob([xhr.response], {type: "application/pdf"});

            // onload needed since Google Chrome doesn't support addEventListener for FileReader
            fileReader.onload = function (evt) {
                // Read out file contents as a Data URL
                var result = evt.target.result;
                // Set image src to Data URL
                test(result);
                // Store Data URL in localStorage
                try {
                    localStorage.setItem("pdfstr", result);
                }
                catch (e) {
                    console.log("Storage failed: " + e);
                }
            };
            // Load blob as Data URL
            fileReader.readAsDataURL(blob);
        }
    }, false);
    // Send XHR
    xhr.send();
}
