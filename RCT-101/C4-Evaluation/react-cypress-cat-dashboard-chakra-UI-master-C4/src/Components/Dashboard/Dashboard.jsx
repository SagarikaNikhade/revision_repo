// Note : import the the mentioned components from chakra UI and remove the follwoing once imported
// let Box = () => <div />;
// let Button = () => <div />;
// let Center = () => <div />;
// let Img = () => <div />;
// let SimpleGrid = () => <div />;
// let Text = () => <div />;
// let VStack = () => <div />;
// let Select = () => <div />;
// let Spinner = () => <div />;
import {Box,Center,Button,Img,SimpleGrid,Text,VStack,Select,Spinner} from "@chakra-ui/react";
import { useEffect,useState,useReducer } from "react";
import axios from "axios";
const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

const reducer = (state = initialState,action) => {
  const {type , payload} = action;

  switch(type){
    case "REQUEST" :
      return{
        ...state, isLoading:true, error:null,
      };
      case "SUCCESS":
      return{
        ...state,
        data:payload,
        isLoading:false,
        error:null,
      };
      case "FAILURE":
      return{
        ...state,
        isLoading:false,
        error:action.payload,
      };
      default:
        return state;
  }
};

export default function Dashboard() {
  const [state , dispatch] = useReducer(reducer,initialState);
  const [order , setOrder] = useState("asc");
  const [breed , setBreed] = useState(null);

  const {data} = state;

  const getApiData = (order = "asc") =>{
    dispatch({type : "REQUEST"})
    axios.get(`http://localhost:${process.env.REACT_APP_JSON_SERVER_PORT}/cats?_sort=cost&_order=${order}`)
    .then((res)=>{
      console.log(res.data)
      dispatch({type:"SUCCESS",payload:res.data});
    })
    .catch((err)=>
    dispatch({type:"FAILURE",payload:err.message})
    )
  };

  const handleDelete = (id) =>{
    axios.delete(`http://localhost:${process.env.REACT_APP_JSON_SERVER_PORT}/cats/${id}`)
    .then((res)=>{
      getApiData()
    })
    .catch((err)=>
      console.log(err)
    )
  };

  useEffect(()=>{
    dispatch({type : "REQUEST"})
    if(breed){
      axios.get(`http://localhost:${process.env.REACT_APP_JSON_SERVER_PORT}/cats?breed=${breed}&_sort=cost&_order=${order}`)
      .then((res)=>{
        console.log(res.data)
        dispatch({type:"SUCCESS",payload:res.data});
      })
      .catch((err)=>
      dispatch({type:"FAILURE",payload:err.message})
      )
    }else{
      getApiData(order)
    }
  },[breed,order])
  // console.log(data)
  return (
    <div>
      <div className="sortingButtons">
        <Button 
         colorScheme={"green"}
         className="sortByCostAsc" 
         onClick={()=>setOrder("asc")} 
         isDisabled={order === "asc"} >
          Sort by Asc
        </Button>
        <Button colorScheme={"red"} 
        className="sortByCostDesc" 
        onClick={()=>setOrder("desc")} 
         isDisabled={order === "desc"}
        m={2}>
          Sort by Desc
        </Button>
      </div>
      <Center>
        <Select placeholder="select option" onClick={(e)=>setBreed(e.target.value)}>
          <option value="Peterbald">Peterbald</option>
          <option value="Nebelung">Nebelung</option>
          <option value="Persian">Persian</option>
          <option value="Birman">Birman</option>
          <option value="Himalayan">Himalayan</option>
        </Select>
      </Center>

      {/* Map the below container against your data */}
      {state.isLoading ? (
        <Spinner />
      ) : (
        <SimpleGrid className="main_container" column={4} p={10} gap={5}>
          {data.length > 0 && data.map((el)=>{
             return(
            <Box className="catsDetails" key={el.id} borderRadius={"10px"} border="1px solid black">
            <Center>
              <Img borderRadius={"10px"} h="300px" w={"300px"} src={el.image} alt="catimg_err"/>
            </Center>
  
            <VStack spacing={2} p={2}>
              <Text className="name" fontSize={"20px"} fontWeight="bold">{el.name}</Text>
              <Text className="cost">{el.cost}</Text>
              <Text className="likes">{el.likes}</Text>
              <Text className="breed">{el.breed}</Text>
              <Text className="description">{el.description}</Text>
              <Button className="delete"
              onClick={()=>handleDelete(el.id)}
              >
                Delete
              </Button>
            </VStack>
          </Box>
             )
          })}
      </SimpleGrid>
      )}
    </div>
  );
}
