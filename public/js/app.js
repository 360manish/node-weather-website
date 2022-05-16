
const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
let messageOne=document.querySelector('#message-1')
let messageTwo=document.querySelector('#message-2')

// messageOne.textContent='From Javascript'

weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault()

    const location=search.value
    
    messageOne.textContent='loading...'
    messageTwo.textContent=''

    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent=''
            return messageTwo.textContent=data.error
        }
        messageOne.textContent=data.location
        messageTwo.textContent=data.forecast
    })
})
})
