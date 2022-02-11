import * as React from "react";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

/*
Returns a simple card, based on title and content
*/
export default function GetActualCard(title: string, content: string) {
  return (
    <React.Fragment>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2"> {content}</Typography>
      </CardContent>
      <CardActions></CardActions>
    </React.Fragment>
  );
}
