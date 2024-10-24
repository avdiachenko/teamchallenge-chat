function trimSpases(req, res, next) {
  const { name, email, password } = req.body;
  if (name) {
    const newName = name.trim();
    const newEmail = email.trim();
    const newPassword = password.trim();
    const keys = Object.keys(req.body);
    console.log(keys);
    keys.forEach((key) => {
      return (req.body[key] = req.body[key].trim());
    });
    console.log(req.body);
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
