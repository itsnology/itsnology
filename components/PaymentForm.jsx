"use client";
import React, { useState } from "react";
import axios from "axios";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import toast, { Toaster } from "react-hot-toast";

const PaymentForm = ({ style, onClose, userId, product }) => {
  const price = product;
  console.log(price);

  const [paidFor, setPaidFor] = useState(false);

  const handleApprove = (orderId) => {
    // Call backend function to fulfill order

    // if response is success
    setPaidFor(true);
    // Refresh user's account or subscription status

    // if response is error
    // alert("Your payment was processed successfully. However, we are unable to fulfill your purchase. Please contact us at support@designcode.io for assistance.");
  };

  if (paidFor) {
    // Display success message, modal or redirect user to success page
    toast.success("Thank you for your purchase!");
  }
  const [error, setError] = useState(null);

  if (error) {
    // Display error message, modal or redirect user to error page
    alert(error);
  }
  const paypalCreateOrder = async () => {
    try {
      let response = await axios.post("/api/paypal/createorder", {
        user_id: store.getState().auth.user._id,
        order_price: amountRef.current.value,
      });
      return response.data.data.order.order_id;
    } catch (err) {
      // Your custom code to show an error like showing a toast:
      // toast.error('Some Error Occured')
      return null;
    }
  };
  const paypalCaptureOrder = async (orderID) => {
    try {
      let response = await axios.post("/api/paypal/captureorder", {
        orderID,
      });

      if (response.data.success) {
        // Order is successful
        // Your custom code
        // Like showing a success toast:
        toast.success("Amount Added to Wallet");
        // And/Or Adding Balance to Redux Wallet
        // dispatch(setWalletBalance({ balance: response.data.data.wallet.balance }))
      }
    } catch (err) {
      // Order is not successful
      // Your custom code
      // Like showing an error toast
      toast.error("Some Error Occurred");
    }
  };

  //
  return (
    <div
      className="fixed bottom-20 right-10 bg-white md:w-1/2 lg:w-1/4 w-full  p-4 border shadow-lg rounded-t-lg popup-transition "
      style={style}
    >
      <PayPalScriptProvider
        options={{
          "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
        }}
      >
        <PayPalButtons
          style={{
            color: "gold",
            shape: "rect",
            label: "pay",
            height: 50,
          }}
          onClick={(data, actions) => {
            // Validate on button click, client or server side
            const hasAlreadyBoughtCourse = false;

            if (hasAlreadyBoughtCourse) {
              setError(
                "You already bought this course. Go to your account to view your list of courses."
              );

              return actions.reject();
            } else {
              return actions.resolve();
            }
          }}
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  description: "PUBG Card",
                  amount: {
                    value: price,
                  },
                },
              ],
            });
          }}
          onApprove={async (data, actions) => {
            const order = await actions.order.capture();
            console.log("order", order);

            handleApprove(data.orderID);
          }}
          onCancel={() => {
            // Display cancel message, modal or redirect user to cancel page or back to cart
          }}
          onError={(err) => {
            setError(err);
            console.error("PayPal Checkout onError", err);
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
};

export default PaymentForm;
