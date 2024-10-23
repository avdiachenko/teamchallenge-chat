function trimSpases(req, res, next) {
  const { name, email, password } = req.body;
  if (name) {
    const newName = name.trim();
    const newEmail = email.trim();
    const newPassword = password.trim();
    req.body = {
      ...req.body,
      name: newName,
      email: newEmail,
      password: newPassword,
    };
  } else {
    const newEmail = email.trim();
    const newPassword = password.trim();
    req.body = {
      ...req.body,
      email: newEmail,
      password: newPassword,
    };
  }
  next();
}

export default trimSpases;
