console.log("JS загружен");


document.addEventListener("DOMContentLoaded", () => {


// CREATIVE AWARDS LOADER

const loader = document.querySelector(".ca-loader");

if(loader){

    if(sessionStorage.getItem("caVisited")){

        loader.remove();

    } else {


        sessionStorage.setItem("caVisited", "true");


        setTimeout(()=>{

            loader.classList.add("hide");


            setTimeout(()=>{

                loader.remove();

            },700);


        },1500);

    }

}

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
            new Date('2026-11-16T18:00:00+03:00');


        cdCaption.textContent =
            'До закрытия заявок (16 ноября 18:00 по МСК)';



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


// Кнопка наверх

const toTop = document.getElementById("toTop");


if(toTop){

    window.addEventListener("scroll", ()=>{


        if(window.scrollY > 600){

            toTop.classList.add("show");

        } else {

            toTop.classList.remove("show");

        }


    });



    toTop.addEventListener("click", ()=>{

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

        showToast("↑ Вы вернулись наверх");

    });

}


function showToast(text){

    let toast = document.querySelector(".ca-toast");


    if(!toast){

        toast = document.createElement("div");

        toast.className = "ca-toast";

        document.body.appendChild(toast);

    }


    toast.textContent = text;


    clearTimeout(toast.timer);


    toast.classList.add("show");


    toast.timer = setTimeout(()=>{

        toast.classList.remove("show");

    },4000);

}


function normalizePage(path){

    path = path.replace(/\/$/, "");

    if(path === "" || path === "/"){
        return "/";
    }

    if(path.endsWith("/index.html")){
        return "/";
    }

    return path;

}

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


        const current = normalizePage(window.location.pathname);
        const target = normalizePage(new URL(url, location.href).pathname);


        if(current === target){

            e.preventDefault();

            showToast("✓ Вы уже находитесь на этой странице");

            return;

        }


        e.preventDefault();


        document.body.style.animation =
        "pageLeave .4s forwards";


        setTimeout(()=>{

            window.location.href = url;

        },400);


    });

});

/* ==========================
   ПРОВЕРКА СТАТУСА ЗАЯВКИ
========================== */

const checkButton = document.getElementById("checkButton");

if (checkButton) {


checkButton.addEventListener("click", async ()=>{


const id =
document
.getElementById("applicationId")
.value
.trim()
.toUpperCase();


const resultBox =
document.getElementById("checkResult");


if(!id){

resultBox.innerHTML = `
<div class="status-error">
❌ Введите ID заявки.
</div>
`;

return;

}


resultBox.innerHTML = `
<div class="status-pending">
🔎 Проверяем заявку...
</div>
`;


try{


const response = await fetch(
"https://auth.creativeawards.fun/check?id="
+ encodeURIComponent(id)
);


const data = await response.json();


if(!data.found){

resultBox.innerHTML = `
<div class="status-error">
❌ Заявка не найдена.
</div>
`;

return;

}



let html = "";


if(data.status === "В проверке"){

html = `
<div class="status-pending">
🟡 Заявка находится на рассмотрении.
</div>
`;

}


else if(data.status === "Принята"){

html = `
<div class="status-success">
🟢 Игра допущена к участию.
</div>
`;

}


else if(data.status === "Отклонена"){

html = `
<div class="status-error">
🔴 Игра не допущена к участию.

<br><br>

<b>Причина:</b><br>
${data.decision || "Не указана"}

</div>
`;

}


resultBox.innerHTML = html;


}

catch{

resultBox.innerHTML = `
<div class="status-error">
❌ Ошибка проверки.
</div>
`;

}


});


}




/* ==========================
   ПОДАЧА ЗАЯВКИ
========================= */


const applyForm =
document.getElementById("applyForm");


if(applyForm){


applyForm.addEventListener("submit", async function(e){


e.preventDefault();


const genres = [];


document
.querySelectorAll(".genres input:checked")
.forEach(el =>
genres.push(el.value)
);



if(genres.length === 0){

document
.getElementById("applyResult")
.innerHTML = `

<div class="status-error">
❌ Выберите хотя бы один жанр.
</div>

`;

return;

}



const button =
applyForm.querySelector("button");


button.disabled = true;
button.innerText = "Отправка...";



const body = {

game:
document.getElementById("gameName").value.trim(),

authors:
document.getElementById("authors").value.trim(),

ad:
document.getElementById("ad").value.trim(),

releaseDate:
document.getElementById("releaseDate").value,

genres:genres

};


try{


const response = await fetch(
"https://auth.creativeawards.fun/apply",
{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:
JSON.stringify(body)

});


const result =
await response.json();



if(result.success){


let applications =
JSON.parse(
localStorage.getItem("applications") || "[]"
);


applications.push(result.id);


localStorage.setItem(
"applications",
JSON.stringify(applications)
);



document.getElementById("applyResult").innerHTML = `

<div class="status-success">

🟢 Заявка успешно отправлена.

<br><br>

<b>ID заявки:</b><br>

${result.id}

<br><br>

ID сохранён в браузере.

</div>

`;


applyForm.reset();


}

else{


document.getElementById("applyResult").innerHTML = `

<div class="status-error">

❌ ${result.message}

</div>

`;

}


}

catch{


document.getElementById("applyResult").innerHTML = `

<div class="status-error">

❌ Ошибка отправки.

</div>

`;

}



button.disabled = false;
button.innerText = "Отправить заявку";


});


}





/* ==========================
   МОИ СОХРАНЁННЫЕ ЗАЯВКИ
========================== */


async function loadApplications(){


const box =
document.getElementById("myApplications");


if(!box)
return;



const applications =
JSON.parse(
localStorage.getItem("applications") || "[]"
);



if(applications.length === 0){

box.innerHTML = `

<div class="status-pending">

У вас нет сохранённых заявок.

</div>

`;

return;

}



let html = "";



for(const id of applications){


try{


const response =
await fetch(
"https://auth.creativeawards.fun/check?id="
+ encodeURIComponent(id)
);



const data =
await response.json();



let statusClass =
"status-pending";


if(data.status === "Принята")
statusClass =
"status-success";


if(data.status === "Отклонена")
statusClass =
"status-error";



html += `

<div class="${statusClass}">

<b>${id}</b>

<br><br>

${data.status || "Неизвестно"}

${
data.status === "Отклонена"

?

`
<br><br>
<b>Причина:</b><br>
${data.decision || "Не указана"}
`

:

""

}

</div>

<br>

`;


}

catch{


html += `

<div class="status-error">

${id}

<br>

Ошибка проверки.

</div>

`;

}


}


box.innerHTML = html;


}



loadApplications();



});