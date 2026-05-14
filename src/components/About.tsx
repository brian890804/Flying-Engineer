import HandshakeIcon from "@mui/icons-material/Handshake";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StarIcon from "@mui/icons-material/Star";
import VerifiedIcon from "@mui/icons-material/Verified";
import { Box, Container, Typography } from "@mui/material";
import { animated, useSpring } from "@react-spring/web";
import React, { useEffect, useRef, useState } from "react";
import {
  useCountAnimation,
  useScrollAnimation,
} from "../hooks/useScrollAnimation";

const STATS = [
  {
    icon: <StarIcon sx={{ fontSize: 32, color: "#C4956A" }} />,
    value: 20,
    unit: "+",
    label: "年專業經驗",
  },
  {
    icon: <VerifiedIcon sx={{ fontSize: 32, color: "#C4956A" }} />,
    value: 500,
    unit: "+",
    label: "完工案例",
  },
  {
    icon: <LocationOnIcon sx={{ fontSize: 32, color: "#C4956A" }} />,
    value: 4,
    unit: "",
    label: "服務縣市",
  },
  {
    icon: <HandshakeIcon sx={{ fontSize: 32, color: "#C4956A" }} />,
    value: 98,
    unit: "%",
    label: "客戶滿意度",
  },
];

const VALUES = [
  { title: "精工細作", desc: "每道工序嚴格把關，確保施工品質達到最高標準。" },
  { title: "誠信透明", desc: "明確報價、如實說明，讓您放心委託。" },
  { title: "準時完工", desc: "依約履行工程進度，尊重客戶時間。" },
  { title: "售後保固", desc: "工程完工後提供保固服務，問題不擔心。" },
];

interface StatItemProps {
  stat: (typeof STATS)[0];
  inView: boolean;
  index: number;
}

const StatItem: React.FC<StatItemProps> = ({ stat, inView, index }) => {
  const count = useCountAnimation(stat.value, inView, 1600 + index * 100);
  const spring = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0px)" : "translateY(30px)",
    delay: index * 150,
    config: { tension: 260, friction: 60 },
  });

  return (
    <animated.div style={spring}>
      <Box
        sx={{
          textAlign: "center",
          p: { xs: 2.5, md: 3 },
          borderRadius: 3,
          background: "#F0E6D8",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          transition: "box-shadow 0.3s, transform 0.3s",
          "&:hover": {
            boxShadow: "0 12px 32px rgba(0,0,0,0.14)",
            transform: "translateY(-4px)",
          },
        }}
      >
        <Box sx={{ mb: 1.5 }}>{stat.icon}</Box>
        <Typography
          sx={{
            fontSize: { xs: "2.2rem", md: "2.8rem" },
            fontWeight: 900,
            color: "#7B5035",
            lineHeight: 1,
            mb: 0.5,
          }}
        >
          {count}
          {stat.unit}
        </Typography>
        <Typography
          sx={{ color: "#6B4A36", fontWeight: 500, fontSize: "0.9rem" }}
        >
          {stat.label}
        </Typography>
      </Box>
    </animated.div>
  );
};

const About: React.FC = () => {
  const { ref: headerRef, spring: headerSpring } = useScrollAnimation();
  const { ref: textRef, spring: textSpring } = useScrollAnimation({
    delay: 100,
  });
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsInView, setStatsInView] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);
  const [imgInView, setImgInView] = useState(false);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setStatsInView(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]: IntersectionObserverEntry[]) => {
        if (entry.isIntersecting) {
          setImgInView(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const { trowelProgress } = useSpring({
    trowelProgress: imgInView ? 112 : 0,
    config: { tension: 36, friction: 18 },
    delay: 250,
  });

  return (
    <Box
      id="about"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: "#FAF7F4",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative background */}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          right: -80,
          transform: "translateY(-50%)",
          width: 320,
          height: 320,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(196,149,106,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="lg">
        {/* Header */}
        <animated.div ref={headerRef} style={headerSpring}>
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
              About Us
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
              關於飛翔泥水匠
            </Typography>
            <Box
              sx={{
                width: 60,
                height: 4,
                backgroundColor: "#C4956A",
                borderRadius: 2,
                mx: "auto",
              }}
            />
          </Box>
        </animated.div>

        {/* Main content: text + image */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: { xs: 4, md: 8 },
            alignItems: "center",
            mb: { xs: 6, md: 10 },
          }}
        >
          {/* Image side */}
          <Box
            ref={imgRef}
            sx={{
              position: "relative",
              borderRadius: 3,
              overflow: "hidden",
              aspectRatio: "4/3",
              border: "10px solid rgba(196,149,106,0)",
              transition: "border-color 0.5s ease, box-shadow 0.3s ease",
              ":hover": {
                borderColor: "rgba(196,149,106,0.2)",
                boxShadow: "0 8px 24px rgba(123,80,53,0.08)",
              },
            }}
          >
            <Box
              component="img"
              src={new URL(`../assets/about/about.jpg`, import.meta.url).href}
              alt="飛翔泥水匠專業泥作改修施工現場，基隆泥作工程強化作業"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transform: "scale(1)",
                transition: "transform 0.5s ease, filter 0.5s ease",
                ":hover": {
                  transform: "scale(1.02)",
                  filter: "brightness(0.9)",
                },
              }}
            />
            {/* 水泥刀抹開動畫覆蓋層 */}
            <animated.div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to bottom, rgba(255,218,140,0.98) 0px, rgba(190,120,50,0.92) 6px, #6B4530 16px, #7B5035 45%, #6B4A36 100%)",
                clipPath: trowelProgress.to(
                  (p) =>
                    `polygon(-10% ${p}%, 110% ${p - 3.5}%, 110% 120%, -10% 120%)`,
                ),
                pointerEvents: "none",
                zIndex: 2,
              }}
            />
            {/* Accent bar */}
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: 6,
                background: "linear-gradient(90deg, #7B5035, #C4956A)",
              }}
            />
          </Box>

          {/* Text side */}
          <animated.div ref={textRef} style={textSpring}>
            <Typography
              variant="h3"
              sx={{
                color: "#3D2B1F",
                fontSize: { xs: "1.5rem", md: "1.7rem" },
                fontWeight: 700,
                mb: 2,
                lineHeight: 1.4,
              }}
            >
              深耕北北基桃，用雙手築起您對家的嚮往
            </Typography>
            <Typography
              sx={{
                color: "#6B4A36",
                lineHeight: 1.9,
                mb: 3,
                fontSize: "0.97rem",
              }}
            >
              飛翔泥水匠深耕超過二十年，傳承三代匠心工法。我們專精於泥作修繕、磁磚鋪設及室內翻修工程;團隊每一位師父皆擁有深厚的實務經驗，始終堅持以「修繕自家」的誠心與標準，精雕細琢每一處，確保品質經得起時間考驗。
            </Typography>
            <Typography
              sx={{
                color: "#6B4A36",
                lineHeight: 1.9,
                mb: 4,
                fontSize: "0.97rem",
              }}
            >
              服務範圍涵蓋基隆市、台北市、新北市、桃園市，無論是老屋翻修、浴室改修、
              廚房磁磚更換，或是外牆防水處理，飛翔泥水匠都能提供專業且值得信賴的解決方案。
            </Typography>

            {/* Values */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 2,
              }}
            >
              {VALUES.map((v) => (
                <Box
                  key={v.title}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    background: "#F0E6D8",
                    borderLeft: "3px solid #C4956A",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.07)",
                    transition: "transform 0.4s ease, box-shadow 0.3s ease",
                    ":hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 12px 28px rgba(0,0,0,0.13)",
                    },
                  }}
                >
                  <Typography
                    sx={{
                      color: "#3D2B1F",
                      fontWeight: 700,
                      mb: 0.5,
                      fontSize: "0.92rem",
                    }}
                  >
                    {v.title}
                  </Typography>
                  <Typography
                    sx={{
                      color: "#6B4A36",
                      fontSize: "0.82rem",
                      lineHeight: 1.6,
                    }}
                  >
                    {v.desc}
                  </Typography>
                </Box>
              ))}
            </Box>
          </animated.div>
        </Box>

        {/* Stats */}
        <Box
          ref={statsRef}
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, 1fr)",
              md: "repeat(4, 1fr)",
            },
            gap: 2.5,
          }}
        >
          {STATS.map((stat, index) => (
            <StatItem
              key={stat.label}
              stat={stat}
              inView={statsInView}
              index={index}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default About;
