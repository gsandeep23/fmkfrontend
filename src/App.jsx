import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop.jsx';
import KindnessMatrix from './pages/kindnessMatrix.jsx';
import Newsroom from './pages/Newsroom.jsx';
import Resources from './pages/Resources.jsx';
import Contact from './pages/Contact.jsx';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<KindnessMatrix />} />
        <Route path="/newsroom" element={<Newsroom />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
