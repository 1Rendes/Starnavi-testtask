import "@testing-library/jest-dom";

class ResizeObserver {
  private callback: ResizeObserverCallback;

  constructor(callback: ResizeObserverCallback) {
    this.callback = callback;
  }

  observe(target: Element) {}

  unobserve(target: Element) {}

  disconnect() {}
}

type ResizeObserverCallback = (
  entries: ResizeObserverEntry[],
  observer: ResizeObserver
) => void;
global.ResizeObserver = ResizeObserver as any;
