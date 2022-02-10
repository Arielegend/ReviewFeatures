import axios from "axios";
import { Review } from "./Types";

const pathToReview = "http://localhost:9000/reviews";

/*
This function creates GET request, with given token, to fetch reviews
*/
export async function GetReviews() {
  const response = await axios.get(pathToReview);

  if (response.status === 200) return response.data;
  return [];
}

/*
This function creates delete request, with id
*/
export async function DeleteReviewById(id: string) {
  const _pathToSecret = pathToReview + "/" + id;
  console.log("this is _pathToSecret -> ", _pathToSecret);
  await fetch(_pathToSecret, {
    method: "DELETE",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  });
  window.location.reload();
}

export async function addReview(newReview: Review) {
  await fetch(pathToReview, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(newReview),
  });

  window.location.reload();
}
