export const getRandomNumber = (min, max) => {
  return String.fromCharCode(Math.floor(Math.random() * (max - min + 1) + min));
};

export const getSpecialChar = () => {
  const specialChar = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
  return specialChar[Math.floor(Math.random() * specialChar.length)];
};
