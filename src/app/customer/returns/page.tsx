"use client";
import React, { useEffect, useState } from "react";
import Top from "@/app/customer/components/TopBar";
import Sidebar from "@/app/customer/components/Sidebar";
import { useAuth } from "@/app/context/Auth";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Import useRouter

import {
  ClipboardDocumentCheckIcon,
  ArrowPathIcon,
  XCircleIcon,
  CheckCircleIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  DocumentCheckIcon,
  ClockIcon,
  XMarkIcon,
  CheckIcon,
  ShoppingBagIcon,
  CalendarIcon,
  CurrencyPoundIcon,
} from "@heroicons/react/24/outline";

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
const statusColors: Record<string, string> = {
  Pending: "bg-yellow-600 text-white",
  Accepted: "bg-green-600 text-white",
  Rejected: "bg-red-600 text-white",
};
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
  readStatus?: boolean;
  isdeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
  sender?: string;
}
interface ApiResponse {
  success: boolean;
  messages?: MessageType[];
}
export default function ReturnsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);
  const auth = useAuth();
  const [selectedPage, setSelectedPage] = useState("Returns");
  const [ordersReturn, setOrdersReturn] = useState<RequestOrder[]>([]);
  const [dataFetched, setDataFetched] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const router = useRouter(); // Initialize the router

  const userId = auth?.user?._id;

  useEffect(() => {
    async function getReturnOrders() {
      if (!userId) return;
      try {
        const response = await axios.get(`${auth.ip}user/allrequest/${userId}`);
        console.log(response.data.requestOrders);
        if (response.data.status === 201) {
          setOrdersReturn(response.data.requestOrders);
          setDataFetched(true);
          if (!dataFetched) {
            // toast.success("Orders fetched successfully!");
          }
        } else {
          console.error("Failed to fetch orders.");
        }
      } catch (error) {
        console.error("An error occurred", error);
        console.error("An error occurred while fetching orders.");
        setDataFetched(true);
      }
    }
    setIsMounted(true);
    getReturnOrders();
    return () => setIsMounted(false);
  }, [auth.ip, userId, dataFetched]);

  // Filtered orders based on status
  const filteredOrders =
    filterStatus === "All"
      ? ordersReturn
      : ordersReturn.filter((order) => order.status === filterStatus);

  // Summary calculations
  const summary = ordersReturn?.reduce(
    (acc, order) => {
      acc.total += 1;
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    },
    { total: 0 } as Record<string, number>
  ) || { total: 0 };
  const sendMessageToBackend = async (
    text: string,
    files: File[],
    requestOrder: RequestOrder
  ): Promise<ApiResponse> => {
    try {
      const senderId = auth?.user?._id;
      const formData = new FormData();
      formData.append("message", text);
      formData.append("senderId", senderId || "");
      formData.append("requestOrder", JSON.stringify(requestOrder));

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

      // Navigate to /customer/messages after successful message send
      router.push("/customer/messages");

      return response.data;
    } catch (error) {
      console.error("Error sending message:", error);
      throw new Error("Failed to send message");
    }
  };

  return (
    <>
      <Sidebar
        selectedPage={selectedPage}
        setSelectedPage={setSelectedPage}
        isSidebarOpen={isSidebarOpen}
        closeSidebar={closeSidebar}
        toggleSidebar={toggleSidebar}
      />
      <div
        className={`lg:pl-72 ${
          isSidebarOpen ? "pl-0" : ""
        } transition-all duration-300`}
      >
        <Top
          toggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
        />
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <main className="max-w-screen-2xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Returns</h1>
              <p className="mt-2 text-sm text-gray-600">
                Check the status of return orders, manage returns, and discover
                similar products.
              </p>
            </div>

            {/* Summary Section */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <ClipboardDocumentCheckIcon className="h-6 w-6 mr-2 text-primary" />
                Summary
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  {
                    label: "Total Returns",
                    value: summary.total,
                    icon: (
                      <ClipboardDocumentCheckIcon className="h-8 w-8 text-blue-500" />
                    ),
                  },
                  ...Object.entries(summary)
                    .filter(([status]) => status !== "total")
                    .map(([status, count]) => ({
                      label: `${status} Returns`,
                      value: count,
                      icon:
                        status === "Pending" ? (
                          <ArrowPathIcon className="h-8 w-8 text-yellow-500" />
                        ) : status === "Accepted" ? (
                          <CheckCircleIcon className="h-8 w-8 text-green-500" />
                        ) : (
                          <XCircleIcon className="h-8 w-8 text-red-500" />
                        ),
                    })),
                ].map(({ label, value, icon }) => (
                  <div
                    key={label}
                    className="bg-white shadow-md rounded-lg p-5 border border-gray-100 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          {label}
                        </p>
                        <p className="mt-2 text-2xl font-bold text-gray-900">
                          {value}
                        </p>
                      </div>
                      {icon}
                    </div>
                  </div>
                ))}
              </div>
            </section>
            {/* Filter Section */}
            {/* Filter Section */}
            <section className="mb-6 flex flex-col md:flex-row items-center justify-between">
              <h2 className="text-xl font-semibold flex items-center">
                <FunnelIcon className="h-6 w-6 mr-2 text-primary" />
                Return Orders
              </h2>
              <div className="flex items-center space-x-2">
                <label htmlFor="statusFilter" className="text-sm text-gray-700">
                  Filter by Status:
                </label>
                <select
                  id="statusFilter"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                >
                  <option>All</option>
                  <option>Accepted</option>
                  <option>Pending</option>
                  <option>Rejected</option>
                </select>
              </div>
            </section>

            {/* Orders List */}
            <section>
              {filteredOrders.length === 0 ? (
                <div className="text-center bg-white shadow rounded-lg p-10">
                  <MagnifyingGlassIcon className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500 text-lg">
                    No return orders found.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredOrders?.map((order) => {
                    const totalItems =
                      order?.orderId?.cart?.reduce(
                        (sum, item) => sum + (item?.qty || 0),
                        0
                      ) || 0;

                    const createdAt = new Date(order.createdAt);
                    const datePlaced = createdAt.toLocaleDateString("en-GB", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    });
                    const timePlaced = createdAt.toLocaleTimeString("en-GB", {
                      hour: "2-digit",
                      minute: "2-digit",
                    });

                    return (
                      <div
                        key={order._id}
                        className="bg-white shadow-lg rounded-xl overflow-hidden transition-all hover:shadow-xl border border-gray-100"
                      >
                        {/* Header */}
                        <div className="px-2 md:px-6 py-4 bg-gray-50 border-b border-gray-200 flex flex-col md:flex-row justify-between items-center">
                          <div className="flex flex-col md:flex-row items-center md:space-x-4 w-full">
                            <div className="flex-grow">
                              <div className="flex items-center space-x-3">
                                <div className="flex flex-row md:items-center ">
                                  <DocumentCheckIcon className="h-6 w-6 text-primary" />
                                  <div className="flex items-center space-x-2">
                                    <span className=" text-sm md:text-lg font-semibold text-gray-900">
                                      Order #
                                    </span>
                                    <span className="text-sm md:text-lg font-semibold">
                                      {order?.orderId?.orderNumber}
                                    </span>
                                  </div>
                                </div>
                                <div>
                                  <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${
                                      statusColors[order.status] ||
                                      "bg-gray-200 text-gray-800"
                                    }`}
                                  >
                                    {order.status === "Pending" && (
                                      <ClockIcon className="h-4 w-4 mr-1" />
                                    )}
                                    {order.status === "Accepted" && (
                                      <CheckIcon className="h-4 w-4 mr-1" />
                                    )}
                                    {order.status === "Rejected" && (
                                      <XMarkIcon className="h-4 w-4 mr-1" />
                                    )}
                                    {order.status}
                                  </span>
                                </div>
                              </div>
                              <p className="text-sm text-gray-500 mt-1 flex items-center mb-2 md:mb-0">
                                <CalendarIcon className="h-4 w-4 mr-2 text-gray-400" />
                                Placed on {datePlaced} at {timePlaced}
                              </p>
                            </div>
                            <div className="flex justify-center items-center space-x-4 md:space-x-4 w-full">
                              <div className="text-right">
                                <p className="text-sm text-gray-600 flex items-center justify-end">
                                  <ShoppingBagIcon className="h-4 w-4 mr-2 text-gray-400" />
                                  Total Items
                                </p>
                                <p className="text-lg font-semibold text-gray-900">
                                  {totalItems}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm text-gray-600 flex items-center justify-end">
                                  <CurrencyPoundIcon className="h-4 w-4 mr-2 text-gray-400" />
                                  Order Total
                                </p>
                                <p className="text-lg font-semibold text-green-600">
                                  £{order?.orderId?.totalOrderValue?.toFixed(2)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Order Items */}
                        <div className="p-6 flex flex-col md:flex-row justify-between">
                          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {order?.orderId?.cart?.map((product) => {
                              const imageUrl =
                                product.variantImages &&
                                product.variantImages.length > 0
                                  ? `${auth.ip}${product.variantImages[0].path}`
                                  : product.productthumbnail
                                  ? `${auth.ip}${product.productthumbnail.path}`
                                  : "/placeholder.png";

                              const mainProductName =
                                product.productName || product.name;

                              return (
                                <li
                                  key={product._id}
                                  className="bg-gray-100 rounded-lg p-2 md:p-4 flex flex-col md:flex-row items-center justify-center md:justify-between md:space-x-4 hover:bg-gray-200 transition-colors group"
                                >
                                  <div className="flex-shrink-0 w-24 h-24 bg-white rounded-md shadow-sm p-2 group-hover:shadow-md transition-shadow">
                                    <Image
                                      src={imageUrl}
                                      alt={
                                        product.metaDescription ||
                                        mainProductName
                                      }
                                      className="w-full h-full object-contain object-center"
                                      width={96}
                                      height={96}
                                      unoptimized
                                    />
                                  </div>
                                  <div className="flex-grow">
                                    <h3 className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-primary transition-colors">
                                      {mainProductName}
                                    </h3>
                                    <div className="mt-2 flex justify-between items-center">
                                      <p className="text-sm text-gray-600 flex items-center">
                                        <ShoppingBagIcon className="h-4 w-4 mr-2 text-gray-400" />
                                        Qty: {product.qty}
                                      </p>
                                      <div className="flex items-center space-x-2">
                                        <span className="text-xs text-gray-500 line-through">
                                          £{product.Price.toFixed(2)}
                                        </span>
                                        <span className="text-sm font-semibold text-green-600">
                                          £{product.salePrice.toFixed(2)}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              );
                            })}
                          </ul>
                          <div className="flex flex-col space-y-4 justify-center items-center md:items-start mt-6 md:mt-0">
                            <button
                              onClick={() =>
                                sendMessageToBackend("", [], order)
                              } // Pass order._id
                              className="mt-4 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors max-w-40"
                            >
                              Message Us
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
