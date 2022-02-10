import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import { FC, useState } from "react";
import Button from "@mui/material/Button";
import { addReview, DeleteReviewById } from "../utils/API";
import { v4 as uuid } from "uuid";

export const InsertNewReview: FC = (props) => {
  // Boolean Indicates of user started typing in the Title inputField
  const [dirtyTitle, setDirtyTitle] = useState(false);

  // this variable will hold the new Title
  const [title, setTitle] = useState("");

  // this variable will hold the new Title length
  const [titleLength, setTitleLength] = useState("0/255");

  // this variable will hold the new Title
  const [content, setContent] = useState("");

  function handleChangeTitle(newTitle: string) {
    if (newTitle.length == 0) {
      setDirtyTitle(false);
      setTitle("");
      setTitleLength("0/255");
    } else {
      setDirtyTitle(true);
      if (newTitle.length > 125) {
        alert("Messages titles can be up to 125 characters");
      } else {
        setTitle(newTitle);
        setTitleLength(newTitle.length + "/" + "255");
      }
    }
  }

  function handleSubmit() {
    const id: string = uuid();
    addReview({
      id: id,
      title: title,
      content: content,
      createdAt: Date().toLocaleString(),
    });
  }

  const card = (
    <React.Fragment>
      <CardContent>
        <div>
          {!dirtyTitle ? <label>Enter review..</label> : <></>}

          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            {" "}
            <TextField
              id="standard-basic"
              variant="standard"
              onChange={(e) => handleChangeTitle(e.target.value)}
              value={title}
              fullWidth
            />
            <TextField
              id="standard-basic"
              variant="standard"
              value={titleLength}
            />
          </div>
        </div>

        <br />
        <br />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <TextField
            variant="standard"
            rows="3"
            size="medium"
            fullWidth
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Button
            variant="contained"
            size="small"
            color="primary"
            onClick={handleSubmit}
          >
            Add
          </Button>
        </div>
      </CardContent>
      <CardActions></CardActions>
    </React.Fragment>
  );

  return (
    <Box sx={{ minWidth: 100 }}>
      <Card sx={{ backgroundColor: "#B9B7B7" }} variant="outlined">
        {card}
      </Card>
    </Box>
  );
};
