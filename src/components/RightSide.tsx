import { useState, useEffect } from "react";
import { Button, Dialog, Grid } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import AddBoxIcon from "@mui/icons-material/AddBox";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { AddReviews, DeleteAllReviews, GetGenericReviews } from "../utils/API";
import { Get10RandomNumberInRange } from "../utils/Common";
import { GenericReview, Review } from "../utils/Types";
import { v4 as uuid } from "uuid";
const reviewsAddFromFile = require("../utils/ReviewsAdd.json");

interface RightSideProps {
  data: Review[];
}
export default function RightSide(props: RightSideProps) {
  // Int variable indicates number of all current reviews in DataBase
  const [numberOfReviews, setNumberOfReviws] = useState(0);

  // Boolean variable indicates if Dialog for Help is True/False
  const [dialogHelpOpen, setDialogHelpOpen] = useState(false);

  useEffect(() => {
    setNumberOfReviws(props.data.length);
  }, [props.data, numberOfReviews]);

  function handleCloseHelpDialog() {
    setDialogHelpOpen(false);
  }

  async function handlAdd10GenericReviews() {
    var genericReviews = await GetGenericReviews();
    var tenRandomNumbersInRangeOfGenericList = Get10RandomNumberInRange(
      genericReviews.length
    );
    await AddReviews(
      getReviewsForUpload(genericReviews, tenRandomNumbersInRangeOfGenericList)
    );
  }

  function getReviewsForUpload(
    genericReviews: GenericReview[],
    tenRandomNumbersInRangeOfGenericList: number[]
  ) {
    var reviewsForUpload: Review[] = [];
    tenRandomNumbersInRangeOfGenericList.forEach(function (value, _) {
      var review: Review = {
        id: uuid(),
        title: genericReviews[value].genericTitle,
        content: genericReviews[value].genericContent,
        createdAt: Date().toLocaleString(),
      };
      reviewsForUpload.push(review);
    });

    return reviewsForUpload;
  }

  function getIdOfAllReviewsForDelete() {
    var ids: string[] = [];
    props.data.forEach(function (value, _) {
      ids.push(value.id);
    });
    return ids;
  }

  async function handleDeleteAllReviews() {
    await DeleteAllReviews(getIdOfAllReviewsForDelete());
    window.location.reload();
  }
  async function handleImportFromFile() {
    var reviewsForUpload: Review[] = [];
    reviewsAddFromFile.reviews.forEach(function (value: {
      title: string;
      content: string;
    }) {
      var review: Review = {
        id: uuid(),
        title: value.title,
        content: value.content,
        createdAt: Date().toLocaleString(),
      };
      reviewsForUpload.push(review);
    });
    await AddReviews(reviewsForUpload);
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "30%",
        backgroundColor: "white",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          // backgroundColor: "white",
          justifyContent: "center",
        }}
      >
        <h2
          style={{
            marginRight: ".5rem",
            color: "red",
          }}
        >
          {numberOfReviews}
        </h2>
        <h2> app reviews </h2>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Button
          style={{ textTransform: "none" }}
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          onClick={() => setDialogHelpOpen(true)}
        >
          <HelpOutlineIcon style={{ marginRight: ".5rem" }} />
          Learn how to add reviews
        </Button>
        <br />
        <Button
          style={{ textTransform: "none" }}
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          onClick={handleImportFromFile}
        >
          <InsertDriveFileIcon style={{ marginRight: ".5rem" }} />
          Import from file
        </Button>
        <br />
        <Button
          style={{ textTransform: "none" }}
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          onClick={handlAdd10GenericReviews}
        >
          <AddBoxIcon style={{ marginRight: ".5rem" }} />
          +10 generic reviews
        </Button>
        <br />
        <br />
        <Button
          style={{ textTransform: "none" }}
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          onClick={handleDeleteAllReviews}
        >
          <HighlightOffIcon style={{ marginRight: ".5rem" }} />
          <p style={{ color: "red" }}>
            <b>Clear all reviews</b>
          </p>
        </Button>
        <br />
        <br />
        <br />
        <Button
          style={{ textTransform: "none" }}
          color="secondary"
          size="large"
          type="submit"
          variant="contained"
        >
          Save
        </Button>
      </div>
      <Dialog
        fullScreen={false}
        open={dialogHelpOpen}
        onClose={handleCloseHelpDialog}
      >
        <div style={{ margin: "20px" }}>
          <p>
            In order to <b>add</b> reviews there are 3 main ways
          </p>
          <ul>
            <li>
              Simply enter a new review and hit the <b>BIG RED button</b>
            </li>
            <li>
              <p>
                Use JsonFile 'ReviewsAdd.Json' file at root directory.
                <br />
                {/* Should be a valid Json file, with 'title' and 'content' fields
                only per each reaview */}
                <b>hit Import from file!</b>
              </p>
            </li>
            <li>
              <p>
                Use <b>+10 generic reviews</b> button{" "}
              </p>
            </li>
          </ul>
          <p>
            <b>
              Note - In order to commit DataBase changes done by the right
              panel, must hit Save button
            </b>
          </p>
        </div>
      </Dialog>
    </div>
  );
}
