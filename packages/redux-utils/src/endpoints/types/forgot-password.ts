export interface CreateResetPasswordPayload {
  email: string;
}

export interface CreateNewPasswordPayload {
  password: string;
  token: string;
}
