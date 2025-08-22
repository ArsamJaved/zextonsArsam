"use client";

import React, { useState, useEffect } from "react";
import {
  PaymentElement,
} from "@stripe/react-stripe-js";
import {
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

interface PaymentFormProps {
  shouldTriggerPayment: boolean;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ shouldTriggerPayment }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isPaymentElementComplete, setIsPaymentElementComplete] =
    useState<boolean>(false);

  const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (!stripe || !elements || !isPaymentElementComplete) {
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "https://zextons.co.uk/checkout?payment_success=true",
      },
    });

    if (error) {
      setMessage(error.message || "An unexpected error occurred.");
    } else {
      setMessage("Payment successful!");
    }

    setIsProcessing(false);
  };

  useEffect(() => {
    if (elements) {
      const paymentElement: any = elements.getElement(PaymentElement);
      if (paymentElement) {
        paymentElement.on("change", (event: any) => {
          setIsPaymentElementComplete(event.complete);
          setMessage(event.error ? event.error.message : null);
        });
      }
    }
  }, [elements]);

  useEffect(() => {
    if (shouldTriggerPayment) {
      handleSubmit();
    }
  }, [shouldTriggerPayment]);

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      {/* 
         Uncomment the PaymentElement below to display Stripe's UI
         <PaymentElement id="payment-element" /> 
      */}
      <button
        disabled={
          isProcessing || !stripe || !elements || !isPaymentElementComplete
        }
        id="submit"
      >
        <span id="button-text" className="hidden">
          {isProcessing ? "Processing ..." : "Pay now"}
        </span>
      </button>
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
};

export default PaymentForm;
