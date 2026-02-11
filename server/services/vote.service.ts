import prisma from "../utils/prisma";

export async function createVote(ticketNumber: string, participantId: string) {
  return prisma.$transaction(async (tx) => {
    const ticket = await tx.ticket.findUnique({
      where: { number: ticketNumber },
      include: { vote: true },
    });

    if (!ticket) {
      throw createError({ statusCode: 404 });
    }

    if (ticket.vote) {
      throw createError({ statusCode: 403, statusMessage: "Already voted" });
    }

    const participant = await tx.participant.findUnique({
      where: { id: participantId },
    });

    if (!participant) {
      throw createError({
        statusCode: 404,
        statusMessage: "Participant not found",
      });
    }

    return tx.vote.create({
      data: {
        ticketId: ticket.id,
        participantId,
      },
    });
  });
}
