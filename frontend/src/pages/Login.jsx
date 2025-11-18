/**
 * Página de Login
 * @module Login
 * @description Componente de autenticação com opções de login e cadastro
 * @returns {JSX.Element} Componente de login com formulário e opções sociais
 */

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaGooglePlusG } from "react-icons/fa";

// Assets
import logo from '../assets/logo.svg';
import { env } from '../config/env';

// Services
import { authService } from '../services/api';

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
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const googleButtonRef = useRef(null);
    const googleClientId = env.googleClientId;

    /**
     * Manipulador de login
     * @param {React.FormEvent} e - Evento de submissão do formulário
     */
    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Remove formatação do CPF/CNPJ para envio
            const cleanIdentifier = identifier.replace(/\D/g, '');
            
            if (!cleanIdentifier || !password) {
                setError('Por favor, preencha todos os campos');
                setLoading(false);
                return;
            }

            const response = await authService.login(cleanIdentifier, password);
            
            // Salva o token
            authService.setToken(response.token);
            
            // Redireciona para home
            navigate('/home');
        } catch (err) {
            setError(err.message || 'Erro ao fazer login. Verifique suas credenciais.');
        } finally {
            setLoading(false);
        }
    };

    /**
     * Manipulador de registro
     * @param {React.MouseEvent} e - Evento de clique
     */
    const handleRegister = (e) => {
        e.preventDefault();
        navigate('/precadastro');
    };

    /**
     * Callback disparado pelo Google ao finalizar a autenticação
     * @param {google.accounts.id.CredentialResponse} credentialResponse
     */
    const handleGoogleCredential = useCallback(async (credentialResponse) => {
        if (!credentialResponse?.credential) {
            setError('Não foi possível obter o token do Google. Tente novamente.');
            return;
        }

        try {
            setGoogleLoading(true);
            setError('');
            const response = await authService.loginWithGoogle(credentialResponse.credential);
            authService.setToken(response.token);
            navigate('/home');
        } catch (err) {
            setError(err.message || 'Falha ao autenticar com o Google.');
        } finally {
            setGoogleLoading(false);
        }
    }, [navigate]);

    /**
     * Inicializa o script do Google Identity Services e renderiza o botão
     */
    useEffect(() => {
        if (!googleClientId) {
            console.warn('VITE_GOOGLE_CLIENT_ID não definido. Login com Google indisponível.');
            return;
        }

        const renderButton = () => {
            if (!window.google || !googleButtonRef.current) return;

            window.google.accounts.id.initialize({
                client_id: googleClientId,
                callback: handleGoogleCredential,
                ux_mode: 'popup',
            });

            window.google.accounts.id.renderButton(googleButtonRef.current, {
                theme: 'outline',
                size: 'large',
                text: 'signin_with',
                shape: 'pill',
                width: 240,
            });
        };

        const existingScript = document.getElementById('google-identity-services');
        let listenerAttached = false;

        if (existingScript) {
            if (window.google) {
                renderButton();
            } else {
                existingScript.addEventListener('load', renderButton);
                listenerAttached = true;
            }

            return () => {
                if (listenerAttached) {
                    existingScript.removeEventListener('load', renderButton);
                }
            };
        }

        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        script.id = 'google-identity-services';
        script.onload = renderButton;
        document.body.appendChild(script);

        return () => {
            script.onload = null;
            if (script.parentNode) {
                script.parentNode.removeChild(script);
            }
        };
    }, [googleClientId, handleGoogleCredential]);

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
                        {/* Mensagem de erro */}
                        {error && (
                            <div className={styles.errorMessage} role="alert">
                                {error}
                            </div>
                        )}

                        {/* Grupo de entrada para credenciais */}
                        <div className={styles.inputGroup}>
                            <FaUser className={styles.icon} aria-hidden="true" />
                            <input 
                                type="text" 
                                placeholder="CNPJ / CPF" 
                                value={identifier}
                                onChange={(e) => setIdentifier(e.target.value)}
                                required
                                aria-label="Insira seu CNPJ ou CPF"
                                aria-required="true"
                                disabled={loading}
                            />
                        </div>
                        
                        <div className={styles.inputGroup}>
                            <FaLock className={styles.icon} aria-hidden="true" />
                            <input 
                                type="password" 
                                placeholder="senha" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                aria-label="Insira sua senha"
                                aria-required="true"
                                disabled={loading}
                            />
                        </div>

                        {/* Botão de submissão */}
                        <button 
                            type="submit" 
                            className={styles.loginBtn}
                            aria-label="Efetuar login"
                            disabled={loading}
                        >
                            {loading ? 'ENTRANDO...' : 'LOGIN'}
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
                        <div className={styles.socialDivider} role="separator" aria-hidden="true" />
                        <div 
                            ref={googleButtonRef} 
                            className={styles.googleButtonSlot}
                            aria-live="polite"
                        />
                        <div className={styles.googleHelper}>
                            <FaGooglePlusG className={styles.googleIcon} aria-hidden="true" />
                            <span>
                                {googleClientId ? (
                                    googleLoading ? 'Conectando...' : 'Clique no botão do Google'
                                ) : (
                                    'Configure o Google Client ID'
                                )}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}