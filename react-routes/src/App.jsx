import { Route, Routes } from 'react-router-dom';
import About from './components/pages/About';
import { GoalDetails, Goals } from './components/pages/Goals';
import Home from './components/pages/Home';
import NotFound from './components/pages/NotFound';
import Footer from './components/partials/Footer';
import Header from './components/partials/Header';

const App = () => {
  return (
    <div className="App">
        <Header />
        <main>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />

            <Route path="/goals">
              <Route index element={<Goals />} />
              <Route path=":id" element={<GoalDetails />} />
              </Route>
              
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
    </div>
  );
}

export default App;
