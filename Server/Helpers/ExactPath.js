export const CreateExactPathes = (array) => {
  array.forEach((element) => {
    element.exactPath = `${process.env.BASE_URL}${element.filename}`;
  });
  return array;
};
