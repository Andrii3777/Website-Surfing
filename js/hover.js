if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
    console.log('this is a touch device');
  } else {
    console.log('this is not a touch device');
    document.body.classList.add('no-touch');
  }