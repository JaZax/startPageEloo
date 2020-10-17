const clock = document.getElementById('clock')
const date  = document.getElementById('date')
const temp  = document.getElementById('temp')
const nick  = document.getElementById('text')

window.onload = async() => {
  updateWeather = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&appid=${config.weather_key}`).then(res => res.json()).then(json => {
          temp.innerHTML = `${Math.floor(((json.main.temp-273.15) * 9/5) + 32)}<span class="dataSpan">°C</span>`
        })
      });
    } else {
      console.log('Geolocation - Not supported by browser.')
    }
  }
  updateClock = () => {
    const time = `${new Date().getHours()}:${new Date().getMinutes()}`
    clock.innerText = time
  }
  updateNick = () => {
    nick.innerHTML = nick.innerHTML.replace(/\[nick\]/, config.nick)
  }
  updateDate = () => {
    date.innerHTML = `${new Date().getDay()} <span class="dataSpan">${new Date().toString().split(' ')[1]}</span>`
  }
  updateClock()
  updateWeather()
  updateNick()
  updateDate()
  setInterval(updateClock, 1000)
  setInterval(updateDate, 1000)
}
