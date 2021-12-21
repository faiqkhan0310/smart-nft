/*eslint-disable*/

import ClassA from "../../../models/class-model";
import "../../../utils/dbConnect";
// require("../../models/class-model");
import productModel from "../../../models/Product";

export default async (req, res) => {
  const { method, query: id, body } = req;

  switch (method) {
    case "GET":
      try {
        console.log("class id single", req.query);
        let oneClass = await ClassA.find({ _id: id.id }).populate("products");
        return res.status(200).json({ success: true, classes: oneClass });
      } catch (error) {
        console.log(error);
        return res.status(400).json({
          success: false,
          error: error,
        });
      }
    case "PATCH":
      try {
        let oneClassUpdated = await ClassA.findByIdAndUpdate(id.id, {
          $push: { products: body.products },
        });
        return res
          .status(200)
          .json({ success: true, classes: oneClassUpdated });
      } catch (error) {
        return res.status(400).json({
          success: false,
          error: error,
        });
      }
    case "POST":
      try {
        console.log("update body class");
        console.log(body);
        console.log(id);
        let oneClassUpdated = await ClassA.findByIdAndUpdate(id.id, body);
        return res
          .status(200)
          .json({ success: true, classes: oneClassUpdated });
      } catch (error) {
        console.log(error);
        return res.status(400).json({
          success: false,
          error: error,
        });
      }
    case "DELETE":
      try {
        console.log(id.id);
        const isClassHaveProduct = await ClassA.findById(id.id).populate(
          "products"
        );
        console.log(
          isClassHaveProduct?.products.length,
          "this is the procduct aray lengy of class"
        );
        if (isClassHaveProduct?.products.length) {
          return res.status(422).json({
            success: false,
            message: "This class is used by some products. Delete Aborted.",
          });
        }
        const delRes = await ClassA.findByIdAndDelete(id.id);
        return res.status(200).json({
          success: true,
          data: delRes,
        });
      } catch (error) {
        console.log(error);
        return res.status(400).json({
          error: error,
          success: false,
        });
      }
    default:
      res.setHeaders("Allow", ["GET", "DELETE", "UPDATE", "PATCH"]);
      return res
        .status(405)
        .json({ success: false })
        .end(`Method ${method} Not Allowed`);
  }
};
