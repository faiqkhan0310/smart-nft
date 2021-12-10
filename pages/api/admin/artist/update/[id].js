/*eslint-disable*/

import Artist from "../../../../../db/models/Artist";
import "../../../../../utils/dbConnect";

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET":
      try {
        const artist = await Artist.findById(id);

        return res.status(200).json({
          success: true,
          data: artist,
        });
      } catch (error) {
        return res.status(404).json({
          success: false,
        });
      }
    case "PUT":
      try {
        console.log("Artist update", req.body);
        const artist = await Artist.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        console.log("artist updated", artist);
        return res.status(200).json({
          success: true,
          data: artist,
        });
      } catch (error) {
        return res.status(400).json({
          success: false,
        });
      }
    case "DELETE":
      try {
        await Artist.deleteOne({ _id: id });

        return res.status(200).json({
          success: true,
          data: { id },
        });
      } catch (error) {
        return res.status(400).json({
          success: false,
        });
      }
    default:
      res.setHeaders("Allow", ["GET", "PUT", "DELETE"]);
      return res
        .status(405)
        .json({ success: false })
        .end(`Method ${method} Not Allowed`);
  }
};
