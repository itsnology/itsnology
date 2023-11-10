"use client";
import { useState } from "react";
import { GoSell } from "@tap-payments/gosell";

export default function PaymentForm({ product, price }) {
   const [paymentData, setPaymentData] = useState({
      cardNumber: "",
      cardExpiryMonth: "",
      cardExpiryYear: "",
      cardCVC: "",
   });

   const handleInputChange = (event) => {
      const { name, value } = event.target;
      setPaymentData({ ...paymentData, [name]: value });
   };

   const handlePayment = () => {
      // handle payment logic here
   };
   const [tempo, setTempo] = useState("");

   const callbackFunc = (response) => {
      console.log(response);
   };

   return (
      <div className="App">
         <button
            onClick={() => GoSell.openLightBox()}
            className=" text-green-700"
         >
            Confirm
         </button>

         <GoSell
            gateway={{
               publicKey: "pk_test_U4TkA3ElQtjz50KIySs6cP9R",
               language: "ar",
               contactInfo: true,
               supportedCurrencies: "all",
               supportedPaymentMethods: "all",
               saveCardOption: false,
               customerCards: true,
               notifications: "standard",
               backgroundImg: {
                  url: "imgURL",
                  opacity: "0.5",
               },
               callback: callbackFunc,
               labels: {
                  cardNumber: "Card Number",
                  expirationDate: "MM/YY",
                  cvv: "CVV",
                  cardHolder: "Name on Card",
                  actionButton: "Pay",
               },
               style: {
                  base: {
                     color: "#535353",
                     lineHeight: "18px",
                     fontFamily: "sans-serif",
                     fontSmoothing: "antialiased",
                     fontSize: "16px",
                     "::placeholder": {
                        color: "rgba(0, 0, 0, 0.26)",
                        fontSize: "15px",
                     },
                  },
                  invalid: {
                     color: "red",
                     iconColor: "#fa755a ",
                  },
               },
            }}
            customer={{
               first_name: "First Name",
               middle_name: "Middle Name",
               last_name: "Last Name",
               email: "demo@email.com",
               phone: {
                  country_code: "965",
                  number: "99999999",
               },
            }}
            order={{
               amount: 1,
               currency: "QAR",
               items: [
                  {
                     id: 1,
                     name: "item1",
                     description: "item1 desc",
                     quantity: "1",
                     amount_per_unit: "00.000",
                     discount: {
                        type: "P",
                        value: "10%",
                     },
                     total_amount: "000.000",
                  },
                  {
                     id: 2,
                     name: "item2",
                     description: "item2 desc",
                     quantity: "2",
                     amount_per_unit: "00.000",
                     discount: {
                        type: "P",
                        value: "10%",
                     },
                     total_amount: "000.000",
                  },
                  {
                     id: 3,
                     name: "item3",
                     description: "item3 desc",
                     quantity: "1",
                     amount_per_unit: "00.000",
                     discount: {
                        type: "P",
                        value: "10%",
                     },
                     total_amount: "000.000",
                  },
               ],
               shipping: null,
               taxes: null,
            }}
            transaction={{
               mode: "charge",
               charge: {
                  saveCard: false,
                  threeDSecure: true,
                  description: "Test Description",
                  statement_descriptor: "Sample",
                  reference: {
                     transaction: "txn_0001",
                     order: "ord_0001",
                  },
                  metadata: {},
                  receipt: {
                     email: true,
                     sms: true,
                  },
                  redirect: "http://localhost:3000/",
                  // post: window.location.href,
               },
            }}
         />
      </div>
   );
}
