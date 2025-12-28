// lib/generateCompositId.ts
import User from "@/models/user.model"

const PREFIX = "CMP-26-"
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

function generateCompositID() {
  return (
    PREFIX +
    Array.from({ length: 5 })
      .map(() => CHARS[Math.floor(Math.random() * CHARS.length)])
      .join("")
  )
}

export async function generateUniqueCompositID() {
  let compositId
  let exists = true

  while (exists) {
    compositId = generateCompositID()
    exists = (await User.exists({ compositId })) !== null
  }

  return compositId
}
