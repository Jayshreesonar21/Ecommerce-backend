import { AppDataSource } from '../config/typeorm';
import { Category } from '../entities/category.entity';
import { Role } from '../entities/role.entity';
import { User } from '../entities/user.entity';
import bcrypt from 'bcrypt';

async function seed() {
  await AppDataSource.initialize();
  const roleRepo = AppDataSource.getRepository(Role);
  const userRepo = AppDataSource.getRepository(User);

  // Create Role
  const roles = ['ADMIN', 'SELLER', 'CUSTOMER'];
  for (const r of roles) {
    const exists = await roleRepo.findOne({ where: { name: r } });
    if (!exists) await roleRepo.save(roleRepo.create({ name: r, description: `${r} role` }));
  }

  // Create Admin
  const adminRole = await roleRepo.findOne({ where: { name: 'ADMIN' } });
  const adminExists = await userRepo.findOne({ where: { email: 'admin@example.com' } });
  if (!adminExists) {
    const hashed = await bcrypt.hash('Admin#1234', 10);
    await userRepo.save(
      userRepo.create({
        name: 'Admin',
        email: 'admin@example.com',
        password: hashed,
        role: adminRole!,
      }),
    );
  }

  // Create Categories
  const categoryRepo = AppDataSource.getRepository(Category);
  const categories = ['Electronics', 'Clothing', 'Home Appliances', 'Books', 'Sports'];

  for (const name of categories) {
    const exists = await categoryRepo.findOne({ where: { name } });
    if (!exists) {
      await categoryRepo.save(categoryRepo.create({ name }));
    }
  }

  console.log('Roles & admin & categories created successfully!');
  process.exit(0);
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
