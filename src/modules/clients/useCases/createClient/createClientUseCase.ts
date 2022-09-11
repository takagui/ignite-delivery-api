import { Clients } from '@prisma/client';
import { hash } from 'bcrypt';

import { prisma } from '../../../../database/prismaClient';

interface ICreateClient {
  username: string;
  password: string;
}

class CreateClientUseCase {
  public async execute({
    username,
    password,
  }: ICreateClient): Promise<Clients> {
    const clientExist = await prisma.clients.findFirst({
      where: {
        username: {
          mode: 'insensitive',
        },
      },
    });

    if (!!clientExist) {
      throw new Error('Client already exists');
    }

    const hashedPassword = await hash(password, 10);

    const client = await prisma.clients.create({
      data: {
        username,
        password: hashedPassword,
      }
    });

    return client;
  }
}

export { CreateClientUseCase };
