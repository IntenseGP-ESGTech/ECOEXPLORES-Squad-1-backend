/**
 * Serviço de API para comunicação com o backend
 * @module api
 */

import { env } from '../config/env';

const API_URL = env.apiUrl;

/**
 * Função auxiliar para fazer requisições HTTP
 * @param {string} endpoint - Endpoint da API
 * @param {Object} options - Opções da requisição (method, body, headers, etc)
 * @returns {Promise<Object>} Resposta da API
 */
const request = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  if (config.body && typeof config.body === 'object') {
    config.body = JSON.stringify(config.body);
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Erro ao processar requisição');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

/**
 * Serviço de autenticação
 */
export const authService = {
  /**
   * Registra um novo usuário
   * @param {Object} userData - Dados do usuário para registro
   * @returns {Promise<Object>} Dados do usuário e token
   */
  register: async (userData) => {
    return request('/auth/register', {
      method: 'POST',
      body: userData,
    });
  },

  /**
   * Faz login do usuário
   * @param {string} identifier - CPF ou CNPJ
   * @param {string} password - Senha do usuário
   * @returns {Promise<Object>} Dados do usuário e token
   */
  login: async (identifier, password) => {
    return request('/auth/login', {
      method: 'POST',
      body: { identifier, password },
    });
  },

  /**
   * Faz login com credenciais do Google
   * @param {string} credential - Token JWT retornado pelo Google Identity Services
   * @returns {Promise<Object>} Dados do usuário e token
   */
  loginWithGoogle: async (credential) => {
    return request('/auth/google', {
      method: 'POST',
      body: { credential },
    });
  },

  /**
   * Salva o token no localStorage
   * @param {string} token - Token JWT
   */
  setToken: (token) => {
    localStorage.setItem('token', token);
  },

  /**
   * Remove o token do localStorage
   */
  removeToken: () => {
    localStorage.removeItem('token');
  },

  /**
   * Obtém o token do localStorage
   * @returns {string|null} Token JWT ou null
   */
  getToken: () => {
    return localStorage.getItem('token');
  },
};

export default { authService };

