/*eslint-disable*/

import ClassA from "../../../models/class-model";
import "../../../utils/dbConnect";
import productModel from "../../../models/Product";

export default async (req, res) => {
  const { method, query } = req;

  switch (method) {
    case "GET":
      try {
        let allClasses = await ClassA.find({});
        return res.status(200).json({ success: true, classes: allClasses });
      } catch (error) {
        return res.status(400).json({
          success: false,
          error: error,
        });
      }
    case "POST":
      try {
        const checkForClassName = await ClassA.find({
          name: req.body.name.trim(),
        });
        if (checkForClassName.length) {
          console.log(checkForClassName);
          return res.status(422).json({
            success: false,
            message: "Class name alredy exists",
          });
        }

        var art = new ClassA(req.body);
        const classRes = await ClassA.create(art);
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
