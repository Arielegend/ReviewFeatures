import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { FC, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { Review } from "../utils/Types";
import GetActualCard from "../utils/GetSimpleCard";
import { DeleteReviewById } from "../utils/API";

interface OutlinedCardProps {
  review: Review;
}

export const ReviewCard: FC<OutlinedCardProps> = (props) => {
  const [onHover, setOnHover] = useState(false);

  function handleDelete() {
    DeleteReviewById(props.review.id);
  }

  // Helper function.
  // Returns a cards based on weather it is being hover on or not.
  // In case it is being hovered -> Adding ClearIcon to the card
  function getCard() {
    if (onHover) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <ClearIcon onClick={handleDelete} />
          {GetActualCard(props.review.title, props.review.content)}
        </div>
      );
    } else {
      return (
        <div>{GetActualCard(props.review.title, props.review.content)}</div>
      );
    }
  }

  return (
    <Box sx={{ minWidth: 100 }}>
      <Card
        sx={{ backgroundColor: "#B9B7B7" }}
        variant="outlined"
        onMouseEnter={() => setOnHover(true)}
        onMouseLeave={() => setOnHover(false)}
      >
        {getCard()}
      </Card>
    </Box>
  );
};
