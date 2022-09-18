import { React } from "react";
import {
  Toolbar,
  Typography,
  Box,
  IconButton,
  AppBar,
  Grid,
} from "@mui/material";
import { format } from "date-fns";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import ModalInfo from "./ModalInfo.js";
import { useRef } from "react";

function ApplicationBar() {
  const modalRef = useRef();

  return (
    <Grid style={{ width: "100%" }}>
      <ModalInfo ref={modalRef}></ModalInfo>
      <AppBar style={{ background: "rgb(0 0 0 / 23%)" }} position="relative">
        <Toolbar variant="dense">
          <Box
            component="img"
            sx={{
              height: "80%",
              width: "100%",
              maxHeight: { xs: 22, md: 25 },
              maxWidth: { xs: 22, md: 25 },
            }}
            src="./imgs/fimple_icon.png"
          ></Box>
          <Typography style={{ marginLeft: "10px" }} variant="h6">
            Fimple Practicum
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              onClick={() => modalRef.current.handleOpen()}
            >
              <InfoRoundedIcon />
            </IconButton>
          </Box>
          <Box align="right">
            <Typography> {format(new Date(), "P")}</Typography>
          </Box>
        </Toolbar>
      </AppBar>
    </Grid>
  );
}

export default ApplicationBar;
