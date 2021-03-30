export default function (ctx) {
  if (!ctx.$strapi.user) {
    return ctx.redirect('/')
  }
}
