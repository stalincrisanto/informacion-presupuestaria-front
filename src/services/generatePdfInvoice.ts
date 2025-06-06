export const loginService = async ({
  username,
  password,
}: LoginCredentials) => {
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
  if (!response.ok) {
    throw new Error("Login failed");
  }
  return response;
};

interface LoginCredentials {
  username: string;
  password: string;
}
