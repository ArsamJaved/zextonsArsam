"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import PropTypes from "prop-types";
import TableOfContents from "../TableOfContents";
import TopBar from "@/app/topbar/page";
import Nav from "@/app/components/navbar/Nav";

import { getFullImageUrl } from "./blogUtils";

// Enhanced responsive CSS for blog content
const blogContentStyles = `
  /* Critical fixes for lists with paragraphs */
  .blog-content ul li p,
  .blog-content ol li p {
    display: inline !important;
    margin: 0 !important;
  }
  
  /* Critical fixes for tables - Enhanced for mobile */
  .blog-content table {
    display: table !important;
    width: 100% !important;
    table-layout: fixed !important;
    border-collapse: collapse !important;
    margin: 1.25rem 0 !important;
    border: 1px solid #e5e7eb !important;
    font-size: 0.875rem !important;
  }
  
  @media (max-width: 640px) {
    .blog-content table {
      font-size: 0.75rem !important;
      display: block !important;
      overflow-x: auto !important;
      white-space: nowrap !important;
    }
  }
  
  .blog-content table td,
  .blog-content table th {
    padding: 0.5rem !important;
    border: 1px solid #e5e7eb !important;
    vertical-align: top !important;
    word-break: break-word !important;
  }
  
  @media (max-width: 640px) {
    .blog-content table td,
    .blog-content table th {
      padding: 0.25rem !important;
      min-width: 80px !important;
    }
  }
  
  /* Critical fixes for lists */
  .blog-content ul,
  .blog-content ol {
    list-style-position: outside !important;
    margin: 1rem 0 !important;
    padding-left: 1.5rem !important;
  }
  
  @media (max-width: 640px) {
    .blog-content ul,
    .blog-content ol {
      padding-left: 1rem !important;
    }
  }
  
  .blog-content ul {
    list-style-type: disc !important;
  }
  
  .blog-content ol {
    list-style-type: decimal !important;
  }
  
  .blog-content li {
    display: list-item !important;
    margin: 0.375rem 0 !important;
  }
  
  /* Nested lists */
  .blog-content ul ul,
  .blog-content ol ol,
  .blog-content ul ol,
  .blog-content ol ul {
    margin: 0.25rem 0 !important;
  }
  
  /* Responsive images in content */
  .blog-content img {
    max-width: 100% !important;
    height: auto !important;
  }
  
  /* Responsive text */
  @media (max-width: 640px) {
    .blog-content {
      font-size: 0.875rem !important;
      line-height: 1.5 !important;
    }
    
    .blog-content h1,
    .blog-content h2,
    .blog-content h3,
    .blog-content h4,
    .blog-content h5,
    .blog-content h6 {
      font-size: 1.125rem !important;
      line-height: 1.4 !important;
      margin: 1rem 0 0.5rem 0 !important;
    }
  }
`;

// Format date
const formatDate = (dateString) => {
  if (!dateString) return "Not published";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Status badge
const StatusBadge = ({ status }) => {
  const statusStyles = {
    published: "bg-green-100 text-green-800",
    draft: "bg-yellow-100 text-yellow-800",
    archived: "bg-gray-100 text-gray-800",
  };
  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusStyles[status] || ""}`}>
      {status ? status.charAt(0).toUpperCase() + status.slice(1) : "Draft"}
    </span>
  );
};

StatusBadge.propTypes = {
  status: PropTypes.string,
};

// Blog Content Component
const BlogContent = ({ content }) => {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: blogContentStyles }} />
      <div
        className="prose prose-sm sm:prose-base lg:prose-lg max-w-none blog-content"
        style={{
          width: "100%",
          wordBreak: "break-word",
          overflowWrap: "break-word",
          overflowX: "auto",
          margin: 0,
          padding: "0 0 0 0",
        }}
        dangerouslySetInnerHTML={{ __html: content || "" }}
      />
    </>
  );
};

BlogContent.propTypes = {
  content: PropTypes.string,
};

// Main Client Component
export default function ClientBlogPage({ blog }) {
  const [showTOC, setShowTOC] = useState(false);
  const [isButtonFixed, setIsButtonFixed] = useState(false);

  // Scroll event listener for button positioning
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const triggerPoint = 300; // Adjust this value as needed
      setIsButtonFixed(scrollPosition > triggerPoint);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const contentBlockStyles = {
    width: "100%",
    wordWrap: "break-word",
    overflowWrap: "break-word",
  };

  const toggleTOC = () => {
    setShowTOC(!showTOC);
  };

  return (
    <>
      <TopBar />
      <Nav />
      
      <div className="min-h-screen bg-white relative">
        {/* TOC Toggle Button - Better positioned with scroll behavior */}
        <button
          onClick={toggleTOC}
          className={`xl:hidden bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105 z-50 ${
            isButtonFixed 
              ? 'fixed bottom-6 right-6 animate-pulse' 
              : 'absolute top-4 right-4'
          }`}
          style={{
            transform: isButtonFixed ? 'none' : 'none'
          }}
          aria-label="Toggle Table of Contents"
        >
          <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            {showTOC ? (
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12" 
              />
            ) : (
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 6h16M4 12h16M4 18h16" 
              />
            )}
          </svg>
        </button>

        {/* Mobile/Tablet TOC Overlay */}
        {showTOC && (
          <div className="fixed inset-0 z-40 xl:hidden">
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
              onClick={toggleTOC}
            ></div>
            
            {/* TOC Panel */}
            <div className="absolute left-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-xl transform transition-transform">
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Table of Contents</h3>
                <button
                  onClick={toggleTOC}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Close Table of Contents"
                >
                  <svg 
                    className="w-5 h-5 text-gray-500" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M6 18L18 6M6 6l12 12" 
                    />
                  </svg>
                </button>
              </div>
              <div className="p-4 overflow-y-auto h-full pb-20">
                <TableOfContents />
              </div>
            </div>
          </div>
        )}

        <main className="py-2 sm:py-5">
          <div className="container mx-auto py-4 sm:py-8 max-w-[1600px] px-4 sm:px-4">
            <div className="max-w-[1500px] mx-auto">
              {blog ? (
                <>
                  {/* Featured Image Banner - Responsive */}
                  {blog.bannerImage && (
                    <div className="w-full h-48 sm:h-56 md:h-64 lg:h-72 rounded-lg overflow-hidden bg-gray-100 mb-4 sm:mb-6 mx-2 sm:mx-0 relative">
                      <Image
                        src={getFullImageUrl(blog.bannerImage) || "/placeholder.svg"}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                        width={1200}
                        height={400}
                        priority
                      />
                    </div>
                  )}
                  
                  <div className="flex flex-col xl:flex-row gap-4 sm:gap-6 relative">
                    {/* Desktop TOC - Only visible on xl screens */}
                    <aside className="hidden xl:block w-72 min-w-[16rem] max-w-xs bg-white border border-gray-200 rounded-lg shadow p-4 h-fit sticky top-8 self-start">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Table of Contents</h3>
                      <TableOfContents />
                    </aside>
                    
                    {/* Blog Content - Responsive */}
                    <div id="blog-content" className="flex-1 mx-2 sm:mx-0 relative" style={contentBlockStyles}>
                      {/* Initial TOC Button Placeholder - helps with positioning */}
                      <div className="xl:hidden h-12 w-full mb-4 relative">
                        <div className="text-sm text-gray-500 flex items-center justify-end pr-16">
                          <span>Scroll down for Table of Contents</span>
                        </div>
                      </div>

                      {/* Title - Responsive typography */}
                      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
                        {blog.title}
                      </h1>
                      
                      {/* Meta information - Responsive layout */}
                      <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">
                        {blog.updatedAt && (
                          <div className="flex flex-wrap">
                            <span className="font-medium mr-1">Last updated:</span>
                            <span>{formatDate(blog.updatedAt)}</span>
                          </div>
                        )}
                        {blog.publishDate && (
                          <div className="flex flex-wrap">
                            <span className="font-medium mr-1">Publish Date:</span>
                            <span>{formatDate(blog.publishDate)}</span>
                          </div>
                        )}
                        {blog.tags?.length > 0 && (
                          <div className="flex flex-wrap">
                            <span className="font-medium mr-1">Tags:</span>
                            <span className="break-words">{blog.tags.join(", ")}</span>
                          </div>
                        )}
                        {blog.categories?.length > 0 && (
                          <div className="flex flex-wrap">
                            <span className="font-medium mr-1">Categories:</span>
                            <span className="break-words">
                              {blog.categories.map((cat) =>
                                typeof cat === "object" ? cat.name : cat
                              ).join(", ")}
                            </span>
                          </div>
                        )}
                      </div>
                      
                      {/* Excerpt - Responsive */}
                      {blog.excerpt && (
                        <div className="bg-gray-50 border-l-4 border-gray-200 p-3 sm:p-4 italic text-gray-700 mb-4 sm:mb-6 text-sm sm:text-base">
                          {blog.excerpt}
                        </div>
                      )}
                      
                      {/* Content Blocks - Enhanced responsive layout */}
                      {blog.blocks && blog.blocks.length > 0 && (
                        <div className="space-y-4 sm:space-y-6 mb-4 sm:mb-6" style={contentBlockStyles}>
                          {blog.blocks.map((row, rowIndex) => (
                            <div key={`row-${rowIndex}`} className="flex flex-col lg:flex-row gap-3 sm:gap-4">
                              {row.columns.map((column, colIndex) => (
                                <div
                                  key={`col-${rowIndex}-${colIndex}`}
                                  className="space-y-3 sm:space-y-4 w-full"
                                  style={{ 
                                    maxWidth: typeof window !== 'undefined' && window.innerWidth >= 1024 && column.width ? `${column.width}%` : '100%'
                                  }}
                                >
                                  {column.blocks.map((block, blockIndex) => {
                                    switch (block.type) {
                                      case "heading":
                                        return (
                                          <h2
                                            key={`block-${rowIndex}-${colIndex}-${blockIndex}`}
                                            className="text-lg sm:text-xl md:text-2xl font-bold leading-tight"
                                            style={contentBlockStyles}
                                          >
                                            {block.content?.text}
                                          </h2>
                                        );
                                      case "paragraph":
                                        return (
                                          <p
                                            key={`block-${rowIndex}-${colIndex}-${blockIndex}`}
                                            className="text-gray-700 text-sm sm:text-base leading-relaxed"
                                            style={contentBlockStyles}
                                          >
                                            {block.content?.text}
                                          </p>
                                        );
                                      case "image":
                                        return (
                                          <div
                                            key={`block-${rowIndex}-${colIndex}-${blockIndex}`}
                                            className="rounded-lg overflow-hidden"
                                            style={contentBlockStyles}
                                          >
                                            {block.content?.url && (
                                              <div className="w-full flex justify-center items-center">
                                                <Image
                                                  src={getFullImageUrl(block.content.url) || "/placeholder.svg"}
                                                  alt={block.content?.alt || ""}
                                                  height={block.content?.height || 400}
                                                  width={block.content?.width || 600}
                                                  className="max-w-full h-auto object-contain"
                                                  style={{
                                                    maxWidth: "100%",
                                                    height: "auto",
                                                    display: "block",
                                                    margin: "0 auto"
                                                  }}
                                                />
                                              </div>
                                            )}
                                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-2 gap-2">
                                              {block.content?.heading && (
                                                <h3 className="text-base sm:text-lg font-semibold">
                                                  {block.content.heading}
                                                </h3>
                                              )}
                                              {block.content?.externalLink && (
                                                <a
                                                  href={block.content.externalLink}
                                                  target="_blank"
                                                  rel="noopener noreferrer"
                                                  className="inline-block bg-[rgb(22,163,74)] hover:bg-[rgb(22,163,74,0.8)] text-white font-medium py-2 px-3 sm:px-4 rounded-md transition-colors text-xs sm:text-sm whitespace-nowrap self-start sm:self-auto"
                                                >
                                                  Buy Now
                                                </a>
                                              )}
                                            </div>
                                            {block.content?.caption && (
                                              <p className="text-xs sm:text-sm text-gray-500 mt-1 text-center">
                                                {block.content.caption}
                                              </p>
                                            )}
                                          </div>
                                        );
                                      case "text":
                                        return (
                                          <BlogContent
                                            key={`block-${rowIndex}-${colIndex}-${blockIndex}`}
                                            content={block.content || ""}
                                          />
                                        );
                                      default:
                                        return null;
                                    }
                                  })}
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center text-gray-500 py-12 text-sm sm:text-base">No blog post found.</div>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

ClientBlogPage.propTypes = {
  blog: PropTypes.object.isRequired,
};
