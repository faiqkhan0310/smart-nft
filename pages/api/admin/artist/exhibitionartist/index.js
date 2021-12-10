/*eslint-disable*/

import Art from "@/db/models/Art";
import Artist from "../../../../../db/models/Artist";
import "../../../../../utils/dbConnect";

export default async (req, res) => {
  const { method, body } = req;
  console.log(body);

  switch (method) {
    case "POST":
      try {
        let artists = await Artist.find({
          _id: { $in: body },
        });
        return res.status(200).json({ artists });
      } catch (error) {
        console.log(error);
        return res.status(400).json({
          success: false,
          error: error,
        });
      }
    // case "POST":
    //   try {
    //     const nonce = Math.floor(Math.random() * 10000);
    //     var art = new Artist(req.body);
    //     art.nonce = nonce;
    //     const artists = await Artist.create(art);
    //     return res.status(200).json({
    //       success: true,
    //       data: artists,
    //     });
    //   } catch (error) {
    //     return res.status(400).json({
    //       success: false,
    //     });
    //   }
    default:
      res.setHeaders("Allow", ["GET", "POST"]);
      return res
        .status(405)
        .json({ success: false })
        .end(`Method ${method} Not Allowed`);
  }
};
