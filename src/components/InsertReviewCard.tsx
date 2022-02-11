import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import { FC, useState } from "react";
import Button from "@mui/material/Button";
import { AddReview } from "../utils/API";
import { v4 as uuid } from "uuid";
import { ValidateNewReview } from "../utils/Common";

export const InsertNewReview: FC = (props) => {
  // Boolean Indicates of user started typing in the Title inputField
  const [dirtyTitle, setDirtyTitle] = useState(false);

  // this variable will hold the new Title
  const [title, setTitle] = useState("");

  // this variable will hold the new Title length
  const [titleLength, setTitleLength] = useState("0/255");

  // this variable will hold the new Title
  const [content, setContent] = useState("");

  // Once starting typing to the title
  // Need to disable the label and count number of characters entered...
  function handleChangeTitle(newTitle: string) {
    if (newTitle.length === 0) {
      setDirtyTitle(false);
      setTitle("");
      setTitleLength("0/255");
    } else {
      setDirtyTitle(true);
      if (newTitle.length > 255) {
        alert("Reviews titles can be up to 125 characters");
      } else {
        setTitle(newTitle);
        setTitleLength(newTitle.length + "/255");
      }
    }
  }

  function handleSubmit() {
    if (ValidateNewReview(title, content)) {
      AddReview({
        id: uuid(),
        title: title,
        content: content,
        createdAt: Date().toLocaleString(),
      });
    }
  }

  // Helper variable.
  // titlePart -> Consists of title TextInput and counter of title Text
  const titlePart = (
    <div>
      {!dirtyTitle ? (
        <label>
          <b>Enter a review</b>
        </label>
      ) : (
        <></>
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        {" "}
        <TextField
          variant="standard"
          onChange={(e) => handleChangeTitle(e.target.value)}
          fullWidth
          helperText="Title"
        />
        <TextField variant="standard" value={titleLength} />
      </div>
    </div>
  );

  // Helper variable.
  // contentPart -> Consists of content TextInput and Add Button
  const contentPart = (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <TextField
        variant="standard"
        // rows="3"
        // size="small"
        fullWidth
        value={content}
        onChange={(e) => setContent(e.target.value)}
        helperText="Content"
      />
      <Button
        variant="contained"
        size="small"
        color="error"
        onClick={handleSubmit}
      >
        Add
      </Button>
    </div>
  );

  // Helper variable.
  // completecard -> Consists of all the InsertNewRevew Card parts...
  const completecard = (
    <React.Fragment>
      <CardContent>
        {titlePart}
        <br />
        <br />
        {contentPart}
      </CardContent>
      <CardActions></CardActions>
    </React.Fragment>
  );

  return (
    <Box sx={{ minWidth: 100, cursor: "default" }}>
      <Card sx={{ backgroundColor: "#B9B7B7" }} variant="outlined">
        {completecard}
      </Card>
    </Box>
  );
};
