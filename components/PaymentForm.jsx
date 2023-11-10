// import React, { useState } from "react";
// import axios from "axios";
// import { IconX } from "@tabler/icons-react";

// const PaymentForm = ({ style, onClose }) => {
//    const [paymentData, setPaymentData] = useState({
//       cardNumber: "",
//       cardExpiryMonth: "",
//       cardExpiryYear: "",
//       cardCVC: "",
//    });

//    const handleInputChange = (e) => {
//       const { name, value } = e.target;
//       setPaymentData({ ...paymentData, [name]: value });
//    };

//    const handlePayment = async () => {
//       try {
//          const tapApiKey = "sk_test_XKokBfNWv6FIYuTMg5sLPjhJ"; // Replace with your Tap Payments API key
//          const tapApiEndpoint = "https://api.tap.company/v2/charges"; // Replace with the actual endpoint

//          const formattedExpiry = formatExpiryDate(
//             paymentData.cardExpiryMonth,
//             paymentData.cardExpiryYear
//          );

//          const response = await axios.post(
//             tapApiEndpoint,
//             {
//                amount: 100, // Replace with the actual amount
//                currency: "KWD",
//                customer_initiated: true,
//                threeDSecure: true,
//                save_card: false,
//                description: "Test Description",
//                // Add other necessary parameters based on the Tap Payments API documentation
//                card: {
//                   number: paymentData.cardNumber,
//                   exp_month: formattedExpiry.month,
//                   exp_year: formattedExpiry.year,
//                   cvc: paymentData.cardCVC,
//                },
//             },
//             {
//                headers: {
//                   Authorization: `Bearer ${tapApiKey}`,
//                   "Content-Type": "application/json",
//                },
//             }
//          );

//          // Handle the payment response from Tap Payments API
//          console.log(response.data);
//       } catch (error) {
//          // Check if error.response exists before accessing its data property
//          const errorMessage = error.response
//             ? error.response.data
//             : "Unknown error";
//          console.error("Payment error:", errorMessage);
//       }
//    };

//    const formatExpiryDate = (month, year) => {
//       // Format the expiry date as needed by the Tap Payments API
//       return {
//          month: month.padStart(2, "0"), // Ensure two-digit month
//          year: year.slice(-2), // Take the last two digits of the year
//       };
//    };

//    return (
//       <div
//          className="fixed bottom-20 right-10 max-w-md mx-auto mt-6 p-6 bg-white rounded-lg shadow-lg
//     "
//          style={style}
//       >
//          <div className="flex-row justify-between  flex items-center">
//             {" "}
//             <h2 className="text-2xl font-semibold mb-4">Payment Details</h2>
//             <button
//                onClick={onClose}
//                className="text-gray-500 mb-3 ml-3 hover:text-gray-700 focus:outline-none"
//             >
//                <IconX />
//             </button>
//          </div>
//          <form method="POST">
//             <div className="mb-4">
//                <label
//                   htmlFor="cardNumber"
//                   className="block font-bold text-gray-600"
//                >
//                   Card Number
//                </label>
//                <input
//                   type="text"
//                   name="cardNumber"
//                   id="cardNumber"
//                   maxLength="16" // Set the maximum length to 16 characters
//                   pattern="[0-9]*"
//                   placeholder="1234 5678 9012 3456"
//                   value={paymentData.cardNumber}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-2 focus:font-semibold border rounded-lg focus:outline focus:outline-blue-300"
//                />
//             </div>
//             <div className="flex  mb-4">
//                <div className="w-1/2 ml-2 mr-2">
//                   <label
//                      htmlFor="cardExpiryMonth"
//                      className="block mb-2 font-bold text-gray-600"
//                   >
//                      Expiry Month (MM)
//                   </label>
//                   <input
//                      type="text"
//                      name="cardExpiryMonth"
//                      id="cardExpiryMonth"
//                      placeholder="MM"
//                      maxLength="2" // Set the maximum length to 16 characters
//                      pattern="[0-9]*"
//                      value={paymentData.cardExpiryMonth}
//                      onChange={handleInputChange}
//                      className="w-full px-4 py-2 focus:font-semibold border rounded-lg focus:outline focus:outline-blue-300"
//                   />
//                </div>
//                <div className="w-1/2 mr-2 ml-2">
//                   <label
//                      htmlFor="cardExpiryYear"
//                      className="block font-bold mb-2 text-gray-600"
//                   >
//                      Expiry Year (YY)
//                   </label>
//                   <input
//                      type="text"
//                      name="cardExpiryYear"
//                      id="cardExpiryYear"
//                      placeholder="YY"
//                      maxLength="4" // Set the maximum length to 16 characters
//                      pattern="[0-9]*"
//                      value={paymentData.cardExpiryYear}
//                      onChange={handleInputChange}
//                      className="w-full px-4 py-2  focus:font-semibold border rounded-lg focus:outline focus:outline-blue-300"
//                   />
//                </div>
//             </div>
//             <div className="mb-4">
//                <label
//                   htmlFor="cardCVC"
//                   className="block font-bold text-gray-600"
//                >
//                   CVC
//                </label>
//                <input
//                   type="text"
//                   name="cardCVC"
//                   id="cardCVC"
//                   placeholder="CVC"
//                   value={paymentData.cardCVC}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-2 border font-semibold rounded-lg focus:outline focus:outline-blue-300"
//                />
//             </div>
//             <button
//                type="button"
//                onClick={handlePayment}
//                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
//             >
//                Pay Now
//             </button>
//          </form>
//       </div>
//    );
// };

// export default PaymentForm;

// import React, { useState } from "react";
// import { GoSellElements } from "@tap-payments/gosell";

// const PaymentForm = () => {
//    const [paymentData, setPaymentData] = useState({
//       cardNumber: "",
//       cardExpiryMonth: "",
//       cardExpiryYear: "",
//       cardCVC: "",
//    });

//    const handleInputChange = (event) => {
//       const { name, value } = event.target;
//       setPaymentData({ ...paymentData, [name]: value });
//    };

//    const handlePayment = () => {
//       // handle payment logic here
//    };

//    const callbackFunc = (response) => {
//       console.log(response);
//    };

//    return (
//       <div className="App">
//          <GoSellElements
//             gateway={{
//                publicKey: "pk_test_U4TkA3ElQtjz50KIySs6cP9R",
//                language: "en",
//                supportedCurrencies: "all",
//                supportedPaymentMethods: "all",
//                notifications: "msg",
//                callback: callbackFunc,
//                labels: {
//                   cardNumber: "Card Number",
//                   expirationDate: "MM/YY",
//                   cvv: "CVV",
//                   cardHolder: "Name on Card",
//                   actionButton: "Pay",
//                },
//                style: {
//                   base: {
//                      color: "#535353",
//                      lineHeight: "18px",
//                      fontFamily: "sans-serif",
//                      fontSmoothing: "antialiased",
//                      fontSize: "16px",
//                      "::placeholder": {
//                         color: "rgba(0, 0, 0, 0.26)",
//                         fontSize: "15px",
//                      },
//                   },
//                   invalid: {
//                      color: "red",
//                      iconColor: "#fa755a ",
//                   },
//                },
//             }}
//          />

//          <p id="msg"></p>

//          <button
//             onClick={handlePayment}
//             className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
//          >
//             Pay Now
//          </button>
//       </div>
//    );
// };

// export default PaymentForm;

import { useState } from "react";
import { GoSell } from "@tap-payments/gosell";

export default function PaymentForm({ product }) {
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
               amount: product.price,
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
                  threeDSecure: false,
                  description: "Test Description",
                  statement_descriptor: "Sample",
                  reference: {
                     transaction: "txn_0001",
                     order: "ord_0001",
                  },
                  metadata: {},
                  receipt: {
                     email: false,
                     sms: true,
                  },
                  redirect: "/redirect",
                  post: null,
               },
            }}
         />
      </div>
   );
}
