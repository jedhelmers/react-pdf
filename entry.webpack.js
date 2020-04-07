import pdfjs from 'pdfjs-dist';
import Document from './dist/esm/Document';
import Outline from './dist/esm/Outline';
import Page from './dist/esm/Page'; // eslint-disable-next-line

import PdfjsWorker from 'worker-loader!./dist/esm/pdf.worker.entry.js';
import { isLocalFileSystem, warnOnDev } from './dist/esm/shared/utils';

if (isLocalFileSystem) {
  warnOnDev('You are running React-PDF from your local file system. PDF.js Worker may fail to load due to browser\'s security policies. If you\'re on Google Chrome, you can use --allow-file-access-from-files flag for debugging purposes.');
}

if (typeof window !== 'undefined' && 'Worker' in window) {
  pdfjs.GlobalWorkerOptions.workerPort = new PdfjsWorker();
}

export { pdfjs, Document, Outline, Page };
