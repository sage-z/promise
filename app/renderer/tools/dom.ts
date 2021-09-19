export function addClassName(el:any, className:any) {
    if (el.classList) {
      el.classList.add(className);
    } else {
      if (!el.className.match(new RegExp(`(?:^|\\s)${className}(?!\\S)`))) {
        el.className += ` ${className}`;
      }
    }
  }
  
export function getEventPosition(container = document.body, event:any) {
    const rect = container.getBoundingClientRect();
    const position = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
    return position;
  }
  
export function removeClassName(el:any, className:any) {
    if (el.classList) {
      el.classList.remove(className);
    } else {
      el.className = el.className.replace(
        new RegExp(`(?:^|\\s)${className}(?!\\S)`, 'g'),
        '',
      );
    }
  }
  
export function clearClassName(el:any) {
    el.className = '';
  }
  
export const on = (target:any, event:any, ...args:any[]) =>
    target.addEventListener(event, ...args);
  
  export const off = (target:any, event:any, ...args:any[]) =>
    target.removeEventListener(event, ...args);