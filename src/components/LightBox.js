import React, { useState, useEffect } from "react";
import { CircularProgress, Modal, IconButton } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import CloseIcon from "@mui/icons-material/Close";
import "./index.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "hidden",
    },
    icon: {
      color: "rgba(255, 255, 255, 0.54)",
    },
    button: {
      color: "black",
      border: "2px solid black",
      backgroundColor: "white",
      fontSize: "2rem",
    },
    lightbox: {
      height: "80vh",
      maxWidth: "90vw",
      objectFit: "cover",
    },
    arrowButton: {
      color: "#ffffff9e",
      "&:hover": {
        backgroundColor: "#808080",
      },
      backgroundColor: "#696969",
    },
    audioPlayer: {
      alignItems: "center",
      justifyContent: "center",
      width: "30%",
      height: "auto",
    },
    circular: {
      alignItems: "center",
      justifyContent: "center",
    },
  })
);

export default function LightBox(props) {
  const classes = useStyles();
  const { mediaItems, callback } = props;
  const mediaItems1 = [];
  const [toggler, setToggler] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(props.currentSlide);
  const [media, setMedia] = useState("");
  mediaItems?.map((mediaData, index) => {
    if (mediaData.type === "IMAGE" && mediaData.media) {
      mediaItems1.push({
        url: mediaData.media,
        type: mediaData.type,
      });
    }
    if (mediaData.type === "VIDEO" && mediaData.media) {
      mediaItems1.push({
        url: mediaData.media,
        type: mediaData.type,
      });
    }
    if (mediaData.type === "AUDIO" && mediaData.media) {
      mediaItems1.push({
        url: mediaData.media,
        type: mediaData.type,
      });
    }
  });
  useEffect(() => {
    setMedia(mediaItems1[currentSlide].url);
  });

  const toggleIsOpen = () => {
    setToggler(!toggler);
    callback();
  };

  const showPrev = (e) => {
    e.stopPropagation();
    const currentIndex = currentSlide;
    if (currentIndex <= 0) {
      setCurrentSlide(mediaItems1.length - 1);
    } else {
      setCurrentSlide(currentIndex - 1);
    }
  };
  const showNext = (e) => {
    e.stopPropagation();
    const currentIndex = currentSlide;
    if (currentIndex >= mediaItems1.length - 1) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentIndex + 1);
    }
  };
  return (
    <>
      {toggler ? (
        <Modal open={toggler} onClose={toggleIsOpen}>
          <div className="lsbox">
            <div className="lightbox-header">
              <div className="item-count">
                <h4 style={{ color: "#ffffff9e" }}>
                  {currentSlide + 1}/{mediaItems1.length}
                </h4>
              </div>
              <div className="close-btn">
                <IconButton onClick={toggleIsOpen} className={classes.arrowButton} size="small">
                  <CloseIcon />
                </IconButton>
              </div>
            </div>
            <div className="left">
              <IconButton onClick={showPrev} className={classes.arrowButton} size="small">
                <ArrowBackIcon />
              </IconButton>
            </div>
            {media ? (
              <div style={{ display: "contents" }}>
                {mediaItems1[currentSlide].type === "IMAGE" ? (
                  <>
                    <img src={media} className={classes.lightbox} />
                  </>
                ) : mediaItems1[currentSlide].type === "VIDEO" ? (
                  <div>
                    <video className={classes.lightbox} controls>
                      <source src={media} type="video/mp4" />
                      <source src={media} type="video/ogg" />
                    </video>
                  </div>
                ) : mediaItems1[currentSlide].type === "AUDIO" ? (
                  <div className={classes.audioPlayer}>
                    <audio src={media} controls autoPlay />
                  </div>
                ) : null}
              </div>
            ) : (
              <div style={classes.circular}>
                <CircularProgress size={80} />
              </div>
            )}
            <div className="right">
              <IconButton onClick={showNext} className={classes.arrowButton} size="small">
                <ArrowForwardIcon />
              </IconButton>
            </div>
          </div>
        </Modal>
      ) : null}
    </>
  );
}
