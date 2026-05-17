import { CssBaseline, ThemeProvider } from "@mui/material";
import { Suspense, lazy, useEffect, useRef, useState } from "react";
import "./App.css";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import theme from "./theme/theme";

const Services = lazy(() => import("./components/Services"));
const Gallery = lazy(() => import("./components/Gallery"));
const About = lazy(() => import("./components/About"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));

const DeferSection: React.FC<{
  children: React.ReactNode;
  rootMargin?: string;
}> = ({ children, rootMargin = "300px" }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return <div ref={ref}>{visible ? children : null}</div>;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <main>
        <Hero />
        <DeferSection>
          <Suspense fallback={null}>
            <Gallery />
          </Suspense>
        </DeferSection>
        <DeferSection>
          <Suspense fallback={null}>
            <Services />
          </Suspense>
        </DeferSection>
        <DeferSection>
          <Suspense fallback={null}>
            <About />
          </Suspense>
        </DeferSection>
        <DeferSection>
          <Suspense fallback={null}>
            <Contact />
          </Suspense>
        </DeferSection>
      </main>
      <DeferSection>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </DeferSection>
    </ThemeProvider>
  );
}

export default App;
