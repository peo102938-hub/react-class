import { useState } from 'react'
import './App.css'


function App() {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [loading, setLoading] = useState(false)
  const askAI = async () => {
    if (question.trim() === '') {
      alert('질문을 입력해주세요.')
      return
    }
    setLoading(true)
    setAnswer('')


    try {
      const response = await fetch('http://localhost:3000/api/ask', {
        method: 'POST', headers: { 'Content-Type':
            'application/json'},
        body: JSON.stringify({
          question: question
        })
      }
    )
    const data = await response.json()
    setAnswer(data.answer)
    } catch (error) {
      console.error(error)
      setAnswer('서버 연결 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const clearQuestion = () => {
    setQuestion('')
    setAnswer('')
  }


  return (
    <main className="page">
      <section className="container">
        <header className="header">
          <h1>Ai 학생 학습 도우미</h1>
          <p>
            React 수업에서 궁금한 내용을
            AI에게 질문해 보세요.
          </p>
      </header>
      <section className="question-box">
        <h2>질문 입력</h2>
        <textarea
          placeholder="예: useMemo와 useCallback의 차이를 쉽게 설명해주세요."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        >
        </textarea>
      <div className="button-box">
        <button onClick={askAI} disabled={loading}>
          {loading ? 'AI가 답변중...' : 'AI에게 질문하기'}
        </button>
        <button onClick={clearQuestion}>
          초기화
        </button>
      </div>
      </section>
      <section className="answer-box">
        <h2>AI 답변</h2>
        {loading ? (
          <p>AI가 답변을 생성하고 있습니다.</p>
        )
      : (
        <p>
          {
            answer === ''
              ? '아직 질문하지 않았습니다.'
              : answer
          }
        </p>
        )
      }
      </section>
    </section>
    </main>
  )
}

export default App