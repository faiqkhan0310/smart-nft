import Art from "../../../../db/models/Art";
import "../../../../utils/dbConnect";

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
       
        const {currentPage,search,Auctioned} =req.query
        var searchQuery = {};
        if(search !== ''){
          searchQuery.name=search
        }
     
        if(Auctioned &&(Auctioned ==='true' || Auctioned ==='false')){
       searchQuery.Auctioned= Auctioned ==='true'?true:false;
        }
        var limit = 10;
        var skip = (parseInt(currentPage)-1) * parseInt(limit);
        const totalRecord = await Art.countDocuments(searchQuery);
        const arts = await Art.find(searchQuery).sort({
          createdAt: "desc",
        }).limit(limit).skip(skip);;
        return res.status(200).json({
          arts,
          totalRecord
        });
      } catch (error) {
        return res.status(400).json({
          success: false,
        });
      }
    case "POST":
      try {
        if(req.body.currentPage){
          var limit = 10;
          var skip = (parseInt(req.body.currentPage)-1) * parseInt(limit);
          const totalRecord = await Art.countDocuments();
          const arts = await Art.find().sort({
            createdAt: "desc",
          }).limit(limit).skip(skip);
         
          return res.status(200).json({
            arts,
            totalRecord
          });
        }else{
        const arts = await Art.create(req.body);
        return res.status(201).json(
          arts
        );
      }
      } catch (error) {
        console.log(error);
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
