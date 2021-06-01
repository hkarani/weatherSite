const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
        // console.log(location)
    messageOne.textContent = 'Loading....'
    messageTwo.textContent = ''


    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                // console.log(data.error)
                messageOne.textContent = data.error
            } else {

                messageOne.textContent = data.loc
                messageTwo.textContent = `${data.forc.weather}, ${data.forc.temperature} degrees, feels like ${data.forc.feelslike}`
            }
            // console.log(data.forc)
            // console.log(data.loc)

        })
    })
})