import React, { useEffect, useState, FC } from "react";
import axios from "axios";
import { GetReviews } from "../utils/API";
import { Review } from "../utils/Types";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";

interface DashboardProps {}

export const Dashboard: FC<DashboardProps> = (props) => {
  const [data, setData] = useState<Review[]>();

  useEffect(() => {
    async function fetchReviews() {
      const data: Review[] = await GetReviews();
      setData(data);
    }

    fetchReviews();
  }, []);

  return (
    <div>
      <h1>Reviews</h1>

      {data ? (
        <div
          className="mainRow"
          style={{
            display: "flex",
            flexDirection: "row",
            backgroundColor: "#6D6C6C",
          }}
        >
          <LeftSide data={data} />
          <RightSide />
        </div>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
};
