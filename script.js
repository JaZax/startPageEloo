const clock = document.getElementById('clock')
const date  = document.getElementById('date')
const temp  = document.getElementById('temp')
const nick  = document.getElementById('text')
const dates = { "1": "Jan", "2": "Feb", "3": "Mar", "4": "Apr", "5": "May", "6": "Jun", "7": "Jul", "8": "Aug", "9": "Sep", "10": "Oct", "11": "Nov", "12": "Dec" }

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
    date.innerHTML = `${new Date().getDay()} <span class="dataSpan">${dates[new Date().getMonth()]}</span>`
  }
  updateClock()
  updateWeather()
  updateNick()
  updateDate()
  setInterval(updateClock, 1000)
  //setInterval(updateWeather, 1000)
  setInterval(updateDate, 1000)
}