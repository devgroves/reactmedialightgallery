import React, { useState } from "react";
import { Grid, Box, styled, Paper } from "@mui/material";
import video1 from "./assets/city.mp4";
import audio1 from "./assets/sample.mp3";
import LightBox from "./LightBox";
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
  },
  {
    media: image2,
    type: "IMAGE",
  },
  {
    media: video1,
    type: "VIDEO",
  },
  {
    media: audio1,
    type: "AUDIO",
  },
  {
    media: image3,
    type: "IMAGE",
  },
  {
    media: image4,
    type: "IMAGE",
  },
  {
    media: image5,
    type: "IMAGE",
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
        backgroundColor: "gray",
      }}
    >
      <h3>Examples</h3>
      <div>
        <div style={Style}>
          {data ? (
            data?.map((val, i) => (
              <Grid item xs={3} sm={4} md={3} key={i} style={{ margin: 5 }}>
                <Item
                  onClick={() => {
                    setCurrentSlide(i);
                    setToggler(true);
                  }}
                >
                  {val.type === "IMAGE" ? (
                    <img src={val.media} height="250px" width="100%" />
                  ) : val.type === "VIDEO" ? (
                    <video width="100%" height="250px" controls>
                      <source src={val.media} type="video/mp4" />
                      <source src={val.media} type="video/ogg" />
                    </video>
                  ) : val.type === "AUDIO" ? (
                    <audio controls style={{ width: "100%" }}>
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
