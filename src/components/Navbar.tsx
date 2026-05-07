import React, { useState } from "react";
import {
  AppBar,
  Box,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  useScrollTrigger,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import { useSpring, animated } from "@react-spring/web";

const NAV_ITEMS = [
  { label: "首頁", id: "hero" },
  { label: "服務項目", id: "services" },
  { label: "精選案例", id: "gallery" },
  { label: "關於我們", id: "about" },
  { label: "聯絡我們", id: "contact" },
];

const Navbar: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 80 });

  const navSpring = useSpring({
    from: { opacity: 0, transform: "translateY(-20px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    config: { tension: 280, friction: 60 },
  });

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setDrawerOpen(false);
  };

  return (
    <animated.div style={navSpring}>
      <AppBar
        position="fixed"
        elevation={trigger ? 4 : 0}
        sx={{
          backgroundColor: trigger ? "rgba(61,43,31,0.96)" : "rgba(0,0,0,0.25)",
          backdropFilter: "blur(8px)",
          transition: "background-color 0.4s ease, box-shadow 0.4s ease",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ py: 0.5 }}>
            {/* Logo */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                cursor: "pointer",
                flexGrow: { xs: 1, md: 0 },
              }}
              onClick={() => scrollTo("hero")}
            >
              <HomeRepairServiceIcon sx={{ color: "#C4956A", fontSize: 28 }} />
              <Typography
                variant="h6"
                sx={{
                  color: "#FAF7F4",
                  fontWeight: 900,
                  letterSpacing: "0.08em",
                  fontSize: { xs: "1rem", md: "1.15rem" },
                }}
              >
                飛翔工程行
              </Typography>
            </Box>

            {/* Desktop Nav */}
            <Box
              sx={{ display: { xs: "none", md: "flex" }, gap: 0.5, ml: "auto" }}
            >
              {NAV_ITEMS.map((item) => (
                <Box
                  key={item.id}
                  component="a"
                  href={`#${item.id}`}
                  onClick={(e: React.MouseEvent) => {
                    e.preventDefault();
                    scrollTo(item.id);
                  }}
                  sx={{
                    textDecoration: "none",
                    cursor: "pointer",
                    color: "#FAF7F4",
                    px: 2,
                    py: 1,
                    fontSize: "0.95rem",
                    fontFamily: "inherit",
                    fontWeight: 500,
                    borderRadius: 1,
                    transition: "color 0.2s, background 0.2s",
                    "&:hover": {
                      color: "#D9B090",
                      background: "rgba(255,255,255,0.08)",
                    },
                  }}
                >
                  {item.label}
                </Box>
              ))}
            </Box>

            {/* Mobile menu icon */}
            <IconButton
              sx={{ display: { xs: "flex", md: "none" }, color: "#FAF7F4" }}
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        slotProps={{
          paper: {
            sx: {
              width: 260,
              backgroundColor: "#3D2B1F",
              pt: 2,
            },
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end", px: 2, pb: 1 }}>
          <IconButton
            onClick={() => setDrawerOpen(false)}
            sx={{ color: "#FAF7F4" }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Box
          sx={{ px: 2, mb: 2, display: "flex", alignItems: "center", gap: 1 }}
        >
          <HomeRepairServiceIcon sx={{ color: "#C4956A", fontSize: 24 }} />
          <Typography
            sx={{ color: "#FAF7F4", fontWeight: 900, letterSpacing: "0.08em" }}
          >
            飛翔工程行
          </Typography>
        </Box>
        <List>
          {NAV_ITEMS.map((item) => (
            <ListItem key={item.id} disablePadding>
              <ListItemButton
                component="a"
                href={`#${item.id}`}
                onClick={(e: React.MouseEvent) => {
                  e.preventDefault();
                  scrollTo(item.id);
                }}
                sx={{
                  px: 3,
                  "&:hover": { backgroundColor: "rgba(196,149,106,0.15)" },
                }}
              >
                <ListItemText
                  primary={item.label}
                  slotProps={{
                    primary: {
                      sx: {
                        color: "#FAF7F4",
                        fontWeight: 500,
                        fontSize: "1.05rem",
                      },
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </animated.div>
  );
};

export default Navbar;
