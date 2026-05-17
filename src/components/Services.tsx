import ApartmentIcon from "@mui/icons-material/Apartment";
import ConstructionIcon from "@mui/icons-material/Construction";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import GridViewIcon from "@mui/icons-material/GridView";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import LayersIcon from "@mui/icons-material/Layers";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { animated, useTrail } from "@react-spring/web";
import React, { useEffect, useRef, useState } from "react";

const SERVICES = [
  {
    icon: <GridViewIcon sx={{ fontSize: 44 }} />,
    title: "貼磁磚工程",
    description:
      "貼磁磚是將磁磚依照現場尺寸、排版、水平垂直與洩水需求，使用水泥砂漿或磁磚黏著劑固定於牆面或地面。",
    steps: [
      "基面檢查：確認打底面是否平整、乾淨、無空鼓、無鬆動，地面是否有正確洩水坡度。",
      "排版放樣：依照磁磚尺寸、縫寬、牆角、門口、排水孔、視覺中心進行排版。",
      "材料調配：依工法使用水泥砂漿、益膠泥、磁磚黏著劑或背膠等材料。",
      "磁磚背面處理：大尺寸磚、吸水率低的磚，需注意背面清潔與雙面上膠，增加黏著力。",
      "正式貼磚：依照放樣線施作，控制水平、垂直、縫寬、平整度。",
      "敲實與調整：貼磚過程需確實壓實，避免空鼓；用水平尺、整平器或經驗調整高低差。",
      "切割與收邊：遇到邊角、門框、排水孔、管線孔位時進行切割修整。",
      "清潔表面：施工中同步清除多餘砂漿或黏著劑，避免乾掉後難清。",
    ],
    note: "貼磁磚不是只要貼上去而已，重點在基底、滿漿率、平整度、縫線、洩水坡度與收邊細節。尤其大板磚更要注意空鼓與高低差。",
    color: "#7B5035",
  },
  {
    icon: <LayersIcon sx={{ fontSize: 44 }} />,
    title: "抿石子工程",
    description:
      "抿石子是將石子、水泥、色粉或特殊材料混合後施作於表面，再經過清洗、刷洗、抿面，呈現石子顆粒質感的裝飾面。",
    steps: [
      "基面整理：施工前確認基面穩固、乾淨、不空鼓、不鬆動。",
      "放樣與收邊：依照設計範圍、分隔線、牆角、地坪邊緣先做好定位與收邊。",
      "材料拌合：將水泥、石子、色料依比例拌合，控制顏色、顆粒與濕度。",
      "抹附石子層：將材料均勻抹在牆面或地面上，厚度需一致。",
      "壓實整平：把石子層壓實，避免日後脫粒、空鼓或表面不均。",
      "表面刷洗/抿面：在適當時間點將表面水泥漿刷除，露出石子顆粒。",
      "修整與養護：完成後檢查顏色、顆粒均勻度、邊角收口，並適當養護。",
    ],
    note: "抿石子最重視時間點、均勻度與師傅手感。太早洗會掉料，太晚洗會洗不開，顏色和石子分布也會影響美觀。",
    color: "#8B6245",
  },
  {
    icon: <ConstructionIcon sx={{ fontSize: 44 }} />,
    title: "粉光工程",
    description:
      "粉光是將水泥砂漿表面修整成較平順、細緻的完成面，常用於牆面、地面、外牆、修補面或後續油漆前基礎。",
    steps: [
      "基面處理：先確認原牆或打底面是否穩固、乾淨、無明顯空鼓與鬆動。",
      "補土修正：將凹洞、不平整處先補平，確保整體厚度與平整度。",
      "水泥砂漿粉刷：以水泥砂漿均勻批抹於牆面或地面。",
      "整平壓實：使用工具將砂漿刮平、壓實，修正牆面平整度。",
      "表面收光：依需求做粗粉光、細粉光或壓光，使表面更平順。",
      "養護：完成後需適當養護，避免太快乾燥造成龜裂、粉化。",
    ],
    note: "粉光重點在平整度、密實度與收面。若水泥比例不良或養護不足，容易產生裂紋、起砂、剝落。",
    color: "#9B7255",
  },
  {
    icon: <HomeRepairServiceIcon sx={{ fontSize: 44 }} />,
    title: "打底工程",
    description:
      "打底是將牆面或地面用水泥砂漿整平，做出適合後續貼磁磚、粉光、防水或抿石子的基礎面。",
    steps: [
      "基面清潔：清除灰塵、油污、鬆動層、殘膠、浮砂，確保水泥砂漿能咬合。",
      "灑水濕潤：施工前讓基面適度吸水，避免底層太乾導致水泥砂漿失水過快、黏著不良。",
      "定位與抓水平/垂直：依照現場需求抓水平、垂直、厚度、洩水坡度，避免後續磁磚面不平或積水。",
      "水泥砂漿打底：使用水泥砂漿將牆面或地面補平、拉直、修正高低差。",
      "壓實與整平：砂漿需確實壓實，避免內部空隙過多，造成日後空鼓、龜裂。",
      "表面整理：依後續工法需求，可做粗面、掃毛或整平處理，讓後續防水或貼磚更好附著。",
    ],
    note: "打底是磁磚工程的基礎，底沒做好，後面貼再漂亮也容易空心、脫落、積水或牆面不平。",
    color: "#7B5035",
  },
  {
    icon: <ApartmentIcon sx={{ fontSize: 44 }} />,
    title: "砌紅磚工程",
    description:
      "砌紅磚主要是用紅磚與水泥砂漿砌築牆面、隔間、門邊補牆、管道間或局部修補。",
    steps: [
      "放樣定位：依照現場尺寸、設計位置或原牆位置，先確認牆體位置、厚度、高度與垂直線。",
      "基面清理與灑水：砌磚前清理地面或牆面灰塵，必要時灑水濕潤，增加砂漿黏著力。",
      "調配水泥砂漿：使用水泥與砂依比例拌合，作為紅磚之間的黏結材料。",
      "紅磚砌築：一層一層砌上去，注意水平、垂直、磚縫飽滿度，避免牆面歪斜或空縫。",
      "拉結與補強：若接原牆，需視情況做拉結或植筋補強，讓新舊牆面結合更穩固。",
      "收邊修整：砌完後將磚縫、邊角、門框邊修整，方便後續打底粉刷。",
    ],
    note: "砌紅磚最怕牆面不直、新舊牆沒咬合。這會影響後續打底、貼磚甚至牆體穩定度。",
    color: "#8B6245",
  },
  {
    icon: <WaterDropIcon sx={{ fontSize: 44 }} />,
    title: "拆除工程",
    description:
      "拆除工程主要是將原有不需要的建材、裝修層或結構物移除，方便後續重新施工。",
    steps: [
      "現場保護：施工前先確認周邊門框、地板、牆面、管線、設備是否需要保護，避免拆除時造成不必要損傷。",
      "拆除原有磁磚、粉光層、打底層：依照現場需求，將舊磁磚、舊水泥層、空鼓層、鬆動層打除至穩固基面。",
      "拆除磚牆或隔間：若有牆體拆除，需確認是否為結構牆、是否有水電管線經過，再進行拆除。",
      "清除殘料與鬆動層：拆除完成後，將表面殘留的水泥塊、砂漿、粉塵、鬆動基面清理乾淨。",
      "廢棄物整理與清運：將拆除後產生的廢料、磚塊、磁磚、水泥塊裝袋，集中堆放並安排清運。",
    ],
    note: "",
    color: "#9B7255",
  },
];

const Services: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const openModal = (index: number) => setOpenIndex(index);
  const closeModal = () => setOpenIndex(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        const [entry] = entries;
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
        backgroundColor: "#F6F5F2",
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
              <animated.div
                key={service.title}
                style={{ ...style, height: "100%" }}
              >
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    minHeight: { xs: 300, md: 360 },
                    borderRadius: 3,
                    overflow: "hidden",
                    cursor: "default",
                    border: "1px solid rgba(123,80,53,0.08)",
                    "&:hover .service-icon-wrapper": {
                      backgroundColor: "#7B5035",
                      transform: "scale(1.08)",
                      "& svg": { color: "#F6F5F2" },
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      p: 4,
                      display: "flex",
                      flexDirection: "column",
                      flex: 1,
                      justifyContent: "space-between",
                    }}
                  >
                    <Box
                      className="service-icon-wrapper"
                      sx={{
                        width: 72,
                        height: 72,
                        borderRadius: 2,
                        backgroundColor: "rgba(196,149,106,0.08)",
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
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        mt: "auto",
                        backgroundColor: "#7B5035",
                        color: "#F6F5F2",
                        "&:hover": { backgroundColor: "#5e3f2f" },
                        textTransform: "none",
                      }}
                      onClick={() => openModal(index)}
                    >
                      查看主要施工項目
                    </Button>
                  </CardContent>
                </Card>
              </animated.div>
            );
          })}
        </Box>
        <Dialog
          open={openIndex !== null}
          onClose={closeModal}
          fullWidth
          maxWidth="sm"
          PaperProps={{
            sx: { bgcolor: "#EFE3DA", borderRadius: 2, boxShadow: 6 },
          }}
        >
          {openIndex !== null && (
            <>
              <DialogTitle
                sx={{
                  bgcolor: "#E8D0C2",
                  color: "#3D2B1F",
                  borderBottom: "1px solid rgba(0,0,0,0.08)",
                  pt: 2,
                  pb: 2,
                }}
              >
                {SERVICES[openIndex].title}
              </DialogTitle>
              <DialogContent dividers sx={{ bgcolor: "#F5E7DF" }}>
                <Typography sx={{ mb: 2, color: "#4B2E1F" }}>
                  {SERVICES[openIndex].description}
                </Typography>
                {SERVICES[openIndex].steps && (
                  <>
                    {SERVICES[openIndex].steps.map((s: string, i: number) => {
                      const parts = s.split("：");
                      const title = parts[0];
                      const detail = parts.slice(1).join("：");
                      return (
                        <Accordion
                          key={i}
                          sx={{
                            bgcolor: "#EAD3C6",
                            borderRadius: 1,
                            mb: 1,
                            boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.02)",
                          }}
                        >
                          <AccordionSummary
                            expandIcon={
                              <ExpandMoreIcon sx={{ color: "#4B2E1F" }} />
                            }
                            sx={{ py: 0 }}
                          >
                            <Typography
                              sx={{ fontSize: "0.95rem", color: "#4B2E1F" }}
                            >{`${i + 1}. ${title}`}</Typography>
                          </AccordionSummary>
                          <AccordionDetails sx={{ pt: 0, pb: 1 }}>
                            <Typography sx={{ color: "#4B2E1F" }}>
                              {detail || s}
                            </Typography>
                          </AccordionDetails>
                        </Accordion>
                      );
                    })}
                  </>
                )}
                {SERVICES[openIndex].note && (
                  <Typography sx={{ mt: 2, color: "#6B4A36" }}>
                    {SERVICES[openIndex].note}
                  </Typography>
                )}
              </DialogContent>
              <DialogActions>
                <Button onClick={closeModal} sx={{ color: "#7B5035" }}>
                  關閉
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </Container>
    </Box>
  );
};

export default Services;
