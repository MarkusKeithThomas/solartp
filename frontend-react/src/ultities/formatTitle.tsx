export function formatTitle(title: string) {
  if (title.length > 60) {
    return title.substring(0, 60) + "...";
  } else {
    return title;
  }
}