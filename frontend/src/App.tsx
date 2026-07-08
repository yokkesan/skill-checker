import {
    BrowserRouter,
    Routes,
    Route,
} from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import RepositoryDetail from './pages/RepositoryDetail';
import AnalysisDetail from './pages/AnalysisDetail';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Dashboard />} />

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route path="/repositories/:id" element={<RepositoryDetail />} />
                <Route path="/analysis/:category" element={<AnalysisDetail />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;