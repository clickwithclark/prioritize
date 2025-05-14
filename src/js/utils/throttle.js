export function throttle(func, wait = 5, leading = false) {
  let timeout;
  let lastCalled = 0;
  const MILLISECONDSTOSECONDS = 1000;

  return function (...args) {
    const now = Date.now();
    const shouldCall = leading
      ? now - lastCalled >= wait * MILLISECONDSTOSECONDS
      : !timeout;

    if (shouldCall) {
      if (!leading) {
        lastCalled = now;
      }
      func.apply(this, args);
    }

    clearTimeout(timeout);
    timeout = setTimeout(() => {
      if (!leading) {
        lastCalled = now;
      }
      timeout = null;
    }, wait * MILLISECONDSTOSECONDS);
  };
}
