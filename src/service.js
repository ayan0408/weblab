const crypto = require("crypto");

const encrypt = (data) => {
  const key = "U3VwZXIgY29tcGxleCBwYXNzd29yZA==";
  const cipher = crypto.createCipheriv("ayan23", key, Buffer.alloc(16, 0));
  let encrypted = cipher.update(data, "utf-8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
};

module.exports = { encrypt };
