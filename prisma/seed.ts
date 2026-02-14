import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import fs from "fs";
import path from "path";

const adapter = new PrismaMariaDb({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 5,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding...");

  // Очистка
  await prisma.vote.deleteMany();
  await prisma.ticket.deleteMany();
  await prisma.participant.deleteMany();

  // ========================
  // 1️⃣ Создаём пары
  // ========================

  await prisma.participant.createMany({
    data: [
      { name: "Анастасия & Антон", imageUrl: "/images/pairs/1.webp" },
      { name: "Дарья & Артём", imageUrl: "/images/pairs/2.webp" },
      { name: "Дарья & Павел", imageUrl: "/images/pairs/3.webp" },
      { name: "Дмитрий & Валерия", imageUrl: "/images/pairs/4.webp" },
      { name: "Алексей & Виталина", imageUrl: "/images/pairs/5.webp" },
      { name: "Максим & Ольга", imageUrl: "/images/pairs/6.webp" },
      { name: "Михаил & Мария", imageUrl: "/images/pairs/7.webp" },
      { name: "Полина & Алексей", imageUrl: "/images/pairs/8.webp" },
    ],
  });

  console.log("✅ Participants created");

  // ========================
  // 2️⃣ Читаем tickets.txt
  // ========================

  const filePath = path.join(process.cwd(), "tickets.txt");

  if (!fs.existsSync(filePath)) {
    throw new Error("❌ tickets.txt не найден в корне проекта");
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");

  const ticketNumbers = fileContent
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  // Убираем дубликаты
  const uniqueTickets = [...new Set(ticketNumbers)];

  const tickets = uniqueTickets.map((number) => ({
    number,
  }));

  await prisma.ticket.createMany({
    data: tickets,
    skipDuplicates: true, // если number уникальный
  });

  console.log(`✅ ${tickets.length} tickets imported from file`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
