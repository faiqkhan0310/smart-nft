/* eslint-disable */

import Creator from "../../../models/create";
import "../../../utils/dbConnect";

export default async (req, res) => {
  const { method, body, query } = req;

  switch (method) {
    case "GET":
      try {
        // const totalRecords = await Creator.countDocuments({});
        const creator = await Creator.find({ _id: query.id });
        return res.status(200).json({ success: true, creator: creator });
      } catch (error) {
        console.log(error);
        return res.status(400).json({
          success: false,
          error: error,
        });
      }
    case "DELETE":
      try {
        const creator = await Creator.deleteOne({ _id: query.id });
        return res.status(200).json({ success: true, creator: creator });
      } catch (error) {
        console.log(error);
        return res.status(400).json({
          success: false,
          error: error,
        });
      }
    case "PUT":
      try {
        console.log(`Creator status update api`);
        const arts = await Creator.updateOne(
          { _id: query.id },
          { status: body.status }
        );
        return res.status(201).json({ success: true, data: arts });
      } catch (error) {
        console.error(`Creator status api Failed: ${error}`);
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
