/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { StorySection } from './components/StorySection';
import { LetterSection } from './components/LetterSection';
import { PromisesSection } from './components/PromisesSection';
import { MemoryVault } from './components/MemoryVault';
import { SisterCoupons } from './components/SisterCoupons';
import { MessageBoard } from './components/MessageBoard';
import { Footer } from './components/Footer';
import { GiftPopupModal } from './components/GiftPopupModal';

export default function App() {
  return (
    <div className="min-h-screen bg-white text-slate-800 font-body antialiased selection:bg-rose-100 selection:text-rose-700">
      {/* Gift Surprise Popup that opens automatically */}
      <GiftPopupModal />

      {/* Clean White Top Bar */}
      <Navbar />

      {/* Main Content */}
      <main>
        {/* Hero Section with Clean 3D Centerpiece */}
        <HeroSection />

        {/* 4 Simple Chapters of Mandip & Prachi */}
        <StorySection />

        {/* Heartfelt Letter from Mandip to Prachi */}
        <LetterSection />

        {/* Mandip's 5 Unshakable Promises */}
        <PromisesSection />

        {/* Sister Memory Vault */}
        <MemoryVault />

        {/* Prachi's Redeemable Sibling Vouchers */}
        <SisterCoupons />

        {/* Sister & Brother Message Board */}
        <MessageBoard />
      </main>

      {/* Clean Minimalist Footer */}
      <Footer />
    </div>
  );
}
