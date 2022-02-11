import * as React from "react";
import { ReviewCard } from "./Card";
import { Grid, List } from "@mui/material";
import { Review } from "../utils/Types";
import { InsertNewReview } from "./InsertReviewCard";

interface LeftSideProps {
  data: Review[];
}

export default function LeftSide(props: LeftSideProps) {
  // At the return we Return 2 main elements ->
  //                                           1. InsertNewReview - Card for entering new Review
  //                                           2. Grid of OutlinedCard- Each card hold data on a review
  //                                              The data for rendering the cards come from props.data
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      {" "}
      <div>
        <InsertNewReview />
      </div>
      <br />
      <br />
      <div>
        <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
          <List style={{ maxHeight: 1000, overflow: "auto", width: "100%" }}>
            {" "}
            {props && props.data ? (
              props.data.map((review, index) => (
                <Grid item xs={12} sm={12} md={10} key={index}>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <ReviewCard review={review} />
                  </div>
                  <br />
                  <br />
                </Grid>
              ))
            ) : (
              <></>
            )}
          </List>
        </Grid>
      </div>
    </div>
  );
}
