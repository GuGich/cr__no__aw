// ==============================
// LANGUAGE SWITCHER
// ==============================

const languageSwitcher = document.querySelector(".language-switcher");
const languageButton = document.querySelector(".language-current");
const languageButtons = document.querySelectorAll("[data-lang]");


// Открытие меню
if (languageButton) {

    languageButton.addEventListener("click", (e) => {

        e.stopPropagation();

        languageSwitcher.classList.toggle("open");

    });

}


// Закрытие при клике вне меню
document.addEventListener("click", () => {

    if (languageSwitcher) {
        languageSwitcher.classList.remove("open");
    }

});


// Выбор языка
languageButtons.forEach(button => {

    button.addEventListener("click", () => {

        const lang = button.dataset.lang;
        const flag = button.dataset.flag;


        // меняем главный флаг
        const currentFlag = languageButton.querySelector("img");

        if(currentFlag){
            currentFlag.src = flag;
        }


        // сохраняем язык
        localStorage.setItem(
            "language",
            lang
        );


        // закрываем меню
        languageSwitcher.classList.remove("open");


        // применяем перевод
        changeLanguage(lang);

    });

});


// ==============================
// LOAD SAVED LANGUAGE
// ==============================


const savedLanguage =
    localStorage.getItem("language") || "ru";


const savedButton =
    document.querySelector(
        `[data-lang="${savedLanguage}"]`
    );


if(savedButton){

    const currentFlag =
        languageButton.querySelector("img");


    if(currentFlag){

        currentFlag.src =
            savedButton.dataset.flag;

    }

}


// запуск при загрузке
changeLanguage(savedLanguage);




// ==============================
// TRANSLATION SYSTEM
// ==============================


function changeLanguage(lang){


    // 1. Ручные переводы

    document
    .querySelectorAll("[data-i18n]")
    .forEach(element => {


        const key =
            element.dataset.i18n;


        if(
            translations[lang] &&
            translations[lang][key]
        ){

            element.textContent =
                translations[lang][key];

        }


    });



    // 2. Автоматический перевод

    if(lang !== "ru"){

        // autoTranslatePage(lang);

    }


}




// ==============================
// AUTO TRANSLATION
// ==============================


async function autoTranslatePage(lang){


    const elements = [];


    document
    .querySelectorAll("body *")
    .forEach(element => {


        // только текстовые элементы

        if(
            element.children.length === 0 &&
            element.textContent.trim() &&
            !element.closest(".language-switcher") &&
            !element.dataset.i18n
        ){

            elements.push(element);

        }


    });



    for(const element of elements){


        const original =
            element.textContent.trim();


        try {


            const translated =
                await translateText(
                    original,
                    lang
                );


            if(translated){

                element.textContent =
                    translated;

            }


        }

        catch(error){

            console.log(
                "Translation error:",
                error
            );

        }


    }


}




// ==============================
// SEND TO CLOUDFLARE WORKER
// ==============================


async function translateText(text, lang){


    const response =
        await fetch(
            "https://translate.creativeawards.fun/translate",
            {

                method:"POST",

                headers:{
                    "Content-Type":"application/json"
                },


                body:JSON.stringify({

                    text:text,

                    lang:lang

                })

            }
        );



    const data =
        await response.json();



    return data.translation;


}