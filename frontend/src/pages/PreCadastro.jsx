/**
 * Página de Pré-Cadastro
 * @module PreCadastro
 * @description Tela de seleção de categoria para cadastro
 * @returns {JSX.Element} Componente com opções de tipo de cadastro
 */

import { useNavigate } from 'react-router-dom';

// Assets
import logo from '../assets/logo.svg';
import mundoLogo from '../assets/mundoLogo.svg';
import prancheta from '../assets/prancheta.svg';
import botaoEscola from '../assets/botaoEscola.svg';
import botaoProfessor from '../assets/botaoProfessor.svg';
import botaoResponsavel from '../assets/botaoResponsavel.svg';
import botaoAluno from '../assets/botaoAluno.svg';

// Styles
import styles from '../styles/PreCadastro.module.css';

/**
 * Componente de seleção de categoria de cadastro
 * @function PreCadastro
 */
export function PreCadastro() {
    const navigate = useNavigate();

    /**
     * Manipulador de navegação genérico
     * @param {string} route - Rota de destino
     */
    const handleNavigation = (route) => {
        navigate(route);
    };

    return (
        <div className={styles.container} aria-label="Página de seleção de categoria">
            {/* Elementos visuais de fundo */}
            <img 
                src={logo} 
                alt="Logo" 
                className={styles.logo} 
                aria-hidden="true"
            />
            <img 
                src={mundoLogo} 
                alt="Mundo Logo" 
                className={styles.mundoLogo} 
                aria-hidden="true"
            />
            <img 
                src={prancheta} 
                alt="Prancheta" 
                className={styles.prancheta} 
                aria-hidden="true"
            />

            {/* Container principal */}
            <div className={styles.loginBox} role="main">
                <div className={styles.welcomeContainer}>
                    <h1 className={styles.welcomeTitle}>Agora Selecione sua categoria</h1>

                    {/* Grupo de botões de categoria */}
                    <div 
                        className={styles.buttonGroup}
                        role="group"
                        aria-label="Opções de categoria de cadastro"
                    >
                        {/* Botão para cadastro de escola */}
                        <button 
                            className={styles.categoryButton}
                            onClick={() => handleNavigation('/cadastro/escola')}
                            aria-label="Cadastro para escolas"
                        >
                            Escola
                        </button>
                        
                        {/* Botão para cadastro de professor */}
                        <button 
                            className={styles.categoryButton}
                            onClick={() => handleNavigation('/cadastro/professor')}
                            aria-label="Cadastro para professores"
                        >
                            Professor
                        </button>
                        
                        {/* Botão para cadastro de responsável */}
                        <button 
                            className={styles.categoryButton}
                            onClick={() => handleNavigation('/cadastro/responsavel')}
                            aria-label="Cadastro para responsáveis"
                        >
                            Responsável
                        </button>
                        
                        {/* Botão para cadastro de aluno */}
                        <button 
                            className={styles.categoryButton}
                            onClick={() => handleNavigation('/cadastro/aluno')}
                            aria-label="Cadastro para alunos"
                        >
                            Aluno
                        </button>
                    </div>

                    {/* Botão de retorno para login */}
                    <button
                        onClick={() => handleNavigation('/login')}
                        className={styles.continueButton}
                        aria-label="Voltar para página de login"
                    >
                        Voltar para Login
                    </button>
                </div>
            </div>
        </div>
    );
}
