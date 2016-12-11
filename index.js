const keypress = require('keypress');

keypress.enableMouse(process.stdout);
keypress(process.stdin);

process.stdin.on('mousepress', (info) =>
  console.log('got "mousepress" event at %d x %d', info.x, info.y));

process.stdin.on('keypress', (ch, key) => {
  console.log('got "keypress"', key);
  if (key && key.ctrl && key.name == 'c') {
    console.log('pause ', key);
    process.stdin.pause();
  }
});

process.stdin.setRawMode(true);
process.stdin.resume();

process.on('exit', () => keypress.disableMouse(process.stdout));
