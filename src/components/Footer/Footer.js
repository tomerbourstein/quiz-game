import HorizontalRule from "../UI/HorizontalRule";
import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <section className={classes.footer}>
        <HorizontalRule />
      <div>Built by Tomer Bourstein © 2022</div>

      <div>
        <p>Contact Us</p>
        <div>
          <span>Facebook</span>
          <span>Instagram</span>
          <span>TikTok</span>
          <span>Youtube</span>
          <span>WhatsApp</span>
          <span>E-Mail</span>
        </div>
      </div>
    </section>
  );
};

export default Footer;
