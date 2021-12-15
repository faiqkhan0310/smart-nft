/*eslint-disable*/

import ClassA from "../../../models/class-model";
import "../../../utils/dbConnect";

export default async (req, res) => {
  const { method, query: id } = req;

  switch (method) {
    case "GET":
      try {
        let oneClass = await ClassA.find({ _id: id });
        return res.status(200).json({ success: true, classes: oneClass });
      } catch (error) {
        return res.status(400).json({
          success: false,
          error: error,
        });
      }
    case "DELETE":
      try {
        console.log(id.id);
        const delRes = await ClassA.findByIdAndDelete(id.id);
        return res.status(200).json({
          success: true,
          data: delRes,
        });
      } catch (error) {
        return res.status(400).json({
          error: error,
          success: false,
        });
      }
    default:
      res.setHeaders("Allow", ["GET", "DELETE"]);
      return res
        .status(405)
        .json({ success: false })
        .end(`Method ${method} Not Allowed`);
  }
};
