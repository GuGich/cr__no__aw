console.log("JS загружен");

document.addEventListener("DOMContentLoaded", () => {

  const scrollHint = document.querySelector(".scroll-hint");

  if (!scrollHint) return;

  scrollHint.addEventListener("click", () => {

    scrollHint.classList.add("hidden");

  });

});


const historySlides = document.querySelectorAll('.history-slide');
const historyCurrent = document.getElementById('historyCurrent');

let historyIndex = 0;

function showHistory(index){

  historySlides[historyIndex].classList.remove('active');

  historyIndex = (index + historySlides.length) % historySlides.length;

  historySlides[historyIndex].classList.add('active');

  historyCurrent.textContent =
    historySlides[historyIndex].dataset.year;

}

document.getElementById('historyPrev').addEventListener('click', () => {
  showHistory(historyIndex - 1);
});

document.getElementById('historyNext').addEventListener('click', () => {
  showHistory(historyIndex + 1);
});

const TARGET_DATE = new Date('2026-11-20T18:00:00+03:00');
document.getElementById('cd-caption').textContent = 'До закрытия заявок';

function pad(n){ return String(n).padStart(2,'0'); }
function tick(){
    const now = new Date();
    let diff = TARGET_DATE - now;
    if(diff < 0) diff = 0;
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    document.getElementById('cd-days').textContent  = pad(d);
    document.getElementById('cd-hours').textContent = pad(h);
    document.getElementById('cd-mins').textContent  = pad(m);
    document.getElementById('cd-secs').textContent  = pad(s);
    if(diff <= 0){ document.getElementById('cd-caption').textContent = 'Голосование завершено'; }
}
tick();
setInterval(tick, 1000);

document.querySelectorAll('.facts-tab').forEach(function(tab){
    tab.addEventListener('click', function(){
      const key = tab.getAttribute('data-tab');
      document.querySelectorAll('.facts-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.facts-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.querySelector('.facts-panel[data-panel="'+key+'"]').classList.add('active');
  });
});

document.querySelectorAll('.nom-card').forEach(function(card){
    card.addEventListener('click', function(){
      const wasOpen = card.classList.contains('open');
      card.classList.toggle('open');
      card.querySelector('.nom-toggle').textContent = wasOpen ? 'Показать номинантов ↓' : 'Скрыть ↑';
    });
});

document.querySelectorAll('.year-tab').forEach(function(tab){
    tab.addEventListener('click', function(){
      const key = tab.getAttribute('data-year');
      document.querySelectorAll('.year-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.year-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.querySelector('.year-panel[data-panel="'+key+'"]').classList.add('active');
    });
});

document.querySelectorAll('.faq-item').forEach(function(item){
      item.querySelector('.faq-q').addEventListener('click', function(){
        const wasOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
        if(!wasOpen) item.classList.add('open');
      });
});