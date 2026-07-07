import { createAgent, tool } from "langchain";
import "dotenv/config"
import z from "zod";

//20-30{city : "Newyork"}
// best quote for coverage maximum 

const getWeather = tool( (input)=> {
    //${input.city} -by getting weather  - returned Sunny
    return `Its  sunny in ${input.city} `
    } ,
    {
        name : "get_weather",
        description : "Get the weather for a given city",
        schema : z.object({
            city : z.string()
            
        })
    }
);

 const getTime = tool( (input)=>{
    return `The current time in ${input.city} is 3:00PM`
 }, 
    {
        name : "get_time",
        description : "Get current time for a given city",
        schema : z.object({
            city :z.string()
        })
    }
 )

const agent = createAgent(
    {model :"claude-sonnet-4-5-20250929",
     tools: [getWeather,getTime]
     },



    );

const response = await agent.invoke({
   // messages : [{role : "user",content: "What is weather in newyork?"}]
  //  messages : [{role : "user",content: "What is time in newyork?"}]
     messages : [{role : "user",content: "What is weather & time in newyork?"}]
});
console.log(response);
// const longMessage = response.messages[response.messages.length-1].content
// console.log(longMessage);
