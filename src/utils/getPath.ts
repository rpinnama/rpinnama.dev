import { BLOG_PATH } from "@/content.config";
import { slugifyStr } from "./slugify";

/**
 * Get full path of a content item (blog post or project)
 * @param id - id of the content item (aka slug)
 * @param filePath - the content item's full file location
 * @param includeBase - whether to include base path (`/posts` or `/projects`) in return value
 * @param collection - optional collection name to determine base path
 * @returns content item path
 */
export function getPath(
  id: string,
  filePath: string | undefined,
  includeBase = true,
  collection?: string
) {
  // Determine if this is a project or a blog post based on filePath or collection parameter
  const isProject = collection === "projects" || (filePath && filePath.includes("/projects/"));
  
  // Set the appropriate base path
  const basePath = includeBase ? (isProject ? "/projects" : "/posts") : "";
  
  // Skip path processing for projects - just use the ID directly
  if (isProject) {
    return `${basePath}/${id}`;
  }
  
  // Process blog posts as before
  const pathSegments = filePath
    ?.replace(BLOG_PATH, "")
    .split("/")
    .filter(path => path !== "") // remove empty string in the segments ["", "other-path"] <- empty string will be removed
    .filter(path => !path.startsWith("_")) // exclude directories start with underscore "_"
    .slice(0, -1) // remove the last segment_ file name_ since it's unnecessary
    .map(segment => slugifyStr(segment)); // slugify each segment path

  // Making sure `id` does not contain the directory
  const contentId = id.split("/");
  const slug = contentId.length > 0 ? contentId.slice(-1) : contentId;

  // If not inside the sub-dir, simply return the file path
  if (!pathSegments || pathSegments.length < 1) {
    return [basePath, slug].join("/");
  }

  return [basePath, ...pathSegments, slug].join("/");
}
