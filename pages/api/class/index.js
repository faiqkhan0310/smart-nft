/*eslint-disable*/

import ClassA from "../../../models/class-seq";
import "../../../utils/dbConnect";
import productModel from "../../../models/Product";
import Product from "../../../models/Product.seq";

export default async (req, res) => {
  const { method, query } = req;

  switch (method) {
    case "GET":
      try {
        let allClasses = await ClassA.findAll({ include: { model: Product } });

        return res.status(200).json({ success: true, classes: allClasses });
      } catch (error) {
        return res.status(400).json({
          success: false,
          error: error,
        });
      }
    case "POST":
      try {
        console.log(req.body);

        const classRes = await ClassA.create({ ...req.body });
        console.log(classRes);
        return res.status(200).json({
          success: true,
          data: classRes,
        });
      } catch (error) {
        console.log(error);
        return res.status(400).json({
          error: error,
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
