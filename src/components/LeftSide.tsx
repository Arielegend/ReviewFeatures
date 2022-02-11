import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { OutlinedCard } from "./Card";
import { Grid, List } from "@mui/material";
import { useEffect } from "react";
import { Review } from "../utils/Types";
import { InsertNewReview } from "./InsertReviewCard";

interface LeftSideProps {
  data: Review[];
}

export default function LeftSide(props: LeftSideProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        // backgroundColor: "#6D6C6C",
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
        <Grid
          container
          // spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <List style={{ maxHeight: 1000, overflow: "auto", width: "100%" }}>
            {" "}
            {props && props.data ? (
              props.data.map((review, index) => (
                <Grid item xs={12} sm={12} md={10}>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <OutlinedCard review={review} />
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
