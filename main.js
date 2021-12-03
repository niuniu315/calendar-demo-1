function render(time) {
  const year = time.getFullYear();
  const month = time.getMonth() + 1

  initTime()
  createDays()
  now = time

  function initTime() {
    const time = g('#time')
    time.textContent = `${year}年${month}月`
  }

  function selectedli() {
    li.onclick = () => {
      if (selectedLi) {
        selectedLi.classList.remove("dayStyle-selected")
      }
      li.classList.add("dayStyle-selected")
      selectedLi = li
    }
  }

  function createDays() {
    const 月初 = new Date(year, month - 1, 1)
    const 月初星期几 = 月初.getDay()
    const 月末 = new Date(new Date(year, month - 1 + 1, 1) - 86400 * 1000)
    const 月末几号 = 月末.getDate()
    const 月末星期几 = 月末.getDay()
    const 这个月多少天 = 月末几号
    const liList = []
    const days = g('#days')
    days.innerHTML = ""
// 展示这个月初前面的天数
    let n = 0
    for (let i = 1; i < 月初星期几; i++) {
      const li = document.createElement('li')
      const d = new Date(月初 - 86400 * 1000 * i)
      li.textContent = d.getDate()
      li.onclick = () => {
        if (selectedLi) {
          selectedLi.classList.remove("dayStyle-selected")
        }
        li.classList.add("dayStyle-selected")
        selectedLi = li
      }
      days.prepend(li)
      li.classList.add("gray-dayStyle")
      n += 1
    }
// 展示这个月的天数
    const now = new Date()
    let selectedLi
    for (let i = 1; i <= 这个月多少天; i++) {
      const li = document.createElement('li')
      li.textContent = i
      if (i === now.getDate() && month === now.getMonth() + 1 && year === now.getFullYear()) {
        li.classList.add("dayStyle-today")
      }
      li.onclick = () => {
        if (selectedLi) {
          selectedLi.classList.remove("dayStyle-selected")
        }
        li.classList.add("dayStyle-selected")
        selectedLi = li
      }
      days.append(li)
      n += 1
    }
// 展示这个月末后面的天数
    let i = 月末星期几 + 1
    for (let j = 0; j < 42 - n; j++) {
      const solt = i - 月末星期几
      const li = document.createElement('li')
      const d = new Date(月末 - 0 + 86400 * 1000 * solt)
      li.textContent = d.getDate()
      li.onclick = () => {
        if (selectedLi) {
          selectedLi.classList.remove("dayStyle-selected")
        }
        li.classList.add("dayStyle-selected")
        selectedLi = li
      }
      days.append(li)
      li.classList.add("gray-dayStyle")
      i++
    }
  }
}

let now = new Date();
render(now)

g('#lastMonth').onclick = () => {
  const 月初 = new Date(now.getFullYear(), now.getMonth(), 1)
  render(new Date(月初 - 86400 * 1000))
}
g('#nextMonth').onclick = () => {
  const 下月初 = new Date(now.getFullYear(), now.getMonth() + 1, 1)
  render(下月初)
}
g('#today').onclick = () => {
  render(new Date())
}

function g(selector) {
  return document.querySelector(selector)
}

function gs(selector) {
  return document.querySelectorAll(selector)
}
