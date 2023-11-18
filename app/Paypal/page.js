import React from "react";
import PaypalCheckoutButton from "@components/PaypalCheckoutButton";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const Paypal = () => {
  const product = {
    description: "Design+Code React Hooks Course",
    price: 19,
  };
  return (
    <PayPalScriptProvider
      options={{ "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}
    >
      <PaypalCheckoutButton product={product} />
    </PayPalScriptProvider>
  );
};
export default Paypal;
