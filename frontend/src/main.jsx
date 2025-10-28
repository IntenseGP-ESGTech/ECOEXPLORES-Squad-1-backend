/**
 * Importação da biblioteca React - obrigatória para componentes JSX
 * @module react
 */
import React from 'react';

/**
 * ReactDOM client API - utilizado para renderização otimizada
 * @see {@link https://reactjs.org/docs/react-dom-client.html}
 */
import ReactDOM from 'react-dom/client';

/**
 * Componente raiz da aplicação
 * @component
 * @requires ./App
 */
import { App } from './App';

/**
 * Estilos globais da aplicação
 * @stylesheet ./index.css
 */
import './index.css';

// Inicializa a raiz de renderização no elemento #root do DOM
const root = ReactDOM.createRoot(document.getElementById('root'));

/**
 * Renderiza a aplicação dentro do StrictMode para:
 * - Identificar práticas inseguras
 * - Detectar efeitos colaterais acidentais
 * - Avisar sobre uso de APIs depreciadas
 */
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);