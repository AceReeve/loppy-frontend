export interface CreateResetPasswordPayload {
  email: string;
}

export interface GetResetPasswordResponse {
  message: string;
}

export interface CreateNewPasswordPayload {
  password: string;
  token: string;
}
