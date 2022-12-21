import React, { useState } from "react";
import { Grid, styled, Paper } from "@mui/material";
import video1 from "./assets/city.mp4";
import audio1 from "./assets/sample.mp3";
import LightBox from "./LightBox";
import bgVideo from "./assets/video.jpg";
const image1 =
  "https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwfHwwfHw%3D&w=1000&q=80";
const image2 = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrKHPsvNDJHY9tWpkHrfkfo8Dkf0LvZU3Hdg&usqp=CAU";
const image3 = "https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832__480.jpg";
const image4 = "https://wallpapercave.com/wp/wp4626258.jpg";
const image5 = "https://c4.wallpaperflare.com/wallpaper/907/35/593/spiderman-hd-4k-5k-wallpaper-preview.jpg";
const data = [
  {
    media: image1,
    type: "IMAGE",
    caption: "Zoom Photo Image",
  },
  {
    media: image2,
    type: "IMAGE",
    caption: "Bubble Splash Image",
  },
  {
    media: video1,
    type: "VIDEO",
    caption: "City Traffic Video",
  },
  {
    media: image3,
    type: "IMAGE",
    caption: "Splendid Nature Image"
  },
  {
    media: image4,
    type: "IMAGE",
    caption: "Wallpaper Cave",
  },
  {
    media: image5,
    type: "IMAGE",
    caption: "Spider Man Image",
  },
  {
    media: audio1,
    type: "AUDIO",
    caption: "Demo Music",
  },
];
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
export default function Home() {
  const [toggler, setToggler] = useState(false);
  const [currentSlide, setCurrentSlide] = useState();
  return (
    <div
      style={{
        backgroundColor: "#c0d6df",
      }}
    >
      <div>
        <div style={Style}>
          {data ? (
            data?.map((val, i) => (
              <Grid item xs={6} sm={4} md={3} key={i} style={{ margin: 5 }}>
                <Item
                  onClick={() => {
                    setCurrentSlide(i);
                    setToggler(true);
                  }}
                  style={{
                    height: 250,
                    alignItems: "center",
                    display: "flex",
                    backgroundImage:
                      val.type === "AUDIO" ? `url(${bgVideo})` : val.type === "VIDEO" ? `url(${bgVideo})` : "",
                    backgroundSize: "cover",
                    justifyContent: "center",
                  }}
                >
                  {val.type === "IMAGE" ? (
                    <img src={val.media} height="250px" width="100%" />
                  ) : val.type === "VIDEO" ? (
                    <video width="100%" height="100%" controls>
                      <source src={val.media} type="video/mp4" />
                      <source src={val.media} type="video/ogg" />
                    </video>
                  ) : val.type === "AUDIO" ? (
                    <audio controls>
                      <source src={val.media} type="audio/ogg" />
                      <source src={val.media} type="audio/mpeg" />
                    </audio>
                  ) : (
                    <h2> This Media file is not Supported</h2>
                  )}
                </Item>
              </Grid>
            ))
          ) : (
            <h3>No Data</h3>
          )}
        </div>
        {toggler ? (
          <LightBox
            currentSlide={currentSlide}
            currentSlide={currentSlide}
            mediaItems={data}
            toggler={toggler}
            parentShowPrev={(e) => {
              console.log("show prev button clicked", e);
            }}
            parentShowNext={(e) => {
              console.log("show next button clicked", e);
            }}
            callback={() => {
              console.log("going to do a callback");
              setToggler(false);
            }}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

const Style = {
  marginLeft: 10,
  marginRight: 10,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexWrap: "wrap",
};
