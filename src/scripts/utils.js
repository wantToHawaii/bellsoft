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