import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { OutlinedCard } from "./Card";
import { Grid } from "@mui/material";
import { useEffect } from "react";
import { Review } from "../utils/Types";
import { InsertNewReview } from "./InsertReviewCard";

interface LeftSideProps {
  data: Review[] | undefined;
}

export default function LeftSide(props: LeftSideProps) {
  return (
    <div>
      {" "}
      <div
      // style={{ display: "flex", justifyContent: "flex-start", width: "100%" }}
      >
        <InsertNewReview />
      </div>
      <br />
      <div style={{ width: "80%" }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {props && props.data ? (
            props.data.map((review, index) => (
              <Grid item xs={12} sm={12} md={10}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <OutlinedCard review={review} />
                </div>
              </Grid>
            ))
          ) : (
            <></>
          )}
        </Grid>
      </div>
    </div>
  );
}
