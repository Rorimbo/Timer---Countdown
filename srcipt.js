// 1. Создание класса для таймера обратного отсчета
class CountdownTimer {
  constructor(deadline, cbChange, cbComplete) {
    this._deadline = deadline;
    this._cbChange = cbChange;
    this._cbComplete = cbComplete;
    this._timerId = null;
    this._out = {
      days: '',
      hours: '',
      minutes: '',
      seconds: '',
      daysTitle: '',
      hoursTitle: '',
      minutesTitle: '',
      secondsTitle: '',
    };
    this._start();
  }

  static declensionNum(num, words) {
    return words[
      num % 100 > 4 && num % 100 < 20
        ? 2
        : [2, 0, 1, 1, 1, 2][num % 10 < 5 ? num % 10 : 5]
    ];
  }

  _start() {
    this._calc();
    this._timerId = setInterval(this._calc.bind(this), 1000);
  }

  _calc() {
    const diff = this._deadline - new Date();
    const days = diff > 0 ? Math.floor(diff / 1000 / 60 / 60 / 24) : 0;
    const hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0;
    const minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
    const seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;
    this._out.days = days < 10 ? '0' + days : days;
    this._out.hours = hours < 10 ? '0' + hours : hours;
    this._out.minutes = minutes < 10 ? '0' + minutes : minutes;
    this._out.seconds = seconds < 10 ? '0' + seconds : seconds;
    this._out.daysTitle = CountdownTimer.declensionNum(days, [
      'день',
      'дня',
      'дней',
    ]);
    this._out.hoursTitle = CountdownTimer.declensionNum(hours, [
      'час',
      'часа',
      'часов',
    ]);
    this._out.minutesTitle = CountdownTimer.declensionNum(minutes, [
      'минута',
      'минуты',
      'минут',
    ]);
    this._out.secondsTitle = CountdownTimer.declensionNum(seconds, [
      'секунда',
      'секунды',
      'секунд',
    ]);
    this._cbChange ? this._cbChange(this._out) : null;
    if (diff <= 0) {
      clearInterval(this._timerId);
      this._cbComplete ? this._cbComplete() : null;
    }
  }
}

// 2. Создание класса для таймера прямого отсчета
class CountupTimer {
  constructor(deadline, cbChange, cbComplete) {
    this._deadline = deadline;
    this._cbChange = cbChange;
    this._cbComplete = cbComplete;
    this._timerId = null;
    this._out = {
      days: '',
      hours: '',
      minutes: '',
      seconds: '',
      daysTitle: '',
      hoursTitle: '',
      minutesTitle: '',
      secondsTitle: '',
    };
    this._start();
  }

  static declensionNum(num, words) {
    return words[
      num % 100 > 4 && num % 100 < 20
        ? 2
        : [2, 0, 1, 1, 1, 2][num % 10 < 5 ? num % 10 : 5]
    ];
  }

  _start() {
    this._calc();
    this._timerId = setInterval(this._calc.bind(this), 1000);
  }

  _calc() {
    const diff = this._deadline - new Date();
    const days = -Math.floor(diff / 1000 / 60 / 60 / 24);
    const hours = -Math.floor(diff / 1000 / 60 / 60) % 24;
    const minutes = -Math.floor(diff / 1000 / 60) % 60;
    const seconds = -Math.floor(diff / 1000) % 60;
    this._out.days = days < 10 ? '0' + days : days;
    this._out.hours = hours < 10 ? '0' + hours : hours;
    this._out.minutes = minutes < 10 ? '0' + minutes : minutes;
    this._out.seconds = seconds < 10 ? '0' + seconds : seconds;
    this._out.daysTitle = CountupTimer.declensionNum(days, [
      'день',
      'дня',
      'дней',
    ]);
    this._out.hoursTitle = CountupTimer.declensionNum(hours, [
      'час',
      'часа',
      'часов',
    ]);
    this._out.minutesTitle = CountupTimer.declensionNum(minutes, [
      'минута',
      'минуты',
      'минут',
    ]);
    this._out.secondsTitle = CountupTimer.declensionNum(seconds, [
      'секунда',
      'секунды',
      'секунд',
    ]);
    this._cbChange ? this._cbChange(this._out) : null;
    if (diff >= 0) {
      clearInterval(this._timerId);
      this._cbComplete ? this._cbComplete() : null;
    }
  }
}

// 1. Элементы в которые выводим оставшееся количество дней, часов, минут и секунд
const elDays1 = document.querySelector('.timer-1 .timer-days');
const elHours1 = document.querySelector('.timer-1 .timer-hours');
const elMinutes1 = document.querySelector('.timer-1 .timer-minutes');
const elSeconds1 = document.querySelector('.timer-1 .timer-seconds');

const elDays2 = document.querySelector('.timer-2 .timer-days');
const elHours2 = document.querySelector('.timer-2 .timer-hours');
const elMinutes2 = document.querySelector('.timer-2 .timer-minutes');
const elSeconds2 = document.querySelector('.timer-2 .timer-seconds');

// 2. Установка времени
const deadline1 = new Date('June 1, 2023 00:00:00');
const deadline2 = new Date('March 1, 2023 00:00:00');

// 3. Создадие нового объекта, используя new CountdownTimer()
new CountdownTimer(
  deadline1,
  (timer) => {
    elDays1.textContent = timer.days;
    elHours1.textContent = timer.hours;
    elMinutes1.textContent = timer.minutes;
    elSeconds1.textContent = timer.seconds;
    elDays1.dataset.title = timer.daysTitle;
    elHours1.dataset.title = timer.hoursTitle;
    elMinutes1.dataset.title = timer.minutesTitle;
    elSeconds1.dataset.title = timer.secondsTitle;
  },
  () => {
    document.querySelector('.timer-1 .timer-result').textContent =
      'Таймер завершился!';
  }
);

// 4. Создадие нового объекта, используя new CountupTimer()
new CountupTimer(
  deadline2,
  (timer) => {
    elDays2.textContent = timer.days;
    elHours2.textContent = timer.hours;
    elMinutes2.textContent = timer.minutes;
    elSeconds2.textContent = timer.seconds;
    elDays2.dataset.title = timer.daysTitle;
    elHours2.dataset.title = timer.hoursTitle;
    elMinutes2.dataset.title = timer.minutesTitle;
    elSeconds2.dataset.title = timer.secondsTitle;
  },
  () => {
    document.querySelector('.timer-2 .timer-result').textContent =
      'Таймер завершился!';
  }
);
