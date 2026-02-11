import { getTicketSession } from "../utils/session";

export default defineEventHandler((event) => {
  const ticket = getTicketSession(event);

  // if (!ticket) {
  //   throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  // }
});
