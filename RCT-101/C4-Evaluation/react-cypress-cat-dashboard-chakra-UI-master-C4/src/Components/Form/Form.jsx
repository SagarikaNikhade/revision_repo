// Note : import the the mentioned components from chakra UI and remove the follwoing once imported

// let Button = () => <div />;
// let FormControl = () => <div />;
// let Input = () => <div />;
import { Button, Input, FormControl } from "@chakra-ui/react";
import axios from "axios";
import {useState} from "react";

export default function Form() {
  const [formdata, setFormData] = useState({
    name: "",
    cost: "",
    likes: "",
    image: "https://www.vets4pets.com/siteassets/species/cat/kitten/ginger-kitten-close-up.jpg?w=585&scale=down",
    description: "",
    breed: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:${process.env.REACT_APP_JSON_SERVER_PORT}/cats`, {
      ...formdata,
    })
      .then((res) => {
      console.log(res)
        setFormData({
          name: "",
          cost: "",
          likes: "",
          image: "https://www.vets4pets.com/siteassets/species/cat/kitten/ginger-kitten-close-up.jpg?w=585&scale=down",
          description: "",
          breed: "",
        })
      })
  }

  return (
    <div className="addCatContainer">
      <form className="form" onSubmit={handleSubmit}>
        <FormControl>
          <Input className="name" placeholder="Name" type="text" value={formdata.name} onChange={(e)=>setFormData({...formdata, name:e.target.value})}/>
          <Input className="cost" placeholder="Cost" type="number" value={formdata.cost} onChange={(e)=>setFormData({...formdata, cost:e.target.value})}/>

          <Input className="likes" placeholder="Likes" type="number" value={formdata.likes} onChange={(e)=>setFormData({...formdata, likes:e.target.value})}/>
          <Input className="description" placeholder="Description" value={formdata.description} onChange={(e)=>setFormData({...formdata, description:e.target.value})}/>
          <Input className="breed" placeholder="Breed" value={formdata.breed} onChange={(e)=>setFormData({...formdata, breed:e.target.value})}/>
          <Button colorScheme={"green"} className="submitBtn" onClick={handleSubmit}>
            Submit
          </Button>
        </FormControl>
      </form>
    </div>
  );
}
