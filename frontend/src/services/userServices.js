import { BASE_URL } from "./api";

const userEndPoint = `${BASE_URL}/user`;

export const register = async (data) => {
  try {
    const response = await fetch(`${userEndPoint}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // if (!response.ok) {
    //   const errorData = await response.json();
    //   throw new Error(errorData.error || "Erro ao registrar usuário");
    // }

    const result = await response.json();
    return {
      success: true,
      data: result,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || "Erro inesperado",
    };
  }
};
