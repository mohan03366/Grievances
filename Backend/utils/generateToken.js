const jwt = require("jsonwebtoken");

exports.generateToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  console.log("Generated Token:", token);
  return token;
};
