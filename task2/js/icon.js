export function createCompletedIcon(completed) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '16');
    svg.setAttribute('height', '16');
    svg.setAttribute('viewBox', '0 0 16 16');
    svg.setAttribute('aria-hidden', 'true');
  
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  
    if (completed) {
      svg.setAttribute('fill', '#4CAF50');
      path.setAttribute('d', 'M6.00039 11.2002L2.80039 8.0002L1.86606 8.93453L6.00039 13.0689L15.0004 4.06886L14.0661 3.13453L6.00039 11.2002Z');
    } else {
      svg.setAttribute('fill', '#f44336');
      path.setAttribute('d', 'M3.51562 3.51562L12.4853 12.4853M12.4853 3.51562L3.51562 12.4853');
      path.setAttribute('stroke', '#f44336');
      path.setAttribute('stroke-width', '2');
      path.setAttribute('stroke-linecap', 'round');
      svg.removeAttribute('fill');
    }
  
    svg.appendChild(path);
    return svg;
  }
  