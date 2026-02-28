import { createContext, useContext, useState } from 'react'

const FlowContext = createContext(null)

export function FlowProvider({ children }) {
  const [state, setState] = useState({
    goal: null,           // 'data' | 'ai' | 'backend' | 'unsure'
    skillLevel: null,     // 'beginner' | 'intermediate' | 'advanced'
    quizAnswers: [],      // array of selected option indices
    quizScore: null,      // 0–100
    band: null,           // 'beginner' | 'intermediate' | 'advanced'
    track: null,          // 'data' | 'ai' | 'backend'
    topicsKnown: [],
    topicsToLearn: [],
    taskCompleted: false,
  })

  function setGoal(goal) {
    setState(s => ({ ...s, goal }))
  }

  function setSkillLevel(level) {
    setState(s => ({ ...s, skillLevel: level }))
  }

  function submitQuiz(answers, questions) {
    let correct = 0
    const topicsKnown = []
    const topicsToLearn = []

    answers.forEach((ans, i) => {
      if (ans === questions[i].correct) {
        correct++
        topicsKnown.push(questions[i].topic)
      } else {
        topicsToLearn.push(questions[i].topic)
      }
    })

    const rawScore = Math.round((correct / questions.length) * 100)

    // Band derivation
    let band
    if (rawScore < 40) band = 'beginner'
    else if (rawScore < 75) band = 'intermediate'
    else band = 'advanced'

    // Track recommendation (rule-based)
    const goal = state.goal
    let track
    if (goal === 'data') {
      track = 'data'
    } else if (goal === 'ai') {
      track = (band === 'beginner') ? 'data' : 'ai'
    } else if (goal === 'backend') {
      track = 'backend'
    } else {
      // 'unsure' → data
      track = 'data'
    }

    setState(s => ({
      ...s,
      quizAnswers: answers,
      quizScore: rawScore,
      band,
      track,
      topicsKnown,
      topicsToLearn,
    }))
  }

  function setTrack(track) {
    setState(s => ({ ...s, track }))
  }

  function setTaskCompleted() {
    setState(s => ({ ...s, taskCompleted: true }))
  }

  return (
    <FlowContext.Provider value={{ state, setGoal, setSkillLevel, submitQuiz, setTrack, setTaskCompleted }}>
      {children}
    </FlowContext.Provider>
  )
}

export function useFlow() {
  const ctx = useContext(FlowContext)
  if (!ctx) throw new Error('useFlow must be used within FlowProvider')
  return ctx
}
