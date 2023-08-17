export function enterFullscreen() {
  // Check if the browser supports the Fullscreen API
  if (document.documentElement.requestFullscreen) {
    // Enter fullscreen mode
    document.documentElement.requestFullscreen();
  }
}

export function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  }
}

export function isMobileDevice(): boolean {
  return window.innerWidth <= 768;
}
