import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  const users = [
    { name: 'User 1', email: 'user1@example.com', phone: '1234567890', role: 'admin' },
    { name: 'User 2', email: 'user2@example.com', phone: '1234567891', role: 'user' },
    { name: 'User 3', email: 'user3@example.com', phone: '1234567892', role: 'user' },
    { name: 'User 4', email: 'user4@example.com', phone: '1234567893', role: 'user' },
    { name: 'User 5', email: 'user5@example.com', phone: '1234567894', role: 'user' },
    { name: 'User 6', email: 'user6@example.com', phone: '1234567895', role: 'user' },
    { name: 'User 7', email: 'user7@example.com', phone: '1234567896', role: 'user' },
    { name: 'User 8', email: 'user8@example.com', phone: '1234567897', role: 'user' },
    { name: 'User 9', email: 'user9@example.com', phone: '1234567898', role: 'user' },
    { name: 'User 10', email: 'user10@example.com', phone: '1234567899', role: 'user', },
  ];

  // Crear los usuarios
  for (const user of users) {
    const createdUser = await prisma.user.create({
      data: user,
    });

    // Crear 3 ingresos y 3 gastos por cada usuario
    for (let i = 0; i < 3; i++) {
      await prisma.movements.create({
        data: {
          concept: `Income Concept ${i + 1}`,
          amount: Math.floor(Math.random() * 1000) + 1, // Cantidad aleatoria entre 1 y 1000
          date: new Date(),
          userId: createdUser.id, // Relacionar el ingreso con el usuario
        },
      });

      await prisma.movements.create({
        data: {
          concept: `Expense Concept ${i + 1}`,
          amount: Math.floor(Math.random() * 500) + 1, // Cantidad aleatoria entre 1 y 500
          date: new Date(),
          userId: createdUser.id, // Relacionar el gasto con el usuario
        },
      });
    }
  }

  console.log('10 usuarios creados con 30 ingresos y 30 gastos!');
};

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
