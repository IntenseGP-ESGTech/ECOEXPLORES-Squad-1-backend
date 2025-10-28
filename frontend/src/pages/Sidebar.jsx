import React from 'react';
import styles from '../styles/Sidebar.module.css'; // Importa o arquivo CSS Module para estilização do Sidebar.

// Importação das imagens/ícones que serão exibidos no menu lateral.
import avatar from '../assets/avatar.svg'; // Ícone de avatar/perfil do usuário.
import calendario from '../assets/agenda.svg'; // Ícone de calendário/agenda.
import configuracoes from '../assets/config.svg'; // Ícone de configurações.
import documento from '../assets/doc.svg'; // Ícone de documento.
import email from '../assets/email.svg'; // Ícone de e-mail.
import mundoSide from '../assets/mundoSide.svg'; // Ícone de globo/mundo, possivelmente para navegação global.

/**
 * Componente funcional Sidebar.
 * Este componente representa um menu lateral de navegação, que pode ser aberto e fechado.
 * Ele recebe funções como props para interagir com o componente pai (Home ou HomeOds).
 * @param {Object} props - As propriedades passadas para o componente.
 * @param {function} props.toggleMenu - Função para alternar o estado de abertura/fechamento do menu lateral.
 * @param {function} props.onNavigate - Função para navegar para uma rota específica da aplicação.
 * @returns {JSX.Element} O componente Sidebar renderizado.
 */
export function Sidebar({ toggleMenu, onNavigate }) {
  return (
    <div className={styles.sidebar}>
      {/* Item do Menu 1: Avatar (funciona como um botão para fechar o menu) */}
      <div
        className={styles.menuItem} // Aplica estilos para cada item do menu.
        onClick={toggleMenu} // Ao clicar, invoca a função 'toggleMenu' para fechar o menu lateral.
        role="button" // Define o papel semântico como um botão para acessibilidade.
        aria-label="Fechar Menu" // Fornece um rótulo acessível para leitores de tela.
      >
        <img src={avatar} alt="Perfil do Usuário" className={styles.menuIcon} /> {/* Ícone visual do item. */}
        <span className={styles.menuText}>MENU</span> {/* Texto descritivo do item. */}
      </div>

      {/* Item do Menu 2: Calendário (exemplo de item sem ação de navegação específica neste componente) */}
      <div className={styles.menuItem} role="button" aria-label="Calendário">
        <img src={calendario} alt="Calendário" className={styles.menuIcon} />
        <span className={styles.menuText}>MENU</span>
      </div>

      {/* Item do Menu 3: Engrenagem (exemplo de item sem ação de navegação específica neste componente) */}
      <div className={styles.menuItem} role="button" aria-label="Configurações">
        <img src={configuracoes} alt="Configurações" className={styles.menuIcon} />
        <span className={styles.menuText}>MENU</span>
      </div>

      {/* Item do Menu 4: Documento (exemplo de item sem ação de navegação específica neste componente) */}
      <div className={styles.menuItem} role="button" aria-label="Documentos">
        <img src={documento} alt="Documentos" className={styles.menuIcon} />
        <span className={styles.menuText}>MENU</span>
      </div>

      {/* Item do Menu 5: E-mail (exemplo de item sem ação de navegação específica neste componente) */}
      <div className={styles.menuItem} role="button" aria-label="E-mail">
        <img src={email} alt="Recursos" className={styles.menuIcon} />
        <span className={styles.menuText}>MENU</span>
      </div>

      {/* Item do Menu 6: Globo (mundoSide) - Navega para a página HomeOds */}
      <div
        className={styles.menuItem}
        onClick={() => onNavigate('/HomeOds')} // Ao clicar, invoca 'onNavigate' para ir para '/HomeOds'.
        role="button"
        aria-label="Ir para Home ODS"
      >
        <img src={mundoSide} alt="Global" className={styles.menuIcon} />
        <span className={styles.menuText}>MENU</span>
      </div>
    </div>
  );
}