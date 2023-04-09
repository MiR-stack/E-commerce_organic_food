module.exports = ({ strapi }) => ({
  async find(ctx) {
    const users = await strapi.plugins[
      "users-permissions"
    ].services.user.fetchAll();

    console.log(users);
    return users;
  },
});
