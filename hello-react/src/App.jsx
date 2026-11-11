import './App.css';
import profileImg from './assets/asas.png'
import {QRCodeSVG} from 'qrcode.react'

function App() {
  const name = '안덕수';
  const studentId = '20250733';
  const initials = 'DS';
  const department = '멀티미디어학과 학생';
  const goal = '사용자가 편하고 쉽게 좋은 앱 만들기';
  const qrData =
    '이름: ' + name +
    '\n학번: ' + studentId +
    '\n학과 ' + department

  console.log(qrData)

  return (
    <main className="page">
      <section className="profile-card">
        <span className="status">LIVE</span>

        {/* <div className="avatar">{initials}</div> */}
        <img src={profileImg} alt="프로필 사진" className="avatar-img"></img>

        <p className="eyebrow">HELLO REACT</p>
        <h1>{name}</h1>

        <p className="department">{department}</p>

        <div className="divider"></div>

        <p className="goal">목표: {goal}</p>

        <div className="tags">
          <span>HTML</span>
          <span>CSS</span>
          <span>JavaScript</span>
        </div>

        <div className="qr-area">
          <QRCodeSVG
            value={qrData}
            size={100}
          />
          <p>학생 QR</p>
        </div>

        <button>첫 React 앱 완성</button>
      </section>
    </main>
  );
}

export default App;