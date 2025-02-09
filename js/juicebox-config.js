import { Juicebox } from 'juicebox-gallery';

const juiceboxConfig = {
  scaleToFit: false,
  enableKeyboardControls: true,
  showOpenButton: true
};

new Juicebox({
  containerId: 'juicebox-container',
  galleryWidth: '1280',
  galleryHeight: '720',
  backgroundColor: '#222222'
}, juiceboxConfig);