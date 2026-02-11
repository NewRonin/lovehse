import { getTicketSession } from "../../utils/session";
import prisma from "../../utils/prisma";

export default defineEventHandler(async (event) => {
  const ticketNumber = getTicketSession(event);

  if (!ticketNumber) {
    throw createError({ statusCode: 401 });
  }

  const ticket = await prisma.ticket.findUnique({
    where: { number: ticketNumber },
    include: { vote: true },
  });

  if (!ticket) {
    throw createError({ statusCode: 401 });
  }

  return {
    number: ticket.number,
    voted: !!ticket.vote,
  };
});
