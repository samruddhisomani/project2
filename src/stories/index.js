import React from "react";

import { storiesOf } from "@storybook/react";
// import { action } from "@storybook/addon-actions";
// import { linkTo } from "@storybook/addon-links";

import Header from "../components/Header";
import Button from "../components/Button";
import Slide from "../components/Slide";
import Gallery from "../components/Gallery";

const palettes = [
  {
    _id: "5d641d2e6a1d2c0d1b6329b7",
    palette: [
      {
        "bg-color": "#c88c54"
      },
      {
        "bg-color": "#f5c387"
      },
      {
        "bg-color": "#644120"
      },
      {
        "bg-color": "#9d8261"
      },
      {
        "bg-color": "#c8c49c"
      },
      {
        "bg-color": "#333e4e"
      }
    ]
  },
  {
    _id: "5d641cf16a1d2c0d1b6329b6",
    palette: [
      {
        "bg-color": "#4a7eb4"
      },
      {
        "bg-color": "#a1bcd8"
      },
      {
        "bg-color": "#1e3349"
      },
      {
        "bg-color": "#5f7b97"
      },
      {
        "bg-color": "#a7b6c2"
      },
      {
        "bg-color": "#364f6a"
      }
    ]
  },
  {
    _id: "5d641cef6ed36c0d10e4d3ba",
    palette: [
      {
        "bg-color": "#4a7eb4"
      },
      {
        "bg-color": "#a1bcd8"
      },
      {
        "bg-color": "#1e3349"
      },
      {
        "bg-color": "#5f7b97"
      },
      {
        "bg-color": "#a7b6c2"
      },
      {
        "bg-color": "#364f6a"
      }
    ]
  },
  {
    _id: "5d641cebc7624f0cff1e9586",
    palette: [
      {
        "bg-color": "#4a7eb4"
      },
      {
        "bg-color": "#a1bcd8"
      },
      {
        "bg-color": "#1e3349"
      },
      {
        "bg-color": "#5f7b97"
      },
      {
        "bg-color": "#a7b6c2"
      },
      {
        "bg-color": "#364f6a"
      }
    ]
  },
  {
    _id: "5d641cdbeea9340cee235be5",
    palette: [
      {
        "bg-color": "#4a7eb4"
      },
      {
        "bg-color": "#a1bcd8"
      },
      {
        "bg-color": "#1e3349"
      },
      {
        "bg-color": "#5f7b97"
      },
      {
        "bg-color": "#a7b6c2"
      },
      {
        "bg-color": "#364f6a"
      }
    ]
  }
];

const details = {
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
};

storiesOf("Header", module).add("default", () => <Header />);
storiesOf("Button", module).add("default", () => <Button cta="Holla" />);
storiesOf("Slide", module).add("default", () => <Slide details={details} />);
storiesOf("Gallery").add("default", () => <Gallery palettes={palettes} />);
// import { Button, Welcome } from '@storybook/react/demo';

// storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

// storiesOf('Button', module)
//   .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
//   .add('with some emoji', () => (
//     <Button onClick={action('clicked')}>
//       <span role="img" aria-label="so cool">
//         😀 😎 👍 💯
//       </span>
//     </Button>
//   ));
