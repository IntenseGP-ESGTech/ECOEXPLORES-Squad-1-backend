/**
 * Página Inicial (Home) da Aplicação
 * @module Home
 * @description Tela principal com elementos de navegação e interação. Esta página foca na visualização e navegação para os Objetivos de Desenvolvimento Sustentável (ODS).
 * @returns {JSX.Element} Componente da página inicial.
 */

import React, { useState, useCallback } from "react"; 
import { useNavigate } from "react-router-dom";

// Ícones utilizados para interação do usuário, importados da biblioteca react-icons.
import { FaPlay } from "react-icons/fa6"; // Ícone de play/iniciar.
import { MdEmojiPeople } from "react-icons/md"; // Ícone de pessoas/perfil.
import { IoIosNotifications } from "react-icons/io"; // Ícone de notificações.
import { MdEmail } from "react-icons/md"; // Ícone de e-mail/mensagens.
import { IoMdReturnLeft } from "react-icons/io"; // Ícone de retorno.

// Imagens e ilustrações da interface, carregadas a partir da pasta 'assets'.
import logo from '../assets/logo.svg'; // Logotipo principal da aplicação.
import mundoDireita from '../assets/mundoDireita.svg'; // Ilustração de um globo terrestre à direita.
import frame from '../assets/frame.svg'; // Imagem central que provavelmente representa a estrutura das ODS.
import menuComponent from '../assets/menuComponent.svg'; // Ícone para o 'X' de fechar o menu, se aplicável no Sidebar.
import menuFoto from '../assets/menuFoto.svg'; // Avatar/ícone que abre o menu lateral.

// Importações das ODS: imagens individuais para cada um dos 10 primeiros Objetivos de Desenvolvimento Sustentável.
// Estes são clicáveis e redirecionam para os sites oficiais das ODS.
import ods1 from '../assets/ods1.svg';
import ods2 from '../assets/ods2.svg';
import ods3 from '../assets/ods3.svg';
import ods4 from '../assets/ods4.svg';
import ods5 from '../assets/ods5.svg';
import ods6 from '../assets/ods6.svg';
import ods7 from '../assets/ods7.svg';
import ods8 from '../assets/ods8.svg';
import ods9 from '../assets/ods9.svg';
import ods10 from '../assets/ods10.svg';

// Importação do componente Sidebar, que representa o menu lateral navegável.
import { Sidebar } from './Sidebar'; // Certifique-se de que o caminho de importação está correto.

// Estilização CSS Modular específica para este componente (HomeOds), garantindo escopo de estilos.
import styles from '../styles/HomeOds.module.css';

/**
 * Componente funcional que representa a tela inicial do sistema com foco nos Objetivos de Desenvolvimento Sustentável.
 * Contém funcionalidades de navegação, um menu lateral dinâmico e links diretos para informações das ODS.
 */
export function HomeOds() {
    // Hook para navegação programática usando o React Router DOM.
    const navigate = useNavigate();
    // Estado para controlar a visibilidade do menu lateral. 'true' indica aberto, 'false' indica fechado.
    const [menuAberto, setMenuAberto] = useState(false);

    /**
     * Função para lidar com o clique no botão de retorno.
     * Redireciona o usuário para a rota '/apresentacao'.
     */
    const handleReturn = () => {
        navigate('/apresentacao');
    };

    /**
     * Função memoizada (`useCallback`) para alternar o estado de abertura/fechamento do menu lateral.
     * Otimiza a performance, evitando recriações desnecessárias da função.
     */
    const toggleMenu = useCallback(() => {
        setMenuAberto((prev) => !prev); // Inverte o valor do estado 'menuAberto'.
    }, []);

    /**
     * Função memoizada (`useCallback`) para lidar com a navegação a partir do componente Sidebar.
     * Garante que o menu seja fechado antes de realizar a navegação para a rota especificada.
     * @param {string} route - A URL da rota para a qual se deseja navegar.
     */
    const handleNavigateFromSidebar = useCallback((route) => {
        setMenuAberto(false); // Fecha o menu lateral.
        navigate(route); // Realiza a navegação para a rota.
    }, [navigate]); // 'navigate' é uma dependência, garantindo que a função seja atualizada se o hook 'navigate' mudar.

    return (
        <div className={styles.container}>
            {/* Logotipo da aplicação posicionado no layout. */}
            <img src={logo} className={styles.logo} alt="Logotipo da Aplicação" aria-label="Logotipo da Aplicação" />
            {/* Ilustração decorativa de um globo terrestre. */}
            <img src={mundoDireita} className={styles.mundoDireita} alt="Ilustração de um Globo Terrestre" aria-label="Ilustração de um Globo Terrestre" />
            {/* Imagem central que representa a estrutura ou um agrupamento dos Objetivos de Desenvolvimento Sustentável. */}
            <img src={frame} className={styles.frame} alt="Estrutura dos Objetivos de Desenvolvimento Sustentável" aria-label="Ícone dos ODS" />

            {/* Ícone de avatar/menu que funciona como botão para abrir e fechar o menu lateral. */}
            <img
                src={menuFoto}
                className={`${styles.menuFotoToggle} ${menuAberto ? styles.menuFotoHidden : ''}`} // Classe dinâmica para esconder/mostrar o ícone.
                alt="Abrir ou Fechar Menu"
                onClick={toggleMenu} // Aciona a função de alternância do menu.
                role="button" // Define o elemento como um botão para fins de acessibilidade.
                aria-label={menuAberto ? "Fechar Menu" : "Abrir Menu"} // Rótulo acessível que muda conforme o estado do menu.
            />

            {/* Wrapper para o componente Sidebar. A classe CSS é dinâmica para animar a transição de abertura/fechamento do menu. */}
            <div className={`${styles.sidebarWrapper} ${menuAberto ? styles.sidebarOpen : ''}`}>
                <Sidebar
                    toggleMenu={toggleMenu} // Prop passada para o Sidebar, permitindo que ele feche a si mesmo.
                    onNavigate={handleNavigateFromSidebar} // Prop para o Sidebar, permitindo que ele inicie navegações.
                />
            </div>

            {/* Links interativos para cada um dos 10 primeiros Objetivos de Desenvolvimento Sustentável (ODS).
                Cada ODS é uma imagem clicável que redireciona para a página correspondente no site da ONU Brasil. */}
            <a href="https://brasil.un.org/pt-br/sdgs/1" target="_blank" rel="noopener noreferrer">
                <img src={ods1} className={styles.ods1} alt="ODS 1: Erradicação da Pobreza" />
            </a>
            <a href="https://brasil.un.org/pt-br/sdgs/2" target="_blank" rel="noopener noreferrer">
                <img src={ods2} className={styles.ods2} alt="ODS 2: Fome Zero e Agricultura Sustentável" />
            </a>
            <a href="https://brasil.un.org/pt-br/sdgs/3" target="_blank" rel="noopener noreferrer">
                <img src={ods3} className={styles.ods3} alt="ODS 3: Saúde e Bem-Estar" />
            </a>
            <a href="https://brasil.un.org/pt-br/sdgs/4" target="_blank" rel="noopener noreferrer">
                <img src={ods4} className={styles.ods4} alt="ODS 4: Educação de Qualidade" />
            </a>
            <a href="https://brasil.un.org/pt-br/sdgs/5" target="_blank" rel="noopener noreferrer">
                <img src={ods5} className={styles.ods5} alt="ODS 5: Igualdade de Gênero" />
            </a>
            <a href="https://brasil.un.org/pt-br/sdgs/6" target="_blank" rel="noopener noreferrer">
                <img src={ods6} className={styles.ods6} alt="ODS 6: Água Potável e Saneamento" />
            </a>
            <a href="https://brasil.un.org/pt-br/sdgs/7" target="_blank" rel="noopener noreferrer">
                <img src={ods7} className={styles.ods7} alt="ODS 7: Energia Limpa e Acessível" />
            </a>
            <a href="https://brasil.un.org/pt-br/sdgs/8" target="_blank" rel="noopener noreferrer">
                <img src={ods8} className={styles.ods8} alt="ODS 8: Trabalho Decente e Crescimento Econômico" />
            </a>
            <a href="https://brasil.un.org/pt-br/sdgs/9" target="_blank" rel="noopener noreferrer">
                <img src={ods9} className={styles.ods9} alt="ODS 9: Indústria, Inovação e Infraestrutura" />
            </a>
            <a href="https://brasil.un.org/pt-br/sdgs/10" target="_blank" rel="noopener noreferrer">
                <img src={ods10} className={styles.ods10} alt="ODS 10: Redução das Desigualdades" />
            </a>

            {/* Ícone de ação principal (ex: iniciar conteúdo, play). */}
            <div className={styles.playIcon} role="button" aria-label="Reproduzir Conteúdo">
                <FaPlay size={24} />
            </div>

            {/* Ícones de interação do usuário: perfil, notificações e mensagens. */}
            <div className={styles.peopleIcon} role="button" aria-label="Perfis de Usuários">
                <MdEmojiPeople size={24} />
            </div>

            <div className={styles.notificationIcon} role="button" aria-label="Notificações">
                <IoIosNotifications size={24} />
            </div>

            <div className={styles.emailIcon} role="button" aria-label="Mensagens">
                <MdEmail size={24} />
            </div>

            {/* Botão de retorno, posicionado para levar o usuário à tela de apresentação. */}
            <div
                className={styles.returnButton}
                onClick={handleReturn} // Aciona a navegação para a tela de apresentação.
                role="button" // Define o elemento como um botão para acessibilidade.
                aria-label="Retornar para a apresentação" // Rótulo acessível.
                tabIndex={0} // Permite que o botão seja focado pela navegação de teclado.
            >
                <IoMdReturnLeft className={styles.returnIcon} /> {/* Ícone visual para o botão de retorno. */}
            </div>
        </div>
    );
}