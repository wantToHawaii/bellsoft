export const watchResizeBreakpoint = (breakpoint, onMatch, onUnmatch) => {
  const mediaQuery = window.matchMedia(breakpoint);
  let checked = mediaQuery.matches;
  window.addEventListener('resize', () => {
    if (!checked && mediaQuery.matches) {
      checked = true;
      onMatch();
    } else if (checked && !mediaQuery.matches) {
      checked = false;
      onUnmatch();
    }
  });
};

export const copyToClipboard = (value) => {
  const field = document.createElement("textarea");
  field.value = value;
  document.body.appendChild(field);
  field.select();
  document.execCommand('copy');
  document.body.removeChild(field);
};
