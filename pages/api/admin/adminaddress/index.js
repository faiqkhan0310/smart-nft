import AdminAddress from "../../../../db/models/AdminAddress";
import "../../../../utils/dbConnect";

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const adminAddresss = await AdminAddress.find({}).sort({
          createdAt: "desc",
        });

        return res.status(200).json(adminAddresss);
      } catch (error) {
        return res.status(400).json({
          success: false,
        });
      }
    case "POST":
      try {
        const adminAddresss = await AdminAddress.create(req.body);

        return res.status(201).json(adminAddresss);
      } catch (error) {
        return res.status(400).json({
          success: false,
        });
      }
    case "DELETE":
      try {
        await AdminAddress.deleteOne({ _id: req.body._id });
        return res.status(200).json({ status: true });
      } catch (error) {
        return res.status(400).json({ success: false });
      }
    default:
      res.setHeaders("Allow", ["GET", "POST", "DELETE"]);
      return res
        .status(405)
        .json({ success: false })
        .end(`Method ${method} Not Allowed`);
  }
};
