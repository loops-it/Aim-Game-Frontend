export function getFirstLetters(inputString) {
    const words = inputString.split(' ');
    const firstLetters = words.map(word => word.charAt(0));
    const result = firstLetters.join('');
    return result;
}

export function bytesToMB(bytes) {
    return bytes / (1024 * 1024);
}

export function convertToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const base64String = reader.result.split(',')[1];
            resolve(base64String);
        };
        reader.onerror = error => {
            reject(error);
        };
        reader.readAsDataURL(file);
    });
};