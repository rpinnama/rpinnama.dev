import type { CollectionEntry } from "astro:content";
import { slugifyStr } from "./slugify";

export interface Tag {
  tag: string;
  tagName: string;
  count?: number;
}

// Define a generic type for content items that have the necessary properties
interface ContentItem {
  data: {
    draft?: boolean;
    tags: string[];
  };
}

// Helper function to check if item is a draft
const filterDrafts = <T extends ContentItem>(item: T): boolean => !item.data.draft;

// Get unique tags from a collection of posts or projects
const getUniqueTags = <T extends ContentItem>(items: T[]): Tag[] => {
  const tags: Tag[] = items
    .filter(filterDrafts)
    .flatMap(item => item.data.tags)
    .map(tag => ({ tag: slugifyStr(tag), tagName: tag }))
    .filter(
      (value, index, self) =>
        self.findIndex(tag => tag.tag === value.tag) === index
    )
    .sort((tagA, tagB) => tagA.tag.localeCompare(tagB.tag));
  return tags;
};

// Get unique tags from combined posts and projects
export const getCombinedTags = (
  posts: CollectionEntry<"blog">[], 
  projects: CollectionEntry<"projects">[]
): Tag[] => {
  // Get all tags from both collections
  const allItems: ContentItem[] = [...posts, ...projects];
  
  // Count occurrences of each tag
  const tagCounts = allItems
    .filter(filterDrafts)
    .flatMap(item => item.data.tags)
    .reduce<Record<string, number>>((acc, tag) => {
      const slugTag = slugifyStr(tag);
      acc[slugTag] = (acc[slugTag] || 0) + 1;
      return acc;
    }, {});
  
  // Create unique tag objects with counts
  const tags: Tag[] = Object.entries(tagCounts).map(([tag, count]) => {
    // Find the original tag name (preserving case)
    const originalTag = allItems
      .filter(filterDrafts)
      .flatMap(item => item.data.tags)
      .find((t: string) => slugifyStr(t) === tag) || tag;
      
    return { 
      tag, 
      tagName: originalTag,
      count 
    };
  }).sort((a, b) => a.tag.localeCompare(b.tag));
  
  return tags;
};

export default getUniqueTags;
