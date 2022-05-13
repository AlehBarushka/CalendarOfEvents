/**
 * @description The function generates and returns a uniqId.
 * @returns {string} unique Id
 **/
export const generateUniqId = () => {
  const generateRandomString = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };

  return (
    generateRandomString() +
    '-' +
    generateRandomString() +
    '-' +
    generateRandomString() +
    '-' +
    generateRandomString()
  );
};
