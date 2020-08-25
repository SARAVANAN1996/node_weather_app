console.log('pubic app.js javascript')

const formSelector = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('.message-1')
const messageTwo = document.querySelector('.message-2')
const icon = document.querySelector('img')

formSelector.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    messageOne.textContent = 'Loading..'
    messageTwo.textContent = ''
    icon.src = ''

    fetch('http://localhost:3000/weather?location='+location).then((response)=>{
        response.json().then((data)=>{
            console.log(data)
            messageOne.textContent = 'It is '+data.description
            messageTwo.textContent = 'The Temperature is '+data.temperature
            icon.src = data.icon
        })
    })
})