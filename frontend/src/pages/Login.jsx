/**
 * Página de Login
 * @module Login
 * @description Componente de autenticação com opções de login e cadastro
 * @returns {JSX.Element} Componente de login com formulário e opções sociais
 */

import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaGooglePlusG } from "react-icons/fa";

// Assets
import logo from '../assets/logo.svg';

// Styles
import styles from '../styles/Login.module.css';

/**
 * Componente principal de Login
 * @function Login
 * @property {function} handleLogin - Manipulador de submissão do formulário
 * @property {function} handleRegister - Navegação para página de cadastro
 */
export function Login() {
    const navigate = useNavigate();

    /**
     * Manipulador de login
     * @param {React.FormEvent} e - Evento de submissão do formulário
     */
    const handleLogin = (e) => {
        e.preventDefault();
        navigate('/home');
    };

    /**
     * Manipulador de registro
     * @param {React.MouseEvent} e - Evento de clique
     */
    const handleRegister = (e) => {
        e.preventDefault();
        navigate('/precadastro');
    };

    return (
        <div className={styles.container} aria-label="Página de login">
            {/* Logo da aplicação */}
            <img 
                src={logo} 
                className={styles.logo} 
                alt="Logo" 
                aria-label="Logo da aplicação"
            />

            {/* Container principal do formulário */}
            <div className={styles.loginBox} role="main">
                <div className={styles.welcomeContainer}>
                    {/* Cabeçalho */}
                    <h1 className={styles.welcomeTitle}>Seja Bem Vindo!</h1>
                    <p className={styles.welcomeSubtitle}>Bem-vindos a plataforma ao Banco de Especialistas</p>

                    {/* Formulário de login */}
                    <form 
                        onSubmit={handleLogin} 
                        className={styles.formContainer}
                        aria-label="Formulário de login"
                    >
                        {/* Grupo de entrada para credenciais */}
                        <div className={styles.inputGroup}>
                            <FaUser className={styles.icon} aria-hidden="true" />
                            <input 
                                type="text" 
                                placeholder="CNPJ / CPF" 
                                required
                                aria-label="Insira seu CNPJ ou CPF"
                                aria-required="true"
                            />
                        </div>
                        
                        <div className={styles.inputGroup}>
                            <FaLock className={styles.icon} aria-hidden="true" />
                            <input 
                                type="password" 
                                placeholder="senha" 
                                required
                                aria-label="Insira sua senha"
                                aria-required="true"
                            />
                        </div>

                        {/* Botão de submissão */}
                        <button 
                            type="submit" 
                            className={styles.loginBtn}
                            aria-label="Efetuar login"
                        >
                            LOGIN
                        </button>
                    </form>

                    {/* Link para recuperação de senha */}
                    <div 
                        className={styles.forgotPassword}
                        role="button"
                        tabIndex={0}
                        aria-label="Recuperar senha"
                    >
                        Esqueceu a senha?
                    </div>
                    
                    {/* Botão de cadastro */}
                    <button 
                        onClick={handleRegister} 
                        className={styles.registerBtn}
                        aria-label="Ir para página de cadastro"
                    >
                        CADASTRE-SE
                    </button>
                    
                    {/* Login social */}
                    <div 
                        className={styles.socialLogin}
                        aria-label="Opções de login social"
                    >
                        <p>Faça login com</p>
                        <FaGooglePlusG 
                            className={styles.googleIcon} 
                            aria-label="Login com Google"
                            role="img"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}