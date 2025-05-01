"use client"

import { useState } from "react"
import { Dialog, DialogTrigger, DialogContent,DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function AddMusicDialog() {
  const [form, setForm] = useState({ name: "", artist: "", cover: "", type: "listenNow" })
  const router = useRouter()
  const [open, setOpen] = useState(false)


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    // Simple field non-empty check
    if (!form.name || !form.artist || !form.cover) {
      alert("Please fill in all fields")
      return
    }
    
    const cleanedForm = {
      name: form.name.trim() || "Untitled",
      artist: form.artist.trim() || "Unknown",
      cover: form.cover.trim() || "/default-cover.jpg",
      type: "listenNow"
    }
    body: JSON.stringify(cleanedForm)
    
    const isValidCover =
      form.cover.startsWith("http://") ||
      form.cover.startsWith("https://") 
  
    if (!isValidCover) {
      alert("The cover link is invalid! Please enter an link beginning with http://, https://")
      return
    }
  
    try {
      const res = await fetch("/api/music", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      })
  
      if (!res.ok) throw new Error("Request failed")
  
      const result = await res.json()
      console.log("✅ Inserted:", result.insertedId)
  
      // Clear the form
      setForm({ name: "", artist: "", cover: "", type: "listenNow" })
      setOpen(false)  
      router.refresh()
  
    } catch (err) {
      console.error("❌ Failed to insert music", err)
      alert("Addition failed. Please check and try again")
    }
  }
  
  

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add music</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Add New Music</DialogTitle>
        <div className="space-y-2">
          <Input placeholder="Name" name="name" value={form.name} onChange={handleChange} />
          <Input placeholder="Artist" name="artist" value={form.artist} onChange={handleChange} />
          <Input placeholder="Cover" name="cover" value={form.cover} onChange={handleChange} />
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
