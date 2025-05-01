import { MongoClient } from "mongodb"
import { listenNowAlbums, madeForYouAlbums } from "../data/albums"
import { playlists } from "../data/playlists"
import dotenv from "dotenv"

dotenv.config()

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017"
const client = new MongoClient(uri)

async function seed() {
  try {
    await client.connect()
    const db = client.db("musicshadcn")

    // collections
    const albumsCollection = db.collection("albums")
    const playlistsCollection = db.collection("playlists")

    // clear all previous data
    await albumsCollection.deleteMany({})
    await playlistsCollection.deleteMany({})

    // insert albums
    await albumsCollection.insertMany([
      ...listenNowAlbums.map((album) => ({ ...album, type: "listenNow" })),
      ...madeForYouAlbums.map((album) => ({ ...album, type: "madeForYou" })),
    ])

    // insert playlists
    await playlistsCollection.insertMany(
      playlists.map((name) => ({ name }))
    )

    console.log("✅ data import successfully！")
  } catch (err) {
    console.error("❌ data import failed：", err)
  } finally {
    await client.close()
  }
}

seed()
