/**
 * Reads an image file, downscales it to a reasonable max dimension, and re-encodes it as a
 * compressed JPEG data URL. Profile/event photos never need to be larger than this to look
 * sharp in the UI, and this is what actually fixes multi-minute load times: an uncompressed
 * phone photo can be 4-10MB+ as a base64 string, which is slow to upload, slow to store, slow
 * to send back on every request, and slow for the browser to decode every time it's rendered -
 * even when it's just squashed down to a 42px avatar with CSS.
 */
export function compressImage(file, { maxDimension = 800, quality = 0.82 } = {}) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith('image/')) {
      reject(new Error('Please choose an image file'));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Could not read that file'));
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => reject(new Error('Could not read that image'));
      img.onload = () => {
        let { width, height } = img;
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height / width) * maxDimension);
            width = maxDimension;
          } else {
            width = Math.round((width / height) * maxDimension);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}
