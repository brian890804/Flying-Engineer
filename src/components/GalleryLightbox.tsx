import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton, Modal, Typography } from "@mui/material";
import React from "react";

interface GalleryImageItem {
  src: string;
  caption: string;
  category: string;
}

interface GalleryLightboxProps {
  image: GalleryImageItem;
  onClose: () => void;
}

const GalleryLightbox: React.FC<GalleryLightboxProps> = ({
  image,
  onClose,
}) => {
  const displaySrc =
    image.src && image.src.includes("w=800")
      ? image.src.replace("w=800", "w=1200")
      : image.src;

  return (
    <Modal
      open={!!image}
      onClose={onClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Box
        sx={{
          position: "relative",
          maxWidth: "90vw",
          maxHeight: "90vh",
          outline: "none",
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: -16,
            right: -16,
            backgroundColor: "#3D2B1F",
            color: "#FAF7F4",
            zIndex: 1,
            "&:hover": { backgroundColor: "#7B5035" },
          }}
        >
          <CloseIcon />
        </IconButton>

        <Box>
          <Box
            component="img"
            src={displaySrc}
            alt={image.caption}
            sx={{
              maxWidth: "90vw",
              maxHeight: "80vh",
              objectFit: "contain",
              borderRadius: "10px 10px 0 0",
              display: "block",
              justifySelf: "center",
            }}
            loading="lazy"
          />
          <Box
            sx={{
              backgroundColor: "#3D2B1F",
              borderRadius: "0 0 8px 8px",
              px: 3,
              py: 1.5,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography sx={{ color: "#FAF7F4", fontWeight: 600 }}>
              {image.caption}
            </Typography>
            <Typography
              sx={{
                color: "#C4956A",
                fontSize: "0.85rem",
                fontWeight: 600,
                letterSpacing: "0.08em",
              }}
            >
              {image.category}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default GalleryLightbox;
