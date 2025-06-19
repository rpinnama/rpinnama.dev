import { slugifyStr } from "./slugify";

// Define a generic type for content items that have the necessary properties
interface ContentItem {
  data: {
    draft?: boolean;
    tags: string[];
  };
}

/**
 * Filter items by tag
 * @param items Collection of posts or projects
 * @param tag Tag to filter by
 * @returns Filtered collection of items
 */
const getItemsByTag = <T extends ContentItem>(items: T[], tag: string): T[] => {
  return items.filter(item => 
    !item.data.draft && 
    item.data.tags.some((t: string) => slugifyStr(t) === tag)
  );
};

export default getItemsByTag;
