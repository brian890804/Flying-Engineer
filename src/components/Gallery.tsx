import ZoomInIcon from "@mui/icons-material/ZoomIn";
import { Box, Container, Typography } from "@mui/material";
import { animated, useSpring } from "@react-spring/web";
import React, { Suspense, lazy, useEffect, useRef, useState } from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const GalleryLightbox = lazy(() => import("./GalleryLightbox"));

// Lazy and eager maps for gallery assets under `src/assets/gallery`.
const galleryModules = import.meta.glob(
  "../assets/gallery/*.{webp,jpg,jpeg,png}",
);

let galleryEagerMap: Record<string, string> = {};
try {
  const _eager = import.meta.globEager(
    "../assets/gallery/*.{webp,jpg,jpeg,png}",
  ) as Record<string, any>;
  for (const p in _eager) {
    const name = p.replace("../assets/gallery/", "");
    galleryEagerMap[name] = _eager[p]?.default ?? _eager[p];
  }
} catch (e) {
  galleryEagerMap = {};
}

const GALLERY_IMAGES = [
  {
    src: "a.jpg",
    caption: "廚房粉光、地板硬底貼木紋磚施工案例",
    alt: "新北蘆洲廚房粉光、地板硬底貼木紋磚施工案例。",
    category: "打底、粉光、防水、貼磚",
    detailSrc: "a-progress.webp",
  },
  {
    src: "b.jpg",
    caption: "浴室貼牆壁、地板磁磚施工案例",
    alt: "新北蘆洲浴室貼牆壁、地板磁磚施工案例。",
    category: "打底、防水、貼磚",
    detailSrc: "b-progress.webp",
  },
  {
    src: "c.jpg",
    caption: "地坪拆除打底粉光施工案例",
    alt: "基隆深溪路地坪拆除打底粉光施工案例。",
    category: "打底、粉光、防水、貼磚",
    detailSrc: "c-progress.webp",
  },
  {
    src: "d.jpg",
    caption: "主浴牆壁、地板施工案例",
    alt: "新北蘆洲主浴牆壁、地板施工案例。",
    category: "拆除、防水、貼磚",
    detailSrc: "d-progress.webp",
  },
  {
    src: "e.jpg",
    caption: "主浴牆壁、地板施工案例",
    alt: "新北汐止環山路主浴牆壁、地板施工案例。",
    category: "拆除、打底、防水、貼磚",
    detailSrc: "e-progress.webp",
  },
  {
    src: "f.jpg",
    caption: "牆面、地板施工案例",
    alt: "內湖牆面、地板施工案例。",
    category: "拆除、打底、防水、貼磚",
    detailSrc: "f-progress.webp",
  },
  {
    src: "g.jpg",
    caption: "打底粉光施工案例",
    alt: "士林打底粉光施工案例。",
    category: "拆除、打底、粉光、防水、貼磚",
    detailSrc: "g-progress.webp",
  },
  {
    src: "h.jpg",
    caption: "廁所牆壁、地板、貼六角磚施工案例",
    alt: "新北汐止環山路廁所牆壁、地板、貼六角磚施工案例。",
    category: "拆除、打底、粉光、防水、貼磚",
    detailSrc: "h-progress.webp",
  },
];

interface GalleryImageProps {
  image: (typeof GALLERY_IMAGES)[0] & { alt?: string };
  index: number;
  inView: boolean;
  onOpen: () => void;
}

const GalleryImage: React.FC<GalleryImageProps> = ({
  image,
  index,
  inView,
  onOpen,
}) => {
  const [hovered, setHovered] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const initialThumb =
    image.detailSrc && galleryEagerMap[image.detailSrc]
      ? galleryEagerMap[image.detailSrc]
      : null;
  const [localThumb, setLocalThumb] = useState<string | null>(initialThumb);
  const [imgLoaded, setImgLoaded] = useState<boolean>(false);

  const cardSpring = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView
      ? "translateY(0px) scale(1)"
      : "translateY(40px) scale(0.96)",
    delay: index * 80,
    config: { tension: 260, friction: 60 },
  });

  const overlaySpring = useSpring({
    opacity: hovered ? 1 : 0,
    config: { tension: 280, friction: 60 },
  });

  useEffect(() => {
    if (localThumb) return; // already have eager thumb
    const el = imgRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setLocalThumb(image.src);
          obs.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [image.detailSrc, localThumb]);

  return (
    <animated.div style={{ ...cardSpring, position: "relative" }}>
      <Box
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={onOpen}
        sx={{
          position: "relative",
          overflow: "hidden",
          borderRadius: 2,
          cursor: "pointer",
          backgroundColor: "#E8D9C8",
        }}
      >
        {/* Aspect-ratio spacer to reserve height and prevent layout shift */}
        <Box sx={{ width: "100%", height: 0, pt: "75%" }} />

        {/* Image absolutely positioned to fill the reserved area */}
        <Box
          component="img"
          ref={imgRef as any}
          src={localThumb ?? image.src}
          alt={image.alt ?? image.caption}
          onLoad={() => setImgLoaded(true)}
          loading={initialThumb ? "eager" : "lazy"}
          width={800}
          height={600}
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "opacity 280ms ease, transform 0.5s ease",
            transform: hovered ? "scale(1.08)" : "scale(1)",
            opacity: imgLoaded ? 1 : 0,
            backgroundColor: "#E8D9C8",
          }}
        />
        {/* Placeholder box remains in flow but hidden visually once image loaded */}
        {!imgLoaded && (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              backgroundColor: "#E8D9C8",
            }}
          />
        )}
        <animated.div
          style={{
            ...overlaySpring,
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(61,43,31,0.85) 0%, rgba(61,43,31,0.35) 50%, transparent 100%)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <Box>
              <Typography
                sx={{
                  color: "#C4956A",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  mb: 0.5,
                }}
              >
                {image.category}
              </Typography>
              <Typography
                sx={{ color: "#FAF7F4", fontWeight: 600, fontSize: "1rem" }}
              >
                {image.caption}
              </Typography>
            </Box>
            <ZoomInIcon sx={{ color: "#FAF7F4", fontSize: 28 }} />
          </Box>
        </animated.div>
      </Box>
    </animated.div>
  );
};

const Gallery: React.FC = () => {
  const { ref, spring: headerSpring } = useScrollAnimation();
  const gridRef = useRef<HTMLDivElement>(null);
  const [gridInView, setGridInView] = useState(false);
  const [selectedImage, setSelectedImage] = useState<
    (typeof GALLERY_IMAGES)[0] | null
  >(null);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setGridInView(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.05 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Box
      id="gallery"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: "#F0E6D8",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative element */}
      <Box
        sx={{
          position: "absolute",
          bottom: -120,
          left: -120,
          width: 360,
          height: 360,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(123,80,53,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="lg">
        {/* Section header */}
        <animated.div ref={ref} style={headerSpring}>
          <Box sx={{ textAlign: "center", mb: { xs: 6, md: 8 } }}>
            <Typography
              sx={{
                color: "#C4956A",
                fontWeight: 700,
                fontSize: "0.85rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                mb: 1.5,
              }}
            >
              Our Works
            </Typography>
            <Typography
              variant="h2"
              sx={{
                color: "#3D2B1F",
                fontSize: { xs: "1.9rem", md: "2.6rem" },
                fontWeight: 700,
                mb: 2,
              }}
            >
              精選施工案例
            </Typography>
            <Box
              sx={{
                width: 60,
                height: 4,
                backgroundColor: "#C4956A",
                borderRadius: 2,
                mx: "auto",
                mb: 2,
              }}
            />
            <Typography
              sx={{
                color: "#6B4A36",
                maxWidth: 500,
                mx: "auto",
                lineHeight: 1.8,
              }}
            >
              每個案例都是我們對品質的承諾，點擊圖片查看施工詳情。
            </Typography>
          </Box>
        </animated.div>

        {/* Grid */}
        <Box
          ref={gridRef}
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
            gap: 2.5,
          }}
        >
          {GALLERY_IMAGES.map((image, index) => {
            const resolvedThumb =
              galleryEagerMap[image.src] ??
              new URL(`../assets/gallery/${image.src}`, import.meta.url).href;

            return (
              <GalleryImage
                key={image.caption}
                image={{ ...image, src: resolvedThumb }}
                index={index}
                inView={gridInView}
                onOpen={() => {
                  // Prefer eager path (already available) to avoid extra async delay.
                  if (image.detailSrc && galleryEagerMap[image.detailSrc]) {
                    setSelectedImage({
                      ...image,
                      src: galleryEagerMap[image.detailSrc],
                    });
                    return;
                  }
                  const importPath = `../assets/gallery/${image.detailSrc}`;
                  const importer = (galleryModules as any)[importPath];
                  if (importer) {
                    importer()
                      .then((mod: any) =>
                        setSelectedImage({
                          ...image,
                          src: mod?.default ?? mod,
                        }),
                      )
                      .catch(() =>
                        setSelectedImage({ ...image, src: resolvedThumb }),
                      );
                  } else {
                    setSelectedImage({ ...image, src: resolvedThumb });
                  }
                }}
              />
            );
          })}
        </Box>
      </Container>

      {selectedImage && (
        <Suspense fallback={null}>
          <GalleryLightbox
            image={selectedImage}
            onClose={() => setSelectedImage(null)}
          />
        </Suspense>
      )}
    </Box>
  );
};

export default Gallery;
