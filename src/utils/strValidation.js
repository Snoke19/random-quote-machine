const removeSlashes = (value) => {
  return value.replace(/[\\/]/g, "");
};

export default removeSlashes;