"use client";
import dynamic from "next/dynamic";
const NewsletterModal = dynamic(
  () => import("@/app/components/common/NewsletterModal"),
  {
    ssr: false,
  }
);
const ThankYouModal = dynamic(
  () => import("@/app/components/common/ThankYou"),
  {
    ssr: false,
  }
);
import type { Order } from "@/app/components/common/ThankYou";
const Footer = dynamic(() => import("@/app/components/footer/footer"), {
  ssr: false,
});
const Nav = dynamic(() => import("@/app/components/navbar/Nav"), {
  ssr: false,
});
const TopBar = dynamic(() => import("@/app/topbar/page"), {
  ssr: false,
});
import React, { useEffect, useRef, useState } from "react";
const LoadingBar = dynamic(() => import("react-top-loading-bar"), {
  ssr: false,
});
const LoginForm = dynamic(
  () => import("@/app/(routes)/checkout/components/LoginForm"),
  {
    ssr: false,
  }
);
const RegisterForm = dynamic(
  () => import("@/app/(routes)/checkout/components/RegisterForm"),
  {
    ssr: false,
  }
);
const ProductDetails = dynamic(
  () => import("@/app/(routes)/checkout/components/ProductDetails"),
  {
    ssr: false,
  }
);
import { useAuth } from "@/app/context/Auth";
import {
  ContactInfo,
  Coupon,
  Errors,
  ProductItem,
  ShippingInformation, 
} from "../../../../types";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { RootState } from "@/app/lib/store";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { clearUser, setUser } from "@/app/lib/features/userslice/userSlice";
import axios from "axios";
import { toast } from "react-toastify";
import { setPaymentDetails } from "@/app/lib/features/paymentdetails/paymentDetailsSlice";
import TrustBoxWidget from "@/app/components/trusBoxWidget";
import { Elements } from "@stripe/react-stripe-js";
const PaymentForm = dynamic(
  () => import("@/app/(routes)/checkout/components/PaymentForm"),
  {
    ssr: false,
  }
);

export default function CheckoutPage() {
  const auth = useAuth();
  const [stripePromise, setStripePromise] = useState<Stripe | null>(null);
  const [clientSecret, setClientSecret] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);
  const [navToken, setNavToken] = useState<number>(0);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [errState, setErrState] = useState<boolean>(false);
  const [KalkoData, setKalkoData] = useState<Order | null>(null);
  const userState = useAppSelector((state: RootState) => state.user); // Ensure RootState is correctly defined
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);
  const [shouldSubmitOrderNow, setShouldSubmitOrderNow] =
    useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [Cpassword, setCPassword] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [productId, setProductId] = useState<Record<string, any>>({});
  const [triggerClientSecretFetch, setTriggerClientSecretFetch] =
    useState<boolean>(false);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [enteredCoupon, setEnteredCoupon] = useState<string>("");
  const [isCouponValid, setIsCouponValid] = useState<boolean>(false);
  const [couponError, setCouponError] = useState<string>("");
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    email: auth?.user?.email || "",
    userId: auth?.user?._id || "",
  });
  const [orderSuccess, setOrderSuccess] = useState<boolean>(false);
  const [createAccount, setCreateAccount] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    password: "",
    county: "",
    confirmPassword: "",
  });

  const [userInfo, setUserInfo] = useState<ContactInfo>({
    email: "",
    userId: "",
  });
  const [shippingInformation, setShippingInformation] =
    useState<ShippingInformation>({
      firstName: auth?.user?.firstname || "",
      lastName: auth?.user?.lastname || "",
      companyName: auth?.user?.companyname || "",
      address: auth?.user?.address?.address || "",
      apartment: auth?.user?.address?.apartment || "",
      country: auth?.user?.address?.country || "United Kingdom",
      city: auth?.user?.address?.city || "",
      county: auth?.user?.address?.county || "",
      postalCode: auth?.user?.address?.postalCode || "",
      phoneNumber: auth?.user?.phoneNumber || "",
    });
  const [orderSubmitted, setOrderSubmitted] = useState<boolean>(false);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [discountedPrice, setDiscountedPrice] = useState<number>(0);
  const orderSubmittedRef = useRef<boolean>(false);
  const [shouldTriggerPayment, setShouldTriggerPayment] =
    useState<boolean>(false);
  const [totalSalePrice, setTotalSalePrice] = useState<number>(0);
  const [isCouponApplied, setIsCouponApplied] = useState<boolean>(false);
  // More state declarations
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [showWarning, setShowWarning] = useState<boolean>(false);
  const [paymentDetailsFetched, setPaymentDetailsFetched] =
    useState<boolean>(false);
  // functions
  const toggleFormVisibility = () => setShowForm(!showForm);
  const closeModal = () => setOrderSuccess(false);
  const dispatch = useAppDispatch();
  const paymentDetails = useAppSelector((state) => state.payment);
  console.log("Payment Details:", paymentDetails);
  // useEffect to update the shipping information when the user logs in
  useEffect(() => {
    if (auth?.user) {
      console.log("Logged-in User ID:", auth.user._id);
      setEmail(auth?.user?.email);
      setShippingInformation({
        firstName: auth?.user?.firstname || "",
        lastName: auth?.user?.lastname || "",
        companyName: auth?.user?.companyname || "",
        address: auth?.user?.address?.address || "",
        apartment: auth?.user?.address?.apartment || "",
        country: auth?.user?.address?.country || "United Kingdom",
        city: auth?.user?.address?.city || "",
        county: auth?.user?.address?.county || "",
        postalCode: auth?.user?.address?.postalCode || "",
        phoneNumber: auth?.user?.phoneNumber || "",
      });
    }
  }, [auth.user]);

  const validateEmailAndUserId = (email: string, userId: string) => {
    if (
      !email ||
      email.trim() === "" ||
      !email.includes("@") ||
      !userId ||
      userId.trim() === ""
    ) {
      return false;
    }
    return true;
  };
  const handleLogin = async () => {
    setProgress(50);
    console.log("Email:", email);
    console.log("Password:", password);

    const tempErrors: Errors = {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      city: "",
      postalCode: "",
      country: "",
      password: "",
      county: "",
      confirmPassword: "",
    };

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      tempErrors.email = "Enter a valid email address";
    }

    // Password validation
    if (!password || password.length < 4) {
      tempErrors.password = "Password must be at least 4 characters long";
    }

    // If errors exist, update state and return
    if (tempErrors.email || tempErrors.password) {
      setErrors(tempErrors);
      setProgress(100);
      return false;
    }

    // Clear errors if validations pass
    setErrors({
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      city: "",
      postalCode: "",
      country: "",
      password: "",
      county: "",
      confirmPassword: "",
    });

    try {
      const response = await axios.post(`${auth.ip}login`, {
        email,
        password,
      });

      if (response.data.status === 201) {
        console.log("Email:", response.data.user.email);
        console.log("User ID:", response.data.user._id);

        dispatch(
          setUser({
            email: response.data.user.email,
            userId: response.data.user._id,
          })
        );
        setUserInfo({
          email: response.data.user.email,
          userId: response.data.user._id,
        });

        auth.login(response.data.user);
        setErrState(false);
        setProgress(100);
        return response.data.user;
      } else {
        setErrState(true);
        setProgress(100);
        return false;
      }
    } catch (error) {
      console.log("Login failed. Please try again.");
      setErrState(true);
      setProgress(100);
      return false;
    }
  };
  const submitOrder = async () => {
    setProgress(50);

    try {
      const contactInformation: { email?: string; userId?: string } = {};

      // Determine valid contact information
      if (validateEmailAndUserId(userState.email, userState.userId)) {
        contactInformation.email = userState.email;
        contactInformation.userId = userState.userId;
      } else if (
        validateEmailAndUserId(contactInfo.email, contactInfo.userId)
      ) {
        contactInformation.email = contactInfo.email;
        contactInformation.userId = contactInfo.userId;
      } else if (validateEmailAndUserId(userInfo.email, userInfo.userId)) {
        contactInformation.email = userInfo.email;
        contactInformation.userId = userInfo.userId;
      } else {
        throw new Error("Invalid email or userId");
      }

      const cartData = JSON.parse(localStorage.getItem("cart") || "[]");
      const appliedCouponData = JSON.parse(
        localStorage.getItem("appliedcoupon") || "null"
      );

      if (!paymentDetailsFetched) {
        console.log("Payment details not fetched yet. Please wait...");
        return;
      }

      const storedOrderNumber =
        localStorage.getItem("createdOrderNumber") || null;

      const orderData = {
        cart: cartData || products,
        shippingInformation,
        contactInformation,
        coupon: appliedCouponData || appliedCoupon,
        // paymentDetails,
        orderNumber: storedOrderNumber,
        status: "Pending",
      };

      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        event: "purchase",
        ecommerce: {
          transaction_id: storedOrderNumber || "N/A",
          value: discountedPrice,
          currency: "GBP",
          items: cartData.map((item: any) => ({
            item_name: item.productName,
            item_id: item.productId,
            price: item.salePrice,
            quantity: item.qty,
          })),
        },
      });

      // Dynamically load the ks.js script
      const script = document.createElement("script");
      script.src = "https://s.kk-resources.com/ks.js";
      script.async = true;
      document.body.appendChild(script);

      console.log("Data Layer Updated:", (window as any).dataLayer);

      const response = await axios.post(`${auth.ip}create/order`, orderData);

      if (response.data.status === 201) {
        toast.success(response.data.message);
        console.log(response.data.order);
        setKalkoData(response.data.order);
        setErrState(false);
        setProgress(100);
        dispatch(clearUser());
        return true;
      } else {
        setErrState(true);
        setProgress(100);
        return false;
      }
    } catch (error) {
      console.error(error);
      console.log("Order submission failed. Please try again.");
      setErrState(true);
      setProgress(100);
      return false;
    }
  };
  const handleSubmitOrderAfterPayment = async () => {
    const queryParams = new URLSearchParams(window.location.search);
    const paymentSuccess = queryParams.get("payment_success");
    const sessionId = queryParams.get("session_id");

    if (paymentSuccess === "true" && sessionId) {
      if (!paymentDetails.paymentIntentId) {
        try {
          const response = await fetch(
            `${auth.ip}retrieve-payment-details-session`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ sessionId }),
            }
          );

          const data = await response.json();

          if (response.ok && data.cardDetails) {
            dispatch(
              setPaymentDetails({
                paymentIntentId: data.paymentIntentId,
                paymentMethodId: data.paymentMethodId || null,
                cardDetails: data.cardDetails,
              })
            );

            setPaymentDetailsFetched(true);
          } else {
            throw new Error(
              "Required payment details not found in backend response."
            );
          }
        } catch (error) {
          console.error("Error retrieving payment details:", error);
        }
      } else {
        setPaymentDetailsFetched(true);
      }
    }
  };
  useEffect(() => {
    handleSubmitOrderAfterPayment();
  }, [location.search, paymentDetails, submitOrder]);

  // Trigger order submission upon successful payment details retrieval
  useEffect(() => {
    if (paymentDetailsFetched) {
      async function submitOrderAndHandleResult() {
        const orderSuccess = await submitOrder();
        if (orderSuccess) {
          setOrderSuccess(true);
          localStorage.removeItem("clientSecret");
          localStorage.removeItem("cart");
          localStorage.removeItem("appliedcoupon");
          localStorage.removeItem("paymentIntentId");
          localStorage.removeItem("cart-old");
          localStorage.removeItem("createdOrderNumber");
        }
      }
      submitOrderAndHandleResult();
    }
  }, [paymentDetailsFetched]);

  // useEffect to manage order submission based on contactInfo
  useEffect(() => {
    if (
      contactInfo.email &&
      contactInfo.userId &&
      shouldSubmitOrderNow &&
      !orderSubmitted
    ) {
      if (validateEmailAndUserId(contactInfo.email, contactInfo.userId)) {
        submitOrder();
      }
    }
  }, [contactInfo, shouldSubmitOrderNow]);

  // useEffect to manage order submission based on userInfo
  useEffect(() => {
    if (
      userInfo.email &&
      userInfo.userId &&
      shouldSubmitOrderNow &&
      !orderSubmitted
    ) {
      if (validateEmailAndUserId(userInfo.email, userInfo.userId)) {
        submitOrder();
      }
    }
  }, [userInfo, shouldSubmitOrderNow]);
  // Fetch Stripe publishable key on component mountuseEffect(() => {
  useEffect(() => {
    async function fetchStripePromise() {
      const response = await fetch("https://api.zextons.co.uk/config");
      const { publishableKey } = await response.json();
      const stripe: Stripe | null = await loadStripe(publishableKey);
      if (stripe) {
        setStripePromise(stripe);
      } else {
        setStripePromise(null);
      }
    }
    fetchStripePromise();
  }, []); // End of useEffect
  const handleApplyCoupon = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCouponError(""); // Clear any previous errors
    
    if (isCouponValid) {
      const coupon: any = coupons.find(
        (coupon) => coupon.code.toLowerCase() === enteredCoupon.toLowerCase()
      );
      
      // First check: Verify if coupon is expired
      const currentDate = new Date();
      const expiryDate = new Date(coupon.expiryDate);
      
      if (expiryDate < currentDate) {
        setCouponError("This coupon has expired.");
        return;
      }
      
      // Second check: Verify minimum order value
      // Get the current cart total
      const cartData = JSON.parse(localStorage.getItem("cart") || "[]");
      const currentTotal = cartData.reduce(
        (total: number, product: { salePrice: number; qty: number }) => {
          return total + parseFloat((product.salePrice * product.qty).toFixed(2));
        },
        0
      );
      
      if (coupon.minOrderValue > 0 && currentTotal < coupon.minOrderValue) {
        setCouponError(`This coupon requires a minimum order of £${coupon.minOrderValue}.`);
        return;
      }
      
      // Third check: If coupon doesn't allow multiple uses, check if user has already used it
      if (auth?.user?._id && !coupon.allowMultiple && coupon.usageHistory && coupon.usageHistory.length > 0) {
        const hasUserUsedCoupon = coupon.usageHistory.some(
          (usage: { userId: string }) => usage.userId === auth.user?._id
        );
        
        if (hasUserUsedCoupon) {
          setCouponError("You have already used this coupon.");
          return;
        }
      }
      
      setAppliedCoupon(coupon);
      // Success message will be shown in the UI

      localStorage.removeItem("appliedcoupon");
      localStorage.setItem("appliedcoupon", JSON.stringify(coupon));

      setIsCouponApplied(true);

      // Call the refactored function to update the checkout session if needed
      // updateCheckoutSession(coupon);
    }
  };
  const handleCreateAcc = async () => {
    setProgress(50);

    // Destructure shipping information
    const {
      firstName,
      lastName,
      companyName,
      phoneNumber,
      address,
      apartment,
      city,
      county,
      postalCode,
      country,
    } = shippingInformation;

    // Initialize errors object
    const tempErrors: Errors = {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      city: "",
      postalCode: "",
      country: "",
      password: "",
      county: "",
      confirmPassword: "",
    };

    // Validation checks
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      tempErrors.email = "Enter a valid email address";
    }

    const nameRegex = /^[a-zA-Z]+(?: [a-zA-Z]+)?$/;
    if (!firstName || !nameRegex.test(firstName)) {
      tempErrors.firstName = "Enter a valid first name (letters only)";
    }
    if (!lastName || !nameRegex.test(lastName)) {
      tempErrors.lastName = "Enter a valid last name (letters only)";
    }

    const phoneRegex = /^(?:0|\+?44)(?:\d\s?){9,10}$/;
    if (!phoneNumber || !phoneRegex.test(phoneNumber)) {
      tempErrors.phoneNumber = "Enter a valid UK phone number";
    }

    if (!address || address.trim().length === 0) {
      tempErrors.address = "Enter a valid address";
    }

    const cityRegex = /^[a-zA-Z\s\-]+$/;
    if (!city || !cityRegex.test(city) || city.length < 2) {
      tempErrors.city =
        "Enter a valid city name (letters, spaces, and hyphens only)";
    }

    const postalCodeRegex = /^([A-Z]{1,2}\d{1,2}[A-Z]?\s?\d[A-Z]{2})$/i;
    if (!postalCode || !postalCodeRegex.test(postalCode)) {
      tempErrors.postalCode = "Enter a valid UK postal code";
    }

    if (!password || password.length < 4) {
      tempErrors.password = "Password must be at least 4 characters long";
    } else if (Cpassword !== password) {
      tempErrors.confirmPassword = "Passwords do not match";
    }

    // Check if there are any errors
    const hasErrors = Object.values(tempErrors).some((error) => error !== "");

    if (hasErrors) {
      setErrors(tempErrors);
      setProgress(100);
      // toast.error("Please fix the validation errors");
      return false;
    }

    // Clear previous errors
    setErrors({
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      city: "",
      postalCode: "",
      country: "",
      password: "",
      county: "",
      confirmPassword: "",
    });

    // Attempt registration
    try {
      console.log("Registration payload:", {
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
        companyname: companyName,
        address: {
          address,
          apartment,
          country,
          city,
          county,
          postalCode,
        },
      });

      const response = await axios.post(`${auth.ip}register`, {
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
        companyname: companyName,
        address: {
          address,
          apartment,
          country,
          city,
          county,
          postalCode,
        },
      });

      console.log("Registration response:", response.data);

      if (response.data.status === 201) {
        setErrState(false);
        setProgress(100);
        toast.success("Registration successful!");
        return true;
      } else if (response.data.status === 400) {
        console.log(response.data.status);
        console.log("Registration failed", response.data);
        setErrState(true);
        setProgress(100);
        
        // Create updated errors object
        const updatedErrors = { ...tempErrors };
        
        // Check if the error message contains specific keywords to determine where to display it
        const errorMessage = response.data.message || "Registration failed";
        
        if (errorMessage.toLowerCase().includes("email")) {
          updatedErrors.email = errorMessage;
        } else if (errorMessage.toLowerCase().includes("phone") || 
                  errorMessage.toLowerCase().includes("number") || 
                  errorMessage.toLowerCase().includes("mobile")) {
          updatedErrors.phoneNumber = errorMessage;
        } else {
          // Default to email field if we can't determine which field the error belongs to
          updatedErrors.email = errorMessage;
        }
        
        setErrors(updatedErrors);
        return false;
      } else {
        setErrState(true);
        setProgress(100);
        
        // Set a generic error message in the email field for other error cases
        const updatedErrors = { ...tempErrors };
        updatedErrors.email = response.data.message || "Registration failed";
        setErrors(updatedErrors);
        
        return false;
      }
    } catch (error: any) {
      console.error("Registration error:", error);
      setErrState(true);
      setProgress(100);
      
      // Handle error from the API response
      const errorMessage = error.response?.data?.message || "Registration failed. Please try again.";
      const updatedErrors = { ...tempErrors };
      
      // Try to determine which field the error belongs to
      if (errorMessage.toLowerCase().includes("email")) {
        updatedErrors.email = errorMessage;
      } else if (errorMessage.toLowerCase().includes("phone") || 
                errorMessage.toLowerCase().includes("number") || 
                errorMessage.toLowerCase().includes("mobile")) {
        updatedErrors.phoneNumber = errorMessage;
      } else {
        // Default to email field if we can't determine
        updatedErrors.email = errorMessage;
      }
      
      setErrors(updatedErrors);
      
      return false;
    }
  };
  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingInformation((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };
  const handleTermsCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsChecked(e.target.checked);
    setShowWarning(false); // Hide warning when the user checks the box
  };
  const getCoupons = () => {
    setProgress(50);
    axios
      .get(`${auth.ip}get/all/coupons`)
      .then((response) => {
        if (response.data.status === 201) {
          console.log(response.data);
          setCoupons(response.data.coupon);
          setProgress(100);
        } else {
          console.log("Failed to load coupons");
          setProgress(100);
        }
      })
      .catch((error) => {
        console.log("An error occurred while loading coupons");
        console.error("Error:", error);
        setProgress(100);
      });
  };

  // Function to handle coupon input change
  const handleCouponInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const code = event.target.value;
    setEnteredCoupon(code);
    setCouponError(""); // Clear error when input changes

    // Find the coupon with matching code
    const matchingCoupon = coupons.find(
      (coupon) => coupon.code.toLowerCase() === code.toLowerCase()
    );
    
    // Check if coupon exists
    const isValid = !!matchingCoupon;
    setIsCouponValid(isValid);
    
    if (code && !isValid) {
      setCouponError("Invalid coupon code");
    }
  };

  useEffect(() => {
    const storedCoupon = localStorage.getItem("appliedcoupon");
    if (storedCoupon) {
      try {
        const parsedCoupon = JSON.parse(storedCoupon);
        
        // First check: Verify if coupon is expired
        const currentDate = new Date();
        const expiryDate = new Date(parsedCoupon.expiryDate);
        
        if (expiryDate < currentDate) {
          // If coupon is expired, remove it
          localStorage.removeItem("appliedcoupon");
          toast.error("Coupon removed: it has expired.");
          return;
        }
        
        // Second check: Verify minimum order value
        // Get the current cart total
        const cartData = JSON.parse(localStorage.getItem("cart") || "[]");
        const currentTotal = cartData.reduce(
          (total: number, product: { salePrice: number; qty: number }) => {
            return total + parseFloat((product.salePrice * product.qty).toFixed(2));
          },
          0
        );
        
        if (parsedCoupon.minOrderValue > 0 && currentTotal < parsedCoupon.minOrderValue) {
          // If cart total is now below minimum, remove the coupon
          localStorage.removeItem("appliedcoupon");
          toast.error(`Coupon removed: minimum order of £${parsedCoupon.minOrderValue} not met.`);
        } else {
          setAppliedCoupon(parsedCoupon);
          setIsCouponApplied(true);
        }
      } catch (error) {
        console.error("Error parsing stored coupon:", error);
      }
    }
  }, []);

  // Function to register, log in, and confirm order

  const handlePlaceOrder = async (
    e?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e?.preventDefault();
    setProgress(50);

    try {
      const contactInformation: { email?: string; userId?: string } = {};

      // First check for userForOrder in localStorage (highest priority)
      const userForOrder = JSON.parse(
        localStorage.getItem("userForOrder") || "{}"
      );

      // Determine valid contact information
      if (userForOrder && userForOrder.email && userForOrder._id) {
        // Use the data from localStorage first (most recent)
        contactInformation.email = userForOrder.email;
        contactInformation.userId = userForOrder._id;
        console.log("Using userForOrder data:", userForOrder);
      } else if (validateEmailAndUserId(userState.email, userState.userId)) {
        contactInformation.email = userState.email;
        contactInformation.userId = userState.userId;
        console.log("Using userState data:", contactInformation);
      } else if (
        validateEmailAndUserId(contactInfo.email, contactInfo.userId)
      ) {
        contactInformation.email = contactInfo.email;
        contactInformation.userId = contactInfo.userId;
        console.log("Using contactInfo data:", contactInformation);
      } else if (validateEmailAndUserId(userInfo.email, userInfo.userId)) {
        contactInformation.email = userInfo.email;
        contactInformation.userId = userInfo.userId;
        console.log("Using userInfo data:", contactInformation);
      } else {
        console.error("No valid user information found:", {
          userForOrder,
          userState: { email: userState.email, userId: userState.userId },
          contactInfo: { email: contactInfo.email, userId: contactInfo.userId },
          userInfo: { email: userInfo.email, userId: userInfo.userId }
        });
        throw new Error("Invalid email or userId");
      }

      // Step 1: Validate Terms
      if (!isChecked) {
        setShowWarning(true);
        toast.error("Please accept the terms and conditions");
        setProgress(100);
        return;
      }

      // Step 2: Validate Cart
      const cartData = localStorage.getItem("cart");
      if (!cartData) {
        toast.error("Your cart is empty");
        setProgress(100);
        return;
      }
      const parsedCartData = JSON.parse(cartData.trim());
      if (!Array.isArray(parsedCartData) || parsedCartData.length === 0) {
        toast.error("Your cart is empty");
        setProgress(100);
        return;
      }

      // Step 3: Validate Form Data
      const tempErrors: Errors = {
        firstName: "",
        lastName: "",
        phoneNumber: "",
        address: "",
        city: "",
        postalCode: "",
        country: "",
        password: "",
        county: "",
        confirmPassword: "",
      };

      // Shipping validation
      if (
        !shippingInformation.firstName ||
        !/^[a-zA-Z]+(?: [a-zA-Z]+)?$/.test(shippingInformation.firstName)
      ) {
        tempErrors.firstName = "Enter a valid first name";
      }
      if (
        !shippingInformation.lastName ||
        !/^[a-zA-Z]+(?: [a-zA-Z]+)?$/.test(shippingInformation.lastName)
      ) {
        tempErrors.lastName = "Enter a valid last name";
      }
      if (
        !shippingInformation.phoneNumber ||
        !/^(?:0|\+?44)(?:\d\s?){9,10}$/.test(shippingInformation.phoneNumber)
      ) {
        tempErrors.phoneNumber = "Enter a valid UK phone number";
      }
      if (
        !shippingInformation.address ||
        shippingInformation.address.trim().length === 0
      ) {
        tempErrors.address = "Enter a valid address";
      }
      if (
        !shippingInformation.postalCode ||
        !/^[A-Z]{1,2}\d{1,2}[A-Z]?\s?\d[A-Z]{2}$/i.test(
          shippingInformation.postalCode
        )
      ) {
        tempErrors.postalCode = "Enter a valid UK postal code";
      }

      // Check for validation errors
      const hasErrors = Object.values(tempErrors).some((error) => error !== "");
      if (hasErrors) {
        setErrors(tempErrors);
        // toast.error("Please fix the validation errors");
        setProgress(100);
        return;
      }

      // Step 4: Prepare Order Data
      const appliedCouponData = JSON.parse(
        localStorage.getItem("appliedcoupon") || "null"
      );
      const storedOrderNumber =
        localStorage.getItem("createdOrderNumber") || null;

      const orderData = {
        cart: parsedCartData,
        shippingInformation,
        contactInformation,
        coupon: appliedCouponData || appliedCoupon,
        orderNumber: storedOrderNumber,
        status: "Failed",
      };

      console.log("Order data:", orderData);
      // return;

      // Step 5: Create Order
      const orderResponse = await axios.post(
        `${auth.ip}create/order`,
        orderData
      );

      if (orderResponse.data.status === 201) {
        // Step 6: Handle Order Success
        const orderNumber: string = orderResponse.data.orderNumber;

        if (!storedOrderNumber) {
          localStorage.setItem("createdOrderNumber", orderNumber);
        }

        // Step 7: Create Checkout Session
        const amountInPence = Math.round(discountedPrice * 100);

        // Store cart data as backup
        localStorage.setItem("cart-old", JSON.stringify(parsedCartData));

        const sessionResponse = await fetch(
          `${auth.ip}create-checkout-session`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              cartproducts: parsedCartData,
              paymentIntentId: localStorage.getItem("paymentIntentId") || null,
              amount: amountInPence,
              coupondata: appliedCoupon,
              shippingInformation,
              contactInformation: contactInfo,
            }),
          }
        );

        if (!sessionResponse.ok) {
          throw new Error(
            `Checkout session creation failed: ${sessionResponse.statusText}`
          );
        }

        const sessionData = await sessionResponse.json();

        // Step 8: Handle Session Data
        if (!sessionData.url || !sessionData.clientSecret) {
          throw new Error("Invalid checkout session data received");
        }

        // Store session data
        setClientSecret(sessionData.clientSecret);
        localStorage.setItem("clientSecret", sessionData.clientSecret);
        if (sessionData.paymentIntentId) {
          localStorage.setItem("paymentIntentId", sessionData.paymentIntentId);
        }

        // Redirect to checkout
        window.location.href = sessionData.url;
      } else {
        toast.error(orderResponse.data.message || "Failed to create order. Please try again.");
        setProgress(100);
      }
    } catch (error: any) {
      console.error("Order creation failed:", error);
      toast.error(error.message || "Failed to create order. Please try again.");
      setProgress(100);
    }
  };

  const handleRegisterAndConfirmOrder = async () => {
    try {
      const registerSuccess = await handleCreateAcc();
      if (registerSuccess) {
        const loginSuccess = await handleLogin();

        if (loginSuccess) {
          // Store user info for order with the correct property names
          const userForOrderData = { 
            email: loginSuccess.email, 
            _id: loginSuccess._id 
          };
          
          // Save to localStorage for the handlePlaceOrder function to use
          localStorage.setItem(
            "userForOrder",
            JSON.stringify(userForOrderData)
          );
          
          // Update contact info state
          setContactInfo({
            email: loginSuccess.email,
            userId: loginSuccess._id
          });
          
          // Call login handler from auth context
          auth.login(loginSuccess);

          console.log("User registered and logged in successfully:", userForOrderData);

          
          // Increase delay to ensure state updates and localStorage is available
          setTimeout(async () => {
            try {
              await handlePlaceOrder();
              setShouldTriggerPayment(true);
            } catch (error) {
              console.error("Error in delayed handlePlaceOrder:", error);
              toast.error("Error placing order. Please try again.");
            }
          }, 500); // Increased from 100ms to 500ms for more reliable state updates
        }
      }
    } catch (error) {
      console.error("Error during registration and order confirmation:", error);
      toast.error("Error during registration and order confirmation. Please try again.");
    }
  };
  // Function to handle registering and placing the order
  const handleRegisterAndPlaceOrder = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!isChecked) {
      setShowWarning(true);
    } else {
      handleRegisterAndConfirmOrder();
    }
  };
  const calculateTotalSalePrice = (products: any[], coupon: Coupon | null) => {
    let total = products.reduce(
      (total: number, product: { salePrice: number; qty: number }) => {
        return total + parseFloat((product.salePrice * product.qty).toFixed(2));
      },
      0
    );

    if (coupon) {
      if (coupon.discount_type === "flat") {
        total -= coupon.discount;
      } else if (coupon.discount_type === "percentage") {
        const discountAmount = (total * coupon.discount) / 100;
        total -= coupon.upto
          ? Math.min(discountAmount, coupon.upto)
          : discountAmount;
      }
    }

    return total > 0 ? total.toFixed(2) : "0.00";
  };
  const removeFromCart = (productId: any) => {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart = cart.filter((product: { _id: string }) => product._id !== productId);
    localStorage.setItem("cart", JSON.stringify(cart));
    setProducts(cart);

    const newTotalSalePrice = calculateTotalSalePrice(cart, null);
    setTotalSalePrice(newTotalSalePrice);

    if (appliedCoupon) {
      const newDiscountedPrice = calculateTotalSalePrice(cart, appliedCoupon);
      setDiscountedPrice(newDiscountedPrice);
    }

    setNavToken((prevToken: number) => prevToken + 1);
  };
  const calculateDiscountedPrice = (products: any[], coupon: Coupon | null) => {
    let total = calculateTotalSalePrice(products, coupon);

    total = parseFloat(total);
    if (isNaN(total)) total = 0;

    if (coupon) {
      if (coupon.discount_type === "flat") {
        total -= coupon.discount;
      } else if (coupon.discount_type === "percentage") {
        const discountAmount = (total * coupon.discount) / 100;
        total -= coupon.upto
          ? Math.min(discountAmount, coupon.upto)
          : discountAmount;
      }
    }

    return total > 0 ? total.toFixed(2) : "0.00";
  };
  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart") ?? "[]");
    const appliedCouponData = localStorage.getItem("appliedcoupon");
    const parsedAppliedCouponData = appliedCouponData
      ? JSON.parse(appliedCouponData)
      : null;
    if (parsedAppliedCouponData) {
      setAppliedCoupon(parsedAppliedCouponData);
      const discountedTotal = calculateTotalSalePrice(
        cartData,
        parsedAppliedCouponData
      );
      setDiscountedPrice(discountedTotal);
    }

    if (cartData && cartData.length > 0) {
      setProducts(cartData);
    }

    if (cartData && cartData.length > 0) {
      setProductId(cartData[0].productId);
    }

    const cart = JSON.parse(localStorage.getItem("cart") ?? "[]");
    const updatedCart = cart.map((item: { productId: any }) => ({
      ...item,
      productId: item.productId || null,
    }));

    setProducts(updatedCart);

    // Recalculate prices when the cart is loaded from localStorage
    const newTotalSalePrice = calculateTotalSalePrice(updatedCart, null);
    setTotalSalePrice(newTotalSalePrice);

    if (appliedCoupon) {
      const newDiscountedPrice = calculateTotalSalePrice(
        updatedCart,
        appliedCoupon
      );
      setDiscountedPrice(newDiscountedPrice);
    }

    getCoupons();

    const storedCoupon = JSON.parse(
      localStorage.getItem("appliedcoupon") ?? "null"
    );

    setProducts(cartData);
    setTotalSalePrice(calculateTotalSalePrice(cartData, null));

    if (storedCoupon) {
      setAppliedCoupon(storedCoupon);
      setDiscountedPrice(calculateDiscountedPrice(cartData, storedCoupon));
    } else {
      setDiscountedPrice(calculateTotalSalePrice(cartData, null));
    }

    setProducts(cartData); // Set products state from localStorage
    setTotalSalePrice(calculateTotalSalePrice(cartData, null)); // Set the total sale price

    if (storedCoupon) {
      setAppliedCoupon(storedCoupon); // Set the applied coupon if it exists in local storage
      setDiscountedPrice(calculateDiscountedPrice(cartData, storedCoupon)); // Calculate and set discounted price
    } else {
      setDiscountedPrice(calculateTotalSalePrice(cartData, null)); // No coupon, so the discounted price is just the total sale price
    }
  }, []);

  // Recalculate total and discounted prices when products or appliedCoupon change

  // Function to update the checkout session
  const updateCheckoutSession = (coupon = null) => {
    const cartProducts = JSON.parse(localStorage.getItem("cart") ?? "[]");
    const paymentIntentId = localStorage.getItem("paymentIntentId") || null;

    if (paymentIntentId && cartProducts.length > 0) {
      fetch(`${auth.ip}create-checkout-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartproducts: cartProducts,
          paymentIntentId,
          coupondata: coupon,
          shippingInformation,
          contactInformation: contactInfo,
        }),
      })
        .then(async (result) => {
          if (!result.ok)
            throw new Error(`HTTP error! Status: ${result.status}`);
          const data = await result.json();
          setClientSecret(data.clientSecret);
          localStorage.setItem("clientSecret", data.clientSecret);

          if (data.paymentIntentId) {
            localStorage.setItem("paymentIntentId", data.paymentIntentId);
          }
        })
        .catch((error) =>
          console.error("Error fetching client secret:", error)
        );
    }
  };
  useEffect(() => {
    // Recalculate total sale price and discounted price when products or appliedCoupon changes
    setTotalSalePrice(calculateTotalSalePrice(products, null)); // Keep totalSalePrice consistent with the cart total
    setDiscountedPrice(calculateDiscountedPrice(products, appliedCoupon)); // Recalculate discounted price
  }, [products, appliedCoupon]);
  // const appearance = "flat";

  // Enable the skeleton loader UI for optimal loading.
  const loader = "auto";
  // const appearance = "flat";

  return (
    <>
      <NewsletterModal mode="checkout" />
      <LoadingBar
        color="#046d38"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      {/* Mobile menu */}
      <header className="relative">
        <TopBar />
        <Nav />
      </header>
      <main className="mx-auto max-w-7xl px-4 pb-14 pt-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <h1 className="sr-only">Checkout</h1>

          <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
            <div>
              <LoginForm
                toggleFormVisibility={toggleFormVisibility}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                handleLogin={handleLogin}
                showForm={showForm}
                errors={errors}
              />
              <RegisterForm
                handleCreateAcc={handleCreateAcc}
                handleShippingChange={handleShippingChange}
                email={email}
                setEmail={setEmail}
                shippingInformation={shippingInformation}
                password={password}
                setPassword={setPassword}
                Cpassword={Cpassword}
                setCPassword={setCPassword}
                errors={errors}
              />
            </div>
            {/* Order summary */}
            <div className="mt-10 lg:mt-0">
              <div className="bg-gray-200 py-6 px-4 rounded-md xl:flex-row xl:sticky top-[100px]">
                <h2 className="text-lg font-medium text-gray-900 pb-5">
                  Order summary
                </h2>
                <div className="rounded-lg border border-gray-200 bg-white shadow-sm ">
                  <h3 className="sr-only">Items in your cart</h3>
                  <ProductDetails
                    products={products}
                    removeFromCart={removeFromCart}
                    totalSalePrice={totalSalePrice}
                    appliedCoupon={appliedCoupon}
                    showWarning={showWarning}
                    isChecked={isChecked}
                    handleTermsCheckboxChange={handleTermsCheckboxChange}
                    handleApplyCoupon={handleApplyCoupon}
                    handleCouponInputChange={handleCouponInputChange}
                    isCouponValid={isCouponValid}
                    enteredCoupon={enteredCoupon}
                    updateCheckoutSession={updateCheckoutSession}
                    couponError={couponError}
                  />
                  <div>
                    <div className="px-4">
                      {clientSecret && stripePromise && (
                        <Elements
                          stripe={stripePromise}
                          options={{ clientSecret, loader }}
                        >
                          <PaymentForm
                            shouldTriggerPayment={shouldTriggerPayment}
                          />
                        </Elements>
                      )}
                    </div>
                  </div>

                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    {auth.user ? (
                      <div>
                        <button
                          className="w-full rounded-md border border-transparent bg-primary px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-50"
                          onClick={(e) => handlePlaceOrder(e)}
                          disabled={!auth?.user}
                        >
                          Place Order
                        </button>
                      </div>
                    ) : (
                      <div>
                        <button
                          className="w-full rounded-md border border-transparent bg-primary px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-50"
                          onClick={(e) => handleRegisterAndPlaceOrder(e)}
                        >
                          Place Order and Register
                        </button>
                      </div>
                    )}
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <TrustBoxWidget />
        <ThankYouModal
          isOpen={orderSuccess}
          onClose={closeModal}
          order={KalkoData}
        />
      </main>
      <Footer />
    </>
  );
}
