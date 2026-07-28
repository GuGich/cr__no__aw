console.log("JS загружен");


document.addEventListener("DOMContentLoaded", () => {


    // Скролл подсказка на главной
    const scrollHint = document.querySelector(".scroll-hint");

    if (scrollHint) {

        scrollHint.addEventListener("click", () => {
            scrollHint.classList.add("hidden");
        });

    }



    // История Creative Awards

    const historySlides = document.querySelectorAll('.history-slide');
    const historyCurrent = document.getElementById('historyCurrent');
    const historyPrev = document.getElementById('historyPrev');
    const historyNext = document.getElementById('historyNext');


    if (
        historySlides.length &&
        historyCurrent &&
        historyPrev &&
        historyNext
    ) {

        let historyIndex = 0;


        function showHistory(index){

            historySlides[historyIndex].classList.remove('active');


            historyIndex =
                (index + historySlides.length) % historySlides.length;


            historySlides[historyIndex].classList.add('active');


            historyCurrent.textContent =
                historySlides[historyIndex].dataset.year;

        }


        historyPrev.addEventListener("click", () => {
            showHistory(historyIndex - 1);
        });


        historyNext.addEventListener("click", () => {
            showHistory(historyIndex + 1);
        });

    }




    // Таймер обратного отсчёта

    const cdCaption = document.getElementById('cd-caption');
    const cdDays = document.getElementById('cd-days');
    const cdHours = document.getElementById('cd-hours');
    const cdMins = document.getElementById('cd-mins');
    const cdSecs = document.getElementById('cd-secs');


    if (
        cdCaption &&
        cdDays &&
        cdHours &&
        cdMins &&
        cdSecs
    ) {


        const TARGET_DATE =
            new Date('2026-11-20T18:00:00+03:00');


        cdCaption.textContent =
            'До закрытия заявок';



        function pad(n){
            return String(n).padStart(2,'0');
        }



        function tick(){

            const now = new Date();

            let diff =
                TARGET_DATE - now;


            if(diff < 0)
                diff = 0;



            const d =
                Math.floor(diff / 86400000);


            const h =
                Math.floor((diff % 86400000) / 3600000);


            const m =
                Math.floor((diff % 3600000) / 60000);


            const s =
                Math.floor((diff % 60000) / 1000);



            cdDays.textContent = pad(d);
            cdHours.textContent = pad(h);
            cdMins.textContent = pad(m);
            cdSecs.textContent = pad(s);



            if(diff <= 0){

                cdCaption.textContent =
                    'Голосование завершено';

            }

        }


        tick();

        setInterval(tick, 1000);

    }




    // Вкладки фактов

    const factsTabs =
        document.querySelectorAll('.facts-tab');


    if(factsTabs.length){

        factsTabs.forEach(function(tab){

            tab.addEventListener('click', function(){

                const key =
                    tab.getAttribute('data-tab');


                document
                    .querySelectorAll('.facts-tab')
                    .forEach(t =>
                        t.classList.remove('active')
                    );


                document
                    .querySelectorAll('.facts-panel')
                    .forEach(p =>
                        p.classList.remove('active')
                    );


                tab.classList.add('active');


                const panel =
                    document.querySelector(
                        '.facts-panel[data-panel="' + key + '"]'
                    );


                if(panel)
                    panel.classList.add('active');

            });

        });

    }




    // Карточки номинаций

    const nomCards =
        document.querySelectorAll('.nom-card');


    if(nomCards.length){

        nomCards.forEach(function(card){

            const toggle =
                card.querySelector('.nom-toggle');


            card.addEventListener('click', function(){

                const wasOpen =
                    card.classList.contains('open');


                card.classList.toggle('open');


                if(toggle){

                    toggle.textContent =
                        wasOpen
                        ? 'Показать номинантов ↓'
                        : 'Скрыть ↑';

                }

            });

        });

    }




    // Вкладки годов

    const yearTabs =
        document.querySelectorAll('.year-tab');


    if(yearTabs.length){

        yearTabs.forEach(function(tab){

            tab.addEventListener('click', function(){

                const key =
                    tab.dataset.year;


                document
                    .querySelectorAll('.year-tab')
                    .forEach(t =>
                        t.classList.remove('active')
                    );


                document
                    .querySelectorAll('.year-panel')
                    .forEach(p =>
                        p.classList.remove('active')
                    );


                tab.classList.add('active');


                const panel =
                    document.querySelector(
                        '.year-panel[data-panel="' + key + '"]'
                    );


                if(panel)
                    panel.classList.add('active');

            });

        });

    }




    // FAQ

    const faqItems =
        document.querySelectorAll('.faq-item');


    if(faqItems.length){

        faqItems.forEach(function(item){

            const question =
                item.querySelector('.faq-q');


            if(question){

                question.addEventListener('click', function(){

                    const wasOpen =
                        item.classList.contains('open');


                    faqItems.forEach(i =>
                        i.classList.remove('open')
                    );


                    if(!wasOpen)
                        item.classList.add('open');

                });

            }

        });

    }


    const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll",()=>{

if(window.scrollY > 500)
    topBtn.classList.add("show");
else
    topBtn.classList.remove("show");

});


topBtn.onclick=()=>{

window.scrollTo({
top:0,
behavior:"smooth"
});

};

// Переходы между страницами

document.querySelectorAll("a").forEach(link => {


    const url = link.getAttribute("href");


    if(
        !url ||
        url.startsWith("#") ||
        url.startsWith("http") ||
        link.target === "_blank"
    )
        return;



    link.addEventListener("click", e => {

        e.preventDefault();


        document.body.style.animation =
        "pageLeave .4s forwards";


        setTimeout(()=>{

            window.location.href = url;

        },400);


    });


});

});