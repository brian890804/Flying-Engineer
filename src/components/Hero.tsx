import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PhoneIcon from "@mui/icons-material/Phone";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { animated, useSpring, useTrail } from "@react-spring/web";
import React from "react";

const Hero: React.FC = () => {
  const bgSpring = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1200 },
  });

  const trail = useTrail(4, {
    from: { opacity: 0, transform: "translateY(32px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    config: { tension: 260, friction: 60 },
    delay: 300,
  });

  const spinSpring = useSpring({
    from: { rotate: 0 },
    to: { rotate: 360 },
    loop: true,
    config: { duration: 2600 },
  });

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <animated.div style={bgSpring}>
      <Box
        id="hero"
        sx={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          backgroundImage: `url('/hero.webp')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: { xs: "scroll", lg: "fixed" },
        }}
      >
        {/* Dark gradient overlay */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(61,43,31,0.85) 0%, rgba(90,54,32,0.75) 50%, rgba(30,20,10,0.6) 100%)",
          }}
        />

        {/* Decorative grain texture */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
            backgroundRepeat: "repeat",
            backgroundSize: "200px 200px",
            opacity: 0.6,
            pointerEvents: "none",
          }}
        />

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Box sx={{ maxWidth: 720 }}>
            {/* Eyebrow */}
            <animated.div style={trail[0]}>
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1,
                  mb: 2,
                  px: 2,
                  py: 0.75,
                  borderRadius: "20px",
                  border: "1px solid rgba(196,149,106,0.5)",
                  backgroundColor: "rgba(196,149,106,0.12)",
                }}
              >
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    backgroundColor: "#C4956A",
                    animation: "pulse 2s infinite",
                    "@keyframes pulse": {
                      "0%, 100%": { opacity: 1 },
                      "50%": { opacity: 0.4 },
                    },
                  }}
                />
                <Typography
                  sx={{
                    color: "#D9B090",
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    letterSpacing: "0.12em",
                  }}
                >
                  基隆 ‧ 台北 ‧ 新北 ‧ 桃園
                </Typography>
              </Box>
            </animated.div>

            {/* Main title */}
            <animated.div style={trail[1]}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: "2.6rem", sm: "3.6rem", md: "4.8rem" },
                  fontWeight: 900,
                  lineHeight: 1.1,
                  mb: 1,
                  letterSpacing: "-0.01em",
                }}
              >
                <Box
                  component="span"
                  sx={{
                    background:
                      "linear-gradient(90deg, #FAF7F4 0%, #FAF7F4 20%, #C4956A 38%, #7B5035 50%, #C4956A 62%, #FAF7F4 80%, #FAF7F4 100%)",
                    backgroundSize: "300% 100%",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    textShadow: "none",
                    animation: "brownsweep 4s ease-in-out infinite alternate",
                    "@keyframes brownsweep": {
                      "0%": { backgroundPosition: "100% 0" },
                      "100%": { backgroundPosition: "-100% 0" },
                    },
                    display: "inline",
                  }}
                >
                  飛翔泥水匠
                </Box>
                <Box
                  component="span"
                  sx={{
                    display: "block",
                    fontSize: { xs: "1rem", sm: "1.4rem", md: "1.8rem" },
                    fontWeight: 500,
                    letterSpacing: "0.04em",
                    mt: 2,
                    color: "#D9B090",
                  }}
                >
                  基隆・台北・新北・桃園｜泥作改修・磁磚改修・廁所改修
                </Box>
              </Typography>
            </animated.div>

            {/* Subtitle */}
            <animated.div style={trail[2]}>
              <Typography
                component="h2"
                sx={{
                  color: "#D9B090",
                  fontSize: { xs: "1.1rem", sm: "1.4rem", md: "1.7rem" },
                  fontWeight: 600,
                  mb: 3,
                  letterSpacing: "0.04em",
                }}
              >
                北北基桃首選泥作工程，20年+工藝品質、免費到府估價
              </Typography>
              <Typography
                sx={{
                  color: "rgba(250,247,244,0.8)",
                  fontSize: { xs: "0.95rem", md: "1.05rem" },
                  maxWidth: 520,
                  lineHeight: 1.8,
                  mb: 4,
                }}
              >
                深耕基隆泥作改修、台北泥作改修、新北泥作改修、桃園泥作改修已逾
                20 年， 磁磚改修・廁所翻修・防水工程一站式到位，
                品質保固、免費到府估價，讓每個空間煥然一新。
              </Typography>
            </animated.div>

            {/* CTAs */}
            <animated.div style={trail[3]}>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                {/* 免費估價：spinning border wrapper */}
                <Box
                  sx={{
                    position: "relative",
                    display: "inline-block",
                    p: "2px",
                    borderRadius: "10px",
                    overflow: "hidden",
                  }}
                >
                  {/* Spinning conic-gradient ring */}
                  <animated.div
                    style={{
                      ...spinSpring,
                      position: "absolute",
                      inset: "-120%",
                      background:
                        "conic-gradient(from 0deg, transparent 0deg, transparent 200deg, #C4956A 240deg, #FFE0A0 280deg, rgba(255,255,255,0.95) 300deg, #C4956A 320deg, transparent 360deg)",
                    }}
                  />
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<PhoneIcon />}
                    onClick={() => scrollTo("contact")}
                    sx={{
                      position: "relative",
                      backgroundColor: "#C4956A",
                      color: "#3D2B1F",
                      fontWeight: 700,
                      fontSize: "1rem",
                      width: "100%",
                      px: 3.5,
                      py: 1.4,
                      borderRadius: "8px",
                      "&:hover": { backgroundColor: "#D9B090" },
                    }}
                  >
                    免費估價
                  </Button>
                </Box>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => scrollTo("services")}
                  sx={{
                    borderColor: "rgba(250,247,244,0.6)",
                    color: "#FAF7F4",
                    fontWeight: 700,
                    fontSize: "1rem",
                    px: 3.5,
                    py: 1.4,
                    "&:hover": {
                      borderColor: "#FAF7F4",
                      backgroundColor: "rgba(255,255,255,0.08)",
                    },
                  }}
                >
                  了解服務
                </Button>
              </Stack>
            </animated.div>
          </Box>
        </Container>

        {/* Scroll indicator */}
        <Box
          sx={{
            position: "absolute",
            bottom: 32,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: "pointer",
            animation: "bounce 2s infinite",
            "@keyframes bounce": {
              "0%, 100%": { transform: "translateX(-50%) translateY(0)" },
              "50%": { transform: "translateX(-50%) translateY(8px)" },
            },
          }}
          onClick={() => scrollTo("services")}
        >
          <Typography
            sx={{
              color: "rgba(250,247,244,0.5)",
              fontSize: "0.75rem",
              mb: 0.5,
            }}
          >
            向下滑動
          </Typography>
          <KeyboardArrowDownIcon
            sx={{ color: "rgba(250,247,244,0.5)", fontSize: 28 }}
          />
        </Box>
      </Box>
    </animated.div>
  );
};

export default Hero;
