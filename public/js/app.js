const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const weatherImage = document.querySelector('#weatherImage')

weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    const location = search.value
    messageOne.textContent = 'Loading....'
    messageTwo.textContent = ''
    weatherImage.src = ""
    fetch('/weather?address='+location).then((response)=>{
       response.json().then((data)=>{
            if(data.error)
            {
                messageOne.textContent = data.error
            }
            else
            {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
                weatherImage.src = data.icon
            }
            
       })
})

})