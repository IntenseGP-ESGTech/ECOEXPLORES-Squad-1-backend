/**
 * Componente de Apresentação - Página inicial/landing page da aplicação
 * @module Apresentacao
 * @returns {JSX.Element} Componente de apresentação com logo e botão de ação
 */

// Dependências principais
import React from "react";
import { Link } from "react-router-dom";

// Assets e estilos
import logo from '../assets/logo.svg';
import styles from '../styles/Apresentacao.module.css';

// Componentes de UI
import { FaPlay } from "react-icons/fa6";

/**
 * Componente funcional que renderiza a página de apresentação
 * @function Apresentacao
 * @description Exibe o logo da aplicação e um botão para avançar para o login
 */
export function Apresentacao() {
    return (
        <div className={styles.container}>
            {/* Logo da aplicação */}
            <img 
                src={logo} 
                className={styles.logo}
                alt="Logo da aplicação" 
                aria-label="Logotipo"
            />

            {/* Botão de navegação para a página de login */}
            <Link 
                to="/login" 
                className={styles.advanceButton}
                aria-label="Ir para página de login"
            >
                <FaPlay role="img" aria-label="Ícone de play" />
            </Link>
        </div>
    );
}