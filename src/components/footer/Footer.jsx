
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import React from "react";
import "./footer.scss";
export default function Footer() {
  return (
    <div className="footer">
      <div className="left">Copywrite 2023 by MD Moshiur Rahman</div>
      <div className="right">
        <FacebookIcon />
        <TwitterIcon />
        <WhatsAppIcon />
      </div>
    </div>
  );
}
