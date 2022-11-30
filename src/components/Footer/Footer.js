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
      {/* <HorizontalRule /> */}

      <div className={classes.information}>
        <div className={classes.contactUs}>
          <p>Follow our Socials</p>
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
          </div>
        </div>

        <div className={classes.techStack}>
          <p>Technologies Used</p>
          <span>
            <a href="https://reactjs.org/">React.JS</a>
          </span>
          <span>
            <a href="https://opentdb.com/"> Open Trivia DB</a>
          </span>
          <span>
            <a href="https://firebase.google.com/">Google Firebase</a>
          </span>
          <span>
            <a href="https://redux-toolkit.js.org/">Redux Toolkit</a>
          </span>
          <span>
            <a href="https://mui.com/">Material UI</a>
          </span>
        </div>

        <div className={classes.aboutMe}>
          <p>Tomer Bourstein</p>
          <span>I Am a</span>
          <span>Frontend Developer</span>
          <span>React.JS Developer</span>
          <span>JavaScript Enthusiastic</span>
          <span>Full Stack Developer</span>
        </div>
      </div>
      {/* <HorizontalRule /> */}

      <div className={classes.copyrights}>
        <h4>Built by Tomer Bourstein © 2022</h4>
      </div>
    </section>
  );
};

export default Footer;
