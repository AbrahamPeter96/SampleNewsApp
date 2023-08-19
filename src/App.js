import Tabs from "./components/Tabs";
import "./App.css";
import TopNewsProvider from "./context/Topnewscontext";
function App() {
  return (
    <div className="App">
      <TopNewsProvider>
        <Tabs />
      </TopNewsProvider>
    </div>
  );
}

export default App;
