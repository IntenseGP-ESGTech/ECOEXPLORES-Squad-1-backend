/**
 * Página Inicial (Home) da Aplicação
 * @module Home
 * @description Tela principal com elementos de navegação e interação, incluindo um menu lateral (Sidebar) dinâmico.
 * @returns {JSX.Element} Componente da página inicial.
 */

import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

// Ícones de interface do usuário importados de bibliotecas de ícones populares
import { FaPlay } from "react-icons/fa6";
import { MdEmojiPeople } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { IoMdReturnLeft } from "react-icons/io";

// Importação de imagens e ícones estáticos usados na interface
import logo from '../assets/logo.svg'; // Logotipo principal da aplicação.
import mundoDireita from '../assets/mundoDireita.svg'; // Imagem decorativa de um "mundo" à direita.
import ods from '../assets/ods.svg'; // Ícone representando os Objetivos de Desenvolvimento Sustentável (ODS).
import menuFoto from '../assets/menuFoto.svg'; // Ícone para o botão de alternar o menu lateral.

// Importação do Sidebar - CORRIGIDO AQUI
import { Sidebar } from './Sidebar'; // O caminho correto é './Sidebar' se Sidebar.jsx estiver na mesma pasta que Home.jsx. Este componente representa o menu lateral.

// Estilização modular específica para o componente Home, garantindo encapsulamento de estilos.
import styles from '../styles/Home.module.css';

/**
 * Componente funcional responsável por renderizar a tela inicial da aplicação.
 * Apresenta elementos gráficos e botões de interação com navegação integrada,
 * bem como um menu lateral que pode ser aberto e fechado.
 */
export function Home() {
    // Hook do React Router DOM para navegação programática.
    const navigate = useNavigate();
    // Estado para controlar a visibilidade do menu lateral (true para aberto, false para fechado).
    const [menuAberto, setMenuAberto] = useState(false);

    /**
     * Função para lidar com o clique no botão de retorno.
     * Navega o usuário de volta para a rota '/apresentacao'.
     */
    const handleReturn = () => {
        navigate('/apresentacao');
    };

    /**
     * Função memoizada com useCallback para alternar o estado do menu lateral.
     * Inverte o valor de `menuAberto` a cada chamada, otimizando o desempenho.
     */
    const toggleMenu = useCallback(() => {
        setMenuAberto((prev) => !prev);
    }, []);

    /**
     * Função memoizada com useCallback para lidar com a navegação a partir do Sidebar.
     * Primeiro fecha o menu lateral e, em seguida, navega para a rota especificada.
     * @param {string} route - A rota para a qual se deseja navegar.
     */
    const handleNavigateFromSidebar = useCallback((route) => {
        setMenuAberto(false); // Fecha o menu primeiro para uma transição suave.
        navigate(route); // Navega para a rota fornecida.
    }, [navigate]); // A dependência 'navigate' garante que a função seja recriada apenas se 'navigate' mudar.

    return (
        <div className={styles.container}>
            {/* Elementos visuais de fundo e logotipo da aplicação. */}
            <img src={logo} className={styles.logo} alt="Logotipo da Aplicação" aria-label="Logotipo da Aplicação" />

            {/* Botão de alternância do menu lateral. Sua classe CSS muda para controlar a visibilidade. */}
            <img
                src={menuFoto}
                className={`${styles.menuFotoToggle} ${menuAberto ? styles.menuFotoHidden : ''}`}
                alt="Abrir ou Fechar Menu"
                onClick={toggleMenu} // Aciona a função para alternar o menu.
                role="button" // Define o elemento como um botão para acessibilidade.
                aria-label={menuAberto ? "Fechar Menu" : "Abrir Menu"} // Rótulo acessível dinâmico.
            />

            {/* Container do Sidebar. Sua classe CSS é dinâmica para animar a abertura/fechamento. */}
            <div className={`${styles.sidebarWrapper} ${menuAberto ? styles.sidebarOpen : ''}`}>
                <Sidebar
                    toggleMenu={toggleMenu} // Prop para permitir que o Sidebar feche a si mesmo.
                    onNavigate={handleNavigateFromSidebar} // Prop para permitir que o Sidebar dispare navegações.
                />
            </div>

            {/* Imagens decorativas no layout da página inicial. */}
            <img src={mundoDireita} className={styles.mundoDireita} alt="Ilustração de um Globo Terrestre" aria-label="Ilustração de um Globo Terrestre" />
            <img src={ods} className={styles.ods} alt="Ícone dos Objetivos de Desenvolvimento Sustentável" aria-label="Ícone dos ODS" />

            {/* Contêiner para os ícones de navegação superiores à direita. */}
            <div className={styles.topRightIcons}>
                {/* Ícone de "Play", que navega para a rota '/HomeOds' ao ser clicado. */}
                <div className={styles.playIcon} onClick={() => navigate('/HomeOds')} role="button" aria-label="Reproduzir Conteúdo">
                    <FaPlay size={24} />
                </div>
                {/* Ícone de "Pessoas", sem funcionalidade de navegação definida neste trecho. */}
                <div className={styles.peopleIcon} role="button" aria-label="Perfis de Usuários">
                    <MdEmojiPeople size={24} />
                </div>
                {/* Ícone de "Notificações", sem funcionalidade de navegação definida neste trecho. */}
                <div className={styles.notificationIcon} role="button" aria-label="Notificações">
                    <IoIosNotifications size={24} />
                </div>
                {/* Ícone de "E-mail", sem funcionalidade de navegação definida neste trecho. */}
                <div className={styles.emailIcon} role="button" aria-label="Mensagens">
                    <MdEmail size={24} />
                </div>
            </div>

            {/* Botão de retorno para a tela de apresentação. */}
            <div
                className={styles.returnButton}
                onClick={handleReturn} // Aciona a função de retorno.
                role="button" // Define o elemento como um botão para acessibilidade.
                aria-label="Retornar para a apresentação" // Rótulo acessível.
                tabIndex={0} // Torna o elemento focável via teclado.
            >
                <IoMdReturnLeft className={styles.returnIcon} /> {/* Ícone visual do botão de retorno. */}
            </div>
        </div>
    );
}