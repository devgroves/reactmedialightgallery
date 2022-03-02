import React, { useState, useEffect, useRef } from "react";
import { CircularProgress, Modal, IconButton, ButtonGroup, Button, Tooltip } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import CloseIcon from "@mui/icons-material/Close";
import "./index.css";
import { saveAs } from "file-saver";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import DownloadIcon from "@mui/icons-material/Download";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
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
      color: "#ffffff",
      "&:hover": {
        backgroundColor: "#808080",
      },
      // backgroundColor: "#000000",
    },
    audioPlayer: {
      alignItems: "center",
      justifyContent: "center",
      // width: "30%",
      height: "auto",
    },
    circular: {
      alignItems: "center",
      justifyContent: "center",
    },
    widget: {
      marginRight: 20,
      zIndex: 999999,
    },
    caption: {
      color: "#fff",
      marginTop: -1,
      display: "flex",
      justifyContent: "center",
    },
  })
);

export default function LightBox(props) {
  const classes = useStyles();
  const inputRef = useRef();
  const { mediaItems, callback, parentShowNext, parentShowPrev } = props;
  const [toggler, setToggler] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(props.currentSlide);
  const [media, setMedia] = useState(mediaItems[currentSlide].media);
  const [scale, setScale] = useState(1);
  const setToFullScreen = () => {
    const el = inputRef.current;
    console.log(el);
    if (el.requestFullscreen) {
      el.requestFullscreen();
    } else if (el.msRequestFullscreen) {
      el.msRequestFullscreen();
    } else if (el.mozRequestFullScreen) {
      el.mozRequestFullScreen();
    } else if (el.webkitRequestFullscreen) {
      el.webkitRequestFullscreen();
    }
  };
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
  //Arrow keys handler
  const keyDownHandler = (event) => {
    console.log(event.code);
    if (event.code === "ArrowLeft") {
      showPrev(event);
    }
    if (event.code === "ArrowRight") {
      showNext(event);
    }
  };
  const downloadMedia = () => {
    saveAs(media, `media`);
  };
  const ZoomIn = () => {
    setScale(scale * 1.1);
  };
  const ZoomOut = () => {
    setScale(scale / 1.1);
  };
  return (
    <>
      {toggler ? (
        <Modal open={toggler} onClose={toggleIsOpen} onKeyDown={keyDownHandler}>
          <div className="lsbox">
            <div className="lightbox-header">
              <div className="item-count">
                <h4 style={{ color: "#ffffff9e" }}>
                  {currentSlide + 1}/{mediaItems.length}
                </h4>
              </div>
              <div className={classes.widget}>
                <ButtonGroup disableElevation>
                  <Tooltip title="Zoom In" arrow>
                    <IconButton onClick={ZoomIn} className={classes.arrowButton} size="small">
                      <ZoomInIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Zoom Out" arrow>
                    <IconButton onClick={ZoomOut} className={classes.arrowButton} size="small">
                      <ZoomOutIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Full Screen" arrow>
                    <IconButton onClick={setToFullScreen} className={classes.arrowButton} size="small">
                      <FullscreenIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Download" arrow>
                    <IconButton onClick={downloadMedia} className={classes.arrowButton} size="small">
                      <DownloadIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Close" arrow>
                    <IconButton onClick={toggleIsOpen} className={classes.arrowButton} size="small">
                      <CloseIcon />
                    </IconButton>
                  </Tooltip>
                </ButtonGroup>
              </div>
            </div>
            <div className="left">
              <IconButton onClick={showPrev} className={classes.arrowButton} size="small">
                <ArrowBackIcon />
              </IconButton>
            </div>
            {media ? (
              <div style={{ display: "contents" }} ref={inputRef}>
                {mediaItems[currentSlide].type === "IMAGE" ? (
                  <div style={{ transform: `scale(${scale})` }}>
                    <img src={media} alt="Image Broken" className={classes.lightbox} />
                    <h5 className={classes.caption}>
                      {mediaItems[currentSlide].caption ? mediaItems[currentSlide].caption : ""}
                    </h5>
                  </div>
                ) : mediaItems[currentSlide].type === "VIDEO" ? (
                  <div style={{ transform: `scale(${scale})` }}>
                    <video className={classes.lightbox} controls>
                      <source src={media} type="video/mp4" />
                      <source src={media} type="video/ogg" />
                    </video>
                    <h5 className={classes.caption}>
                      {mediaItems[currentSlide].caption ? mediaItems[currentSlide].caption : ""}
                    </h5>
                  </div>
                ) : mediaItems[currentSlide].type === "AUDIO" ? (
                  <div className={classes.audioPlayer}>
                    <audio src={media} controls />
                    <h5 className={classes.caption}>
                      {mediaItems[currentSlide].caption ? mediaItems[currentSlide].caption : ""}
                    </h5>
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
