import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import WorkoutTracker from './components/WorkoutTracker';
import FoodTracker from './components/FoodTracker';
import Goals from './components/Goals';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const onLogin = () => {
        setIsAuthenticated(true);
    };

    const onRegister = () => {
        setIsAuthenticated(true);
    };

    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route exact path="/login">
                        <Login onLogin={onLogin} />
                    </Route>
                    <Route exact path="/register">
                        <Register onRegister={onRegister} />
                    </Route>
                    <Route exact path="/">
                        {isAuthenticated ? (
                            <div>
                                <WorkoutTracker />
                                <FoodTracker />
                                <Goals />
                            </div>
                        ) : (
                            <Login onLogin={onLogin} />
                        )}
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
