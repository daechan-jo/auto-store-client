import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AppLayout from './components/common/AppLayout'
import HomePage from './pages/HomePage'
import JobDetailsPage from './pages/JobDetailsPage'
import QueueDashboard from './components/queue/QueueDashboard'
import ProductForm from './components/register/ProductForm'

function App() {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<ProductForm />} />
          <Route path="/queue/status" element={<QueueDashboard />} />
          <Route path="/job/:id" element={<JobDetailsPage />} />
        </Routes>
      </AppLayout>
    </Router>
  )
}

export default App
