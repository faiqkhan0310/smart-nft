/*eslint-disable*/

import jwt from "jsonwebtoken";

// take only needed user fields to avoid sensitive ones (such as password)
const sensitiveFields = ["email", "emailVerified", "password"];
export function extractUser(user) {
  if (!user) return null;
  const obj = {};
  Object.keys(user).forEach((key) => {
    if (!sensitiveFields.includes(key)) obj[key] = user[key];
  });
  return obj;
}

export function createJwtToken(data) {
  return jwt.sign({ ...data }, process.env.JWT_SECRET);
}

export function isAuthorized(req, res) {
  const token =
    req.headers["authorization"] && req.headers["authorization"].split(" ")[1];

  if (!token) return { status: 401, message: "UnAuthorized" };

  return jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
    if (err) return { status: 403, message: "Un Authorized Invalid Token" };
    return { status: 200, message: "valid user", data: decoded };
  });
}

export const isAuthenticated = (fn) => async (req, res) => {
  jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
    if (!err && decoded) {
      return fn(req, res);
    }
    return { status: 403, message: "Sorry you are not authenticated." };
  });
};
