import React, { useRef, useState, useEffect } from "react";
import { Box, Card, CardContent, Container, Typography } from "@mui/material";
import { useTrail, animated } from "@react-spring/web";
import ConstructionIcon from "@mui/icons-material/Construction";
import GridViewIcon from "@mui/icons-material/GridView";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import LayersIcon from "@mui/icons-material/Layers";
import ApartmentIcon from "@mui/icons-material/Apartment";

const SERVICES = [
  {
    icon: <ConstructionIcon sx={{ fontSize: 44 }} />,
    title: "泥作工程",
    description:
      "水泥砂漿打底、粉光、直角整平，精準施作每道工序，確保牆面平整光滑，為後續裝修提供最佳基礎。",
    color: "#7B5035",
  },
  {
    icon: <GridViewIcon sx={{ fontSize: 44 }} />,
    title: "磁磚改修",
    description:
      "地磚、壁磚更換與修繕，處理磁磚空鼓、脫落、裂縫問題，選材精準，縫隙整齊，重現整潔美觀。",
    color: "#8B6245",
  },
  {
    icon: <HomeRepairServiceIcon sx={{ fontSize: 44 }} />,
    title: "室內改修",
    description:
      "廚房、浴室、客廳全方位翻修，結合泥作與裝修工藝，打造符合生活需求的舒適空間。",
    color: "#9B7255",
  },
  {
    icon: <WaterDropIcon sx={{ fontSize: 44 }} />,
    title: "防水工程",
    description:
      "衛浴、廚房、屋頂、外牆防水處理，採用高品質防水材料，有效杜絕滲水、漏水問題。",
    color: "#7B5035",
  },
  {
    icon: <LayersIcon sx={{ fontSize: 44 }} />,
    title: "地坪施工",
    description:
      "水泥地坪、磁磚鋪設、地板整平，精確控制水平度，讓空間地面平整耐用且美觀大方。",
    color: "#8B6245",
  },
  {
    icon: <ApartmentIcon sx={{ fontSize: 44 }} />,
    title: "外牆整修",
    description:
      "外牆剝落、裂縫修補、磁磚翻新，恢復建築外觀，同時強化結構安全，延長建物使用壽命。",
    color: "#9B7255",
  },
];

const Services: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const trail = useTrail(SERVICES.length, {
    opacity: inView ? 1 : 0,
    transform: inView
      ? "translateY(0px) scale(1)"
      : "translateY(48px) scale(0.96)",
    config: { tension: 260, friction: 62 },
  });

  return (
    <Box
      id="services"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: "#FAF7F4",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decoration */}
      <Box
        sx={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(196,149,106,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="lg">
        {/* Section header */}
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
            Our Services
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
            專業服務項目
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
              maxWidth: 560,
              mx: "auto",
              lineHeight: 1.8,
              fontSize: "1rem",
            }}
          >
            泥作改修・水泥改修・磁磚改修・廁所改修・防水工程，飛翔泥水匠提供基隆・台北・新北・桃園全方位泥作修繕解決方案。
          </Typography>
        </Box>

        {/* Service cards */}
        <Box
          ref={ref}
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
            gap: 3,
          }}
        >
          {trail.map((style, index) => {
            const service = SERVICES[index];
            return (
              <animated.div key={service.title} style={style}>
                <Card
                  sx={{
                    height: "100%",
                    borderRadius: 3,
                    overflow: "hidden",
                    cursor: "default",
                    border: "1px solid rgba(123,80,53,0.08)",
                    "&:hover .service-icon-wrapper": {
                      backgroundColor: "#7B5035",
                      transform: "scale(1.08)",
                      "& svg": { color: "#FAF7F4" },
                    },
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Box
                      className="service-icon-wrapper"
                      sx={{
                        width: 72,
                        height: 72,
                        borderRadius: 2,
                        backgroundColor: "rgba(123,80,53,0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 2.5,
                        transition: "all 0.35s ease",
                        "& svg": {
                          color: "#7B5035",
                          transition: "color 0.35s ease",
                        },
                      }}
                    >
                      {service.icon}
                    </Box>
                    <Typography
                      variant="h3"
                      sx={{
                        color: "#3D2B1F",
                        fontWeight: 700,
                        mb: 1.5,
                        fontSize: "1.15rem",
                      }}
                    >
                      {service.title}
                    </Typography>
                    <Typography
                      sx={{
                        color: "#6B4A36",
                        lineHeight: 1.8,
                        fontSize: "0.92rem",
                      }}
                    >
                      {service.description}
                    </Typography>
                  </CardContent>
                </Card>
              </animated.div>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
};

export default Services;
