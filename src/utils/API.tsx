import axios from "axios";
import { GenericReview, Review } from "./Types";

const pathToReviews = "http://localhost:9000/reviews";
const pathToGenericReview = "http://localhost:9000/genericReviews";

/*
This function creates GET request, to fetch all reviews
*/
export async function GetReviews() {
  const response = await axios.get(pathToReviews);

  if (response.status === 200) return response.data;
  return [];
}

/*
This function creates delete request, with id
*/
export async function DeleteReviewById(id: string, batch = false) {
  const pathToReview = pathToReviews + "/" + id;
  await fetch(pathToReview, {
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
  if (!batch) window.location.reload();
}

/*
This function creates delete all Reviews
*/
export async function DeleteAllReviews(idArray: string[]) {
  for (var i = 0; i < idArray.length; i++) {
    await DeleteReviewById(idArray[i], true);
  }

  window.location.reload();
}

export async function AddReview(newReview: Review) {
  await fetch(pathToReviews, {
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

export async function AddReviews(newReviews: Review[]) {
  console.log("AddReviewsAddReviewsAddReviewsAddReviews -> ", newReviews);
  for (var i = 0; i < newReviews.length; i++) {
    await fetch(pathToReviews, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(newReviews[i]),
    });
  }

  window.location.reload();
}

/*
This function creates GET request, with given token, to fetch all generic reviews, then randomly return 10 
generic reviews
*/
export async function GetGenericReviews() {
  const response = await axios.get(pathToGenericReview);
  if (response.status === 200) {
    return response.data as GenericReview[];
  }
  return [];
}
