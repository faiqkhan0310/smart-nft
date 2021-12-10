/*eslint-disable*/

import Artist from "../../../../models/exhibition";
import "../../../../utils/dbConnect";

export default async (req, res) => {
  const { method, query } = req;

  switch (method) {
    case "GET":
      try {
        const artists = await Artist.find({});
        console.log("exhibiton");
        console.log(artists);
        return res.status(200).json(artists);
        // return res.status(200).json(
        // 	[artists[0]]
        // );
      } catch (error) {
        return res.status(400).json({
          success: false,
        });
      }
    case "DELETE":
      try {
        console.log("EXHIBITION DEL");
        console.log(query);
        const artists = await Artist.deleteOne({ _id: query.id });
        console.log("artist del");
        return res.status(200).json({
          success: true,
          data: artists,
        });
      } catch (error) {
        console.log("error", error);
        return res.status(400).json({
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
