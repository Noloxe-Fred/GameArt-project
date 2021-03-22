'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    async afterCreate(result) {
      await strapi.plugins['users-permissions'].services.user.edit({ id: result.user }, { games: [result.game.id] })
    }
  }
};
