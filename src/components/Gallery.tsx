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
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=75",
    caption: "廁所磁磚改修翻新",
    alt: "基隆廁所磁磚改修完工案例，飛翔泥水匠浴室壁磚翻新施工",
    category: "磁磚改修",
    detailSrc: "a-progress.webp",
  },
  {
    src: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=75",
    caption: "廚房牆面泥作工程",
    alt: "台北廚房牆面泥作改修，水泥砂漿抹面粉光工程",
    category: "泥作工程",
    detailSrc: "b-progress.webp",
  },
  {
    src: "https://images.unsplash.com/photo-1564540583246-934409427776?w=800&q=75",
    caption: "地坪水泥粉光施工",
    alt: "新北地坪水泥粉光地坪施工，飛翔泥水匠地板整平改修",
    category: "地坪施工",
    detailSrc: "c-progress.webp",
  },
  {
    src: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&q=75",
    caption: "外牆磁磚改修修繕",
    alt: "基隆外牆磁磚改修修繕，老屋外牆整修翻新工程",
    category: "外牆整修",
    detailSrc: "d-progress.webp",
  },
  {
    src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=75",
    caption: "衛浴防水改修工程",
    alt: "廁所衛浴防水改修，廁所磁磚改修防水工程基隆台北新北",
    category: "防水工程",
    detailSrc: "e-progress.webp",
  },
  {
    src: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=800&q=75",
    caption: "客廳地磚磁磚鋪設",
    alt: "桃園汐止客廳地磚磁磚改修鋪設，飛翔泥水匠磁磚施工",
    category: "磁磚改修",
    detailSrc: "f-progress.webp",
  },
  {
    src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=75",
    caption: "壁面泥作整平批土",
    alt: "內湖壁面泥作整平批土改修，水泥抹面粉光牆面修繕",
    category: "泥作工程",
    detailSrc: "g-progress.webp",
  },
  {
    src: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=75",
    caption: "室內老屋全面改修",
    alt: "台北老屋室內全面改修翻新，泥作磁磚改修一站式施工",
    category: "室內改修",
    detailSrc: "h-progress.webp",
  },
  {
    src: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&q=75",
    caption: "浴室廁所整體翻新",
    alt: "基隆浴室廁所改修整體翻新，廁所磁磚改修防水完工實績",
    category: "室內改修",
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
          aspectRatio: "4/3",
          backgroundColor: "#E8D9C8",
        }}
      >
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
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "opacity 280ms ease, transform 0.5s ease",
            transform: hovered ? "scale(1.08)" : "scale(1)",
            opacity: imgLoaded ? 1 : 0,
            backgroundColor: "#E8D9C8",
          }}
        />
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
          {GALLERY_IMAGES.map((image, index) => (
            <GalleryImage
              key={image.caption}
              image={image}
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
                      setSelectedImage({ ...image, src: mod?.default ?? mod }),
                    )
                    .catch(() =>
                      setSelectedImage({ ...image, src: image.src }),
                    );
                } else {
                  setSelectedImage({ ...image, src: image.src });
                }
              }}
            />
          ))}
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
