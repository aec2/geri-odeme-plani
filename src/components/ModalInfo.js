import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import { useImperativeHandle } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ModalInfo = function (props, ref) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useImperativeHandle(
    ref,
    () => {
      return {
        handleOpen: () => handleOpen(),
        handleClose: () => handleClose(),
      };
    },
    []
  );

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box
                component="img"
                sx={{
                  height: "80%",
                  width: "100%",
                  marginTop: "25px",
                }}
                src="./imgs/modal_info_img.jpg"
              />
            </Grid>
            <Grid item xs={6}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Ekran Hakkında
                <hr></hr>
              </Typography>

              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Banka kredilerine ait geri ödemelerin Kredi tutar, taksit sayısı
                ve diğer bilgileri girildikten sonra{" "}
                <span style={{ fontWeight: "bold" }}>
                  "Geri Ödeme Planı Oluştur"
                </span>
                butonu ile ödeme planı elde edilir.
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default React.forwardRef(ModalInfo);
