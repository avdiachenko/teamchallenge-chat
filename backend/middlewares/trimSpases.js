function trimSpases(req, res, next) {
  const keys = Object.keys(req.body);

  keys.forEach((key) => {
    return (req.body[key] = req.body[key].trim());
  });
  console.log(req.body);

  next();
}

export default trimSpases;
