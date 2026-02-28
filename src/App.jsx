import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { FlowProvider } from './context/FlowContext'
import GoalScreen from './screens/GoalScreen'
import SkillLevelScreen from './screens/SkillLevelScreen'
import QuizScreen from './screens/QuizScreen'
import LoadingScreen from './screens/LoadingScreen'
import AnalysisScreen from './screens/AnalysisScreen'
import RoadmapScreen from './screens/RoadmapScreen'
import TaskScreen from './screens/TaskScreen'
import PricingScreen from './screens/PricingScreen'

export default function App() {
  return (
    <FlowProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GoalScreen />} />
          <Route path="/skill" element={<SkillLevelScreen />} />
          <Route path="/quiz" element={<QuizScreen />} />
          <Route path="/loading" element={<LoadingScreen />} />
          <Route path="/analysis" element={<AnalysisScreen />} />
          <Route path="/roadmap" element={<RoadmapScreen />} />
          <Route path="/task" element={<TaskScreen />} />
          <Route path="/pricing" element={<PricingScreen />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </FlowProvider>
  )
}
