/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import BottomNav from './components/BottomNav';
import ConfigWarning from './components/ConfigWarning';
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';

import { NavProvider, useNav } from './context/NavContext';

// Lazy load pages for production optimization
const Home = lazy(() => import('./pages/Home'));
const Aim = lazy(() => import('./pages/Aim'));
const Theory = lazy(() => import('./pages/Theory'));
const Simulator = lazy(() => import('./pages/Simulator'));
const Quiz = lazy(() => import('./pages/Quiz'));
const References = lazy(() => import('./pages/References'));
const Contributors = lazy(() => import('./pages/Contributors'));
const Feedback = lazy(() => import('./pages/Feedback'));
const Contact = lazy(() => import('./pages/Contact'));
const SignIn = lazy(() => import('./pages/Auth/SignIn'));
const SignUp = lazy(() => import('./pages/Auth/SignUp'));
const ForgotPassword = lazy(() => import('./pages/Auth/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/Auth/ResetPassword'));
const ManageAccount = lazy(() => import('./pages/Auth/ManageAccount'));

// Loading component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
  </div>
);

function AppContent() {
  const { isMoreOpen, setIsMoreOpen } = useNav();

  return (
    <div className="flex min-h-screen bg-background-lab overflow-x-hidden">
      <Sidebar />
      <BottomNav isMoreOpen={isMoreOpen} setIsMoreOpen={setIsMoreOpen} />
      <div className="flex-1 lg:ml-64 flex flex-col min-w-0">
        <ConfigWarning />
        <main className="flex-1 p-4 lg:p-8 mt-16 lg:mt-0 pb-32 lg:pb-0 relative">
          <div className="max-w-7xl mx-auto min-h-[calc(100vh-400px)]">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/aim" element={<Aim />} />
                <Route path="/theory" element={<Theory />} />
                <Route path="/simulator" element={
                  <ProtectedRoute>
                    <Simulator />
                  </ProtectedRoute>
                } />
                <Route path="/pretest" element={
                  <ProtectedRoute>
                    <Quiz type="pretest" />
                  </ProtectedRoute>
                } />
                <Route path="/posttest" element={
                  <ProtectedRoute>
                    <Quiz type="posttest" />
                  </ProtectedRoute>
                } />
                <Route path="/references" element={<References />} />
                <Route path="/contributors" element={<Contributors />} />
                <Route path="/feedback" element={<Feedback />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/account" element={
                  <ProtectedRoute>
                    <ManageAccount />
                  </ProtectedRoute>
                } />
              </Routes>
            </Suspense>
          </div>
          <Footer />
          <Chatbot isHidden={isMoreOpen} />
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <NavProvider>
        <AppContent />
      </NavProvider>
    </Router>
  );
}
