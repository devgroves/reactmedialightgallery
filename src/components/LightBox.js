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
  const { mediaItems, callback, parentShowNext, parentShowPrev } = props;
  const [toggler, setToggler] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(props.currentSlide);
  const [media, setMedia] = useState(mediaItems[currentSlide].media);

  const toggleIsOpen = () => {
    console.log("toggle is open", toggler);
    setToggler(!toggler);
    callback();
  };
  useEffect(() => {
    console.log("set media items", mediaItems[currentSlide].media);
    setMedia(mediaItems[currentSlide].media);
  }, [mediaItems, currentSlide]);

  const showPrev = (e) => {
    e.stopPropagation();
    let currentIndex = currentSlide;
    if (currentIndex <= 0) {
      currentIndex = mediaItems.length - 1;
    } else {
      currentIndex = currentIndex - 1;
    }
    setCurrentSlide(currentIndex);
    setMedia(mediaItems[currentIndex].media);
    parentShowPrev(e);
  };
  const showNext = (e) => {
    e.stopPropagation();
    let currentIndex = currentSlide;
    console.log("currentSlide before ", currentIndex, currentSlide);
    if (currentIndex >= mediaItems.length - 1) {
      currentIndex = 0;
    } else {
      currentIndex = currentIndex + 1;
    }
    setCurrentSlide(currentIndex);
    console.log("currentSlide after ", currentIndex, currentSlide);
    setMedia(mediaItems[currentIndex].media);
    //shownext chaining parent event method definition also.
    parentShowNext(e);
  };
  return (
    <>
      {toggler ? (
        <Modal open={toggler} onClose={toggleIsOpen}>
          <div className="lsbox">
            <div className="lightbox-header">
              <div className="item-count">
                <h4 style={{ color: "#ffffff9e" }}>
                  {currentSlide + 1}/{mediaItems.length}
                </h4>
              </div>
              <div className="item-count">
                <h5 style={{ color: "#fff" }}>
                  {mediaItems[currentSlide].caption ? mediaItems[currentSlide].caption : ""}
                </h5>
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
                {mediaItems[currentSlide].type === "IMAGE" ? (
                  <>
                    <img src={media} alt="Image Broken" className={classes.lightbox} />
                  </>
                ) : mediaItems[currentSlide].type === "VIDEO" ? (
                  <div>
                    <video className={classes.lightbox} controls>
                      <source src={media} type="video/mp4" />
                      <source src={media} type="video/ogg" />
                    </video>
                  </div>
                ) : mediaItems[currentSlide].type === "AUDIO" ? (
                  <div className={classes.audioPlayer}>
                    <audio src={media} controls autoPlay />
                  </div>
                ) : null}
              </div>
            ) : (
              <div className={classes.circular}>
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
