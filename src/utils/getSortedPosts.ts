// Define a generic type for content items that have the necessary properties
interface ContentItem {
  data: {
    draft?: boolean;
    modDatetime?: Date | null;
    pubDatetime: Date;
  };
}

// Helper function to check if item is a draft
const filterDrafts = <T extends ContentItem>(item: T): boolean => !item.data.draft;

// Generic function to sort posts or projects by date
const getSortedPosts = <T extends ContentItem>(items: T[]): T[] => {
  return items
    .filter(filterDrafts)
    .sort(
      (a, b) =>
        Math.floor(
          new Date(b.data.modDatetime ?? b.data.pubDatetime).getTime() / 1000
        ) -
        Math.floor(
          new Date(a.data.modDatetime ?? a.data.pubDatetime).getTime() / 1000
        )
    );
};

export default getSortedPosts;
