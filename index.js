const keypress = require('keypress');
const ncp = require('copy-paste');
const asciiArtConfig = {
  'jkl': '₍˄·͈༝·͈˄₎◞ ̑̑'  // This renders as a cat, I swear :)
};
const bufferLimit = 10;
let sequenceBuffer = [];

keypress.enableMouse(process.stdout);
keypress(process.stdin);

process.stdin.on('mousepress', (info) =>
  console.log('got "mousepress" event at %d x %d', info.x, info.y));

process.stdin.on('keypress', (ch, key) => {
  console.log('got "keypress"', key);
  sequenceBuffer = [...sequenceBuffer, key];
  if (sequenceBuffer.length > bufferLimit) {
    const [_, newSequenceBuffer] = sequenceBuffer;
    sequenceBuffer = newSequenceBuffer;
  }
  sequenceBufferStr = sequenceBuffer
    .filter(_ => _) // Filter undefined keypresses
    .map(_ => _.name)
    .join('');
  console.log('buffer', sequenceBufferStr);
  Object.keys(asciiArtConfig).map(targetKey => {
    if (new RegExp(targetKey,'g').test(sequenceBufferStr)) {
      const asciiArt = asciiArtConfig[targetKey];
      ncp.copy(asciiArt, () => console.log(`Copied ${asciiArt} into buffer`))
      sequenceBuffer = [];
    }
  })
  if (key && key.ctrl && key.name == 'c') {
    process.stdin.pause();
  }
});

process.stdin.setRawMode(true);
process.stdin.resume();

process.on('exit', () => keypress.disableMouse(process.stdout));
