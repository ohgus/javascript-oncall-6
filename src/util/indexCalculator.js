const calculateIndex = {
  normal(array, index) {
    return (index + 1) % array.length;
  },

  worked(array, index) {
    return (index + 2) % array.length;
  },
};

export default calculateIndex;
