import { ConflictException } from '@nestjs/common';
import { UsersService } from './users.service';

describe('UserService', () => {
  let service: UsersService;
  let prisma: {
    user: {
      findUnique: jest.Mock;
      update: jest.Mock;
    };
  };

  beforeEach(async () => {
    prisma = {
      user: {
        findUnique: jest.fn(),
        update: jest.fn(),
      },
    };
    service = new UsersService(prisma as never);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('rejects an email already used by another user', async () => {
    prisma.user.findUnique.mockResolvedValue({ id: 'another-user' });

    await expect(
      service.update('current-user', { email: 'taken@example.com' }),
    ).rejects.toBeInstanceOf(ConflictException);
    expect(prisma.user.update).not.toHaveBeenCalled();
  });

  it('allows the current user to keep their email', async () => {
    prisma.user.findUnique.mockResolvedValue({ id: 'current-user' });
    prisma.user.update.mockResolvedValue({ id: 'current-user' });

    await service.update('current-user', { email: 'same@example.com' });

    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { id: 'current-user' },
      data: { email: 'same@example.com' },
    });
  });
});
