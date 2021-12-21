/*eslint-disable*/

import Product from "../../../models/Product";
import "../../../utils/dbConnect";

export default async (req, res) => {
  const { method, query } = req;

  switch (method) {
    case "GET":
      try {
        let allClasses = await Product.find({}).populate("class");
        return res.status(200).json({ success: true, classes: allClasses });
      } catch (error) {
        console.log(error);
        return res.status(400).json({
          success: false,
          error: error,
        });
      }
    case "POST":
      try {
        const checkForProductName = await Product.find({
          name: req.body.name.trim(),
          class: req.body.class,
        });
        if (checkForProductName.length) {
          console.log(checkForProductName);
          return res.status(422).json({
            success: false,
            message: "Product name with same class alredy created",
          });
        }
        var art = new Product(req.body);
        const classRes = await Product.create(art);
        return res.status(200).json({
          success: true,
          data: classRes,
        });
      } catch (error) {
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
