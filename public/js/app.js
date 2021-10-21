
const weatherForm = document.querySelector('form')
const input = document.querySelector('input')
let p1 = document.getElementById('p1')
let p2 = document.getElementById('p2')

console.log(p1);
console.log(weatherForm);

weatherForm.addEventListener('submit' , (event) => {
     event.preventDefault()
     let location = input.value
     p1.innerText = "Loading...."
     p2.innerText = ""

     fetch(`/weather?address=${location}`).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    p1.textContent = "Not Found"
                    p2.textContent = data.error
                }else{
                   
                   p2.innerText = data.forecast
                   p1.innerText =  data.location
                }
                
            })
        }) 
     


})