import { useState, useEffect } from "react";
import { Button, Dialog } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import AddBoxIcon from "@mui/icons-material/AddBox";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { AddReviews, DeleteAllReviews } from "../utils/API";
import { Get10RandomNumberInRange } from "../utils/Common";
import { GenericReview, Review } from "../utils/Types";
import { v4 as uuid } from "uuid";
const reviewsAddFromFile = require("../utils/ReviewsAdd.json");

interface RightSideProps {
  data: Review[];
  genericData: GenericReview[];
}
export default function RightSide(props: RightSideProps) {
  // Int variable indicates number of all current reviews in DataBase
  const [numberOfReviews, setNumberOfReviews] = useState(0);

  // Boolean variable indicates if Dialog for Help is True/False
  const [dialogHelpOpen, setDialogHelpOpen] = useState(false);

  useEffect(() => {
    setNumberOfReviews(props.data.length);
  }, [props.data, numberOfReviews]);

  function handleCloseHelpDialog() {
    setDialogHelpOpen(false);
  }

  // Handle the Add 10 Generic Reviews command.
  // we choose randomly 10 Generic Reviews from our bank of generic reviews...
  async function handlAdd10GenericReviews() {
    if (props.genericData.length > 10) {
      // this variable holds an array of 10 number from 0 to the length of all Generic Reviews in the system.
      var tenRandomNumbersInRangeOfGenericList = Get10RandomNumberInRange(
        props.genericData.length
      );
      await AddReviews(
        getReviewsForUpload(
          props.genericData,
          tenRandomNumbersInRangeOfGenericList
        )
      );
    }
  }

  // Helper function.
  // Return array of Reviews for uploading
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

  // Helper function.
  // For Deletion, we gather all Id's
  function getIdOfAllReviewsForDelete() {
    var ids: string[] = [];
    props.data.forEach(function (value, _) {
      ids.push(value.id);
    });
    return ids;
  }

  // We wait for Deleting all cards by their Id
  // Then we refresh the page
  async function handleDeleteAllReviews() {
    await DeleteAllReviews(getIdOfAllReviewsForDelete());
    window.location.reload();
  }

  // This function handle the Import from file command.
  // We load the Json file located at 'src/utils/ReviewsAdd.json', and uploading them to the server.
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

  const learnButton = (
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
  );
  const importButton = (
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
  );
  const genericButton = (
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
  );
  const clearReviewsButton = (
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
  );
  const saveButton = (
    <Button
      style={{ textTransform: "none" }}
      color="secondary"
      size="large"
      type="submit"
      variant="contained"
    >
      Save
    </Button>
  );
  const dialogDiv = (
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
            Modify JsonFile 'ReviewsAdd.Json' file at src/utils directory.
            <br />
            <b>hit Import from file!</b>
          </p>
        </li>
        <li>
          <p>
            Use <b>+10 generic reviews</b> button <br />
            This command will load random 10 Generic reviews based on
            GenericReviews bank.
            <br />
            Moidy data/db.json and add as many GenericReviews as wanted to the
            system.
          </p>
        </li>
      </ul>
    </div>
  );
  const RightSidetitle = (
    <div
      style={{
        display: "flex",
        width: "100%",
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
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "50%",
        backgroundColor: "white",
        justifyContent: "center",
      }}
    >
      {RightSidetitle}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {learnButton}
        <br />
        {importButton}
        <br />
        {genericButton}
        <br />
        <br />
        {clearReviewsButton}
        <br />
        <br />
        <br />
        {saveButton}
      </div>
      <Dialog
        fullScreen={false}
        open={dialogHelpOpen}
        onClose={handleCloseHelpDialog}
      >
        {dialogDiv}
      </Dialog>
    </div>
  );
}
