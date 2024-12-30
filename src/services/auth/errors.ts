export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}

export class InvalidCredentialsError extends AuthError {
  constructor() {
    super('Invalid email or password');
    this.name = 'InvalidCredentialsError';
  }
}

export class UserNotFoundError extends AuthError {
  constructor() {
    super('User not found');
    this.name = 'UserNotFoundError';
  }
}

export class ProfileCreationError extends AuthError {
  constructor() {
    super('Failed to create user profile');
    this.name = 'ProfileCreationError';
  }
}

export function handleAuthError(error: unknown): never {
  if (error && typeof error === 'object') {
    if ('code' in error) {
      switch (error.code) {
        case 'invalid_credentials':
          throw new InvalidCredentialsError();
        default:
          throw new AuthError(error.message as string || 'Authentication failed');
      }
    }
  }
  throw new AuthError('An unexpected error occurred');
}