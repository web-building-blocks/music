import type { WithId, Document } from "mongodb"
import { MongoClient } from "mongodb"

type MongoAlbum = {
  name: string
  artist: string
  cover: string
  type: string
}

type MongoPlaylist = {
  name: string
}

const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017"
const client = new MongoClient(uri)

export const ClientPromise = client.connect()

export async function getAlbumsByType(type: string): Promise<MongoAlbum[]> {
  const db = (await ClientPromise).db("musicshadcn")
  const albums: WithId<Document>[] = await db.collection("albums").find({ type }).toArray()

  return albums.map((album) => {
    const { name, artist, cover, type } = album as Document
    return { name, artist, cover, type }
  })
}

export async function getPlaylists(): Promise<MongoPlaylist[]> {
  const db = (await ClientPromise).db("musicshadcn")
  const playlists: WithId<Document>[] = await db.collection("playlists").find().toArray()

  return playlists.map((p) => {
    const { name } = p as Document
    return { name }
  })
}
