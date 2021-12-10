import "../../../utils/dbConnect";
import Specifications from "../../../db/models/Landing/Specifications";

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const specifications = await Specifications.find({});
        return res.status(200).json(specifications);
      } catch (error) {
        return res.status(404).json({
          success: false,
        });
      }
    case "PUT":
      try {
        let specifications;
        const specificationsIds = await Specifications.find({});
        if (specificationsIds.length > 0) {
          const id = specificationsIds[0]?._id;
          specifications = await Specifications.findByIdAndUpdate(
            id,
            req.body,
            {
              new: true,
              runValidators: true,
            }
          );
        } else {
          specifications = await Specifications.create(req.body);
        }

        return res.status(200).json({
          success: true,
          data: specifications,
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
