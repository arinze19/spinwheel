export const generateRandomHex = (length: number) => {
  const characters = '0123456789ABCDEF';
  let hexValue = '#';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    hexValue += characters[randomIndex];
  }

  return hexValue;
};
