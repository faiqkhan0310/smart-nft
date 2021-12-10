import Item from "../../../../db/models/Item";
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
        const totalRecord = await Item.countDocuments(searchQuery);
        const items = await Item.find(searchQuery).sort({
          createdAt: "desc",
        }).limit(limit).skip(skip);;
        return res.status(200).json({
          items,
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
          const totalRecord = await Item.countDocuments();
          const items = await Item.find().sort({
            createdAt: "desc",
          }).limit(limit).skip(skip);
         
          return res.status(200).json({
            items,
            totalRecord
          });
        }else{
        const items = await Item.create(req.body);
        return res.status(201).json(
          items
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
