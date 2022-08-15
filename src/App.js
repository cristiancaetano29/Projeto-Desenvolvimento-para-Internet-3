import './App.css';
import Footer from './components/template/footer/Footer';
import Logo from './components/template/logo/Logo';
import Menu from './components/template/menu/Menu';
import Rotas from './Rotas';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Logo />
        <Menu />
        <Rotas />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
