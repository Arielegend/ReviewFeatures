import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useState, useEffect } from "react";
import { Button, Grid } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import AddBoxIcon from "@mui/icons-material/AddBox";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

interface RightSideProps {
  numberOfRows: number;
}
export default function RightSide(props: RightSideProps) {
  const [numberOfReviews, setNumberOfReviws] = useState(0);
  const [title, setTitle] = useState("");

  useEffect(() => {
    setNumberOfReviws(props.numberOfRows);
  }, [props.numberOfRows, numberOfReviews]);
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
      {" "}
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
          // width: "100%",
          // justifyContent: "center",
        }}
      >
        <Button
          style={{ textTransform: "none" }}
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
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
    </div>

    // <React.Fragment>
    //   <CssBaseline />
    //   <Container>
    //     {/* <Box sx={{ bgcolor: "#cfe8fc", height: "50%", innerWidth: "100%" }} /> */}
    //   </Container>
    // </React.Fragment>
  );
}
