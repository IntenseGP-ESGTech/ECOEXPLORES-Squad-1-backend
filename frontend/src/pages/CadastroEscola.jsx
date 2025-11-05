/**
 * Componente de Cadastro de Escola
 * @module CadastroEscola
 * @description Formulário de cadastro para instituições de ensino com validação de CNPJ
 * @returns {JSX.Element} Componente de formulário de cadastro institucional
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';

// Assets
import logo from '../assets/logo.svg';
import mundoLogo from '../assets/mundoLogo.svg';
import mundoBaixo from '../assets/mundoBaixo.svg';

// Services
import { authService } from '../services/api';

// Styles
import styles from '../styles/CadastroEscola.module.css';

/**
 * Componente principal de cadastro de escola
 * @function CadastroEscola
 * @property {function} handleCnpjChange - Formata o CNPJ durante a digitação
 * @property {function} handleSubmit - Submissão do formulário (navega para login)
 * @property {function} handleVoltar - Navegação para tela de pré-cadastro
 */
export function CadastroEscola() {
    // Estados do formulário
    const [cnpj, setCnpj] = useState('');
    const [email, setEmail] = useState('');
    const [instituicao, setInstituicao] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    /**
     * Formata o CNPJ durante a digitação (XX.XXX.XXX/XXXX-XX)
     * @param {Object} e - Evento do input
     */
    const handleCnpjChange = (e) => {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length > 12) {
            value = value.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
        } else if (value.length > 8) {
            value = value.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})$/, '$1.$2.$3/$4');
        } else if (value.length > 5) {
            value = value.replace(/^(\d{2})(\d{3})(\d{3})$/, '$1.$2.$3');
        } else if (value.length > 2) {
            value = value.replace(/^(\d{2})(\d{3})$/, '$1.$2');
        }
        
        setCnpj(value);
    };

    /**
     * Manipulador de submissão do formulário
     * @param {Object} e - Evento de submit
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Remove formatação do CNPJ
            const cleanCnpj = cnpj.replace(/\D/g, '');

            if (!cleanCnpj || !email || !instituicao || !senha) {
                setError('Por favor, preencha todos os campos');
                setLoading(false);
                return;
            }

            // Validação básica de CNPJ (14 dígitos)
            if (cleanCnpj.length !== 14) {
                setError('CNPJ deve conter 14 dígitos');
                setLoading(false);
                return;
            }

            const userData = {
                role: 'school',
                cnpj: cleanCnpj,
                nomeInstituicao: instituicao,
                emailCorporativo: email,
                password: senha,
            };

            const response = await authService.register(userData);
            
            // Salva o token
            authService.setToken(response.token);
            
            // Redireciona para login ou home
            navigate('/login');
        } catch (err) {
            setError(err.message || 'Erro ao realizar cadastro. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    /**
     * Manipulador de navegação para pré-cadastro
     * @param {Object} e - Evento de click
     */
    const handleVoltar = (e) => {
        e.preventDefault();
        navigate('/precadastro');
    };

    return (
        <div className={styles.container}>
            {/* Header com logo e elementos decorativos */}
            <img src={logo} alt="Logo da plataforma" className={styles.logo} />
            <img src={mundoLogo} alt="Elemento decorativo superior" className={styles.mundoLogo} />
            <img src={mundoBaixo} alt="Elemento decorativo inferior" className={styles.mundoBaixo} />

            {/* Container principal do formulário */}
            <div className={styles.loginBox}>
                <div className={styles.welcomeContainer}>
                    <h1 className={styles.welcomeTitle}>Seja Bem Vindo!</h1>
                    <p className={styles.welcomeSubtitle}>Crie sua conta, leva menos de um minuto!</p>
                    
                    {/* Formulário de cadastro */}
                    <form className={styles.formContainer} aria-label="Formulário de cadastro institucional" onSubmit={handleSubmit}>
                        
                        {/* Mensagem de erro */}
                        {error && (
                            <div className={styles.errorMessage} role="alert">
                                {error}
                            </div>
                        )}

                        {/* Campo: CNPJ com formatação automática */}
                        <div className={styles.inputGroup}>
                            <label htmlFor="cnpj">CNPJ</label>
                            <input
                                type="text"
                                id="cnpj"
                                value={cnpj}
                                onChange={handleCnpjChange}
                                placeholder="__.___.___/____-__"
                                className={styles.inputField}
                                maxLength={18}
                                aria-required="true"
                                aria-describedby="cnpjHelp"
                                disabled={loading}
                            />
                            <small id="cnpjHelp" className="sr-only">Formato: 00.000.000/0000-00</small>
                        </div>
                        
                        {/* Campo: Email institucional */}
                        <div className={styles.inputGroup}>
                            <label htmlFor="email">E-mail Corporativo</label>
                            <input 
                                type="email" 
                                id="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Digite o e-mail corporativo" 
                                className={styles.inputField}
                                aria-required="true"
                                disabled={loading}
                            />
                        </div>
                        
                        {/* Campo: Nome da instituição */}
                        <div className={styles.inputGroup}>
                            <label htmlFor="instituicao">Nome da Instituição</label>
                            <input 
                                type="text" 
                                id="instituicao" 
                                value={instituicao}
                                onChange={(e) => setInstituicao(e.target.value)}
                                placeholder="Digite o nome da instituição" 
                                className={styles.inputField}
                                aria-required="true"
                                disabled={loading}
                            />
                        </div>
                        
                        {/* Campo: Senha */}
                        <div className={styles.inputGroup}>
                            <label htmlFor="senha">Defina sua Senha</label>
                            <input 
                                type="password" 
                                id="senha" 
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                placeholder="Crie uma senha segura" 
                                className={styles.inputField}
                                aria-required="true"
                                disabled={loading}
                            />
                        </div>
                        
                        {/* Botões de ação */}
                        <div className={styles.buttonGroup}>
                            <button 
                                type="submit" 
                                className={styles.continueButton} 
                                aria-label="Continuar para login"
                                disabled={loading}
                            >
                                {loading ? 'CADASTRANDO...' : 'CONTINUAR'}
                            </button>
                            <button 
                                type="button" 
                                className={styles.continueButton} 
                                onClick={handleVoltar}
                                aria-label="Voltar para seleção de cadastro"
                                disabled={loading}
                            >
                                VOLTAR
                            </button>
                        </div>
                    </form>
                    
                    {/* Login social */}
                    <div className={styles.socialLogin} aria-label="Opções de login social">
                        <p>Faça login com</p>
                        <FaGoogle 
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