import colors from "../components/QuoteBox/colors";

export const getRandomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};
