---
title: How to Add Projects with Custom Thumbnails
author: Ravi Pinnamaneni
pubDatetime: 2025-06-19T13:50:00-05:00
description: A guide on how to create new projects and add custom thumbnail images to your AstroPaper-based portfolio
tags:
  - guide
  - documentation
  - astro
thumbnail: ../../assets/images/AstroPaper-v5.png
---

# How to Add Projects with Custom Thumbnails

This guide explains how to add new projects to your portfolio website and include custom thumbnail images that display correctly both in the projects listing and individual project pages.

## Step 1: Create a New Project Markdown File

Create a new `.md` file in the `src/data/projects/` directory. Name it using kebab-case, for example: `my-awesome-project.md`.

## Step 2: Add Project Frontmatter

At the top of your markdown file, include the following frontmatter:

```markdown
---
title: Your Project Title
author: Your Name
pubDatetime: YYYY-MM-DDThh:mm:ss-TZ:00
description: A brief description of your project
tags:
  - tag1
  - tag2
  - tag3
thumbnail: ../../assets/images/your-image-filename.png
---
```

## Step 3: Add Your Thumbnail Image

1. Place your thumbnail image in the `src/assets/images/` directory
2. Make sure the image is optimized for web (recommended size: 800x400px)
3. In your project frontmatter, reference the image using the relative path: `../../assets/images/your-image-filename.png`

## Step 4: Update the ProjectCard Component

For the thumbnail to display correctly in the projects listing, you need to update the `thumbnailMap` in the `ProjectCard.astro` component:

```astro
// Map project IDs to their respective thumbnails
const thumbnailMap = {
  "sample-project": sampleThumbnail,
  "portfolio-website": astroPaperV3,
  "your-project-id": yourImportedImage, // Add your project here
};
```

Don't forget to also import your image at the top of the file:

```astro
import yourImportedImage from "@/assets/images/your-image-filename.png";
```

## Step 5: Add Project Content

Below the frontmatter, add your project content using Markdown:

```markdown
# Project Title

Project description and details...

## Features

- Feature 1
- Feature 2
- Feature 3

## Technologies Used

- Technology 1
- Technology 2
- Technology 3

## Links

- [GitHub Repository](https://github.com/username/repo)
- [Live Demo](https://demo-link.com)
```

## Best Practices

- Use high-quality, optimized images for thumbnails
- Keep image file sizes under 200KB if possible
- Use descriptive filenames for your images
- Always include alt text in your markdown for accessibility
- Test both list and grid views to ensure your thumbnails look good in both formats

By following these steps, you'll be able to add new projects with custom thumbnails that display correctly throughout your portfolio website.
