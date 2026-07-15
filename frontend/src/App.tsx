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
import PrivateRoute from './PrivateRoute';

function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route
                    path="/"
                    element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/repositories/:id"
                    element={
                        <PrivateRoute>
                            <RepositoryDetail />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/analysis/:category"
                    element={
                        <PrivateRoute>
                            <AnalysisDetail />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;