import "./App.css";
import '@ant-design/pro-form/dist/form.css';
import '@ant-design/pro-table/dist/table.css';
import PageRoutes from "./components/Routes/Routes";
import ProProvider from "@ant-design/pro-provider";
import { useContext } from "react";
function App() {
  const values = useContext(ProProvider);
  
  return (
    <ProProvider.Provider value={{...values, valueTypeMap:{tag}}}>
    <div className="App">
      <PageRoutes />
    </div>
    </ProProvider.Provider>
  );
}

export default App;
