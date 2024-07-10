import OpenAI from 'openai'
import Replicate from 'replicate'

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
})
