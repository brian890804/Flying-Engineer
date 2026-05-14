import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import { Box, Chip, Container, Paper, Stack, Typography } from "@mui/material";
import { animated, useSpring } from "@react-spring/web";
import React from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const SERVICE_AREAS = [
  "基隆市",
  "台北市",
  "新北市",
  "桃園市",
  "汐止區",
  "內湖區",
  "板橋區",
  "中和區",
  "桃園區",
];

const CONTACT_ITEMS = [
  {
    icon: <PhoneIcon sx={{ color: "#C4956A", fontSize: 28 }} />,
    label: "聯絡電話",
    value: "0978-919-652",
    sub: "歡迎來電洽詢，免費估價",
  },
  {
    icon: <AccessTimeIcon sx={{ color: "#C4956A", fontSize: 28 }} />,
    label: "服務時間",
    value: "週一至週六",
    sub: "08:00 – 18:00",
  },
  {
    icon: <LocationOnIcon sx={{ color: "#C4956A", fontSize: 28 }} />,
    label: "服務地區",
    value: "北北基桃全區",
    sub: "基隆・台北・新北・桃園",
  },
];

const BobbingChip: React.FC<{ label: string; index: number }> = ({
  label,
  index,
}) => {
  const spring = useSpring({
    from: { transform: "translateX(-4px)" },
    to: { transform: "translateX(4px)" },
    loop: { reverse: true },
    config: { duration: 1600 + index * 60 },
    delay: index * 200,
  });
  return (
    <animated.div style={spring}>
      <Chip
        label={label}
        size="small"
        sx={{
          backgroundColor: "rgba(196,149,106,0.15)",
          color: "#D9B090",
          border: "1px solid rgba(196,149,106,0.3)",
          fontWeight: 500,
          "&:hover": {
            backgroundColor: "rgba(196,149,106,0.25)",
          },
        }}
      />
    </animated.div>
  );
};

const Contact: React.FC = () => {
  const { ref: headerRef, spring: headerSpring } = useScrollAnimation();
  const { ref: leftRef, spring: leftSpring } = useScrollAnimation({
    delay: 100,
  });
  const { ref: rightRef, spring: rightSpring } = useScrollAnimation({
    delay: 200,
  });
  const pulseSpring = useSpring({
    from: {
      boxShadow: "0 0 0px 0px rgba(196,149,106,0)",
    },
    to: {
      boxShadow: "0 0 28px 8px rgba(196,149,106,0.45)",
      borderRadius: "20px",
    },
    loop: { reverse: true },
    config: {
      duration: 5000,
      easing: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
    },
  });

  return (
    <Box
      id="contact"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: "#3D2B1F",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative elements */}
      <Box
        sx={{
          position: "absolute",
          top: -80,
          right: -80,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(196,149,106,0.1) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: -60,
          left: -60,
          width: 240,
          height: 240,
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
              Contact Us
            </Typography>
            <Typography
              variant="h2"
              sx={{
                color: "#FAF7F4",
                fontSize: { xs: "1.9rem", md: "2.6rem" },
                fontWeight: 700,
                mb: 2,
              }}
            >
              聯絡我們
            </Typography>
            <Box
              sx={{
                width: 60,
                height: 4,
                background: "linear-gradient(90deg, #7B5035, #C4956A)",
                borderRadius: 2,
                mx: "auto",
                mb: 2,
              }}
            />
            <Typography
              sx={{
                color: "rgba(250,247,244,0.7)",
                maxWidth: 480,
                mx: "auto",
                lineHeight: 1.8,
              }}
            >
              歡迎免費估價，我們將於最短時間內派人到場評估，給您最詳細的施工建議與報價。
            </Typography>
          </Box>
        </animated.div>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: { xs: 4, md: 6 },
            alignItems: "start",
          }}
        >
          {/* Left: Contact info */}
          <animated.div ref={leftRef} style={leftSpring}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {CONTACT_ITEMS.map((item) => (
                <Box
                  key={item.label}
                  sx={{
                    display: "flex",
                    gap: 2.5,
                    alignItems: "flex-start",
                    p: 2.5,
                    borderRadius: 2,
                    backgroundColor: "rgba(250,247,244,0.04)",
                    border: "1px solid rgba(196,149,106,0.15)",
                    transition: "border-color 0.3s, background 0.3s",
                    "&:hover": {
                      borderColor: "rgba(196,149,106,0.4)",
                      backgroundColor: "rgba(250,247,244,0.07)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 52,
                      height: 52,
                      borderRadius: 2,
                      backgroundColor: "rgba(196,149,106,0.12)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        color: "rgba(250,247,244,0.5)",
                        fontSize: "0.78rem",
                        mb: 0.3,
                        letterSpacing: "0.05em",
                      }}
                    >
                      {item.label}
                    </Typography>
                    {item.label === "聯絡電話" ? (
                      <Typography
                        component="a"
                        href="tel:0978919652"
                        sx={{
                          color: "#FAF7F4",
                          fontWeight: 700,
                          fontSize: "1.05rem",
                          mb: 0.2,
                          textDecoration: "none",
                        }}
                      >
                        {item.value}
                      </Typography>
                    ) : (
                      <Typography
                        sx={{
                          color: "#FAF7F4",
                          fontWeight: 700,
                          fontSize: "1.05rem",
                          mb: 0.2,
                        }}
                      >
                        {item.value}
                      </Typography>
                    )}
                    <Typography sx={{ color: "#D9B090", fontSize: "0.85rem" }}>
                      {item.sub}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </animated.div>

          {/* Right: Service areas + CTA */}
          <animated.div ref={rightRef} style={rightSpring}>
            <Paper
              elevation={0}
              sx={{
                backgroundColor: "rgba(250,247,244,0.05)",
                border: "1px solid rgba(196,149,106,0.2)",
                borderRadius: 3,
                p: { xs: 3, md: 4 },
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  color: "#FAF7F4",
                  fontWeight: 700,
                  mb: 1,
                  fontSize: "1.15rem",
                }}
              >
                服務地區
              </Typography>
              <Typography
                sx={{
                  color: "rgba(250,247,244,0.6)",
                  fontSize: "0.88rem",
                  mb: 3,
                  lineHeight: 1.7,
                }}
              >
                飛翔泥水匠提供北北基桃全區到府服務，免費估價不收出差費。
              </Typography>
              <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1, mb: 4 }}>
                {SERVICE_AREAS.map((area, i) => (
                  <BobbingChip key={area} label={area} index={i} />
                ))}
              </Stack>

              <animated.div style={pulseSpring}>
                <Box
                  component="a"
                  href="tel:0978919652"
                  aria-label="撥打 0978-919-652"
                  sx={{
                    display: "block",
                    textDecoration: "none",
                    cursor: "pointer",
                    p: 3,
                    borderRadius: 2,
                    background:
                      "linear-gradient(135deg, #7B5035 0%, #A0704F 100%)",
                    textAlign: "center",
                    transition: "transform 0.28s ease, box-shadow 0.28s ease",
                    ":hover": {
                      transform: "translateY(-6px)",
                      boxShadow: "0 22px 48px rgba(123,80,53,0.18)",
                    },
                  }}
                >
                  <Typography
                    sx={{ color: "#FAF7F4", fontSize: "0.85rem", mb: 1 }}
                  >
                    立即來電免費估價
                  </Typography>
                  <Typography
                    sx={{
                      color: "#FAF7F4",
                      fontWeight: 900,
                      fontSize: "1.8rem",
                      letterSpacing: "0.05em",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 1,
                    }}
                  >
                    <PhoneIcon sx={{ fontSize: 24 }} />
                    <Box
                      component="span"
                      sx={{
                        color: "#FAF7F4",
                        fontWeight: 900,
                        fontSize: "1.8rem",
                        display: "inline-block",
                      }}
                    >
                      0978-919-652
                    </Box>
                  </Typography>
                  <Typography
                    sx={{
                      color: "rgba(250,247,244,0.7)",
                      fontSize: "0.8rem",
                      mt: 0.5,
                    }}
                  >
                    週一至週六 08:00 – 18:00
                  </Typography>
                </Box>
              </animated.div>
            </Paper>
          </animated.div>
        </Box>
      </Container>
    </Box>
  );
};

export default Contact;
