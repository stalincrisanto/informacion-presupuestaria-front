

export const loginService = async ({
  username,
  password,
}: LoginCredentials): Promise<LoginResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error("Login failed");
  }
  return data as LoginResponse;
};

interface LoginCredentials {
  username: string;
  password: string;
}

export interface UserData {
  id: number;
  username: string;
}

export interface LoginResponse {
  success: boolean;
  token: string;
  user: UserData;
}