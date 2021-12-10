import "../../../utils/dbConnect";
import Landing from "../../../db/models/Landing/Landing";

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const landing = await Landing.find({});
        return res.status(200).json(landing);
      } catch (error) {
        return res.status(404).json({
          success: false,
        });
      }
    case "PUT":
      try {
          let landing;
        const landingIds = await Landing.find({});
        if (landingIds.length > 0) {
            const id = landingIds[0]?._id;
            landing = await Landing.findByIdAndUpdate(id, req.body, {
              new: true,
              runValidators: true,
            });
        } else {
            landing = await Landing.create(req.body);
        }

        return res.status(200).json({
          success: true,
          data: landing,
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
