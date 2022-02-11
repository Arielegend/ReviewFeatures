import React, { useEffect, useState, FC } from "react";
import { GetGenericReviews, GetReviews } from "../utils/API";
import { GenericReview, Review } from "../utils/Types";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";

// Dashboard component hold the entire App.
// At the uploading of App, while server is up, showing 'Loading' screen
// Once data is fetch, we display ->
//                                   LeftSide   - List of review
//                                   RightSide  - Cntrol panel
export const Dashboard: FC = () => {
  // Variable to hold all reviews in the system
  const [reviews, setReviews] = useState<Review[]>();

  // Variable to hold all reviews in the system
  const [genericReviews, setGenericReviews] = useState<GenericReview[]>();

  // At the begining, we fetch all reviews and genericReviews stored in Database
  // genericReviews -> Pre made and ready to deploy reviews located at db.json!
  useEffect(() => {
    async function fetchData() {
      const dataReviews: Review[] = await GetReviews();
      const dataGenericReviews: GenericReview[] = await GetGenericReviews();
      setReviews(dataReviews);
      setGenericReviews(dataGenericReviews);
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>Reviews</h1>
      {/* In case data is null, showing Loading */}
      {reviews && genericReviews ? (
        <div
          className="mainRow"
          style={{
            display: "flex",
            flexDirection: "row",
            backgroundColor: "#6D6C6C",
          }}
        >
          <LeftSide data={reviews} />
          <RightSide data={reviews} genericData={genericReviews} />
        </div>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
};
