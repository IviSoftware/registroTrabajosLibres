import {useEffect,useState} from 'react';
import { WelcomeQuests } from './pages/WelcomeQuests';
import { Quest1 } from './pages/Quest1';



function App() {
  const [yourParamValue, setYourParamValue] = useState(null);
  const [questState,setQuestState] = useState("start");
  const [questType,setQuestType] = useState("");


  useEffect(() => {
    // Obtén la URL actual
    const queryString = window.location.search;
    // Crea una instancia de URLSearchParams
    const queryParams = new URLSearchParams(queryString);
    // Obtén el valor de un parámetro de consulta específico
    const paramValue = queryParams.get('quest');
    
    // Actualiza el estado con el valor del parámetro
    setYourParamValue(paramValue);
  }, []);


  return (<>

  
  {questState === "start" && (<WelcomeQuests setQuestState={setQuestState} setQuestType={setQuestType}/>) }
  {(questState === "questStarting" && questType==="questOne") && <Quest1 />}
  </>  
  )
}

export default App