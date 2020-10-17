const clock = document.getElementById('clock')
const date  = document.getElementById('date')
const temp  = document.getElementById('temp')
const nick  = document.getElementById('text')

window.onload = async() => {
  if (!localStorage.getItem('api-key') || !localStorage.getItem('nick')) {
    const api_key = await prompt('Please provide weather api key from: https://openweathermap.com/api')
    const nickname = await prompt('Please provide your nickname')
    localStorage.setItem('api-key', api_key)
    localStorage.setItem('nick', nickname)
  }

  const nickname = await localStorage.getItem('nick')
  const api_key  = await localStorage.getItem('api-key')

  updateWeather = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&appid=${api_key}`).then(res => res.json()).then(json => {
          temp.innerHTML = `${Math.floor(((json.main.temp-273.15) * 9/5) + 32)}<span class="dataSpan">°C</span>`
        })
      });
    } else {
      console.log('Geolocation - Not supported by browser.')
    }
  }
  updateClock = () => {
    const time = `${new Date().getHours() < 10 ? `0${new Date().getHours()}` : new Date().getHours()}:${new Date().getMinutes() < 10 ? `0${new Date().getMinutes()}` : new Date().getMinutes()}`
    clock.innerText = time
  }
  updateNick = () => {
    nick.innerHTML = nick.innerHTML.replace(/\[nick\]/, nickname)
  }
  updateDate = () => {
    date.innerHTML = `${new Date().toString().split(' ')[2]} <span class="dataSpan">${new Date().toString().split(' ')[1]}</span>`
  }
  updateClock()
  updateWeather()
  updateNick()
  updateDate()
  setInterval(updateClock, 1000)
  setInterval(updateDate, 1000)
}
