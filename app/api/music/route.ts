import { NextResponse } from "next/server"
import { ClientPromise } from "@/lib/mongo"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const db = (await ClientPromise).db("musicshadcn")
    const result = await db.collection("albums").insertOne({
      ...body,
      type: "listenNow", 
    })

    return NextResponse.json({ insertedId: result.insertedId }, { status: 201 })
  } catch (err) {
    console.error("Insert error:", err)
    return NextResponse.json({ error: "Insert failed" }, { status: 500 })
  }
}
