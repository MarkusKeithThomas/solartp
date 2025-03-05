export function formatTitle(title: string) {
  if (title.length > 50) {
    return title.substring(0, 50) + "...";
  } else {
    return title;
  }
}