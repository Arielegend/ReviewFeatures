/*
Shuffling an array with N elements,
returning an Array of 10 elemnts, in range of (0, N-1) 
*/
export function Get10RandomNumberInRange(maxNumber: number) {
  const arrayHelper = Array.from(Array(maxNumber).keys()).sort(
    () => Math.random() - 0.5
  );
  return arrayHelper.slice(0, 10);
}

/*
Validating content and title had been supplied
*/
export function ValidateNewReview(title: string, content: string) {
  var titleAndContentMissing = "Title and content are missing...";
  var contentMissing = "Content is missing...";
  var titleMissing = "Title is missing...";

  if (title.length > 0 && content.length > 0) {
    return true;
  } else if (title.length === 0 && content.length === 0)
    alert(titleAndContentMissing);
  else if (title.length === 0 && content.length !== 0) alert(titleMissing);
  else if (title.length !== 0 && content.length === 0) alert(contentMissing);
}
