import { useEffect, useMemo, useState } from 'react'

const storageKey = 'study-exe.flashcards.v1'

function readConfidence() {
  try {
    const saved = JSON.parse(window.localStorage.getItem(storageKey) ?? '{}')
    return saved && typeof saved === 'object' && !Array.isArray(saved) ? saved : {}
  } catch {
    return {}
  }
}

function shuffleCards(ids) {
  const shuffled = [...ids]
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const nextIndex = Math.floor(Math.random() * (index + 1))
    ;[shuffled[index], shuffled[nextIndex]] = [shuffled[nextIndex], shuffled[index]]
  }
  return shuffled
}

export default function Flashcards({ subject, cards, mascot }) {
  const [deckFilter, setDeckFilter] = useState('all')
  const filteredCards = useMemo(() => cards.filter((card) => deckFilter === 'all' || card.lessonId === deckFilter), [cards, deckFilter])
  const [cardOrder, setCardOrder] = useState(() => cards.map((card) => card.id))
  const [cardIndex, setCardIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [confidence, setConfidence] = useState(readConfidence)

  useEffect(() => {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(confidence))
    } catch {
      // Flashcards remain usable if browser storage is unavailable.
    }
  }, [confidence])

  const orderedCards = cardOrder.map((id) => filteredCards.find((card) => card.id === id)).filter(Boolean)
  const card = orderedCards[cardIndex]
  const counts = filteredCards.reduce((totals, item) => {
    if (confidence[item.id] === 'got-it') totals.gotIt += 1
    else if (confidence[item.id] === 'review-again') totals.reviewAgain += 1
    else totals.unrated += 1
    return totals
  }, { gotIt: 0, reviewAgain: 0, unrated: 0 })

  const moveTo = (nextIndex) => {
    setCardIndex(Math.max(0, Math.min(nextIndex, orderedCards.length - 1)))
    setFlipped(false)
    setCompleted(false)
  }
  const rateCard = (value) => {
    setConfidence((current) => ({ ...current, [card.id]: value }))
    if (cardIndex === orderedCards.length - 1) setCompleted(true)
    else moveTo(cardIndex + 1)
  }
  const restartDeck = () => { setCardIndex(0); setFlipped(false); setCompleted(false) }
  const selectDeck = (nextFilter) => {
    const nextCards = cards.filter((item) => nextFilter === 'all' || item.lessonId === nextFilter)
    setDeckFilter(nextFilter)
    setCardOrder(nextCards.map((item) => item.id))
    setCardIndex(0)
    setFlipped(false)
    setCompleted(false)
  }
  const handleFlipKey = (event) => {
    if (event.key === ' ') { event.preventDefault(); setFlipped((current) => !current) }
  }

  return <section className="flashcards" aria-label="Flashcards">
    <div className="flashcards-intro">
      <div><p className="eyebrow">Study mode</p><h2>Flashcards</h2><p>Practice short recall prompts from the currently available Platform Technologies lessons.</p></div>
      <img className="flashcards-mascot" src={mascot} width="1254" height="1254" alt="" aria-hidden="true" />
    </div>
    <div className="deck-filters" aria-label="Flashcard deck filters">
      <span className="filter-label">Deck</span>
      <button type="button" aria-pressed={deckFilter === 'all'} onClick={() => selectDeck('all')}>All lessons</button>
      {subject.lessons.map((lesson) => <button key={lesson.id} type="button" aria-pressed={deckFilter === lesson.id} onClick={() => selectDeck(lesson.id)}>Lesson {lesson.number}</button>)}
    </div>
    <div className="flashcard-status" aria-live="polite"><span>{completed ? 'Deck complete' : `Card ${cardIndex + 1} of ${orderedCards.length}`}</span><span>{card?.category}</span></div>
    {completed ? <section className="deck-complete" aria-labelledby="deck-complete-title"><p className="eyebrow">Nice work</p><h3 id="deck-complete-title">You reviewed this deck.</h3><p>Your confidence choices are saved on this device. Restart the deck whenever you want another pass.</p><button className="primary-button" type="button" onClick={restartDeck}>Restart deck</button></section> : card && <>
      <button className={`flashcard ${flipped ? 'is-flipped' : ''}`} type="button" onClick={() => setFlipped((current) => !current)} onKeyDown={handleFlipKey} aria-label={`Flashcard: ${flipped ? 'answer' : 'question'}. Press Enter or Space to flip.`}>
        <span className="flashcard-label">{flipped ? 'Answer' : 'Prompt'}</span><span className="flashcard-text">{flipped ? card.back : card.front}</span><span className="flashcard-hint">Tap or press Enter / Space to flip</span>
      </button>
      <div className="confidence-actions"><button type="button" onClick={() => rateCard('review-again')}>Review again</button><button className="primary-button" type="button" onClick={() => rateCard('got-it')}>Got it</button></div>
      <div className="deck-controls"><button type="button" onClick={() => moveTo(cardIndex - 1)} disabled={cardIndex === 0}>Previous</button><button type="button" onClick={() => moveTo(cardIndex + 1)} disabled={cardIndex === orderedCards.length - 1}>Next</button><button type="button" onClick={() => { setCardOrder(shuffleCards(filteredCards.map((item) => item.id))); setCardIndex(0); setFlipped(false); setCompleted(false) }}>Shuffle</button><button type="button" onClick={restartDeck}>Restart deck</button></div>
    </>}
    <dl className="confidence-counts"><div><dt>Got it</dt><dd>{counts.gotIt}</dd></div><div><dt>Review again</dt><dd>{counts.reviewAgain}</dd></div><div><dt>Unrated</dt><dd>{counts.unrated}</dd></div></dl>
  </section>
}
