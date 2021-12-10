/* eslint-disable */

import Creator from "../../../models/create";
import "../../../utils/dbConnect";

export default async (req, res) => {
  const { method, body } = req;

  switch (method) {
    case "GET":
      try {
        // const totalRecords = await Creator.countDocuments({});
        const creator = await Creator.find({})
          .limit(parseInt(req.query.limit) || 20)
          .skip(parseInt(req.query.limit) * (parseInt(req.query.skip) - 1))
          .exec();
        return res.status(200).json({ success: true, creator: creator });
      } catch (error) {
        console.log(error);
        return res.status(400).json({
          success: false,
          error: error,
        });
      }
    case "POST":
      try {
        console.log(body);
        const arts = await Creator.create(body);
        return res.status(201).json({ success: true, data: arts });
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
