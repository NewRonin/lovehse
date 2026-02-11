import { validateTicketForVoting } from "../../services/ticket.service";
import { setTicketSession } from "../../utils/session";
import { requireString } from "../../utils/validation";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  requireString(body.number, "Ticket number");

  await validateTicketForVoting(body.number);

  setTicketSession(event, body.number);

  return { success: true };
});
