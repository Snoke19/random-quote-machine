import colors from "./colors";

const getRandomColor = () => {
  const randomArray = new Uint32Array(1);
  window.crypto.getRandomValues(randomArray);
  const randomIndex = randomArray[0] % colors.length;
  return colors[randomIndex];
};

export default getRandomColor;