// Turn a string into a slug
// https://gist.github.com/codeguy/6684588#gistcomment-3243980
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

export function makeUUID(length:number) :string {
  let result = "";
  let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
      result += characters.charAt(
      Math.floor(Math.random() * charactersLength)
      );
  }
  return result;
}