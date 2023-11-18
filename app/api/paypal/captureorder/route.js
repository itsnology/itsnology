import client from "backend/paypal";
import paypal from "@paypal/checkout-server-sdk";

export async function POST(req, res) {
  if (req.method != "POST") return Response.json({ message: "Not Found" }, 404);

  if (!req.body.orderID)
    return Response.json({ message: "Please Provide Order ID" }, 400);

  //Capture order to complete payment
  const { orderID } = req.body;
  const PaypalClient = client();
  const request = new paypal.orders.OrdersCaptureRequest(orderID);
  request.requestBody({});
  const response = await PaypalClient.execute(request);
  if (!response) {
    return Response.json({ message: "Some Error Occured at backend" }, 500);
  }

  // Your Custom Code to Update Order Status
  // And Other stuff that is related to that order, like wallet
  // Here I am updateing the wallet and sending it back to frontend to update it on frontend
  return Response.json({
    message: "Success: email was sent",
    data: { wallet },
  });
}
