import Artist from "../../../../db/models/Artist";
import "../../../../utils/dbConnect";

export default async (req, res) => {
	const {
		query: { PublicAddress },
		method,
	} = req;

	switch (method) {
		case "GET":
			try {
				
				const artist = await Artist.findOne({PublicAddress :PublicAddress});
			
					if(artist==null)
					{
						const artists = await Artist.create({PublicAddress :PublicAddress,ArtistName:"Bitxmi Hey"});
						return res.status(200).json(
							[artists]
						);
					}else{
						return res.status(200).json(
							[artist]
						);
					}
			
			} catch (error) {
				return res.status(404).json({
					success: false,
					error: error
				});
			}
		case "PUT":
			try {
				const artist = await Artist.findByIdAndUpdate(id, req.body, {
					new: true,
					runValidators: true,
				});

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
