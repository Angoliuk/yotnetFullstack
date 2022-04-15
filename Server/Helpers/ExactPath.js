export const CreateExactPathes = (array) => {
  array.forEach((element) => {
    element.exactPath = `${process.env.API_URL}${element.filename}`;
  });
  return array;
};
