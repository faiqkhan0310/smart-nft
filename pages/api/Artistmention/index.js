/*eslint-disable*/

import Artist from "../../../models/Artist";
import "../../../utils/dbConnect";

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const artists = await Artist.aggregate([
          { $project: { display: "$ArtistName", id: "$_id" } },
        ]);
        return res.status(200).json(artists);
        // return res.status(200).json(
        // 	[artists[0]]
        // );
      } catch (error) {
        return res.status(400).json({
          success: false,
        });
      }
    case "POST":
      try {
        const nonce = Math.floor(Math.random() * 10000);

        var art = new Artist(req.body);
        art.nonce = nonce;
        const artists = await Artist.create(art);
        return res.status(200).json({
          success: true,
          data: artists,
        });
      } catch (error) {
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
