import React, { useState, useRef, useEffect } from 'react';
import { Box, Container, Typography, Modal, IconButton } from '@mui/material';
import { useSpring, animated } from '@react-spring/web';
import CloseIcon from '@mui/icons-material/Close';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const GALLERY_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=75',
    caption: '浴室磁磚翻新',
    category: '磁磚改修',
  },
  {
    src: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=75',
    caption: '廚房牆面泥作',
    category: '泥作工程',
  },
  {
    src: 'https://images.unsplash.com/photo-1564540583246-934409427776?w=800&q=75',
    caption: '地坪水泥粉光',
    category: '地坪施工',
  },
  {
    src: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&q=75',
    caption: '外牆磁磚修繕',
    category: '外牆整修',
  },
  {
    src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=75',
    caption: '衛浴防水改修',
    category: '防水工程',
  },
  {
    src: 'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=800&q=75',
    caption: '客廳地磚鋪設',
    category: '磁磚改修',
  },
  {
    src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=75',
    caption: '壁面整平批土',
    category: '泥作工程',
  },
  {
    src: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=75',
    caption: '室內全面改修',
    category: '室內改修',
  },
  {
    src: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&q=75',
    caption: '浴室整體翻新',
    category: '室內改修',
  },
];

interface GalleryImageProps {
  image: (typeof GALLERY_IMAGES)[0];
  index: number;
  inView: boolean;
  onOpen: (img: (typeof GALLERY_IMAGES)[0]) => void;
}

const GalleryImage: React.FC<GalleryImageProps> = ({ image, index, inView, onOpen }) => {
  const [hovered, setHovered] = useState(false);

  const cardSpring = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0px) scale(1)' : 'translateY(40px) scale(0.96)',
    delay: index * 80,
    config: { tension: 260, friction: 60 },
  });

  const overlaySpring = useSpring({
    opacity: hovered ? 1 : 0,
    config: { tension: 280, friction: 60 },
  });

  return (
    <animated.div style={{ ...cardSpring, position: 'relative' }}>
      <Box
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => onOpen(image)}
        sx={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 2,
          cursor: 'pointer',
          aspectRatio: '4/3',
          backgroundColor: '#E8D9C8',
        }}
      >
        <Box
          component="img"
          src={image.src}
          alt={image.caption}
          loading="lazy"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease',
            transform: hovered ? 'scale(1.08)' : 'scale(1)',
          }}
        />
        <animated.div
          style={{
            ...overlaySpring,
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to top, rgba(61,43,31,0.85) 0%, rgba(61,43,31,0.35) 50%, transparent 100%)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '20px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}
          >
            <Box>
              <Typography
                sx={{
                  color: '#C4956A',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  mb: 0.5,
                }}
              >
                {image.category}
              </Typography>
              <Typography
                sx={{
                  color: '#FAF7F4',
                  fontWeight: 600,
                  fontSize: '1rem',
                }}
              >
                {image.caption}
              </Typography>
            </Box>
            <ZoomInIcon sx={{ color: '#FAF7F4', fontSize: 28 }} />
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
  const [selectedImage, setSelectedImage] = useState<(typeof GALLERY_IMAGES)[0] | null>(null);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setGridInView(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Box
      id="gallery"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: '#F0E6D8',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative element */}
      <Box
        sx={{
          position: 'absolute',
          bottom: -120,
          left: -120,
          width: 360,
          height: 360,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(123,80,53,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="lg">
        {/* Section header */}
        <animated.div ref={ref} style={headerSpring}>
          <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
            <Typography
              sx={{
                color: '#C4956A',
                fontWeight: 700,
                fontSize: '0.85rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                mb: 1.5,
              }}
            >
              Our Works
            </Typography>
            <Typography
              variant="h2"
              sx={{
                color: '#3D2B1F',
                fontSize: { xs: '1.9rem', md: '2.6rem' },
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
                backgroundColor: '#C4956A',
                borderRadius: 2,
                mx: 'auto',
                mb: 2,
              }}
            />
            <Typography sx={{ color: '#6B4A36', maxWidth: 500, mx: 'auto', lineHeight: 1.8 }}>
              每個案例都是我們對品質的承諾，點擊圖片查看施工詳情。
            </Typography>
          </Box>
        </animated.div>

        {/* Grid */}
        <Box
          ref={gridRef}
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
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
              onOpen={setSelectedImage}
            />
          ))}
        </Box>
      </Container>

      {/* Lightbox Modal */}
      <Modal
        open={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
        }}
      >
        <Box
          sx={{
            position: 'relative',
            maxWidth: '90vw',
            maxHeight: '90vh',
            outline: 'none',
          }}
        >
          <IconButton
            onClick={() => setSelectedImage(null)}
            sx={{
              position: 'absolute',
              top: -16,
              right: -16,
              backgroundColor: '#3D2B1F',
              color: '#FAF7F4',
              zIndex: 1,
              '&:hover': { backgroundColor: '#7B5035' },
            }}
          >
            <CloseIcon />
          </IconButton>
          {selectedImage && (
            <Box>
              <Box
                component="img"
                src={selectedImage.src.replace('w=800', 'w=1200')}
                alt={selectedImage.caption}
                sx={{
                  maxWidth: '90vw',
                  maxHeight: '80vh',
                  objectFit: 'contain',
                  borderRadius: 2,
                  display: 'block',
                }}
              />
              <Box
                sx={{
                  backgroundColor: '#3D2B1F',
                  borderRadius: '0 0 8px 8px',
                  px: 3,
                  py: 1.5,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography sx={{ color: '#FAF7F4', fontWeight: 600 }}>
                  {selectedImage.caption}
                </Typography>
                <Typography
                  sx={{
                    color: '#C4956A',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                  }}
                >
                  {selectedImage.category}
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default Gallery;
