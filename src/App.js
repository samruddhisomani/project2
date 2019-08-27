import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Button from "./components/Button";
import Slide from "./components/Slide";
import Gallery from "./components/Gallery";

function App() {
  //initial slide details
  const [slideDetails, setSlideDetails] = useState({
    palette: [
      {
        "bg-color": "#4a7eb4",
        "font-color": "#fff"
      },
      {
        "bg-color": "#a1bcd8",
        "font-color": "#000"
      },
      {
        "bg-color": "#1e3349",
        "font-color": "#fff"
      },
      {
        "bg-color": "#5f7b97",
        "font-color": "#fff"
      },
      {
        "bg-color": "#a7b6c2",
        "font-color": "#000"
      },
      {
        "bg-color": "#364f6a",
        "font-color": "#fff"
      }
    ],
    photoUrl: "https://picsum.photos/id/147/500/500"
  });

  const [galleryDetails, setGalleryDetails] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const r = await fetch("/gallerydata").then(x => x.json());
      setGalleryDetails(r);
    }

    fetchData();
  }, []);

  const galleryClickHandler = async e => {
    const url = `/galleryphotoclick/${e.target.getAttribute("data-paletteId")}`;
    const slidePromise = await fetch(url);
    const update = await slidePromise.json();
    console.log(update);
    setSlideDetails(update);
  };

  const buttonClicks = async () => {
    const respSlidePromise = fetch("/randomphoto");
    const respGalleryPromise = fetch("/gallerydata");
    const [respSlide, respGallery] = await Promise.all([
      respSlidePromise,
      respGalleryPromise
    ]);
    const [slideUpdate, galleryUpdate] = await Promise.all([
      respSlide.json(),
      respGallery.json()
    ]);
    setSlideDetails(slideUpdate);
    setGalleryDetails(galleryUpdate);
  };

  return (
    <div className="App">
      <Header text="Inspired Palettes" />
      <Button text="Click for random new palette!" onClick={buttonClicks} />
      <Slide details={slideDetails} />
      <Gallery palettes={galleryDetails} clickhandler={galleryClickHandler} />
    </div>
  );
}

export default App;
