export interface User {
  id: string;
  email: string;
  full_name: string;
  created_at: string;
  updated_at: string;
}

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface SignUpData extends SignInCredentials {
  full_name: string;
}