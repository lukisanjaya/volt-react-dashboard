// =========================================================
// * Volt React Dashboard
// =========================================================

// * Product Page: https://themesberg.com/product/dashboard/volt-react
// * Copyright 2021 Themesberg (https://www.themesberg.com)
// * Official Repository: https://github.com/themesberg/volt-react-dashboard
// * License: MIT License (https://themesberg.com/licensing)

// * Designed and coded by https://themesberg.com

// =========================================================

// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. Please contact us to request a removal.

import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";

// core styles
import "./scss/volt.scss";

// vendor styles
import "react-datetime/css/react-datetime.css";

import HomePage from "./pages/HomePage";
import ScrollToTop from "./components/ScrollToTop";

// Suppress development warnings
if (process.env.NODE_ENV === 'development') {
  const originalWarn = console.warn;
  console.warn = (...args) => {
    if (args[0]?.includes?.('defaultProps') || args[0]?.includes?.('Route render')) {
      return;
    }
    originalWarn(...args);
  };
}

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <ScrollToTop />
    <HomePage />
  </BrowserRouter>
);
