import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../../images/quiz-logo.png";
import classes from "./Header.module.css";

const Header = () => {
  return (
    <Box className={classes.header} sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <img src={Logo} alt="quizi logo" className={classes.logo} />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
