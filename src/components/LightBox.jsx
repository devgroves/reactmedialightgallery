import React, { useState, useEffect, useRef } from "react";
import { CircularProgress, Modal, IconButton, ButtonGroup, Tooltip } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import CloseIcon from "@mui/icons-material/Close";
import "./index.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DownloadIcon from "@mui/icons-material/Download";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
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
    },
    audioPlayer: {
      alignItems: "center",
      justifyContent: "center",
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
  const [ toggler, setToggler ] = useState(true);
  const [ currentSlide, setCurrentSlide ] = useState(props.currentSlide);
  const [ media, setMedia ] = useState(mediaItems[ currentSlide ].media);
  const [ downloadMediaUrl, setDownloadMediaUrl ] = useState('');
  const [ scale, setScale ] = useState(1);
  const [ isScalable, setIsScalable ] = useState(false);
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
    fetch("http://localhost:8080").then((res) => {
      console.log('response ', res);
    });
    setToggler(!toggler);
    callback();
  };
  useEffect(() => {
    console.log("set media items", mediaItems[ currentSlide ].media);
    if (false)
      console.log("print false");
    if (mediaItems[ currentSlide ].type === "VIDEO" || mediaItems[ currentSlide ].type === "IMAGE") {
      setIsScalable(true);
    } else {
      setIsScalable(false);
    }
    const mediaUrl = mediaItems[ currentSlide ].media;
    setDownloadMediaUrlState(mediaUrl);
    setMedia(mediaItems[ currentSlide ].media);
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
    findIsScalable(mediaItems[ currentIndex ].type);
    setDownloadMediaUrlState(media);
    setMedia(mediaItems[ currentIndex ].media);
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
    console.log("currentSlide after ", currentIndex, currentSlide, mediaItems[ currentIndex ].type);
    findIsScalable(mediaItems[ currentIndex ].type);
    setDownloadMediaUrlState(media);
    setMedia(mediaItems[ currentIndex ].media);
    //shownext chaining parent event method definition also.
    parentShowNext(e);
  };

  const setDownloadMediaUrlState = (mediaUrl) => {
    fetch(mediaUrl).then(res => res.blob()).then(data => {
      const blobUrl = URL.createObjectURL(data);
      setDownloadMediaUrl(blobUrl);
    });
  };

  const findIsScalable = (mediaType) => {
    if (mediaType === "VIDEO" || mediaType === "IMAGE") {
      setIsScalable(true);
    } else {
      setIsScalable(false);
    }
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
          <div class="lsbox">
            <div class="lightbox-header">
              <div class="item-count">
                <h4 style={{ color: "#ffffff9e" }}>
                  {currentSlide + 1}/{mediaItems.length}
                </h4>
              </div>
              <div className={classes.widget}>
                <ButtonGroup disableElevation>
                  <Tooltip title="Facebook" arrow>
                    <IconButton onClick={()=>{
                      window.open(
                        "https://www.facebook.com/sharer/sharer.php?u=" +      media,
                      );
                    }} className={classes.arrowButton} size="small">
                      <FacebookIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="LinkedIn" arrow>
                    <IconButton onClick={()=>{
                      window.open(
                        "https://www.linkedin.com/sharing/share-offsite/?url=" + media,
                      );
                    }} className={classes.arrowButton} size="small">
                      <LinkedInIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="WhatsApp" arrow>
                    <IconButton onClick={()=>{
                       window.open(`whatsapp://send?text=${media}`);
                    }} className={classes.arrowButton} size="small">
                      <WhatsAppIcon />
                    </IconButton>
                  </Tooltip>
                  {isScalable ? <div> <Tooltip title="Zoom In" arrow>
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
                    </Tooltip> </div>
                    : null}
                  <a href={downloadMediaUrl} download>
                     <Tooltip title="Download" arrow>
                      <IconButton className={classes.arrowButton} size="small">
                        <DownloadIcon />
                      </IconButton>
                    </Tooltip>
                  </a>
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
                {mediaItems[ currentSlide ].type === "IMAGE" ? (
                  <div style={{ transform: `scale(${scale})` }}>
                    <img src={media} alt="Image Broken" className={classes.lightbox} />
                    { mediaItems[ currentSlide ].caption && <h5 className={classes.caption}>
                        {mediaItems[ currentSlide ].caption}
                      </h5> }
                  </div>
                ) : mediaItems[ currentSlide ].type === "VIDEO" ? (
                  <div style={{ transform: `scale(${scale})` }}>
                    <video className={classes.lightbox} controls>
                      <source src={media} type="video/mp4" />
                      <source src={media} type="video/ogg" />
                    </video>
                    { mediaItems[ currentSlide ].caption  && <h5 className={classes.caption}>
                       {mediaItems[ currentSlide ].caption}
                    </h5> }
                  </div>
                ) : mediaItems[ currentSlide ].type === "AUDIO" ? (
                  <div className={classes.audioPlayer}>
                    <audio src={media} controls />
                    { mediaItems[ currentSlide ].caption && <h5 className={classes.caption}>
                       {mediaItems[ currentSlide ].caption}
                      </h5> }
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
