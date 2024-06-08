export function getId() {
  return strapi.requestContext.get().state.user.id;
}
