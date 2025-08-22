import { useAuth } from "@/app/context/Auth";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

interface OrderItem {
  _id: string;
  qty: number;
  Price: number;
  salePrice: number;
  productName: string;
  variantImages?: { path: string }[];
  productthumbnail?: { path: string };
  name: string;
  metaDescription?: string;
}

interface Order {
  _id: string;
  createdAt: string;
  orderNumber: string;
  cart: OrderItem[];
  status: string;
  coupon?: string[];
  totalOrderValue: number;
  shippingDetails?: {
    provider?: string;
    trackingNumber?: string;
  };
}

interface ImageFile {
  id: string;
  file: File;
}

interface ReturnItemModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  selectedReason: string;
  setSelectedReason: (value: string) => void;
  order: Order;
  orderDetails: string;
  setOrderDetails: (value: string) => void;
  orderImages: ImageFile[];
  setOrderImages: (
    value: ImageFile[] | ((prevImages: ImageFile[]) => ImageFile[])
  ) => void;
}
const ReturnItemModal: React.FC<ReturnItemModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  selectedReason,
  setSelectedReason,
  orderImages,
  setOrderImages,
  orderDetails,
  setOrderDetails,
  order,
}: ReturnItemModalProps) => {
  const auth = useAuth();
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [step, setStep] = useState<number>(1); // 1: Select Reason, 2: Provide Details
  const [isImagePreviewOpen, setIsImagePreviewOpen] = useState<boolean>(false);
  const [returnStatus, setReturnStatus] = useState<string>("Pending");
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Cleanup object URLs on component unmount
  useEffect(() => {
    return () => {
      orderImages.forEach((image) => URL.revokeObjectURL(image.id));
    };
  }, []);
  // Close modal function
  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false);
  };
  const handleImageClick = (index: number): void => {
    setCurrentImageIndex(index);
    setIsImagePreviewOpen(true);
  };

  const handlePrevImage = (): void => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? orderImages.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = (): void => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === orderImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const closeImagePreview = (): void => {
    setIsImagePreviewOpen(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files;
    if (files) {
      const remainingSlots = 10 - orderImages.length;
      const filesToUpload = Array.from(files).slice(0, remainingSlots);
      const uploadedImages = filesToUpload.map((file) => ({
        id: URL.createObjectURL(file), // Temporary unique ID
        file,
      }));
      setOrderImages([...uploadedImages, ...orderImages]); // Prepend new images
    }
    // Reset the input value to allow uploading the same file again if needed
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveImage = (id: string): void => {
    setOrderImages((prevImages) => {
      const updatedImages = prevImages.filter(
        (image: ImageFile) => image.id !== id
      );
      // Revoke the object URL for the removed image
      const removedImage = prevImages.find(
        (image: ImageFile) => image.id === id
      );
      if (removedImage) {
        URL.revokeObjectURL(removedImage.id);
      }
      return updatedImages;
    });
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
    setSelectedReason("");
    setOrderDetails("");
    // Revoke all object URLs before clearing
    orderImages.forEach((image) => URL.revokeObjectURL(image.id));
    setOrderImages([]);
    setStep(1); // Reset to initial step
    setIsImagePreviewOpen(false);
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("orderDetails", JSON.stringify(order)); // Send complete order details
    formData.append("reason", selectedReason);
    formData.append("status", returnStatus);
    formData.append("additionalDetails", orderDetails);
    orderImages.forEach((image) => {
      formData.append("images", image.file);
    });

    try {
      // Example API request
      const response = await axios.post(`${auth.ip}return/ThisItem`, formData);
      console.log("Response:", response.data.status);

      // Adjust the condition based on your API's response structure
      if (response.data.status === 200) {
        // Open success modal
        setIsSuccessModalOpen(true);
        closeModal(); // Optionally close the modal on success
      } else {
        console.error("Failed to send return details", response.data);
        toast.error(response.data.message || "Failed to send return details");
      }
    } catch (error: any) {
      console.error("Error submitting return details:", error);
      // Optionally, extract error message from the response
      const errorMessage =
        error.response?.data?.message || "Error submitting return details";
      toast.error(errorMessage);
    }
  };

  const handleNext = (): void => {
    if (selectedReason) {
      setStep(2);
    }
  };

  const handleBack = (): void => {
    setStep(1);
  };

  const triggerFileInput = (): void => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  return (
    <div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 px-2">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-2 md:p-4 rounded-lg w-full max-w-screen-md mx-auto"
            style={{ height: "650px" }} // Fixed height for the modal
          >
            <div className="flex justify-between items-center relative border-b pb-2">
              <h2 className="text-xl font-bold text-gray-800 text-left">
                Return Item
              </h2>
              <button
                className="text-gray-400 font-extrabold hover:text-gray-600 focus:outline-none"
                onClick={closeModal}
              >
                &#x2715;
              </button>
            </div>

            {/* Content Wrapper with Fixed Height */}
            <div
              className="mt-4 overflow-y-auto scrollbar-thin scrollbar-webkit w-full px-2"
              style={{ height: "calc(100% - 60px)" }} // Adjust based on header height
            >
              {step === 1 && (
                <div className="h-full flex flex-col justify-between">
                  <div>
                    <p className="text-gray-700 text-sm font-medium mb-3">
                      Why are you returning this item?
                    </p>
                    <fieldset className="space-y-4">
                      {[
                        "Ordered by mistake",
                        "Arrived damaged",
                        "Don't like it",
                        "Missing parts or pieces",
                        "Changed my mind",
                        "Item is defective",
                        "Received wrong item",
                        "Doesn't fit",
                        "Found a better price",
                        "Doesn't match description or photos",
                      ].map((reason, index) => (
                        <div key={index} className="flex items-center">
                          <input
                            id={`return-reason-${index}`}
                            name="return-reason"
                            type="radio"
                            value={reason}
                            checked={selectedReason === reason}
                            onChange={() => setSelectedReason(reason)}
                            className="h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500"
                          />
                          <label
                            htmlFor={`return-reason-${index}`}
                            className="ml-3 block text-gray-700 font-medium"
                          >
                            {reason}
                          </label>
                        </div>
                      ))}
                    </fieldset>
                  </div>
                  <div className="flex justify-start md:justify-end mt-6">
                    <button
                      className={`bg-primary text-white py-2 px-6 rounded-md cursor-pointer hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                        selectedReason ? "" : "opacity-50 cursor-not-allowed"
                      }`}
                      onClick={handleNext}
                      disabled={!selectedReason}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="h-full flex flex-col justify-between">
                  <div>
                    {/* Enhanced Reason Display */}
                    <div className="mb-6">
                      <div className="flex items-center mb-4">
                        <svg
                          className="w-6 h-6 text-green-600 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4"
                          />
                        </svg>
                        <p className="text-gray-800 text-lg font-medium">
                          Reason:
                          <span className="font-semibold text-green-700 pl-1">
                            {selectedReason}
                          </span>
                        </p>
                      </div>
                      {/* Enhanced Details Textarea */}
                      <div>
                        <label
                          htmlFor="orderDetails"
                          className="block text-gray-700 text-sm font-medium md:mb-2"
                        >
                          Additional Details{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        {!orderDetails && (
                          <p className=" text-sm text-red-500">
                            (Additional details are required)
                          </p>
                        )}
                        <textarea
                          id="orderDetails"
                          name="orderDetails"
                          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                          placeholder="Provide any additional information about your return... (required)"
                          value={orderDetails}
                          onChange={(e) => setOrderDetails(e.target.value)}
                          rows={8}
                          aria-label="Additional details for return"
                          required
                        ></textarea>
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block md:mb-2 text-gray-800 font-medium">
                        Add Photos: <span className="text-red-500">*</span>
                      </label>
                      {!orderImages.length && (
                        <p className="text-sm text-red-500">
                          (At least one image is required)
                        </p>
                      )}

                      {/* Hidden File Input */}
                      <input
                        type="file"
                        multiple
                        capture="environment"
                        accept="image/*"
                        onChange={handleImageUpload}
                        ref={fileInputRef}
                        className="hidden"
                      />

                      {/* Image Previews and Add Button */}
                      <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mt-4 mb-6 ">
                        {orderImages.map((image, index) => (
                          <div key={image.id} className="relative">
                            <img
                              src={image.id}
                              alt="uploaded preview"
                              className="w-28 h-28 object-cover rounded-md border cursor-pointer"
                              onClick={() => handleImageClick(index)}
                            />
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation(); // Prevent triggering image click
                                handleRemoveImage(image.id);
                              }}
                              className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                              aria-label="Remove Image"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-3 h-3"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </div>
                        ))}
                        {orderImages.length < 10 && (
                          <div className="relative">
                            {/* Add Image Button */}
                            <button
                              type="button"
                              onClick={triggerFileInput}
                              className="bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 w-28 h-28 flex items-center justify-center"
                              aria-label="Add Images"
                            >
                              <div className="flex items-center justify-center rounded-full w-8 h-8 bg-green-500 text-white">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="w-4 h-4"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 4.5v15m7.5-7.5h-15"
                                  />
                                </svg>
                              </div>
                            </button>
                          </div>
                        )}
                      </div>
                      <div className="relative md:hidden">
                        <button
                          type="button"
                          onClick={() => {
                            if (fileInputRef.current) {
                              fileInputRef.current.setAttribute(
                                "capture",
                                "environment"
                              );
                              fileInputRef.current.click();
                            }
                          }}
                          className="bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 w-28 h-28 flex items-center justify-center"
                          aria-label="Take Photo"
                        >
                          <div className="flex flex-col items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-8 h-8 text-green-500"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
                              />
                            </svg>
                            <span className="text-xs mt-1">Camera</span>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between sticky bottom-0 bg-white -z-0">
                    <button
                      className="bg-blue-500 py-2 px-4 rounded-md text-white hover:bg-gray-400"
                      onClick={handleBack}
                    >
                      Back
                    </button>
                    <div>
                      <button
                        className={`bg-primary text-white py-2 px-4 rounded-md hover:bg-green-600 mr-1 ${
                          !orderDetails || orderImages.length === 0
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                        type="submit"
                        disabled={!orderDetails || orderImages.length === 0}
                      >
                        Confirm Return
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {isImagePreviewOpen && orderImages.length > 0 && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-60">
                  <div className="relative bg-white rounded-lg overflow-hidden shadow-lg max-w-5xl w-full mx-auto">
                    {/* Close Button */}
                    <button
                      className="absolute top-2 right-2 text-white bg-primary bg-opacity-50 rounded-full p-1 hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-white"
                      onClick={closeImagePreview}
                      aria-label="Close Image Preview"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>

                    {/* Image Display */}
                    <img
                      src={orderImages[currentImageIndex].id}
                      alt={`Preview ${currentImageIndex + 1}`}
                      className="w-full h-auto object-contain"
                    />

                    {/* Navigation Buttons */}
                    {orderImages.length > 1 && (
                      <>
                        {/* Previous Button */}
                        <button
                          className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white bg-primary bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-white"
                          onClick={handlePrevImage}
                          aria-label="Previous Image"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15.75 19.5L8.25 12l7.5-7.5"
                            />
                          </svg>
                        </button>

                        {/* Next Button */}
                        <button
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white bg-primary bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-white"
                          onClick={handleNextImage}
                          aria-label="Next Image"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m8.25 4.5 7.5 7.5-7.5 7.5"
                            />
                          </svg>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>
      )}
      <SuccessModal isOpen={isSuccessModalOpen} onClose={closeSuccessModal} />
    </div>
  );
};

export default ReturnItemModal;
interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white shadow-xl flex flex-col transform transition-all sm:max-w-3xl w-full relative rounded-lg">
        <div className="flex justify-between items-center w-full p-4 border-b border-gray-400">
          <h3 className="text-2xl font-semibold text-primary">
            Return Request Submitted
          </h3>
          <button
            className="text-2xl text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div className="flex flex-col justify-center items-center h-full w-full">
          <div className="mx-auto flex-shrink-0 flex flex-col items-center justify-center mt-5 md:mt-3">
            <div className="relative inline-block mb-2">
              <div className="relative z-10 w-36 h-36 background-check-confetti"></div>
              <div className="absolute top-0 left-0 w-36 h-36 background-confeti-square"></div>
            </div>
            <div className="text-center">
              <div className="relative flex-auto px-3">
                <p className="text-lg leading-relaxed text-gray-500">
                  Your return request has been successfully submitted. Our team
                  will review your request and process it shortly.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 py-3 sm:px-6 flex flex-col md:flex-row-reverse gap-4">
          <button
            className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear bg-primary rounded shadow hover:bg-primary hover:shadow-lg focus:outline-none"
            type="button"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
