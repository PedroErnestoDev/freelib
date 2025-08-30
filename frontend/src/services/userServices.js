import { BASE_URL } from "./api";

const userEndPoint = `${BASE_URL}/user`;
const articleEndPoint = `${BASE_URL}/article`;

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

export async function login(credentials) {
  try {
    const response = await fetch(`${userEndPoint}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Erro ao fazer login");
    }

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
}

export const listArticles = async (q = "") => {
  try {
    let url = `${articleEndPoint}/all`;
    if (q) url += `?q=${encodeURIComponent(q)}`;

    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Erro ao buscar articles");
    }

    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
};


export const createArticle = async (formData) => {
  try {
    const response = await fetch(`${BASE_URL}/article/create`, {
      method: "POST",
      body: formData, // envia FormData
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Erro ao criar artigo");
    }

    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.message || "Erro inesperado" };
  }
};
