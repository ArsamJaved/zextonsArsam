// Utility functions for blog components

export function getFullImageUrl(imagePath) {
  if (!imagePath) return "/placeholder-blog.jpg";
  if (imagePath.startsWith("http")) return imagePath;
  return `https://api.zextons.co.uk/uploads/${imagePath.replace("/uploads/", "")}`;
}
