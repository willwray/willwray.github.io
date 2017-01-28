'use strict';

// In production, the bundled pdf.js shall be used instead of RequireJS.
require.config({paths: {'pdfjs': 'scripts'}});
require(['pdfjs/display/api', 'pdfjs/display/global'], function (api, global) {
  // In production, change this to point to the built `pdf.worker.js` file.
  global.PDFJS.workerSrc = 'pdf.worker.js';

  // Fetch the PDF document from the URL using promises.
  api.getDocument('WillWrayCV.pdf').then(function (pdf) {
    // Fetch the page.
    pdf.getPage(1).then(function (page) {
      var scale = 1.5;
      var viewport = page.getViewport(scale);

      // Prepare canvas using PDF page dimensions.
      var canvas = document.getElementById('canv');
      var context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      // Render PDF page into canvas context.
      var renderContext = {
        canvasContext: context,
        viewport: viewport
      };
      page.render(renderContext);
    });
  });
});