export const useValidator = () => {
  const validate = async (data, schema) => {
    console.log(data);
    await schema
      .validate(data, {
        abortEarly: false,
      })
      .catch((e) => {
        throw new Error(e.errors.join(". "));
      });
  };
  return {
    validate,
  };
};
