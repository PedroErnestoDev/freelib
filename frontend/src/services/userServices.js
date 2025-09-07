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
    const token = localStorage.getItem("token"); // pega o token do login
    const response = await fetch(`${BASE_URL}/article/create`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}` // envia token no header
        // NÃO coloque "Content-Type" para FormData
      },
      body: formData,
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


// Buscar perfil do usuário
export const getProfile = async (userId) => {
  try {
    const response = await fetch(
      `http://localhost:8000/api/user/profile/${userId}`
    );
    if (!response.ok) {
      return {
        success: false,
        error: `Erro ${response.status}: ${response.statusText}`,
      };
    }
    const data = await response.json();
    return { success: true, data }; // retorna data dentro de um objeto padrão
  } catch (err) {
    return { success: false, error: err.message };
  }
};
