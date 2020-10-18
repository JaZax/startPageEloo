window.onload = async() => {
  const clock = document.getElementById('clock')
  const date  = document.getElementById('date')
  const temp  = document.getElementById('temp')
  const nick  = document.getElementById('text')
  const search= document.getElementById('searchbox')
  let nickname= await localStorage.getItem('nick')
  let api_key = await localStorage.getItem('api-key')

  nickname ? nickname: 'guest'
  api_key  ? api_key: '0'
  
  if (!api_key) {
    const api_key = await prompt('Please provide weather api key from: https://openweathermap.com/api or 0')
    const nickname = await prompt('Please provide your nickname')
    localStorage.setItem('api-key', api_key)
    localStorage.setItem('nick', nickname)
    location.reload()
  }
  updateWeather = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&appid=${api_key}`).then(res => res.json()).then(json => {
          temp.innerHTML = `${Math.floor(((((json.main.temp-273.15) * 9/5) + 32) - 32) * 5/9)}<span class="dataSpan">°C</span>`
        })
      });
    } else {
      console.log('Geolocation - Not supported by browser.')
    }
  }
  updateClock = () => {
    const date = new Date()
    const time = `${date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}`
    clock.innerText = time
  }
  updateNick = () => nick.innerHTML = nick.innerHTML.replace(/\[nick\]/, nickname)
  updateDate = () => {
    const dat = new Date()
    date.innerHTML = `${dat.toString().split(' ')[2]} <span class="dataSpan">${dat.toString().split(' ')[1]}</span>`
  }
  search.addEventListener('keydown', (e) => e.key == 'Enter'? location.replace(`https://duckduckgo.com/?q=${search.value}`): '')
  updateClock()
  updateWeather()
  updateNick()
  updateDate()
  setInterval(updateClock, 1000)
  setInterval(updateDate, 1000)
}
