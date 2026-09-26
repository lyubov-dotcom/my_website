import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import Layout from './Layout.tsx'
import Home from './pages/Home.tsx'
import CaseStudy from './pages/CaseStudy.tsx'
import PremiumCase from './pages/PremiumCase.tsx'
import ArmCase from './pages/ArmCase.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="case/bank-registration" element={<CaseStudy />} />
          <Route path="case/octobank-premium" element={<PremiumCase />} />
          <Route path="case/web-arm" element={<ArmCase />} />
        </Route>
      </Routes>
    </HashRouter>
  </StrictMode>,
)
