import Modal from "@mui/material/Modal";


import React, {  } from "react";

import { IconButton, Paper } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";



type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function ModalGeneric(props: ModalProps) {
  const { open, onClose, children } = props;

  return (
    <div>
      <Modal
        open={open}
        onClose={() => onClose()}
        closeAfterTransition
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        
          <Paper
            elevation={5}
            style={{
              minWidth: "min(100vw, 500px)",
              maxWidth: "min(100vw, 800px)",
              marginTop: 10,
              marginBottom: 10,
              position: "relative",
              paddingTop: 53,
            }}
          >
            <IconButton
              onClick={() => onClose()}
              style={{
                height: 53,
                width: 53,
                position: "absolute",
                top: 0,
                right: 0,
              }}
            >
              <CloseIcon />
            </IconButton>
            <div
              style={{
                // maxWidth: '900px',
                maxHeight: "calc(100vh - 70px)",
                overflow: "auto",
                paddingTop: 10,
              }}
            >
              <div
                style={{ paddingLeft: 20, paddingRight: 20, paddingBottom: 20 }}
              >
                {children}
              </div>
            </div>
          </Paper>
        
      </Modal>
    </div>
  );
}
