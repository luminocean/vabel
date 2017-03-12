function leftpad(str, toLength, fill) {
    if (str.length >= toLength) return str;
    return Array(toLength - str.length).fill(fill).join('') + str;
}

function secondsToTimeString(seconds) {
    const secs = seconds % 60;
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${leftpad(minutes.toString(), 2, '0')}:${leftpad(secs.toString(), 2, '0')}`;
}

export default {
    secondsToTimeString
};
