import {Routes, Route, BrowserRouter as Router
} from "react-router-dom";
import Home from './pages/Home';
import Token from './pages/Token'
import { ContextProvider as DatabaseProvider } from "./Context/DatabaseContext";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={(
          <DatabaseProvider>
            <Home />
          </DatabaseProvider>
        )} />
        <Route path="/token" element={(
          <DatabaseProvider>
            <Token />
          </DatabaseProvider>
        )} />
      </Routes>
    </Router>
  );
}

export default App;
