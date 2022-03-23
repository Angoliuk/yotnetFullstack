export const CreateExactPathes = (array) => {
  array.forEach((element) => {
    element.exactPath = `http://localhost:5000/${element.filename}`;
  });
  return array;
};
