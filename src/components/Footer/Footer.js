import HorizontalRule from "../UI/HorizontalRule";
import classes from "./Footer.module.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

const Footer = () => {
  return (
    <section className={classes.footer}>
      <HorizontalRule />

      <div>
        <p>Contact Us</p>
        <div className={classes.contactIcons}>
          <span>
            <FacebookIcon />
          </span>
          <span>
            <InstagramIcon />
          </span>
          <span>
            <YouTubeIcon />
          </span>
          <span>
            <WhatsAppIcon />
          </span>
          <span>
            <MailOutlineIcon />
          </span>
        </div>
      </div>
      <HorizontalRule />

      <div className={classes.copyrights}>Built by Tomer Bourstein © 2022</div>
    </section>
  );
};

export default Footer;
