import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [name, setName] = useState('')
  const [attendance, setAttendance] = useState('출석')
  const [memo, setMemo] = useState('')
  const [students, setStudents] = useState([])
  const [message, setMessage] = useState('')
  const [currentTime, setCurrentTime] = useState(new Date())
  const nameInputRef = useRef(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus()
    }
  }, [])

  const addStudent = () => {
    if (name === '') {
      setMessage('학생 이름을 입력하세요.')
      nameInputRef.current.focus()
      return
    }
    const newStudent = {
      id: Date.now(),
      name: name,
      attendance: attendance,
      memo: memo
    }
    const updatedStudents = students.concat(newStudent)
    setStudents(updatedStudents)
    setMessage('학생이 등록되었습니다.')

    setName('')
    setAttendance('출석')
    setMemo('')

    nameInputRef.current.focus()
  }

  const deleteStudent = (id) => {
    const updatedStudents = students.filter((student) => 
        student.id !== id
      )
    setStudents(updatedStudents)
    setMessage('학생 정보가 삭제되었습니다.')
  }

  const clearStudents = () => {
    setStudents([])
    setMessage('전체 학생 목록을 초기화했습니다.')
    nameInputRef.current.focus()
  }

  const presentStudents = students.filter((student) =>
    student.attendance === '출석'
  )

  const lateStudents = students.filter((student) =>
    student.attendance === '지각'
  )

  const absentStudents = students.filter((student) =>
    student.attendance === '결석'
  )

  return (
    <main className="page">
      <h1>학생 출석, 메모 관리</h1>
      <section className="time-box">
        <span>현재 시간</span>
        <strong>
          {currentTime.toLocaleTimeString()}
        </strong>
      </section>

      <section className="form-box">
        <h2>학생 등록</h2>
        <div className="form-group">
          <label>학생 이름</label>
          <input ref={nameInputRef} type="text"
          placeholder="학생 이름 입력" value={name}
          onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>출석 상태</label>
          <select value={attendance}
            onChange={(e) => setAttendance(e.target.value)}>
            <option value="출석">출석</option>
            <option value="지각">지각</option>
            <option value="결석">결석</option>
          </select>
        </div>

        <div className="form-group">
          <label>메모</label>
          <textarea placeholder="메모 입력"
            value={memo} onChange={(e) =>
              setMemo(e.target.value)}
            >
            </textarea>
        </div>

        <button className="add-button" onClick={addStudent}>
          학생 추가
        </button>

        {message !== '' && (
          <p className="message">{message}</p>
        )}
      </section>

      <section className="summary-box">
        <h2>출석 현황</h2>
        <div className="summary-list">
          <div>
            <span>전체</span>
            <strong>{students.length}명</strong>
          </div>
          <div>
            <span>출석</span>
            <strong>{presentStudents.length}명</strong>
          </div>
          <div>
            <span>지각</span>
            <strong>{lateStudents.length}명</strong>
          </div>
          <div>
            <span>결석</span>
            <strong>{absentStudents.length}명</strong>
          </div>
        </div>
      </section>

      <section className="student-box">
        <div className="student-header">
          <h2>학생 목록</h2>
          <button onClick={clearStudents}>
            전체 초기화
          </button>
        </div>

        {students.length === 0 && (
          <p className="empty-message">
            등록된 학생이 없습니다.
          </p>
        )}

        {students.map((student) => (
          <article className="student-card" key={student.id}>
            <div>
              <h3>{student.name}</h3>
              <p>
                출석 상태 : {' '} {student.attendance}
              </p>
              <p>
                메모 : {' '}
                {student.memo === '' ? '없음' : student.memo}
              </p>
            </div>
            <button
              className="delete-button"
              onClick={() => deleteStudent(student.id)}
            >
              삭제
            </button>
          </article>
        ))}
      </section>
    </main>
  )
}

export default App