import { useState } from 'react'
import { flashcards } from '../data/flashcards.js'
import Flashcards from './Flashcards.jsx'

function SectionContent({ section }) {
  return <section className="lesson-section" aria-labelledby={section.id}>
    <h3 id={section.id}>{section.title}</h3><p>{section.summary}</p>
    {section.note && <p className="inline-note"><strong>Study note:</strong> {section.note}</p>}
    {section.steps && <ol className="lesson-list">{section.steps.map((item) => <li key={item}>{item}</li>)}</ol>}
    {section.items && <ul className="lesson-list">{section.items.map((item) => <li key={item}>{item}</li>)}</ul>}
    {section.table && <div className="table-scroll" tabIndex="0"><table><caption>{section.table.caption}</caption><thead><tr>{section.table.headers.map((header) => <th key={header} scope="col">{header}</th>)}</tr></thead><tbody>{section.table.rows.map((row) => <tr key={row[0]}>{row.map((cell) => <td key={cell}>{cell}</td>)}</tr>)}</tbody></table></div>}
    {section.subsections?.map((part) => <div className="lesson-subsection" key={part.title}><h4>{part.title}</h4>{part.text && <p>{part.text}</p>}{part.items && <ul className="lesson-list">{part.items.map((item) => <li key={item}>{item}</li>)}</ul>}</div>)}
  </section>
}

export default function Reviewer({ subject, mascot, flashcardsMascot }) {
  const [selectedLessonId, setSelectedLessonId] = useState(subject.lessons[0].id)
  const [reviewerMode, setReviewerMode] = useState('lessons')
  const lesson = subject.lessons.find((item) => item.id === selectedLessonId) ?? subject.lessons[0]
  return <><nav className="reviewer-tabs" aria-label="Reviewer content"><button type="button" aria-current={reviewerMode === 'lessons' ? 'page' : undefined} onClick={() => setReviewerMode('lessons')}>Lessons</button><button type="button" aria-current={reviewerMode === 'flashcards' ? 'page' : undefined} onClick={() => setReviewerMode('flashcards')}>Flashcards</button></nav>{reviewerMode === 'flashcards' ? <Flashcards subject={subject} cards={flashcards} mascot={flashcardsMascot} /> : <section className="reviewer-layout" aria-label={`${subject.name} reviewer`}>
    <aside className="lesson-sidebar" aria-label="Lesson navigation"><p className="eyebrow">Available lessons</p><nav><ul className="lesson-navigation">{subject.lessons.map((item) => <li key={item.id}><button type="button" onClick={() => setSelectedLessonId(item.id)} aria-current={item.id === lesson.id ? 'page' : undefined}><span>Lesson {item.number}</span>{item.title}<small>{item.status}</small></button></li>)}<li><span className="future-lesson">More topics coming soon</span></li></ul></nav></aside>
    <article className="lesson-reader"><div className="lesson-hero"><div><p className="eyebrow">Lesson {lesson.number} <span aria-hidden="true">/</span> {lesson.status}</p><h2>{lesson.title}</h2><p>{lesson.intro}</p></div><img className="reviewer-mascot" src={mascot} width="1254" height="1254" alt="" aria-hidden="true" /></div><div className="lesson-sections">{lesson.sections.map((section) => <SectionContent key={section.id} section={section} />)}</div><details className="source-notes"><summary>Source notes</summary><ul>{lesson.sourceNotes.map((note) => <li key={note}>{note}</li>)}</ul></details></article>
  </section>}</>
}
