import express from 'express'
import cors from 'cors'

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('AI 서버 정상 실행')
})

app.post('/api/ask', (req, res) => {
    const { question } = req.body
    console.log('React에서 받은 질문 :', question)
    res.json({
        answer: '서버에서 질문을 정상적으로 받았습니다.'
    })
})

app.listen(PORT, () => {
    console.log(`AI 서버 실행 : http://localhost:${PORT}`)
})