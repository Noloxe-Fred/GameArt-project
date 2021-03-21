'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    async afterCreate(result) {
      await strapi.plugins['users-permissions'].user.service.user.edit({ id: result.user }, { game: result.game })
    }
  }
};
