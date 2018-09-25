const createIdCounter = (
  startLetter = String.fromCharCode('a'.charCodeAt() - 1),
  startNumber = String.fromCharCode('0'.charCodeAt() - 1)
) => {
  let letters = startLetter;
  let numbers = startNumber;

  const currentLetter = () => letters;
  const nextLetter = () => {
    const getNextKey = (key) => {
      if (key === 'Z' || key === 'z') {
        return (
          String.fromCharCode(key.charCodeAt() - 25) + String.fromCharCode(key.charCodeAt() - 25)
        ); // AA or aa
      }
      const lastChar = key.slice(-1);
      const sub = key.slice(0, -1);
      if (lastChar === 'Z' || lastChar === 'z') {
        // If a string of length > 1 ends in Z/z,
        // increment the string (excluding the last Z/z) recursively,
        // and append A/a (depending on casing) to it
        return getNextKey(sub) + String.fromCharCode(lastChar.charCodeAt() - 25);
      }
      // (take till last char) append with (increment last char)
      return sub + String.fromCharCode(lastChar.charCodeAt() + 1);
    };

    letters = getNextKey(letters);
    return letters;
  };

  const currentNumber = () => numbers;
  const nextNumber = () => {
    const getNextKey = (key) => {
      if (key === '9') {
        return (
          String.fromCharCode(key.charCodeAt() - 9) + String.fromCharCode(key.charCodeAt() - 9)
        );
      }
      const lastChar = key.slice(-1);
      const sub = key.slice(0, -1);
      if (lastChar === '9') {
        return getNextKey(sub) + String.fromCharCode(lastChar.charCodeAt() - 9);
      }
      // (take till last char) append with (increment last char)
      return sub + String.fromCharCode(lastChar.charCodeAt() + 1);
    };

    numbers = getNextKey(numbers);
    return numbers;
  };

  return {
    currentLetter,
    currentNumber,
    nextLetter,
    nextNumber
  };
};

export default createIdCounter;
