export default class ApiError extends Error {
  status;
  errors;
  constructor(status, message, errors = []) {
    super(message);
    this.errors = errors;
    this.status = status;
  }

  static UnauthorizedError() {
    return new ApiError(401, "User unauthorized");
  }
  static BadRequestError(message, errors) {
    return new ApiError(400, message, errors);
  }
  static ForbiddenError(errors) {
    return new ApiError(403, "Forbidden", errors);
  }
}
