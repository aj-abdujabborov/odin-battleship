export default {
  plus(array1, array2) {
    return array1.map((elem, index) => elem + array2[index]);
  },
  mult(array1, array2) {
    return array1.map((elem, index) => elem * array2[index]);
  },
};
