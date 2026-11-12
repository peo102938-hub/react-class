import express from 'express'
import cors from 'cors'

import dotenv from 'dotenv'
import OpenAI from 'openai'

dotenv.config()

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

app.get('/', (req, res) => {
    res.send('AI 서버 정상 실행')
})

app.post('/api/ask', async (req, res) => {
    const { question } = req.body
    console.log('React에서 받은 질문 :', question)
    if (!question) {
        return res.status(400).json({error: '질문을 입력해주세요.'})
    }

    try {
        const response = await client.responses.create({
            model: 'chatgpt-4o-latest',
            instructions:
                '당신은 대학생을 위한 학습 도우미입니다. 초보자도 이해할 수 있도록 쉽고 간단하게 설명하세요.',
                input: question
        })
        res.json({answer: response.output_text})
    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: 'AI 답변 중 오류가 발생했습니다.'
        })
    }
})

app.listen(PORT, () => {
    console.log(`AI 서버 실행 : http://localhost:${PORT}`)
})