/*eslint-disable*/

import Admins from "../../../models/admins";
import "../../../utils/dbConnect";
import { isEmail } from "validator";

const sendResponse = (status, success, message, data, resa, ...restParams) => {
  const [restParamsObj] = restParams;
  return resa.status(status).json({ success, message, data, ...restParamsObj });
};

export default async (req, res) => {
  const {
    method,
    body: { email, password, name },
  } = req;

  switch (method) {
    case "GET":
      try {
        let AdminRes = await Admins.find({});
        return sendResponse(
          200,
          true,
          "All Admins Fetch successfully",
          AdminRes,
          res
        );
      } catch (error) {
        console.log(error);
        return res.status(400).json({
          success: false,
          error: error,
          message: "Network error",
        });
      }

    default:
      res.setHeaders("Allow", ["POST", "GET"]);
      return res
        .status(405)
        .json({ success: false })
        .end(`Method ${method} Not Allowed`);
  }
};
