/*eslint-disable*/

import "../../../../utils/dbConnect";
import db from "../../../../utils/dbConnect";
import Admin from "../../../../models/Admin_seq";
import { isAuthorized } from "@/lib/api-helpers";

const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", name: "", password: "" };

  //duplicate error code
  if (err.code === 11000) {
    errors.email = "That email is already registered";
    return errors;
  }

  Object.values(err.errors).forEach(({ path, message }) => {
    errors[path] = message;
  });

  return errors;
};

export default async (req, res) => {
  const { method, body } = req;

  switch (method) {
    case "GET":
      try {
        const { status, message } = isAuthorized(req, res);
        console.log(status, message);
        if (status !== 200)
          return res.status(status).json({ success: false, message: message });
        console.log("class id single", req.query);
        let AdminsRes = await Admin.findAll();
        return res.status(200).json({ success: true, Admins: AdminsRes });
      } catch (error) {
        console.log(error);
        return res.status(400).json({
          success: false,
          error: error,
        });
      }

    case "POST":
      try {
        console.log(req.body);
        const { status, message } = isAuthorized(req, res);
        console.log(status, message);
        if (status !== 200)
          return res.status(status).json({ success: false, message: message });

        const newAdminRes = await Admin.create({
          name: req.body.name,
          email: req.body.email.toLowerCase(),
          password: req.body.password,
        });
        return res.status(200).json({
          success: true,
          data: newAdminRes,
        });
      } catch (error) {
        const errors = handleErrors(error);
        return res.status(400).json({
          error: errors,
          success: false,
        });
      }

    default:
      res.setHeaders("Allow", ["GET", "POST"]);
      return res
        .status(405)
        .json({ success: false })
        .end(`Method ${method} Not Allowed`);
  }
};
