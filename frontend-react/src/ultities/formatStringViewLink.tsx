export function formatStringViewLink(title: string) {
    if (title.length > 30) {
      return title.substring(0, 30) + "...";
    } else {
      return title;
    }
  }