"use client";

import React, { useState, ChangeEvent } from "react";
import Top from "@/app/customer/components/TopBar"; // Adjust the import path based on your project structure
import Sidebar from "@/app/customer/components/Sidebar"; // Adjust the import path
import { useAuth } from "@/app/context/Auth"; // Ensure this hook is Next.js compatible
import Modal from "@/app/components/common/Modal"; // Ensure this is a client component with TS
import axios from "axios";
import { toast } from "react-toastify";
import Image from "next/image";


interface FormData {
  firstName: string;
  lastName: string;
  companyName: string;
  email: string;
  phone: string;
  address: string;
  apartment: string;
  city: string;
  country: string;
  state: string;
  county: string;
  postalCode: string;
}

const generateImageFromInitial = (initial: string): string => {
  const canvas = document.createElement("canvas");
  canvas.width = 100;
  canvas.height = 100;
  const ctx = canvas.getContext("2d");

  if (!ctx) return "";

  // Set background color
  ctx.fillStyle = "#f3f4f6"; // Light background color
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Set text properties
  ctx.font = "50px Arial";
  ctx.fillStyle = "#333"; // Dark text color
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Draw the initial in the center
  ctx.fillText(initial, canvas.width / 2, canvas.height / 2);

  // Return the data URL of the image
  return canvas.toDataURL();
};

const Dashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const auth = useAuth();
  const userId = auth?.user?._id;
  const [selectedPage, setSelectedPage] = useState("Customer-Details");
  const [isOpen, setIsOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [notification, setNotification] = useState<{message: string; type: 'success' | 'error'} | null>(null);

  // Show notification and auto-hide after 10 seconds
  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  // Password change state
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [formData, setFormData] = useState<FormData>({
    firstName: auth?.user?.firstname || "",
    lastName: auth?.user?.lastname || "",
    companyName: auth?.user?.companyname || "",
    email: auth?.user?.email || "",
    phone: auth?.user?.phoneNumber || "",
    address: auth?.user?.address?.address || "",
    apartment: auth?.user?.address?.apartment || "",
    city: auth?.user?.address?.city || "",
    country: auth?.user?.address?.country || "",
    state: auth?.user?.address?.state || "",
    county: auth?.user?.address?.county || "",
    postalCode: auth?.user?.address?.postalCode || "",
  });

  const [dateofBirth, setDateOfBirth] = useState("");

  const imageUrl = formData.firstName
    ? generateImageFromInitial(formData.firstName.charAt(0).toUpperCase())
    : "";

  // Toggle edit mode
  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  // Handle input changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOldPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOldPassword(e.target.value);
  };

  const handleNewPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  // Save updated user information
  const saveUpdatedInfo = async () => {
    try {
      const response = await axios.patch(`${auth.ip}update/user/${userId}`, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phone,
        companyname: formData.companyName,
        dateofbirth: dateofBirth,
        address: {
          address: formData.address,
          apartment: formData.apartment,
          country: formData.country,
          city: formData.city,
          county: formData.county,
          postalCode: formData.postalCode,
        },
      });

      console.log("Profile updated successfully:", response.data);
      if (response.data.status === 201) {
        toast.success(response.data.message);
        setIsEditMode(false); // Exit edit mode after saving
      } else {
        toast.error(response.data.message);
      }
    } catch (error: any) {
      console.error("Error updating profile:", error);
      toast.error("Error updating profile");
    }
  };

  // Reset password functionality
  const resetPassword = async () => {
    try {
      if (newPassword !== confirmPassword) {
        toast.error("New password and confirm password do not match.");
        return;
      }

      const response = await axios.patch(`${auth.ip}update/user/${userId}`, {
        oldPassword: oldPassword,
        newPassword: newPassword,
      });

      console.log("Password updated successfully:", response.data);
      if (response.data.status === 201) {
        toast.success(response.data.message);
        closeModal();
      } else {
        toast.error(response.data.message);
      }
    } catch (error: any) {
      console.error("Error updating password:", error);
      toast.error("Error updating password");
    }
  };

  return (
    <>
      
        <Sidebar
          toggleSidebar={toggleSidebar}
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
          isSidebarOpen={isSidebarOpen}
          closeSidebar={closeSidebar}
        />
        <div className={`lg:pl-72 ${isSidebarOpen ? "pl-0" : ""}`}>
          <Top
            toggleSidebar={toggleSidebar}
            isSidebarOpen={isSidebarOpen}
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
          />
          <main className="py-5">
            <div className="mx-auto px-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-2xl">
                Your Details . . 
              </h1>
              {notification && (
                <div 
                  className={`mt-4 p-4 rounded-md ${
                    notification.type === 'success' 
                      ? 'bg-green-50 text-green-800 border border-green-200' 
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}
                >
                  <div className="flex">
                    <div className="flex-shrink-0">
                      {notification.type === 'success' ? (
                        <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium">{notification.message}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="px-4 sm:px-6 lg:px-8">
              <form
                className={` mt-4 ${
                  isEditMode
                    ? "bg-gray-50 border border-gray-300 p-4 rounded-md"
                    : ""
                }`}
                method="POST"
              >
                <div className="mt-6 flex flex-col">
                  <div className="flex flex-col md:flex-row gap-5 md:gap-10 items-center w-full mb-3">
                    <div className="mt-2 lg:hidden">
                      <div className="flex items-center">
                        <div
                          className="inline-block h-20 w-20 flex-shrink-0 overflow-hidden rounded-full"
                          aria-hidden="true"
                        >
                          {imageUrl && (
                            <Image
                              className="h-full w-full rounded-full"
                              src={imageUrl}
                              alt="User Initial"
                              width={100}
                              height={100}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="relative hidden overflow-hidden rounded-full lg:block">
                      {imageUrl && (
                        <Image
                          className="relative h-24 w-24 rounded-full object-cover"
                          src={imageUrl}
                          alt="User profile"
                          width={100}
                          height={100}
                        />
                      )}
                    </div>
                    <div className="flex gap-3">
                      <div className="flex items-center justify-center gap-x-6">
                        <button
                          className="flex justify-center rounded-md bg-red-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-600"
                          onClick={async () => {
                            try {
                              const response = await fetch(`${auth.ip}forgotpassword`, {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ email: formData.email })
                              });
                              const data = await response.json();
                              if (response.ok) {
                                showNotification('Password reset link has been sent to your email', 'success');
                              } else {
                                showNotification(data.message || 'Failed to send reset link', 'error');
                              }
                            } catch (error) {
                              console.error('Error sending reset link:', error);
                              showNotification('An error occurred while sending reset link', 'error');
                            }
                          }}
                          type="button"
                        >
                          Reset Password
                        </button>
                        <Modal
                          isOpen={isOpen}
                          onClose={closeModal}
                          title="Reset Password"
                        >
                          <div className="p-4 flex flex-col justify-between items-center w-full gap-2">
                            <div className="mb-4 w-full">
                              <label
                                htmlFor="oldPassword"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Old Password
                              </label>
                              <input
                                type="password"
                                id="oldPassword"
                                name="oldPassword"
                                className="mt-1 block w-full px-3 py-1.5 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                                value={oldPassword}
                                onChange={handleOldPasswordChange}
                                required
                              />
                            </div>
                            <div className="mb-4 w-full">
                              <label
                                htmlFor="newPassword"
                                className="block text-sm font-medium text-gray-700"
                              >
                                New Password
                              </label>
                              <input
                                type="password"
                                id="newPassword"
                                name="newPassword"
                                className="mt-1 block w-full px-3 py-1.5 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                                value={newPassword}
                                onChange={handleNewPasswordChange}
                                required
                              />
                            </div>
                            <div className="mb-4 w-full">
                              <label
                                htmlFor="confirmPassword"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Confirm New Password
                              </label>
                              <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                required
                              />
                            </div>
                            <div className="mt-4 flex justify-between items-center gap-4">
                              <button
                                type="button"
                                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                onClick={closeModal}
                              >
                                Cancel
                              </button>
                              <button
                                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                onClick={resetPassword}
                                type="button"
                              >
                                Reset Password
                              </button>
                            </div>
                          </div>
                        </Modal>
                      </div>
                      <div className="flex items-center justify-center gap-x-6">
                        <div className="flex items-center justify-center gap-x-3">
                          {isEditMode ? (
                            <>
                              <button
                                type="button"
                                className="flex justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500"
                                onClick={saveUpdatedInfo}
                              >
                                Save
                              </button>
                              <button
                                type="button"
                                className="flex justify-center rounded-md bg-gray-300 px-3 py-1.5 text-sm font-semibold leading-6 text-gray-700 shadow-sm hover:bg-gray-400"
                                onClick={toggleEditMode}
                              >
                                Cancel
                              </button>
                            </>
                          ) : (
                            <button
                              type="button"
                              className="flex justify-center rounded-md bg-blue-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-300"
                              onClick={toggleEditMode}
                            >
                              Edit
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-grow space-y-3 md:space-y-6">
                    {/* Email */}
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-0 md:gap-10 w-full">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className={`mt-2 md:mt-0 block w-full rounded-md px-3 py-1.5 shadow-sm border border-gray-300`}
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={!isEditMode}
                      />
                    </div>

                    {/* First Name and Last Name */}
                    <div className="flex flex-col md:flex-row items-center gap-2.5 md:gap-10">
                      <div className="w-full md:w-1/2">
                        <label
                          htmlFor="firstName"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          First Name
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          id="firstName"
                          className="mt-2 block w-full rounded-md px-3 py-1.5 shadow-sm border border-gray-300"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          disabled={!isEditMode}
                        />
                      </div>
                      <div className="w-full md:w-1/2">
                        <label
                          htmlFor="lastName"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          id="lastName"
                          className="mt-2 block w-full rounded-md px-3 py-1.5 shadow-sm border border-gray-300"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          disabled={!isEditMode}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-2.5 md:gap-10">
                      {/* Company Name */}
                      <div className="w-full md:w-1/2">
                        <label
                          htmlFor="companyName"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Company Name
                        </label>
                        <input
                          type="text"
                          name="companyName"
                          id="companyName"
                          className="mt-2 block w-full rounded-md px-3 py-1.5 shadow-sm border border-gray-300"
                          value={formData.companyName}
                          onChange={handleInputChange}
                          disabled={!isEditMode}
                        />
                      </div>
                      <div className="w-full md:w-1/2"></div>
                    </div>

                    {/* Phone and Date of Birth */}
                    <div className="flex flex-col md:flex-row items-center gap-2.5 md:gap-10">
                      <div className="w-full md:w-1/2">
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Phone
                        </label>
                        <input
                          type="text"
                          name="phone"
                          id="phone"
                          className="mt-2 block w-full rounded-md px-3 py-1.5 shadow-sm border border-gray-300"
                          value={formData.phone}
                          onChange={handleInputChange}
                          disabled={!isEditMode}
                        />
                      </div>
                      <div className="w-full md:w-1/2">
                        <label
                          htmlFor="dob"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          name="dob"
                          id="dob"
                          className="mt-2 block w-full rounded-md px-3 py-1.5 shadow-sm border border-gray-300"
                          value={dateofBirth}
                          onChange={(e) => setDateOfBirth(e.target.value)}
                          disabled={!isEditMode}
                        />
                      </div>
                    </div>

                    {/* Address fields */}
                    <div className="w-full">
                      <label
                        htmlFor="address"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        id="address"
                        className="mt-2 block w-full rounded-md px-3 py-1.5 shadow-sm border border-gray-300"
                        value={formData.address}
                        onChange={handleInputChange}
                        disabled={!isEditMode}
                      />
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-2.5 md:gap-10">
                      <div className="w-full md:w-1/2">
                        <label
                          htmlFor="apartment"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Apartment, Suite
                        </label>
                        <input
                          type="text"
                          name="apartment"
                          id="apartment"
                          className="mt-2 block w-full rounded-md px-3 py-1.5 shadow-sm border border-gray-300"
                          value={formData.apartment}
                          onChange={handleInputChange}
                          disabled={!isEditMode}
                        />
                      </div>
                      <div className="w-full md:w-1/2">
                        <label
                          htmlFor="county"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          County
                        </label>
                        <input
                          type="text"
                          name="county"
                          id="county"
                          className="mt-2 block w-full rounded-md px-3 py-1.5 shadow-sm border border-gray-300"
                          value={formData.county}
                          onChange={handleInputChange}
                          disabled={!isEditMode}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-2.5 md:gap-10">
                      <div className="w-full md:w-1/2">
                        <label
                          htmlFor="city"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          id="city"
                          className="mt-2 block w-full rounded-md px-3 py-1.5 shadow-sm border border-gray-300"
                          value={formData.city}
                          onChange={handleInputChange}
                          disabled={!isEditMode}
                        />
                      </div>
                      <div className="w-full md:w-1/2">
                        <label
                          htmlFor="country"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Country
                        </label>
                        <input
                          type="text"
                          name="country"
                          id="country"
                          className="mt-2 block w-full rounded-md px-3 py-1.5 shadow-sm border border-gray-300"
                          value={formData.country}
                          onChange={handleInputChange}
                          disabled={!isEditMode}
                        />
                      </div>
                      <div className="w-full md:w-1/2">
                        <label
                          htmlFor="postalCode"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Postal Code
                        </label>
                        <input
                          type="text"
                          name="postalCode"
                          id="postalCode"
                          className="mt-2 block w-full rounded-md px-3 py-1.5 shadow-sm border border-gray-300"
                          value={formData.postalCode}
                          onChange={handleInputChange}
                          disabled={!isEditMode}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </main>
        </div>
    </>
  );
};

export default Dashboard;
