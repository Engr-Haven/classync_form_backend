require("dotenv").config();

const { PrismaClient } = require("@prisma/client");
const { PrismaMariaDb } = require("@prisma/adapter-mariadb");

const databaseURL = new URL(process.env.DATABASE_URL);

const adapter = new PrismaMariaDb({
  host: databaseURL.hostname,
  port: Number(databaseURL.port || 3306),
  user: decodeURIComponent(databaseURL.username),
  password: decodeURIComponent(databaseURL.password),
  database: decodeURIComponent(databaseURL.pathname.slice(1)),
  connectionLimit: 5,
});

const prisma = new PrismaClient({ adapter });

module.exports = prisma;
