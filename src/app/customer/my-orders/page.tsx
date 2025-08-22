"use client";

import React, { useEffect, useState } from "react";
import Top from "@/app/customer/components/TopBar"; // Ensure this is a Next.js + TS compatible component
import Sidebar from "@/app/customer/components/Sidebar"; // Ensure this is a Next.js + TS compatible component
import { useAuth } from "@/app/context/Auth"; // Ensure Auth is Next.js + TS compatible
import axios from "axios";
import Image from "next/image";
import ReturnItemModal from "./components/ReturnModal";

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

export default function MyOrders() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  const auth = useAuth();
  const [selectedPage, setSelectedPage] = useState("My-Orders");
  const [orders, setOrders] = useState<Order[]>([]);
  const [dataFetched, setDataFetched] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [selectedReason, setSelectedReason] = useState<string>("");
  const [orderDetails, setOrderDetails] = useState<string>("");
  const [orderImages, setOrderImages] = useState<ImageFile[]>([]);
  const userId = auth?.user?._id;
  // Function to open the modal for a specific order
  const openModal = (order: Order): void => {
    setCurrentOrder(order);
    setIsModalOpen(true);
  };

  useEffect(() => {
    function getOrders() {
      if (!userId) {
        return;
      }
      axios
        .post(`${auth.ip}get/order/user`, { userId: userId })
        .then((response) => {
          if (response.data.status === 201) {
            setOrders(response.data.orders);
            setDataFetched(true);
            setShowToast(true);
          }
        })
        .catch((error) => {
          console.log("An error occurred", error);
          setDataFetched(true);
        });
    }
    setIsMounted(true);
    getOrders();
    return () => {
      setIsMounted(false);
    };
  }, [auth.ip, userId]);

  useEffect(() => {
    if (isMounted && dataFetched && showToast) {
      if (orders.length > 0) {
        console.log("Orders fetched successfully");
      } else {
        console.log("Failed to fetch orders");
      }
    }
  }, [isMounted, dataFetched, orders, showToast]);

  return (
    <>
      <Sidebar
        selectedPage={selectedPage}
        setSelectedPage={setSelectedPage}
        isSidebarOpen={isSidebarOpen}
        closeSidebar={closeSidebar}
        toggleSidebar={toggleSidebar}
      />
      <div className={`lg:pl-72 ${isSidebarOpen ? "pl-0" : ""}`}>
        <Top
          toggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
        />
        <div className="px-4 sm:px-6 lg:px-8">
          <main className="py-16">
            <div className="mx-auto w-full">
              <div className="mx-auto">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  Order history
                </h1>
                <p className="mt-2 text-sm text-gray-700">
                  Check the status of recent orders, manage returns, and
                  discover similar products.
                </p>
              </div>
            </div>
            <section aria-labelledby="recent-heading" className="mt-16">
              <h2 id="recent-heading" className="sr-only">
                Recent orders
              </h2>
              <div className="mx-auto">
                <div className="mx-auto space-y-8">
                  {orders &&
                    orders.map((order) => {
                      const totalItems = order.cart.reduce(
                        (sum, item) => sum + item.qty,
                        0
                      );
                      const saleAmount = order.cart.reduce(
                        (sum, item) => sum + item.salePrice * item.qty,
                        0
                      );

                      const createdAt = new Date(order.createdAt);
                      const datePlaced = createdAt.toLocaleDateString("en-GB", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      });
                      const timePlaced = createdAt.toLocaleTimeString("en-GB", {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      });

                      return (
                        <div
                          key={order._id}
                          className="border-b border-gray-200 bg-white shadow-sm sm:rounded-lg sm:border"
                        >
                          <div className="flex flex-col md:flex-row justify-between md:items-center gap-5 border-b border-gray-200 p-4 sm:p-6 bg-gray-100">
                            <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 text-sm gap-4 sm:gap-6 w-full">
                              <div className="flex items-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="36"
                                  height="36"
                                  viewBox="0 0 36 36"
                                  className="h-8 w-8 text-green-500 mr-3"
                                >
                                  <path
                                    fill="currentColor"
                                    d="M5.46 7.41v4.15h1.19V6.05H5.7L4.05 7.16l.47.84z"
                                  />
                                  <path
                                    fill="currentColor"
                                    d="M5.57 14.82a.76.76 0 0 1 .83.73c0 .38-.21.74-.87 1.27l-2 1.57v1h4.14v-1.11H5.33l1-.77c1-.7 1.28-1.27 1.28-2a1.83 1.83 0 0 0-2-1.76a2.63 2.63 0 0 0-2.14 1.08l.76.73a1.75 1.75 0 0 1 1.34-.74"
                                  />
                                  <path
                                    fill="currentColor"
                                    d="M6.56 24.64a1.32 1.32 0 0 0 1-1.27c0-.87-.78-1.51-2-1.51a2.61 2.61 0 0 0-2.1 1l.69.72a1.78 1.78 0 0 1 1.3-.64c.54 0 .92.26.92.66s-.36.62-1 .62h-.58v1h.64c.74 0 1.07.21 1.07.63s-.35.68-1 .68a2 2 0 0 1-1.46-.65l-.7.78a2.85 2.85 0 0 0 2.21.93c1.29 0 2.13-.69 2.13-1.64a1.33 1.33 0 0 0-1.12-1.31"
                                  />
                                  <path
                                    fill="currentColor"
                                    d="M32.42 9a1 1 0 0 0-1-1H10v2h21.42a1 1 0 0 0 1-1"
                                  />
                                  <path
                                    fill="currentColor"
                                    d="M31.42 16H10v2h21.42a1 1 0 0 0 0-2"
                                  />
                                  <path
                                    fill="currentColor"
                                    d="M31.42 24H10v2h21.42a1 1 0 0 0 0-2"
                                  />
                                </svg>
                                <div className="flex items-center">
                                  <dt className="font-medium text-gray-900 mr-2">
                                    Order Number:
                                  </dt>
                                  <dd className="text-gray-700">
                                    {order.orderNumber}
                                  </dd>
                                </div>
                              </div>

                              <div className="flex items-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  className="h-8 w-8 text-green-500 mr-3"
                                >
                                  <g fill="none">
                                    <path
                                      stroke="currentColor"
                                      strokeWidth="1.5"
                                      d="M2 12c0-3.771 0-5.657 1.172-6.828S6.229 4 10 4h4c3.771 0 5.657 0 6.828 1.172S22 8.229 22 12v2c0 3.771 0 5.657-1.172 6.828S17.771 22 14 22h-4c-3.771 0-5.657 0-6.828-1.172S2 17.771 2 14z"
                                    />
                                    <path
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      strokeWidth="1.5"
                                      d="M7 4V2.5M17 4V2.5M2.5 9h19"
                                    />
                                    <path
                                      fill="currentColor"
                                      d="M18 17a1 1 0 1 1-2 0a1 1 0 0 1 2 0m0-4a1 1 0 1 1-2 0a1 1 0 0 1 2 0m-5 4a1 1 0 1 1-2 0a1 1 0 0 1 2 0m0-4a1 1 0 1 1-2 0a1 1 0 0 1 2 0m-5 4a1 1 0 1 1-2 0a1 1 0 0 1 2 0m0-4a1 1 0 1 1-2 0a1 1 0 0 1 2 0"
                                    />
                                  </g>
                                </svg>
                                <div className="flex items-center">
                                  <dt className="font-medium text-gray-900 mr-2">
                                    Date & Time:
                                  </dt>
                                  <dd className="text-gray-700 flex space-x-2">
                                    <time dateTime={order.createdAt}>
                                      {datePlaced}
                                    </time>
                                    <time dateTime={order.createdAt}>
                                      {timePlaced}
                                    </time>
                                  </dd>
                                </div>
                              </div>

                              <div className="flex items-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  className="h-8 w-8 text-green-500 mr-3"
                                >
                                  <g
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                  >
                                    <rect
                                      width="14"
                                      height="17"
                                      x="5"
                                      y="4"
                                      rx="2"
                                    />
                                    <path
                                      strokeLinecap="round"
                                      d="M9 9h6m-6 4h6m-6 4h4"
                                    />
                                  </g>
                                </svg>
                                <dt className="font-medium text-gray-900 mr-2">
                                  Total Order Value:
                                </dt>
                                <dd className="text-gray-700">
                                  {order.coupon && order.coupon.length > 0 ? (
                                    <>
                                      <span className="text-gray-700 line-through mr-2">
                                        £{saleAmount.toFixed(2)}
                                      </span>
                                      <span className="text-green-500 text-lg">
                                        £{order.totalOrderValue.toFixed(2)}
                                      </span>
                                    </>
                                  ) : (
                                    `£${saleAmount.toFixed(2)}`
                                  )}
                                </dd>
                              </div>

                              <div className="flex items-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  className="h-8 w-8 text-green-500 mr-3"
                                >
                                  <g
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.5"
                                  >
                                    <path d="M7.729 15.286h5m-2.502-2.5h.01m-.008 5h.01M6.5 3.697C9.533 6.782 14.536.124 17.496 2.54C19.199 3.93 18.66 7 16.449 9" />
                                    <path d="M18.664 6.578c.983.179 1.204.765 1.497 2.392c.265 1.466.339 3.225.339 3.974a1.3 1.3 0 0 1-.338.743c-2.057 2.035-6.137 5.878-8.196 7.787c-.808.681-2.028.696-2.886.07c-1.756-1.491-3.443-3.178-5.097-4.701c-.664-.808-.648-1.956.076-2.717c2.178-2.135 6.12-5.789 8.346-7.807c.223-.18.496-.294.79-.319c.498 0 1.355.063 2.19.109" />
                                  </g>
                                </svg>
                                <div className="ml-3">
                                  <dt className="text-gray-700">
                                    Items: {totalItems}
                                  </dt>
                                </div>
                              </div>
                            </dl>
                          </div>

                          <ul role="list" className="divide-y divide-gray-200">
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-4 sm:p-6 w-full">
                              {order.cart &&
                                order.cart.map((product) => {
                                  const imageUrl =
                                    product.variantImages &&
                                    product.variantImages.length > 0
                                      ? `${auth.ip}${product.variantImages[0].path}`
                                      : product.productthumbnail
                                      ? `${auth.ip}${product.productthumbnail.path}`
                                      : "";
                                  const mainProductName =
                                    product.productName || product.name;

                                  return (
                                    <li
                                      key={product._id}
                                      className="relative flex flex-row items-start gap-4"
                                    >
                                      <div className="flex-shrink-0 h-36 w-36 flex justify-center items-center overflow-hidden rounded-lg bg-gray-200">
                                        <Image
                                          src={imageUrl}
                                          alt={
                                            product.metaDescription ||
                                            mainProductName
                                          }
                                          className="h-full w-full object-cover object-center"
                                          width={200}
                                          height={200}
                                          unoptimized
                                        />
                                      </div>
                                      <div className="flex flex-col items-start justify-between flex-grow">
                                        <div className="text-left mt-2 text-sm font-medium text-gray-900 max-w-[250px]">
                                          {mainProductName}
                                        </div>
                                        <div className="text-left text-sm text-gray-600 mt-1">
                                          <strong>Quantity :</strong>{" "}
                                          {product.qty}
                                        </div>
                                        <div className="text-left line-through text-sm text-gray-600 mt-1">
                                          <strong>Price : </strong>£
                                          {product.Price.toFixed(2)}
                                        </div>
                                        <div className="text-left text-sm text-gray-600 mt-1">
                                          <strong>Sale Price : </strong>£
                                          {product.salePrice.toFixed(2)}
                                        </div>
                                      </div>
                                    </li>
                                  );
                                })}
                            </div>
                          </ul>

                          <div className="mt-6 border-t border-gray-200 pt-2 pb-2 text-start text-lg flex flex-col gap-4 md:flex-row md:justify-between md:items-center w-full">
                            <div className="w-full">
                              {" "}
                              {order.status === "Failed" && (
                                <p className="font-bold text-red-600">
                                  Unfortunately, there was an issue with your
                                  order, and it has not been processed
                                  successfully. Please contact us for further
                                  assistance.
                                </p>
                              )}
                              {order.status === "Pending" && (
                                <p className="font-bold text-yellow-500">
                                  Your Order is Being Prepared and Will Be on
                                  Its Way Soon!
                                </p>
                              )}
                              {order.status === "Shipped" &&
                                order.shippingDetails && (
                                  <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4">
                                    <div className="flex flex-col md:flex-row items-center gap-4">
                                      <div className="px-3">
                                        <p className="font-bold text-green-600">
                                          Your Order Has Been Dispatched and is
                                          on Its Way
                                        </p>
                                        <p className="mt-2 text-sm">
                                          Your order has been dispatched via{" "}
                                          <span className="font-semibold">
                                            {order.shippingDetails.provider}
                                          </span>
                                          . The tracking number is{" "}
                                          <span className="font-semibold">
                                            {
                                              order.shippingDetails
                                                .trackingNumber
                                            }
                                          </span>
                                          .
                                        </p>
                                      </div>
                                      <div className="max-w-full ">
                                        <a
                                          href={`https://www.royalmail.com/track-your-item#/${order.orderNumber}`}
                                          className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-2.5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                                        >
                                          Order Tracker
                                          <span className="sr-only">
                                            for order {order._id}
                                          </span>
                                        </a>
                                      </div>
                                    </div>
                                    <div className="px-4 flex items-center justify-center">
                                      <button
                                        className="bg-primary text-white py-2 px-4 rounded-md cursor-pointer hover:bg-green-500 text-base font-medium"
                                        onClick={() => openModal(order)}
                                      >
                                        Return This Item
                                      </button>
                                      {currentOrder === order && (
                                        <ReturnItemModal
                                          isModalOpen={isModalOpen}
                                          setIsModalOpen={setIsModalOpen}
                                          selectedReason={selectedReason}
                                          setSelectedReason={setSelectedReason}
                                          order={order}
                                          orderDetails={orderDetails}
                                          setOrderDetails={setOrderDetails}
                                          orderImages={orderImages}
                                          setOrderImages={setOrderImages}
                                        />
                                      )}
                                    </div>
                                  </div>
                                )}
                              {order.status === "Refunded" && (
                                <p className="font-bold text-green-500">
                                  Your refund has been processed successfully
                                  and should reflect in your account in 3 to 5
                                  Days
                                </p>
                              )}
                              {order.status === "Cancelled" && (
                                <p className="font-bold text-red-500">
                                  Your order has been successfully canceled. If
                                  you have any questions or need further
                                  assistance, feel free to contact us.
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
