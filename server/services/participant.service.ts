import prisma from "../utils/prisma";

export async function getParticipants() {
  return prisma.participant.findMany({
    orderBy: { createdAt: "asc" },
  });
}

export async function getResults() {
  return prisma.participant.findMany({
    include: {
      _count: {
        select: { votes: true },
      },
    },
    orderBy: {
      votes: {
        _count: "desc",
      },
    },
  });
}
