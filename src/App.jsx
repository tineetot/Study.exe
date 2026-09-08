import { useState } from 'react'
import { subjects } from './data/subjects.js'
import './App.css'

const sections = [
  { id: 'home', label: 'Home' },
  { id: 'reviewer', label: 'Reviewer' },
  { id: 'quiz', label: 'Practice Quiz' },
  { id: 'progress', label: 'Progress' },
]

const placeholders = {
  reviewer: { title: 'A little review, one topic at a time.', text: 'Lessons and flashcards will have a home here. Your reviewer is coming soon.' },
  quiz: { title: 'A space to put your learning into practice.', text: 'Practice quizzes are coming soon. There are no questions to answer just yet.' },
  progress: { title: 'Every small step will count.', text: 'No study activity yet. This space will show your progress once study features are available.' },
}

function App() {
  // State remembers the current panel between renders.
  const [activeSection, setActiveSection] = useState('home')
  const [selectedSubjectId, setSelectedSubjectId] = useState(subjects[0].id)
  const selectedSubject = subjects.find((subject) => subject.id === selectedSubjectId)
  const activeLabel = sections.find((section) => section.id === activeSection).label

  return (
    <div className="study-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="app-header">
        <span className="wordmark">Study<span>.exe</span></span>
        <span className="header-note">Your finals study space</span>
      </header>

      <div className="workspace">
        <aside className="sidebar" aria-label="Study workspace">
          <div className="subject-picker">
            <label className="eyebrow" htmlFor="subject">Current subject</label>
            <div className="subject-select-wrapper">
              <select id="subject" value={selectedSubjectId} onChange={(event) => setSelectedSubjectId(event.target.value)}>
                {subjects.map((subject) => (
                  <option key={subject.id} value={subject.id}>{subject.name}</option>
                ))}
              </select>
              <svg
                className="subject-select-chevron"
                aria-hidden="true"
                focusable="false"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>
          </div>
          <nav aria-label="Main navigation">
            <ul className="navigation">
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    type="button"
                    aria-current={activeSection === section.id ? 'page' : undefined}
                    onClick={() => setActiveSection(section.id)}
                  >
                    {section.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <p className="coming-soon">More subjects coming soon</p>
        </aside>

        <main id="main-content" className="main-content" tabIndex={-1}>
          <div className="panel-heading">
            <p className="eyebrow">Workspace / {activeLabel}</p>
            <span className="status-label">A little space to focus</span>
          </div>
          <h1>{activeLabel}</h1>
          {activeSection === 'home' ? (
            <>
              <section className="welcome" aria-labelledby="welcome-title">
                <p className="eyebrow">Settle in</p>
                <h2 id="welcome-title">One subject. One step at a time.</h2>
                <p>Welcome to Study.exe, your cozy corner for finals review. Make a little room for learning, at your own pace.</p>
              </section>
              <section className="subject-section" aria-labelledby="subjects-title">
                <h2 id="subjects-title">Your subjects</h2>
                <ul className="subject-list">
                  {subjects.map((subject) => (
                    <li className="subject-card" key={subject.id}>
                      <span className="subject-mark" aria-hidden="true">{subject.shortLabel}</span>
                      <div>
                        <p className="eyebrow">Study space available</p>
                        <h3>{subject.name}</h3>
                        <p>Reviewer and practice materials coming soon.</p>
                      </div>
                      <button className="primary-button" type="button" onClick={() => {
                        setSelectedSubjectId(subject.id)
                        setActiveSection('reviewer')
                      }}>
                        Open reviewer{' '}
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{ verticalAlign: 'middle' }}
                        >
                          <path d="M5 12h14m-6-6 6 6-6 6" />
                        </svg>
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            </>
          ) : (
            <section className="placeholder" aria-labelledby="placeholder-title">
              <p className="eyebrow">{selectedSubject.name}</p>
              <h2 id="placeholder-title">{placeholders[activeSection].title}</h2>
              <p>{placeholders[activeSection].text}</p>
            </section>
          )}
          <footer className="workspace-footer">Study.exe <span aria-hidden="true">/</span> A steady pace is a good pace.</footer>
        </main>
      </div>
    </div>
  )
}

export default App
