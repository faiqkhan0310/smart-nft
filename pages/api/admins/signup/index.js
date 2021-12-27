/*eslint-disable*/

import Admins from "../../../../models/admins";
import "../../../../utils/dbConnect";

const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", name: "", password: "" };

  //duplicate error code
  if (err.code === 11000) {
    errors.email = "That email is already registered";
    return errors;
  }
  if (err.message.includes("admin validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

export default async (req, res) => {
  const { method, body } = req;

  switch (method) {
    case "GET":
      try {
        console.log("class id single", req.query);
        let AdminsRes = await Admins.find({});
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
        var newAdmin = new Admins(req.body);
        const newAdminRes = await Admins.create(newAdmin);
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
