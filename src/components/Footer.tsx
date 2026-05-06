import React from 'react';
import { Box, Container, Typography, Divider } from '@mui/material';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const SERVICES_LINKS = [
  '泥作工程',
  '磁磚改修',
  '室內改修',
  '防水工程',
  '地坪施工',
  '外牆整修',
];

const AREA_KEYWORDS = [
  '基隆泥作改修',
  '台北泥作修繕',
  '新北泥作改修',
  '桃園泥作修繕',
  '北北基桃修繕',
  '家庭改修',
  '老屋翻修',
  '磁磚修繕',
];

const Footer: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#2A1D14',
        pt: { xs: 6, md: 8 },
        pb: 3,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(4, 1fr)',
            },
            gap: 4,
            mb: 6,
          }}
        >
          {/* Brand column */}
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <HomeRepairServiceIcon sx={{ color: '#C4956A', fontSize: 26 }} />
              <Typography
                sx={{
                  color: '#FAF7F4',
                  fontWeight: 900,
                  fontSize: '1.1rem',
                  letterSpacing: '0.08em',
                }}
              >
                飛翔工程行
              </Typography>
            </Box>
            <Typography
              sx={{
                color: 'rgba(250,247,244,0.55)',
                fontSize: '0.85rem',
                lineHeight: 1.8,
                mb: 2.5,
              }}
            >
              專業泥作修繕・磁磚改修・室內改修
              <br />
              服務北北基桃地區超過十五年
              <br />
              品質保證，免費到府估價
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <PhoneIcon sx={{ color: '#C4956A', fontSize: 16 }} />
              <Typography sx={{ color: '#D9B090', fontSize: '0.9rem', fontWeight: 600 }}>
                0912-345-678
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <LocationOnIcon sx={{ color: '#C4956A', fontSize: 16 }} />
              <Typography sx={{ color: 'rgba(250,247,244,0.55)', fontSize: '0.82rem' }}>
                基隆・台北・新北・桃園
              </Typography>
            </Box>
          </Box>

          {/* Services column */}
          <Box>
            <Typography
              sx={{
                color: '#FAF7F4',
                fontWeight: 700,
                mb: 2.5,
                fontSize: '0.95rem',
                letterSpacing: '0.05em',
              }}
            >
              服務項目
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}>
              {SERVICES_LINKS.map((s) => (
                <Typography
                  key={s}
                  onClick={() => scrollTo('services')}
                  sx={{
                    color: 'rgba(250,247,244,0.55)',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    transition: 'color 0.2s',
                    '&:hover': { color: '#D9B090' },
                  }}
                >
                  {s}
                </Typography>
              ))}
            </Box>
          </Box>

          {/* Quick links */}
          <Box>
            <Typography
              sx={{
                color: '#FAF7F4',
                fontWeight: 700,
                mb: 2.5,
                fontSize: '0.95rem',
                letterSpacing: '0.05em',
              }}
            >
              快速導覽
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}>
              {[
                { label: '首頁', id: 'hero' },
                { label: '服務項目', id: 'services' },
                { label: '精選案例', id: 'gallery' },
                { label: '關於我們', id: 'about' },
                { label: '聯絡我們', id: 'contact' },
              ].map((link) => (
                <Typography
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  sx={{
                    color: 'rgba(250,247,244,0.55)',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    transition: 'color 0.2s',
                    '&:hover': { color: '#D9B090' },
                  }}
                >
                  {link.label}
                </Typography>
              ))}
            </Box>
          </Box>

          {/* Business hours */}
          <Box>
            <Typography
              sx={{
                color: '#FAF7F4',
                fontWeight: 700,
                mb: 2.5,
                fontSize: '0.95rem',
                letterSpacing: '0.05em',
              }}
            >
              服務時間
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {[
                { day: '週一 至 週五', time: '08:00 – 18:00', available: true },
                { day: '週六', time: '08:00 – 17:00', available: true },
                { day: '週日 / 國定假日', time: '預約制', available: false },
              ].map((item) => (
                <Box key={item.day}>
                  <Typography
                    sx={{ color: 'rgba(250,247,244,0.55)', fontSize: '0.8rem', mb: 0.2 }}
                  >
                    {item.day}
                  </Typography>
                  <Typography
                    sx={{
                      color: item.available ? '#D9B090' : 'rgba(250,247,244,0.35)',
                      fontSize: '0.88rem',
                      fontWeight: 600,
                    }}
                  >
                    {item.time}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        {/* SEO Keywords area */}
        <Box
          sx={{
            borderTop: '1px solid rgba(250,247,244,0.07)',
            pt: 3,
            mb: 3,
          }}
        >
          <Typography
            sx={{
              color: 'rgba(250,247,244,0.25)',
              fontSize: '0.72rem',
              lineHeight: 2,
              textAlign: 'center',
            }}
          >
            {AREA_KEYWORDS.join(' · ')} · 泥作修繕 · 磁磚改修 · 室內改修 · 防水工程 · 老屋翻修 · 基隆改修 · 台北改修 · 新北改修 · 桃園改修
          </Typography>
        </Box>

        <Divider sx={{ borderColor: 'rgba(250,247,244,0.07)', mb: 3 }} />

        {/* Bottom bar */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Typography sx={{ color: 'rgba(250,247,244,0.3)', fontSize: '0.8rem' }}>
            © {new Date().getFullYear()} 飛翔工程行 Flying Engineer. All rights reserved.
          </Typography>
          <Typography sx={{ color: 'rgba(250,247,244,0.3)', fontSize: '0.8rem' }}>
            專業泥作修繕 · 北北基桃服務
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
