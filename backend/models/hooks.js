export const handleSaveError = (error, data, next) => {
  const { name, code } = error;
  name === "MongoServerError" && code === 11000
    ? (error.status = 409)
    : (error.status = 400);
  next();
};

export const setUpdateSetting = function (next) {
  this.options.new = true;
  this.options.runValidators = true;
  next();
};

export const setRole = function (next) {
  if (!this.role) {
    this.role = "not_verified"; // Устанавливаем значение по умолчанию, если не задано
  }
  next();
};
