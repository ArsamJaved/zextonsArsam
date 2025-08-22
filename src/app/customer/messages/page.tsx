"use client";
import { useState, type FC, type ChangeEvent, useEffect, useRef } from "react";
import Top from "@/app/customer/components/TopBar";
import Sidebar from "@/app/customer/components/Sidebar";
import { FiSend, FiPaperclip, FiX } from "react-icons/fi";
import { useAuth } from "@/app/context/Auth";
import axios from "axios";
import Image from "next/image";

interface Address {
  address: string;
  apartment: string;
  country: string;
  city: string;
  county: string;
  postalCode: string;
}

// User details interface
interface UserDetails {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  dateofbirth: string | null;
  password: string;
  phoneNumber: string;
  address: Address;
  companyname: string;
  role: string;
  createdAt: string;
  __v: number;
  registerForApp: boolean;
}

// Image interface for product images
interface ImageInfo {
  filename: string;
  path: string;
}

// Order item interface with expanded properties
interface OrderItem {
  _id: string;
  productId: string;
  qty: number;
  Price: number;
  salePrice: number;
  productName: string;
  variantImages?: ImageInfo[];
  productthumbnail?: ImageInfo;
  name: string;
  metaDescription?: string;
  metaImage?: ImageInfo;
  metaTitle?: string;
  metaKeywords?: string;
  metaSchemas?: any[];
  Cost: number | null;
  Quantity: number;
  SKU: string;
  EIN: string;
  MPN: string | null;
  selectedSim: string;
}

// Coupon interface
interface Coupon {
  _id: string;
  code: string;
  discount_type: string;
  discount: number;
  usage: number;
  used: number;
  expiryDate: string;
  upto: number;
  status: number;
  __v: number;
}

// Shipping details interface
interface ShippingDetails {
  firstName: string;
  lastName: string;
  companyName: string;
  address: string;
  apartment: string;
  country: string;
  city: string;
  county: string;
  postalCode: string;
  phoneNumber: string;
  provider?: string;
  trackingNumber?: string;
}

// Contact details interface
interface ContactDetails {
  email: string;
  userId: string;
}

// Main order interface
interface OrderID {
  _id: string;
  orderNumber: string;
  cart: OrderItem[];
  coupon?: Coupon[];
  shippingDetails: ShippingDetails;
  contactDetails: ContactDetails;
  status: string;
  isdeleted: boolean;
  totalOrderValue: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Request order interface
interface RequestOrder {
  _id: string;
  userId: UserDetails;
  orderId: OrderID;
  status: string;
  reason: string;
  notes: string;
  files: ImageInfo[];
  createdAt: string;
  updatedAt: string;
  requestOrderNumber: string;
  __v: number;
}
// Enhanced interface to support both text & files/attachments
interface FileType {
  url: string;
  name: string;
  type: string;
}

interface MessageType {
  _id?: string;
  message?: string;
  files?: FileType[]; // For UI rendering (mapped from attachments)
  attachments?: {
    filename: string;
    path: string;
    mimetype: string;
    _id: string;
  }[];
  requestOrder?: RequestOrder; // Pass requestOrder data
  readStatus?: boolean;
  isdeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
  sender?: string;
}

interface MessageProps {
  message?: string;
  files?: FileType[];
  isUser: boolean;
  requestOrder?: RequestOrder; // Pass requestOrder data
  onPreview: (file: FileType) => void;
  createdAt?: string; // We'll pass this along to show date/time
}

interface ApiResponse {
  success: boolean;
  messages?: MessageType[];
}

const Message: FC<MessageProps> = ({
  message,
  files,
  isUser,
  onPreview,
  createdAt,
  requestOrder,
}) => {
  const auth = useAuth();
  // Helper function to determine if file is an image
  const isImage = (type: string) => type.startsWith("image/");

  // Helper function to get file icon based on type
  const getFileIcon = (type: string) => {
    // You can expand this if you want custom icons for pdf, doc, etc.
    return "📎"; // Default file icon
  };

  // Format the date/time however you like:
  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleString() // e.g. '1/30/2025, 4:00:00 PM'
    : "";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`
          max-w-xs md:max-w-md px-4 py-2 rounded-lg shadow
          ${
            isUser
              ? "bg-green-600 text-white rounded-tr-none"
              : "bg-gray-200 text-gray-800 rounded-tl-none"
          }
        `}
      >
        {/* Display text message if present */}
        {message && <div className="whitespace-pre-wrap mb-2">{message}</div>}
        {requestOrder && requestOrder !== null && (
          <div className="mt-2 p-3 bg-gray-100 rounded-lg shadow-md">
            <h3 className="font-semibold text-gray-800 text-lg mb-2">
              Return Request Details
            </h3>
            <div className="flex flex-wrap justify-between md:mb-4">
              <p className="text-sm text-gray-600 w-full flex flex-col md:w-1/2">
                <strong>Order Number:</strong>{" "}
                {requestOrder?.orderId?.orderNumber}
              </p>
              <p className="text-sm text-gray-600 w-full md:w-1/2 flex flex-col text-left">
                <strong>Status:</strong> {requestOrder?.status}
              </p>
            </div>
            <div className="flex flex-wrap justify-between md:mb-4">
              <p className="text-sm text-gray-600 w-full flex flex-col md:w-1/2">
                <strong>Reason:</strong> {requestOrder?.reason}
              </p>
              <p className="text-sm text-gray-600 w-full md:w-1/2 flex flex-col text-left">
                <strong>Notes:</strong> {requestOrder?.notes}
              </p>
            </div>
            <div className="flex flex-wrap justify-between md:mb-4">
              <p className="text-sm text-gray-600 w-full md:w-1/2 flex flex-col">
                <strong>Total Items:</strong>{" "}
                {requestOrder?.orderId?.cart?.reduce(
                  (sum, item) => sum + (item?.qty || 0),
                  0
                ) || 0}
              </p>
              <p className="text-sm text-gray-600 w-full md:w-1/2 flex flex-col">
                <strong>Order Total:</strong> £
                {requestOrder?.orderId?.totalOrderValue?.toFixed(2)}
              </p>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              <strong>Placed on:</strong>{" "}
              {new Date(requestOrder.createdAt).toLocaleDateString("en-GB", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}{" "}
              at{" "}
              {new Date(requestOrder.createdAt).toLocaleTimeString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <h4 className="font-semibold text-gray-800 text-lg mb-2">
              Order Details
            </h4>
            <ul>
              {requestOrder?.orderId?.cart?.map((product) => (
                <li
                  key={product._id}
                  className="flex flex-col justify-between items-center py-2 border-b border-gray-200 last:border-b-0"
                >
                  <div className="flex items-center">
                    <img
                      src={`${auth.ip}${product?.metaImage?.path}`}
                      alt="Product Image"
                      width={50}
                      height={50}
                      className="object-contain mr-2"
                    />
                    <span className="text-sm text-gray-600">
                      {product.productName || product.name}
                    </span>
                  </div>

                  <span className="text-sm text-gray-600">
                    {product.qty} x £{product.salePrice.toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Display attachments/files if present */}
        {files && files.length > 0 && (
          <div className="mt-2 space-y-2">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex justify-center items-center gap-2"
              >
                {isImage(file.type) ? (
                  <div
                    className="cursor-pointer flex flex-col items-center"
                    onClick={() => onPreview(file)}
                  >
                    <img
                      src={file.url || "/placeholder.svg"}
                      alt={file.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    {/* <span className="text-xs mt-1 block truncate">
                      {file.name}
                    </span> */}
                  </div>
                ) : (
                  <div
                    className="flex items-center gap-2 cursor-pointer hover:opacity-80"
                    onClick={() => onPreview(file)}
                  >
                    <span>{getFileIcon(file.type)}</span>
                    <span className="underline text-sm">{file.name}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Date/Time */}
        {createdAt && (
          <div
            className={`text-xs mt-2 ${
              isUser ? "text-gray-100" : "text-gray-500"
            }`}
          >
            {formattedDate}
          </div>
        )}
      </div>
    </div>
  );
};

export default function Messages() {
  const auth = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [newMessageText, setNewMessageText] = useState<string>("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [previewFile, setPreviewFile] = useState<FileType | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  // Function to scroll to the bottom of the message container
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to bottom whenever messages are updated
  useEffect(() => {
    scrollToBottom();
  }, [messages]); // Create a ref for the message container
  
  // Initial fetch of messages
  useEffect(() => {
    fetchMessages();
    
    // Set up polling interval to fetch messages every 2 seconds
    const intervalId = setInterval(() => {
      fetchMessages(false); // Pass false to not show loading state for polling
    }, 4000);
    
    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const fetchMessages = async (showLoading = true) => {
    try {
      const senderId = auth?.user?._id;
      if (!senderId) {
        console.error("No sender ID available");
        return;
      }

      // Only set loading state if this is the initial fetch
      if (showLoading) {
        setIsFetching(true);
      }

      const response = await axios.get<ApiResponse>(
        `${auth.ip}get/messages/senderid/${senderId}`
      );

      if (response.data.success && response.data.messages) {
        // Sort messages by creation time
        let sortedMessages = response.data.messages.sort(
          (a, b) =>
            new Date(a.createdAt || 0).getTime() -
            new Date(b.createdAt || 0).getTime()
        );

        // Map attachments to your existing `files` format
        sortedMessages = sortedMessages.map((msg) => {
          const files = (msg.attachments || []).map((attachment) => ({
            // If your server requires a specific URL prefix, add it here:
            url: `${auth.ip}${attachment.path}`,
            name: attachment.filename,
            type: attachment.mimetype,
          }));

          return {
            ...msg,
            files,
          };
        });
        
        // Check if we have new messages to avoid unnecessary re-renders
        const currentMessagesIds = messages.map(msg => msg._id);
        const hasNewMessages = sortedMessages.some(msg => !currentMessagesIds.includes(msg._id));
        
        if (hasNewMessages || messages.length !== sortedMessages.length) {
          console.log("New messages received:", sortedMessages);
          setMessages(sortedMessages);
        }
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      // Only update loading state if this is the initial fetch
      if (showLoading) {
        setIsFetching(false);
      }
    }
  };

  // Handle file selection
  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setSelectedFiles((prevFiles) => [...prevFiles, ...Array.from(files)]);
    }
  };

  // Send message (text + files) to backend
  const sendMessageToBackend = async (
    text: string,
    files: File[]
  ): Promise<ApiResponse> => {
    try {
      const senderId = auth?.user?._id;
      const formData = new FormData();
      formData.append("message", text);
      formData.append("senderId", senderId || "");

      for (const file of files) {
        formData.append("files", file);
      }

      const response = await axios.post(
        `${auth.ip}send/messageFromUser/senderid/${senderId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error sending message:", error);
      throw new Error("Failed to send message");
    }
  };

  const handleSendMessage = async () => {
    if (!newMessageText.trim() && selectedFiles.length === 0) return;

    setIsLoading(true);

    try {
      // Create a temporary (optimistic) message
      const tempMessage: MessageType = {
        _id: Date.now().toString(),
        message: newMessageText,
        sender: auth?.user?._id,
        createdAt: new Date().toISOString(),
        files: selectedFiles.map((file) => ({
          url: URL.createObjectURL(file),
          name: file.name,
          type: file.type,
        })),
      };

      // Optimistically update UI
      setMessages((prev) => [...prev, tempMessage]);
      setNewMessageText("");
      setSelectedFiles([]);

      // Send to backend
      const response = await sendMessageToBackend(
        newMessageText,
        selectedFiles
      );
      if (!response.success) {
        console.error("Failed to send message");
        // Remove temp message if sending failed
        setMessages((prev) =>
          prev.filter((msg) => msg._id !== tempMessage._id)
        );
      } else {
        // Refresh from server to get actual data (with attachments, IDs, etc.)
        await fetchMessages();
      }
    } catch (error) {
      console.error("Error in handleSendMessage:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle file/image preview
  const handlePreview = (file: FileType) => {
    setPreviewFile(file);
  };

  // Close preview
  const closePreview = () => {
    setPreviewFile(null);
  };

  const removeSelectedFile = (index: number) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <>
      <Sidebar
        selectedPage="Messages"
        setSelectedPage={() => null}
        isSidebarOpen={isSidebarOpen}
        closeSidebar={() => setIsSidebarOpen(false)}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <div className={`lg:pl-72 ${isSidebarOpen ? "pl-0" : ""}`}>
        <Top
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          isSidebarOpen={isSidebarOpen}
          selectedPage="Messages"
          setSelectedPage={() => null}
        />

        <main className="py-5 px-5">
          <div className="bg-white border border-gray-300 rounded-lg overflow-hidden h-[70vh] flex flex-col max-w-screen-lg mx-auto">
            <div className="p-4 border-b border-gray-300 bg-gray-50 flex items-center">
              <h2 className="text-xl font-semibold text-gray-800">Chat</h2>
            </div>

            <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-webkit">
              {isFetching ? (
                <p className="text-center text-gray-500 mt-4">
                  Loading messages...
                </p>
              ) : messages.length === 0 ? (
                <p className="text-center text-gray-500 mt-4">
                  No messages yet. Start the conversation!
                </p>
              ) : (
                messages.map((msg) => (
                  <Message
                    key={msg._id}
                    message={msg.message}
                    files={msg.files}
                    createdAt={msg.createdAt}
                    isUser={msg.sender === auth?.user?._id}
                    onPreview={handlePreview}
                    requestOrder={msg.requestOrder} // Pass requestOrder data
                  />
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-gray-300 bg-gray-50">
              <div className="flex flex-col md:flex-row items-center gap-2">
                <div className="flex items-center gap-2 w-full">
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      className="hidden"
                      ref={fileInputRef}
                      onChange={handleFileSelect}
                      accept="image/*,.pdf,.doc,.docx,.txt"
                      multiple
                    />
                    <FiPaperclip
                      size={20}
                      className="text-gray-500 hover:text-gray-700"
                    />
                  </label>
                  <input
                    type="text"
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Type a message..."
                    value={newMessageText}
                    onChange={(e) => setNewMessageText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !isLoading) handleSendMessage();
                    }}
                    disabled={isLoading}
                  />
                </div>
                <button
                  onClick={handleSendMessage}
                  className={`p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center ${
                    isLoading ||
                    (!newMessageText.trim() && selectedFiles.length === 0)
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  disabled={
                    isLoading ||
                    (!newMessageText.trim() && selectedFiles.length === 0)
                  }
                >

                  <FiSend size={20} />
                  <span className="text-white text-lg font-normal block md:hidden">Send</span>
                </button>
              </div>

              {selectedFiles.length > 0 && (
                <div className="mt-2 space-y-2">
                  {selectedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-gray-100 p-2 rounded"
                    >
                      {file.type.startsWith("image/") ? (
                        <div className="flex items-center gap-2">
                          <img
                            src={
                              URL.createObjectURL(file) || "/placeholder.svg"
                            }
                            alt={file.name}
                            className="w-10 h-10 object-cover rounded cursor-pointer"
                            onClick={() =>
                              handlePreview({
                                url: URL.createObjectURL(file),
                                name: file.name,
                                type: file.type,
                              })
                            }
                          />
                          <span className="text-sm text-gray-600 truncate">
                            {file.name}
                          </span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-600">
                          {file.name}
                        </span>
                      )}
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => removeSelectedFile(index)}
                      >
                        <FiX size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* File/Image Preview Modal */}
          {previewFile && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-4 rounded-lg max-w-2xl max-h-[90vh] overflow-auto">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold">{previewFile.name}</h3>
                  <button
                    onClick={closePreview}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FiX size={24} />
                  </button>
                </div>
                {previewFile.type.startsWith("image/") ? (
                  <img
                    src={previewFile.url || "/placeholder.svg"}
                    alt={previewFile.name}
                    className="max-w-full h-auto"
                  />
                ) : (
                  <iframe
                    src={previewFile.url}
                    className="w-full h-[80vh]"
                    title="File preview"
                  />
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
