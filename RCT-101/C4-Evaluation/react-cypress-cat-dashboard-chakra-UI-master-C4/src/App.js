import { useState } from "react";
import "./App.css";
import {Stack,Button,Center} from "@chakra-ui/react";
import Dashboard from "./Components/Dashboard/Dashboard";
import Form from "./Components/Form/Form";
// Note : import the the mentioned components from chakra UI and remove the follwoing once imported
// let Stack = () => <div />;
// let Center = () => <div />;
// let Button = () => <div />;
function App() {
  const [showForm , setShowForm] = useState(false);
  
  return (
    <Stack p={5} className="App">
      <Center>
        <Button width="150px" className="toggleForm" onClick={()=>setShowForm(!showForm)}>
          {showForm ? "Show Dashboard Page" : "Show Add cats Page"}
        </Button>
      </Center>
      {/* toggle between form and dashboard */}
      {showForm ? <Form/> : <Dashboard/>}
    </Stack>
  );
}

export default App;
