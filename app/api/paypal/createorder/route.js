import client from "@utils/paypal";
import paypal from "@paypal/checkout-server-sdk";

export async function POST(req, res) {
  if (req.method != "POST")
    return Response.json({ success: false, message: "Not Found" }, 404);
  if (!req.body.order_price || !req.body.user_id)
    return Response.json(
      { success: false, message: "Please Provide order_price And User ID" },
      400
    );

  try {
    const PaypalClient = client();
    const request = new paypal.orders.OrdersCreateRequest();
    request.headers["prefer"] = "return=representation";
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: "80",
          },
        },
      ],
    });
    const response = await PaypalClient.execute(request);
    if (![201, 400].includes(response.statusCode)) {
      console.log("RES: ", response);
      return Response.json(
        { message: "Some Error Occurred at the backend" },
        500
      );
    }

    // Your Custom Code for doing something with order
    // Usually Store an order in the database like MongoDB
    const order = response.result;

    return Response.json({ success: true, data: { order } });
  } catch (err) {
    console.log("Err at Create Order: ", err);
    return Response.json({ message: "Could Not Found the user" }, 500);
  }
}
