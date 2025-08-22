import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/app/context/Auth";
import React from "react";
import { Blog } from "../../../../types";

export default function BlogCard(blog: Blog | any) {
  const auth = useAuth();

  // Normalize fields for both blog types
  const title = blog.title || blog.name || "";
  const slug = blog.slug || blog.permalink || "";
  // Use featuredImage if it's a new blog; otherwise, use thumbnailImage
  const image = blog.isNewBlog
    ? (() => {
        const base = "https://api.zextons.co.uk/uploads//";
        const fi: string = blog.featuredImage || "";
        if (!fi) return "";
        return fi.startsWith(base) ? fi : `${base}${fi.replace(/^\/+/, "")}`;
      })()
    : blog.thumbnailImage
    ? `${auth.ip}${blog.thumbnailImage}`
    : ""; // Fallback to empty string if no image is provided

  const alt = blog.blogthumbnailImageAlt || blog.title || blog.name || "Blog Image";
  
  let category = blog.blogCategory || "";
  
  // Check categories and get the first category name
  if (blog.categories && Array.isArray(blog.categories) && blog.categories.length > 0) {
    const cat = blog.categories[0];
    if (cat && typeof cat === "object" && cat.name) {
      category = cat.name;
    } else if (typeof cat === "string") {
      category = cat;
    }
  }
  
  const publishDate = blog.publishDate || blog.blogpublisheddate || blog.createdAt;

  return (
    <div
      key={blog._id}
      className="embla__slide flex-[0_0_100%] md:flex-[0_0_33.33%] px-1.5"
    >
      <div className="rounded-lg overflow-hidden hover:shadow-lg border hover:border-primary">
        <div className="relative w-full h-60">
          <Link href={blog.isNewBlog ? `/blogs/new/${slug}` : `/blogs/${slug}`}>
            <Image
              className="object-cover"
              src={image || "/default-image.jpg"} // Provide a default image if none is available
              alt={alt}
              loading="lazy"
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            />
          </Link>
          {category && (
            <div className="absolute bottom-0 left-0 bg-primary px-4 py-2 text-white text-sm hover:bg-white hover:text-primary transition duration-500">
              {category}
            </div>
          )}
        </div>
        <div className="pt-4 pb-2">
          <div className="min-h-36">
            <Link href={blog.isNewBlog ? `/blogs/new/${slug}` : `/blogs/${slug}`}>
              <p className="font-semibold text-lg text-start inline-block hover:text-primary transition duration-500 px-2 mb-5 line-clamp-2">
                {title}
              </p>
            </Link>
            <Link href={blog.isNewBlog ? `/blogs/new/${slug}` : `/blogs/${slug}`}>
              <p className="text-start my-5 ms-2 text-primary text-sm font-medium">
                Continue Reading
              </p>
            </Link>
          </div>
          <p className="text-start mt-2 p-2 text-gray-900 text-sm border-t">
            {publishDate ? new Date(publishDate).toLocaleDateString('en-GB') : ""}
          </p>
        </div>
      </div>
    </div>
  );
}
