module.exports = {
  routes: [
    {
      method: "GET",
      path: "/users",
      handler: "customer.find",
      config: {
        auth: false,
      },
    },
  ],
};
