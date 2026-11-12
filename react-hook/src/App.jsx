import { useState, useMemo, useCallback, useContext, useEffect } from 'react'
import './App.css'
import Header from './Header.jsx'
import StudentList from './StudentList.jsx'
import { ThemeContext } from './ThemeContext.jsx'

function App() {

  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('')
  const [majorSearch, setMajorSearch] = useState('')
  const { theme } = useContext(ThemeContext)

  useEffect(() => {
    fetch('/students.json')
      .then((response) => response.json())
      .then((data) => {
        setStudents(data.students);
      })
      .catch((error) => console.error("데이터를 불러오는데 실패했습니다:", error));
  }, [])

  const filteredStudents = useMemo(() => {
    return students.filter((student) => 
      student.name.includes(search) && student.major.includes(majorSearch)
    )
  }, [students, search, majorSearch]) 

  const averageScore = useMemo(() => {
    if(filteredStudents.length === 0) {
      return 0
    }
    const total = filteredStudents.reduce((sum, student) => sum + student.score, 0 )
    return Math.round(total / filteredStudents.length)
  }, [filteredStudents])

  const clearSearch = useCallback(() => {
    setSearch('')
    setMajorSearch('')
  }, [])

  return (
    <main className={ theme === 'light' ? 'page light' : 'page dark' } >
      <Header />
      <section className="search-box">
        <label>학생 이름 검색</label>
        <div className="search-row">
          <input type="text" placeholder="학생 이름 입력" value={search} onChange={(e) => setSearch(e.target.value) } />
        </div>
        <label>전공 검색</label>
        <div className="search-row">
          <input type="text" placeholder="전공 입력" value={majorSearch} onChange={(e) => setMajorSearch(e.target.value) } />
          <button onClick={clearSearch}>검색 초기화</button>
        </div>
        <p className="search-result">
          검색 결과 {filteredStudents.length}명 / 평균 점수: {averageScore}점
        </p>
      </section>
      <StudentList students={filteredStudents}/>
    </main>
  )
}

export default App
