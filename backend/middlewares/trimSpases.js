function trimSpases(req, res, next) {
  const keys = Object.keys(req.body);

  keys.forEach((key) => {
    if (typeof req.body[key] === "string") {
      return (req.body[key] = req.body[key].trim());
    }
  });

  next();
}

export default trimSpases;
