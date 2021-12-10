import Training from "../../../../db/models/Training";
import "../../../../utils/dbConnect";

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        //   const {currentPage,search,Auctioned} =req.query
        //   var searchQuery = {};
        //   if(search !== ''){
        //     searchQuery.name=search
        //   }

        //   if(Auctioned &&(Auctioned ==='true' || Auctioned ==='false')){
        //  searchQuery.Auctioned= Auctioned ==='true'?true:false;
        //   }
        //   var limit = 10;
        //   var skip = (parseInt(currentPage)-1) * parseInt(limit);
        //   const totalRecord = await Training.countDocuments(searchQuery);
        const trainings = await Training.find().sort({
          createdAt: "desc",
        });
        return res.status(200).json({
          trainings,
        });
      } catch (error) {
        return res.status(400).json({
          success: false,
        });
      }
    case "POST":
      try {
        const trainings = await Training.create(req.body);
        console.log("Request", req.body);
        return res.status(201).json(trainings);
      } catch (error) {
        console.log(error);
        return res.status(400).json({
          success: false,
        });
      }

    case "PUT":
      try {
        const training = await Training.findOneAndUpdate(
          { id: req.body._id },
          req.body,
          {
            new: true,
            runValidators: true,
          }
        );

        return res.status(200).json({
          success: true,
          data: training,
        });
      } catch (error) {
        return res.status(400).json({
          success: false,
        });
      }
    default:
      res.setHeaders("Allow", ["GET", "POST", "PUT"]);
      return res
        .status(405)
        .json({ success: false })
        .end(`Method ${method} Not Allowed`);
  }
};
