// utils/download.js
export const downloadFile = (url, filename) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename || 'downloaded-file'; // Optional: set a filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };