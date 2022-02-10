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

export const OutlinedCard: FC<OutlinedCardProps> = (props) => {
  const [onHover, setOnHover] = useState(false);

  function handleDelete() {
    console.log("Deleting ", props.review.id);
    DeleteReviewById(props.review.id);
  }

  function GetCard() {
    if (onHover) {
      return (
        <div>
          <ClearIcon

            //style={{ position: "relative", display: "inlineflex" }}
            onClick={handleDelete}
          />
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
        {GetCard()}
      </Card>
    </Box>
  );
};
