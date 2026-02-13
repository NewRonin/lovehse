import { createVote } from "../services/vote.service";
import { getTicketSession } from "../utils/session";
import { requireString } from "../utils/validation";

export default defineEventHandler(async (event) => {
  const ticketNumber = getTicketSession(event);

  if (!ticketNumber) {
    throw createError({ statusCode: 401 });
  }

  const body = await readBody(event);

  if (typeof body.participantId !== "number") {
    throw createError({
      statusCode: 400,
      statusMessage: "Participant ID is required",
    });
  }

  const vote = await createVote(ticketNumber, body.participantId);

  return vote;
});
