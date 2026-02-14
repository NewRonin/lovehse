import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const adapter = new PrismaMariaDb({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.NAME,
  connectionLimit: 5,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding...");

  // Очистка (по желанию)
  await prisma.vote.deleteMany();
  await prisma.ticket.deleteMany();
  await prisma.participant.deleteMany();

  // ========================
  // 1️⃣ Создаём 8 пар
  // ========================

  const participants = await prisma.participant.createMany({
    data: [
      {
        name: "Анна & Дмитрий",
        imageUrl: "/images/pairs/1.jpg",
      },
      {
        name: "Мария & Алексей",
        imageUrl: "/images/pairs/2.jpg",
      },
      {
        name: "Ольга & Сергей",
        imageUrl: "/images/pairs/3.jpg",
      },
      {
        name: "Екатерина & Иван",
        imageUrl: "/images/pairs/4.jpg",
      },
      {
        name: "Наталья & Максим",
        imageUrl: "/images/pairs/5.jpg",
      },
      {
        name: "Юлия & Андрей",
        imageUrl: "/images/pairs/6.jpg",
      },
      {
        name: "Татьяна & Роман",
        imageUrl: "/images/pairs/7.jpg",
      },
      {
        name: "Алина & Кирилл",
        imageUrl: "/images/pairs/8.jpg",
      },
    ],
  });

  console.log("✅ Participants created");

  // ========================
  // 2️⃣ Создаём 200 билетов
  // ========================

  const tickets = Array.from({ length: 200 }).map((_, i) => ({
    number: `TICKET-${String(i + 1).padStart(4, "0")}`,
  }));

  await prisma.ticket.createMany({
    data: tickets,
  });

  console.log("✅ 200 tickets created");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
