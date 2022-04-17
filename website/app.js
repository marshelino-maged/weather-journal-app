/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();
let baseURL = "http://api.openweathermap.org/data/2.5/forecast?zip=";
const apiKey = "&appid=bee3bf85c8737c7dde254804379c25e7&units=metric";



document.querySelector("#generate").addEventListener("click" , action);

function action() {
    const zipCode = document.querySelector('#zip').value;
    const feelings = document.querySelector("#feelings").value;
    getWeather(baseURL,zipCode,apiKey)

        .then(function(data){
            console.log(data);
            postData('/add' , {date: newDate , temp: data.list[0].main.temp, content: feelings})
            updateUI();
        })
    
};

async function getWeather(baseURL,zip,key) {
    const res = await fetch(baseURL+zip+key)
    try {
        const data = await res.json();
        return data;
    }catch(error) {
        console.log("error" , error);
    }
    
}

const postData = async (url = '', data = {})=>{
    console.log(data);
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers:{
            'Content-Type':'application/json',
        },
        body: JSON.stringify(data)
    });

    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    }catch(error) {
        console.log("error",error);
    }

}
const updateUI = async()=>{
    const request = await fetch('/all')
    try{
    const allData = await request.json();
    console.log(allData)
    document.getElementById('date').innerHTML =`Date: ${allData.date}`;
    document.getElementById('temp').innerHTML = `Temperature: ${allData.temp} C`;
    document.getElementById('content').innerHTML = `I feel: ${allData.content}`;
    }catch(err){
    console.log('error',err);
    }
    }
    


