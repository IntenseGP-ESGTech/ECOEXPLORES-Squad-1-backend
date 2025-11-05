/**
 * Componente de Cadastro de Aluno
 * @module CadastroAluno
 * @description Formulário de cadastro para alunos com validação de CPF
 * @returns {JSX.Element} Componente de formulário de cadastro
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';

// Assets
import logo from '../assets/logo.svg';
import mundoLogo from '../assets/mundoLogo.svg';
import mascote from '../assets/mascote.svg';

// Services
import { authService } from '../services/api';

// Styles
import styles from '../styles/CadastroAluno.module.css';

/**
 * Componente principal de cadastro de aluno
 * @function CadastroAluno
 * @property {function} handleCpfChange - Formata o CPF durante a digitação
 * @property {function} handleSubmit - Submissão do formulário (navega para login)
 * @property {function} handleVoltar - Navegação para tela de pré-cadastro
 */
export function CadastroAluno() {
    // Estados do formulário
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [matricula, setMatricula] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    /**
     * Formata o CPF durante a digitação (XXX.XXX.XXX-XX)
     * @param {Object} e - Evento do input
     */
    const handleCpfChange = (e) => {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length > 9) {
            value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
        } else if (value.length > 6) {
            value = value.replace(/^(\d{3})(\d{3})(\d{3})$/, '$1.$2.$3');
        } else if (value.length > 3) {
            value = value.replace(/^(\d{3})(\d{3})$/, '$1.$2');
        }
        
        setCpf(value);
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
            // Remove formatação do CPF
            const cleanCpf = cpf.replace(/\D/g, '');

            if (!nome || !cleanCpf || !email || !matricula || !senha) {
                setError('Por favor, preencha todos os campos');
                setLoading(false);
                return;
            }

            // Validação básica de CPF (11 dígitos)
            if (cleanCpf.length !== 11) {
                setError('CPF deve conter 11 dígitos');
                setLoading(false);
                return;
            }

            const userData = {
                role: 'student',
                nomeAluno: nome,
                cpfAluno: cleanCpf,
                emailAluno: email,
                matricula: matricula,
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
            <img src={mundoLogo} alt="Elemento decorativo" className={styles.mundoLogo} />
            <img src={mascote} alt="Mascote da plataforma" className={styles.mascote} />

            {/* Container principal do formulário */}
            <div className={styles.loginBox}>
                <div className={styles.welcomeContainer}>
                    <h1 className={styles.welcomeTitle}>Seja Bem Vindo!</h1>
                    <p className={styles.welcomeSubtitle}>Crie sua conta, leva menos de um minuto!</p>
                    
                    {/* Formulário de cadastro */}
                    <form className={styles.formContainer} aria-label="Formulário de cadastro de aluno" onSubmit={handleSubmit}>
                        
                        {/* Mensagem de erro */}
                        {error && (
                            <div className={styles.errorMessage} role="alert">
                                {error}
                            </div>
                        )}

                        {/* Campo: Nome completo */}
                        <div className={styles.inputGroup}>
                            <label htmlFor="nome">Aluno</label>
                            <input
                                type="text"
                                id="nome"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                placeholder="Digite seu nome completo"
                                className={styles.inputField}
                                aria-required="true"
                                disabled={loading}
                            />
                        </div>

                        {/* Campo: CPF com formatação automática */}
                        <div className={styles.inputGroup}>
                            <label htmlFor="cpf">CPF</label>
                            <input
                                type="text"
                                id="cpf"
                                value={cpf}
                                onChange={handleCpfChange}
                                placeholder="___.___.___-__"
                                className={styles.inputField}
                                maxLength={14}
                                aria-required="true"
                                aria-describedby="cpfHelp"
                                disabled={loading}
                            />
                            <small id="cpfHelp" className="sr-only">Formato: 000.000.000-00</small>
                        </div>
                        
                        {/* Campo: Email */}
                        <div className={styles.inputGroup}>
                            <label htmlFor="email">E-mail</label>
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
                        
                        {/* Campo: Matrícula */}
                        <div className={styles.inputGroup}>
                            <label htmlFor="matricula">Número da Matrícula</label>
                            <input 
                                type="text" 
                                id="matricula" 
                                value={matricula}
                                onChange={(e) => setMatricula(e.target.value)}
                                placeholder="Digite sua matrícula" 
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