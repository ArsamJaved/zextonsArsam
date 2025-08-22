"use client";
import { useState } from "react";
import Link from "next/link";

interface Category {
  _id: string;
  name: string;
  subCategory: string[];
}

interface MoreDropdownProps {
  categories: Category[];
}

const MoreDropdown: React.FC<MoreDropdownProps> = ({ categories }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li
      className="relative dropdown"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="flex cursor-pointer hover:text-gray-200 mt-0.5 items-center">
        <span>More</span>
        <svg
          style={{ height: "30px", width: "30px" }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="m12 15l-4.243-4.242l1.415-1.414L12 12.172l2.828-2.828l1.415 1.414z"
          />
        </svg>
      </div>
      {isOpen && (
        <ul className="absolute dropdown-menu bg-white text-black mt-0 space-y-2 py-2 rounded shadow-lg z-10 min-w-48">
          {categories.map((category) => {
            const validSubCategories = category.subCategory.filter(
              (subCat) => subCat.trim() !== ""
            );

            return (
              <li className="relative group dropdown" key={category._id}>
                <Link href={`/categories/${encodeURIComponent(category.name)}`}>
                  <p className="px-4 py-2 hover:bg-gray-200 flex justify-between items-center">
                    {category.name.replace(/-/g, " ")}
                    {validSubCategories.length > 0 && (
                      <svg
                        style={{
                          height: "20px",
                          width: "20px",
                          marginLeft: "5px",
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="m12 15l-4.243-4.242l1.415-1.414L12 12.172l2.828-2.828l1.415 1.414z"
                        />
                      </svg>
                    )}
                  </p>
                </Link>

                {/* Only render subcategories dropdown if they exist */}
                {validSubCategories.length > 0 && (
                  <ul className="absolute hidden group-hover:block bg-white text-black mt-0 space-y-2 py-2 rounded shadow-lg z-10 min-w-48 top-0 right-full">
                    {validSubCategories.map((subCat, index) => (
                      <li key={index}>
                        <Link
                          href={`/subcategory/${encodeURIComponent(
                            subCat
                          )}`}
                        >
                          <p className="block px-4 py-2 hover:bg-gray-200">
                            {subCat.replace(/-/g, " ")}
                          </p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </li>
  );
};

export default MoreDropdown;
