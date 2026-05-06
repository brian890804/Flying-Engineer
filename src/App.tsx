import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme/theme';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Gallery from './components/Gallery';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Gallery />
        <About />
        <Contact />
      </main>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
