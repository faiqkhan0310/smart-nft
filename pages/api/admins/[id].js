/*eslint-disable*/

import Admins from "../../../models/admins";
import "../../../utils/dbConnect";
import { Admin } from "../../../lib/constants";

const sendResponse = (status, success, message, data, resa, ...restParams) => {
  const [restParamsObj] = restParams;
  return resa.status(status).json({ success, message, data, ...restParamsObj });
};

export default async (req, res) => {
  const {
    method,
    body,
    query: { id },
  } = req;

  switch (method) {
    case "DELETE":
      try {
        const isSuperAdmin = await Admins.findById(id);
        console.log(isSuperAdmin);
        if (isSuperAdmin.role === Admin.SUPER_ADMIN) {
          return sendResponse(
            400,
            false,
            "Super Admin Can't be changed",
            isSuperAdmin,
            res
          );
        }

        let AdminRes = await Admins.findByIdAndDelete(id);
        return sendResponse(
          200,
          true,
          "Admin Deleted Successfully",
          AdminRes,
          res
        );
      } catch (error) {
        console.log(error);
        return res.status(400).json({
          success: false,
          error: error,
          message: "Error occured",
        });
      }
    case "POST":
      try {
        let AdminRes = await Admins.findByIdAndUpdate(id, body);
        return sendResponse(
          200,
          true,
          "Admin Updated Successfully",
          AdminRes,
          res
        );
      } catch (error) {
        console.log(error);
        return res.status(400).json({
          success: false,
          error: error,
          message: "Error occured",
        });
      }
    case "GET":
      try {
        let AdminRes = await Admins.findById(id);
        return sendResponse(
          200,
          true,
          "Admin Fetch Successfully",
          AdminRes,
          res
        );
      } catch (error) {
        console.log(error);
        return res.status(400).json({
          success: false,
          error: error,
          message: "Error occured",
        });
      }

    case "PATCH":
      try {
        const isSuperAdmin = await Admins.findById(id);
        console.log(isSuperAdmin);
        if (isSuperAdmin === Admin.SUPER_ADMIN) {
          return sendResponse(
            400,
            false,
            "Super Admin Can't be changed",
            isSuperAdmin,
            res
          );
        }

        let AdminRes = await Admins.findByIdAndUpdate(id, {
          isActive: body.isActive,
        });
        return sendResponse(
          200,
          true,
          "Admin Status updated Successfully",
          AdminRes,
          res
        );
      } catch (error) {
        console.log(error);
        return res.status(400).json({
          success: false,
          error: error,
          message: "Error occured",
        });
      }

    default:
      res.setHeaders("Allow", ["POST", "GET", "DELETE", "PATCH"]);
      return res
        .status(405)
        .json({ success: false })
        .end(`Method ${method} Not Allowed`);
  }
};
