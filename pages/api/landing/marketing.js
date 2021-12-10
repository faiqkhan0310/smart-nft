import "../../../utils/dbConnect";
import Marketing from "../../../db/models/Landing/Marketing";

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const marketing = await Marketing.find({});
        return res.status(200).json(marketing);
      } catch (error) {
        return res.status(404).json({
          success: false,
        });
      }
    case "PUT":
      try {
        let marketing;
        const marketingIds = await Marketing.find({});
        if (marketingIds.length > 0) {
          const id = marketingIds[0]?._id;
          marketing = await Marketing.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
          });
        } else {
          marketing = await Marketing.create(req.body);
        }

        return res.status(200).json({
          success: true,
          data: marketing,
        });
      } catch (error) {
        console.log(error);
        return res.status(400).json({
          success: false,
          error: error,
        });
      }
    default:
      res.setHeaders("Allow", ["GET", "PUT"]);
      return res
        .status(405)
        .json({ success: false })
        .end(`Method ${method} Not Allowed`);
  }
};
