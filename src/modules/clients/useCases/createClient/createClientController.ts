import { Request, Response } from 'express';
import { CreateClientUseCase } from './createClientUseCase';

class CreateClientController {
  public async handle(request: Request, response: Response) {
    const { username, password } = request.body;

    const createClientUseCase = new CreateClientUseCase();

    const result = await createClientUseCase.execute({
      username,
      password,
    });

    return response.status(200).json({ result });
  }
}

export { CreateClientController };
