import Art from "@/db/models/Art";
import Artist from "../../../../db/models/Artist";
import "../../../../utils/dbConnect";

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const { limit, skip, search } = req.query;
        var searchQuery = {};
        if (search && search !== "") {
          searchQuery.PublicAddress = search;
        }
        const totalRecord = await Artist.countDocuments(searchQuery);

        let artists = await Artist.find(searchQuery)
          .sort({ _id: -1 })
          .limit(parseInt(limit) || 10)
          .skip(parseInt(limit) * (parseInt(skip) - 1))
          .exec();
        let getTotalminted = artists.map((ele) => {
          return Art.countDocuments({ CreatorId: ele._id });
        });
        getTotalminted = await Promise.all(getTotalminted);
        artists = artists.map((item, i) => {
          item = item.toObject();
          item["totalMinted"] = getTotalminted[i];
          return item;
        });
        return res.status(200).json({ artists, totalRecord });
      } catch (error) {
        console.log(error);
        return res.status(400).json({
          success: false,
          error: error,
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
