/*eslint-disable*/
import Art from "../../../../db/models/Art";
import Artist from "../../../../db/models/Artist";
import AdminAddress from "../../../../db/models/AdminAddress";
import "../../../../utils/dbConnect";

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const totalArtists = await Artist.countDocuments();
        const barChart = await Artist.aggregate([
          {
            $group: {
              _id: {
                $month: "$createdAt",
              },
              count: {
                $sum: 1,
              },
            },
          },
          {
            $sort: {
              _id: 1,
            },
          },
          {
            $addFields: {
              _id: {
                $let: {
                  vars: {
                    monthsInString: [
                      "",
                      "Jan",
                      "Feb",
                      "Mar",
                      "Apr",
                      "May",
                      "Jun",
                      "Jul",
                      "Aug",
                      "Sep",
                      "Oct",
                      "Nov",
                      "Dec",
                    ],
                  },
                  in: {
                    $arrayElemAt: ["$$monthsInString", "$_id"],
                  },
                },
              },
            },
          },
        ]);
        const totalArts = await Art.countDocuments();
        const lineChart = await Art.aggregate([
          {
            $group: {
              _id: {
                date: {
                  $month: "$createdAt",
                },
                status: "$OnSale",
              },
              count: {
                $sum: 1,
              },
            },
          },
          {
            $sort: {
              "_id.date": 1,
            },
          },
          {
            $addFields: {
              "_id.date": {
                $let: {
                  vars: {
                    monthsInString: [
                      "",
                      "Jan",
                      "Feb",
                      "Mar",
                      "Apr",
                      "May",
                      "Jun",
                      "Jul",
                      "Aug",
                      "Sep",
                      "Oct",
                      "Nov",
                      "Dec",
                    ],
                  },
                  in: {
                    $arrayElemAt: ["$$monthsInString", "$_id.date"],
                  },
                },
              },
            },
          },
          {
            $project: {
              month: "$_id.date",
              onSale: "$_id.status",
              count: "$count",
            },
          },
        ]);
        const totalSaleAmount = await Art.aggregate([
          {
            $match: {
              OnSale: true,
            },
          },
          {
            $group: {
              _id: "$OnSale",
              total: {
                $sum: {
                  $toDouble: "$PriceBNB",
                },
              },
            },
          },
        ]);
        const totalAdminAddress = await AdminAddress.countDocuments();
        console.log("...");
        console.log(totalSaleAmount);
        return res.status(200).json({
          totalArtists,
          totalArts,
          totalSaleAmount: totalSaleAmount[0]?.total,
          totalAdminAddress,
          barChart,
          lineChart,
        });
      } catch (error) {
        console.log("dfdf");
        console.log(error);
        return res.status(400).json({
          success: false,
          error: error,
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
