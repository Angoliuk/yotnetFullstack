export const useValidator = () => {
  const validate = async (data, schema) => {
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
