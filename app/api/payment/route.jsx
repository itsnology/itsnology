const sdk = require("api")("@tappayments/v1.0#16vcze2tlgz28gql");

sdk.auth("Bearer sk_test_XKokBfNWv6FIYuTMg5sLPjhJ");
sdk
  .createAToken({
    card: {
      number: 4508750018264466,
      exp_month: 1,
      exp_year: 2049,
      cvc: 100,
      name: "Abdou Mtr",
      address: {
        country: "Kuwait",
        line1: "Salmiya, 21",
        city: "Kuwait city",
        street: "Salim",
        avenue: "Gulf",
      },
    },
    client_ip: "192.168.1.20",
  })
  .then(({ data }) => console.log(data))
  .catch((err) => console.error(err));
