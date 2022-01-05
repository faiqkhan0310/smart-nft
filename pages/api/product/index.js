/*eslint-disable*/

import Product from "../../../models/Product.seq";
import ProductAttr from "../../../models/product_attributes";
import "../../../utils/dbConnect";
import Class from "../../../models/class-seq";
import art from "../admin/art";
import { isAuthorized } from "@/lib/api-helpers";

export default async (req, res) => {
  const { method, query } = req;

  switch (method) {
    case "GET":
      try {
        const { status, message } = isAuthorized(req, res);
        console.log(status, message);
        if (status !== 200)
          return res.status(status).json({ success: false, message: message });
        let allClasses = await Product.findAll({ include: { model: Class } });
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
        const { status, message } = isAuthorized(req, res);
        console.log(status, message);
        if (status !== 200)
          return res.status(status).json({ success: false, message: message });
        console.log(req.body);
        const checkForProductName = await Product.findAll({
          where: {
            name: req.body.name.trim(),
            // class: req.body.class,
          },
        });
        if (checkForProductName.length) {
          console.log(checkForProductName);
          return res.status(422).json({
            success: false,
            message: "Product name with same class alredy created",
          });
        }
        console.log(art.body);
        const { attributes } = req.body;
        delete req.body.attributes;

        const classRes = await Product.create({
          name: req.body.name,
          desc: req.body.desc,
          price: req.body.price,
          list: req.body.list,
          classId: req.body.class,
        });
        console.log(classRes);

        const { dataValues } = classRes;

        if (dataValues?.id) {
          const attributesData = attributes.map(({ id, ...attr }) => ({
            ...attr,
            productId: dataValues?.id,
          }));
          // console.clear();
          console.log(attributesData);
          await ProductAttr.bulkCreate(attributesData);
        }

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
