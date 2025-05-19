export function styleAdd(css: string, first?: boolean) {
    if (!css || typeof document === 'undefined') return;
    const style = document.createElement('style');
    style.appendChild(document.createTextNode(css));
    if (first && document.head.firstChild) document.head.insertBefore(style, document.head.firstChild);
    else document.head.appendChild(style);
}
