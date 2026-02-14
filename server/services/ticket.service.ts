import prisma from "../utils/prisma";

export async function findTicketByNumber(number: string) {
  return prisma.ticket.findUnique({
    where: { number },
    include: { vote: true },
  });
}

export async function validateTicketForVoting(number: string) {
  const ticket = await findTicketByNumber(number);

  if (!ticket) {
    throw createError({ statusCode: 404, statusMessage: "Билет не найден" });
  }

  if (ticket.vote) {
    throw createError({ statusCode: 403, statusMessage: "Вы уже голосовали" });
  }

  return ticket;
}
