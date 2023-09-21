document.addEventListener('DOMContentLoaded', function () {

  function generateDuotoneColors(contrastRatio) {
    let color1, color2;

    do {
      color1 = getRandomColor();
      color2 = getRandomColor();
      
      // Swap the colors if color1 is brighter than color2
      if (getLuminance(color1) > getLuminance(color2)) {
        [color1, color2] = [color2, color1];
      }
    } while (getContrastRatio(color1, color2) < contrastRatio);

    return [color1, color2];
  }

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function getContrastRatio(color1, color2) {
    const luminance1 = getLuminance(color1);
    const luminance2 = getLuminance(color2);

    const brightest = Math.max(luminance1, luminance2);
    const darkest = Math.min(luminance1, luminance2);

    return (brightest + 0.05) / (darkest + 0.05);
  }

  function getLuminance(color) {
    if (color.charAt(0) === '#') {
      color = color.substr(1);
    }
    if (color.length === 3) {
      color = color.split('').map((char) => char + char).join('');
    }
    const r = parseInt(color.substr(0, 2), 16);
    const g = parseInt(color.substr(2, 2), 16);
    const b = parseInt(color.substr(4, 2), 16);
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }

  // Specify your contrast ratio (e.g., 4.5:1 for WCAG AA)
  const contrastRatio = 4.5;

  // Call the function to generate duotone colors with the specified contrast ratio
  const [color1, color2] = generateDuotoneColors(contrastRatio);

  // Inject the color variables directly into the head of the document as a <style> element
  const styleElement = document.createElement('style');
  styleElement.innerHTML = `:root {
    --primary: ${color1};
    --secondary: ${color2};
  }`;

  // Update the theme-color meta tag with the primary color
  const themeColorMetaTag = document.querySelector('meta[name="theme-color"]');
  if (themeColorMetaTag) {
    themeColorMetaTag.setAttribute('content', color1);
  }

  document.head.appendChild(styleElement);

});

/*
document.addEventListener('DOMContentLoaded', function () {

  function generateDuotoneColors(contrastRatio) {
    let color1, color2;
    do {
      color1 = getRandomColor();
      color2 = getRandomColor();
    } while (getContrastRatio(color1, color2) < contrastRatio);

    return [color1, color2];
  }

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function getContrastRatio(color1, color2) {
    const luminance1 = getLuminance(color1);
    const luminance2 = getLuminance(color2);

    const brightest = Math.max(luminance1, luminance2);
    const darkest = Math.min(luminance1, luminance2);

    return (brightest + 0.05) / (darkest + 0.05);
  }

  function getLuminance(color) {
    if (color.charAt(0) === '#') {
      color = color.substr(1);
    }
    if (color.length === 3) {
      color = color.split('').map((char) => char + char).join('');
    }
    const r = parseInt(color.substr(0, 2), 16);
    const g = parseInt(color.substr(2, 2), 16);
    const b = parseInt(color.substr(4, 2), 16);
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }

  // Specify your contrast ratio (e.g., 4.5:1 for WCAG AA)
  const contrastRatio = 4.5;

  // Call the function to generate duotone colors with the specified contrast ratio
  const [color1, color2] = generateDuotoneColors(contrastRatio);

  // Inject the color variables directly into the head of the document as a <style> element
  const styleElement = document.createElement('style');
  styleElement.innerHTML = `:root {
    --primary: ${color1};
    --secondary: ${color2};
  }`;

  document.head.appendChild(styleElement);

});
*/