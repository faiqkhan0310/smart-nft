/*eslint-disable*/

import { createJwtToken } from "@/lib/api-helpers";
import isEmail from "validator/lib/isEmail";
import "../../../../utils/dbConnect";
import Admin from "../../../../models/Admin_seq";

import bcrypt from "bcryptjs";
const sendResponse = (status, success, message, data, resa, ...restParams) => {
  const [restParamsObj] = restParams;
  return resa.status(status).json({ success, message, data, ...restParamsObj });
};
export default async (req, res) => {
  const {
    method,
    body: { email, password },
  } = req;

  switch (method) {
    case "POST":
      try {
        // if (!email)
        //   return sendResponse(402, false, "Email is Missing", null, res);
        // if (!isEmail(email))
        //   return sendResponse(402, false, "InValid Email", null, res);
        // if (!password)
        //   return sendResponse(402, false, "Password is Missing", null, res);

        let AdminRes = await Admin.findOne({
          where: { email: email.toLowerCase() },
        });

        if (!AdminRes)
          return sendResponse(
            400,
            false,
            "No admin found against this email",
            AdminRes,
            res
          );

        const { dataValues } = AdminRes;
        const { password: hashedPassword } = dataValues;
        const isPasswordValid = bcrypt.compareSync(password, hashedPassword);

        if (!isPasswordValid)
          return sendResponse(
            400,
            false,
            "Password or email is invalid",
            null,
            res
          );

        const tokenData = {
          email: AdminRes.email,
          id: AdminRes._id,
          name: AdminRes.name,
        };

        const token = createJwtToken(tokenData);

        return sendResponse(200, true, "Login successfully ", AdminRes, res, {
          token,
        });
      } catch (error) {
        console.log(error);
        return res.status(400).json({
          success: false,
          error: error,
          message: "Network error",
        });
      }

    default:
      res.setHeaders("Allow", ["POST"]);
      return res
        .status(405)
        .json({ success: false })
        .end(`Method ${method} Not Allowed`);
  }
};
