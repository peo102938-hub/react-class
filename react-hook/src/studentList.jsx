function StudentList({ students }) {

    return (
        <section className="student-list">
            {students.map((student) => (
                <article
                    className="student-card"
                    key={student.id}
                >
                    <h3>{student.name}</h3>
                    <p>전공 : {student.major}</p>
                    <p>점수 : {student.score}</p>
                </article>
            ))}
        </section>
    )
}

export default StudentList