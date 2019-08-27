const Hapi = require("@hapi/hapi");
const mongoose = require("mongoose");
const Path = require("path");
const axios = require("axios");
const Vibrant = require("node-vibrant");
const retry = require("async-retry");

const swatchSchema = new mongoose.Schema(
  {
    "bg-color": String,
    "font-color": String
  },
  { _id: false } //don't create ids for these subdocuments
);

const Swatch = mongoose.model("Swatch", swatchSchema);

const galleryEntrySchema = new mongoose.Schema(
  {
    photoUrl: String,
    palette: [swatchSchema]
  },
  { timestamps: true }
);

const galleryEntry = mongoose.model("galleryEntry", galleryEntrySchema);

// these auth credentials link to the local mongodb
// set up by docker-compose for this demo.
// credentials for real world applications should be
// appropriately secured
var options = {
  user: "root",
  pass: "example",
  useNewUrlParser: true
};

mongoose.connect("mongodb://localhost:27017/test?authSource=admin", options);
db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connection successful!");

  const initdoc = new galleryEntry({
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
  initdoc.save();
  console.log("Database initialized!");
  console.log("try again with no sub ids");
});

const palletize = async () => {
  const r = await axios.get("https://picsum.photos/500/500");
  const palette = await Vibrant.from(r.request.res.responseUrl).getPalette();
  const colors = Object.keys(palette).map(x => {
    return {
      "bg-color": palette[x].getHex(),
      "font-color": palette[x].getBodyTextColor()
    };
  });
  return { photoUrl: r.request.res.responseUrl, palette: colors };
};

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: "0.0.0.0",
    debug: { request: ["*"] },
    routes: {
      files: {
        relativeTo: Path.join(__dirname, "build")
      }
    }
  });

  await server.register([require("@hapi/inert")]);

  //random photo button
  server.route({
    method: "GET",
    path: "/randomphoto",
    handler: async (request, h) => {
      const res = await retry(palletize, { retries: 3 });
      const fluffy = new galleryEntry(res);
      fluffy.save();
      return res;
    }
  });

  //mongo query: db.galleryentries.aggregate([{$sort: {createdAt:-1}},{$limit:5},{$project:{photoUrl:1,palette:1}}])

  //gallery
  server.route({
    method: "GET",
    path: "/gallerydata",
    handler: async (request, h) => {
      const gallery = await galleryEntry
        .find()
        .select("_id palette.bg-color")
        .sort("-createdAt")
        .limit(5);
      return gallery;
    }
  });

  server.route({
    method: "GET",
    path: "/galleryphotoclick/{id}",
    handler: async (request, h) => {
      //5d635a9554061a50bebcbcf2
      const item = await galleryEntry
        .findById(request.params.id)
        .select("photoUrl palette");
      return item;
    }
  });

  //static files
  server.route({
    method: "GET",
    path: "/{path*}",
    handler: {
      directory: {
        path: ".",
        listing: false,
        index: true
      }
    }
  });

  await server.start();
  console.log(`Server running at ${server.info.uri}`);
};

init();
