function leftpad(str, toLength, fill) {
    if (str.length >= toLength) return str;
    return Array(toLength - str.length).fill(fill).join('') + str;
}

function secondsToTimeString(seconds) {
    const secs = Math.floor(seconds % 60);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${leftpad(minutes.toString(), 2, '0')}:${leftpad(secs.toString(), 2, '0')}`;
}

function getRootFontWidth(parentElement, char) {
    const testElement = document.createElement('span');
    testElement.innerText = Array(100).fill(char).join('');
    parentElement.appendChild(testElement);
    const charWidth = testElement.offsetWidth / 100;
    testElement.parentNode.removeChild(testElement);
    return charWidth;
}

export default {
    secondsToTimeString,
    getRootFontWidth
};
