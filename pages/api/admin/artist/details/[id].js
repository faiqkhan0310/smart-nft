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
                console.log("ID", id);
                const artist = await Artist.findOne({ _id: id });
                return res.status(200).json(artist);
            } catch (error) {
                return res.status(404).json({
                    success: false,
                    error: error
                });
            }
        default:
            res.setHeaders("Allow", ["GET"]);
            return res
                .status(405)
                .json({ success: false })
                .end(`Method ${method} Not Allowed`);
    }
};
