import { clearTicketSession } from "../../utils/session";

export default defineEventHandler(async (event) => {
  clearTicketSession(event);
  return { success: true };
});
