module.exports = ({ env }) => ({
  "users-permissions": {
    config: {
      jwtsecret: env("CUSTOMER_JWT_SECRET"),
      jwt: {
        expiresIn: "7d",
      },
    },
  },
});
