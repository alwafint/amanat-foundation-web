import React from 'react';
// Layout imports
import Navbar from '../components/layout/Navbar';      // @ এর বদলে ..
import SiteFooter from '../components/layout/SiteFooter';

// Sections imports (Relative Paths)
import Hero from '../components/sections/Hero';
import Stats from '../components/sections/Stats';
import Services from '../components/sections/Services';
import About from '../components/sections/About';
import SocialWork from '../components/sections/SocialWork';
import Rewards from '../components/sections/Rewards';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar />
      <Hero />
      <Stats />
      <Services />
      <About />
      <SocialWork />
      <Rewards />
      <SiteFooter />
    </div>
  );
}