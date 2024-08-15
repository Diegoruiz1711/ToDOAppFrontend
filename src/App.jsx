import Styles from './App.module.css'
import MenuFooter from './Components/Footer/MenuFooter';
import ScreenView from './Components/ScreenView/ScreenView';

function App() {

  return (
    <div className={Styles.container}>
      <ScreenView/>
      <MenuFooter />
    </div>
  );
}

export default App;
