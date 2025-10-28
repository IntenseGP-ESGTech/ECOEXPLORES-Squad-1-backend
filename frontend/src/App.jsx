/**
 * Configuração principal de roteamento da aplicação.
 * Este módulo define a estrutura de rotas usando o React Router DOM, mapeando URLs para componentes de página específicos.
 * @module App
 * @requires react-router-dom - Biblioteca para gerenciamento de rotas em aplicações React.
 * @requires ./pages/* - Módulos de componentes de página importados da pasta 'pages'.
 */

// Importa os componentes essenciais para configurar o roteamento no React Router DOM v6.
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importação de todos os componentes de página que serão utilizados nas rotas da aplicação.
import { Apresentacao } from './pages/Apresentacao';         // Componente da página de apresentação ou "landing page" da aplicação.
import { Login } from './pages/Login';                       // Componente da página de autenticação de usuários.
import { PreCadastro } from './pages/PreCadastro';           // Componente para a tela de seleção do tipo de cadastro (ex: escola, responsável, aluno).
import { CadastroEscola } from './pages/CadastroEscola';     // Componente do formulário de cadastro para escolas.
import { CadastroProfessor } from './pages/CadastroProfessor'; // Componente do formulário de cadastro para professores.
import { CadastroResponsavel } from './pages/CadastroResponsavel'; // Componente do formulário de cadastro para responsáveis.
import { CadastroAluno } from './pages/CadastroAluno';       // Componente do formulário de cadastro para alunos.
import { Home } from './pages/Home';                         // Componente do dashboard principal da aplicação.
import { HomeOds } from './pages/HomeOds';                   // Componente de um dashboard secundário, possivelmente focado em Objetivos de Desenvolvimento Sustentável (ODS).

/**
 * Componente principal da aplicação que define a estrutura de rotas.
 * Ele engloba todas as rotas da aplicação, permitindo a navegação entre as diferentes telas
 * sem a necessidade de recarregar a página.
 * @returns {JSX.Element} A estrutura de roteamento configurada para a aplicação.
 */
export function App() {
  return (
    // O BrowserRouter é o provedor de roteamento que permite a navegação baseada no histórico do navegador.
    <Router>
      {/* O componente Routes agrupa todas as definições de rota.
          Apenas uma rota correspondente será renderizada por vez. */}
      <Routes>
        {/*
         * Seção de Rotas Públicas:
         * Acessíveis sem autenticação, geralmente para a página inicial, login e pré-cadastro.
         */}
        <Route path="/" element={<Apresentacao />} />           {/* Rota raiz, direcionando para a página de apresentação. */}
        <Route path="/login" element={<Login />} />             {/* Rota para a página de login. */}
        <Route path="/precadastro" element={<PreCadastro />} /> {/* Rota para a seleção do tipo de cadastro. */}
        
        {/*
         * Seção de Rotas de Formulários de Cadastro:
         * Rotas para os formulários específicos de cada tipo de usuário.
         */}
        <Route path="/cadastro/escola" element={<CadastroEscola />} />       {/* Rota para o formulário de cadastro de escola. */}
        <Route path="/cadastro/professor" element={<CadastroProfessor />} /> {/* Rota para o formulário de cadastro de professor. */}
        <Route path="/cadastro/responsavel" element={<CadastroResponsavel />} /> {/* Rota para o formulário de cadastro de responsável. */}
        <Route path="/cadastro/aluno" element={<CadastroAluno />} />         {/* Rota para o formulário de cadastro de aluno. */}
        
        {/*
         * Seção de Rotas Autenticadas (ou Rotas Pós-Login):
         * Estas rotas geralmente exigem que o usuário esteja logado para serem acessadas.
         */}
        <Route path="/home" element={<Home />} />               {/* Rota para o dashboard principal. */}
        <Route path="/HomeOds" element={<HomeOds />} />         {/* Rota para o dashboard focado em ODS. */}
        <Route path="/apresentacao" element={<Apresentacao />} /> {/* Rota duplicada para Apresentacao. Considerar se é intencional ou se a rota "/" já é suficiente. */}
      </Routes>
    </Router>
  );
}