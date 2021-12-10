/*eslint-disable*/

import { useCurrentUser } from "@/hooks/index";
import { Link } from "next/link";
import { router } from "next/router";
import { DashboardComponent } from "../../components/dashboard-component/DashboardComponent";
import { Navbar } from "../../components/layout/Navbar";

export default function Dashboard({
  totalArtists,
  totalArts,
  totalSaleAmount,
  totalAdminAddress,
  barChartData,
  lineChartData,
  props
}) {
  return (
    <>
      <Navbar
      DashboardActive="active"
       />
      <div className="app-content">
        <DashboardComponent
          totalArtists={totalArtists}
          totalArts={totalArts}
          totalSaleAmount={totalSaleAmount}
          totalAdminAddress={totalAdminAddress}
          barChartData={barChartData}
          lineChartData={lineChartData}
        />
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const url = `${process.env.BASE_URl}/api/admin/dashboard`;
  const res = await fetch(url);
  // const resj = await res.json();
  // console.log("!!!!!");
  // console.log(resj);
  const {
    totalArtists,
    totalArts,
    totalSaleAmount,
    totalAdminAddress,
    barChart,
    lineChart,
  } = await res.json();
  let barChartData = { data: [], labels: [] };
  let lineChartData = { saleData: [], mintData: [], lables: [] };
  if (barChart?.length > 0) {
    barChart?.forEach((item) => {
      barChartData.data.push(item.count);
      barChartData.labels.push(item._id);
    });
  }
  if (lineChart?.length > 0) {
    lineChart.forEach((item) => {
      if (item.onSale) {
        lineChartData.mintData.push(item.count);
      }
      if (!item.onSale) {
        lineChartData.saleData.push(item.count);
      }
      let findMonth = lineChartData.lables.find((ele) => ele == item.month);
      if (!findMonth) {
        lineChartData.lables.push(item.month);
      }
    });
  }
  return {
    props: {
      totalArtists,
      totalArts,
      totalSaleAmount,
      totalAdminAddress,
      barChartData,
      lineChartData,
    },
  };
}
