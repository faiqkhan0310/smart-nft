/*eslint-disable*/

import ClassA from "../../../models/class-seq";
import "../../../utils/dbConnect";
import Product from "../../../models/Product.seq";

export default async (req, res) => {
  const { method, query: id, body } = req;

  switch (method) {
    case "GET":
      try {
        console.log("class id single", req.query);
        let oneClass = await ClassA.findOne({
          where: { id: id.id },
          include: { model: Product },
        });
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
        console.log("body of class ", body);
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
        let oneClassUpdated = await ClassA.update(
          { ...body },
          { where: { id: id.id } }
        );
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
        const isClassHaveProduct = await ClassA.findOne({
          where: { id: id.id },
          include: { model: Product },
        });
        console.log(
          isClassHaveProduct?.products?.length,
          "this is the procduct aray lengy of class"
        );
        if (isClassHaveProduct?.products?.length) {
          return res.status(422).json({
            success: false,
            message: "This class is used by some products. Delete Aborted.",
          });
        }
        const delRes = await ClassA.destroy({ where: { id: id.id } });
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
