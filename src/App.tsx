import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AppLayout from './components/common/AppLayout'
import HomePage from './pages/HomePage'
import JobDetailsPage from './pages/JobDetailsPage'
import QueueStatusPage from './pages/QueueStatusPage'
import RegisterPage from './pages/RegisterPage'

function App() {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/queue/status" element={<QueueStatusPage />} />
          <Route path="/job/:id" element={<JobDetailsPage />} />
          {/* 404 페이지 처리를 위한 경로 추가 */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </AppLayout>
    </Router>
  )
}

export default App
