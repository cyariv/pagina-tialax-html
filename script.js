// ========================================
// 🦎 EL MUNDO DE LOS AJOLOTES
// JAVASCRIPT
// ========================================


// ========================================
// 🖼️ CARGAR IMÁGENES
// ========================================

async function cargarImagenes() {

    const imagenes =
        document.querySelectorAll(
            "img[data-wiki]"
        );


    for (const imagen of imagenes) {

        const especie =
            imagen.dataset.wiki;


        try {

            const url =
                "https://es.wikipedia.org/api/rest_v1/page/summary/"
                + encodeURIComponent(especie);


            const respuesta =
                await fetch(url);


            if (!respuesta.ok) {

                throw new Error(
                    "No se encontró la imagen"
                );

            }


            const datos =
                await respuesta.json();


            if (
                datos.thumbnail &&
                datos.thumbnail.source
            ) {

                imagen.src =
                    datos.thumbnail.source;

            } else {

                imagen.src =
                    imagenFallback(especie);

            }


        } catch (error) {

            imagen.src =
                imagenFallback(especie);

        }

    }

}



// ========================================
// 🖼️ IMAGEN DE REEMPLAZO
// ========================================

function imagenFallback(especie) {

    return (
        "https://placehold.co/900x600/"
        + "ffe1ee/"
        + "a83f6d"
        + "?text="
        + encodeURIComponent(especie)
    );

}


cargarImagenes();



// ========================================
// 🔎 BUSCADOR
// ========================================

const buscador =
    document.getElementById(
        "buscador"
    );


const filtro =
    document.getElementById(
        "filtroEstado"
    );


const tarjetas =
    document.querySelectorAll(
        ".species-card"
    );


const contador =
    document.getElementById(
        "contador"
    );


const sinResultados =
    document.getElementById(
        "sinResultados"
    );



function filtrarEspecies() {

    const texto =
        buscador.value
        .toLowerCase()
        .trim();


    const tipo =
        filtro.value;


    let cantidad = 0;


    tarjetas.forEach(
        function(tarjeta) {

            const nombre =
                tarjeta.dataset.name
                .toLowerCase();


            const cientifico =
                tarjeta.dataset.scientific
                .toLowerCase();


            const habitat =
                tarjeta.dataset.habitat
                .toLowerCase();


            const coincideTexto =
                nombre.includes(texto) ||
                cientifico.includes(texto);


            let coincideFiltro =
                true;


            if (tipo !== "todos") {

                coincideFiltro =
                    habitat.includes(tipo);

            }


            const mostrar =
                coincideTexto &&
                coincideFiltro;


            if (mostrar) {

                tarjeta.style.display =
                    "block";

                cantidad++;

            } else {

                tarjeta.style.display =
                    "none";

            }

        }
    );


    if (cantidad === 1) {

        contador.textContent =
            "1 especie encontrada";

    } else {

        contador.textContent =
            cantidad +
            " especies encontradas";

    }


    if (cantidad === 0) {

        sinResultados.hidden =
            false;

    } else {

        sinResultados.hidden =
            true;

    }

}



buscador.addEventListener(
    "input",
    filtrarEspecies
);


filtro.addEventListener(
    "change",
    filtrarEspecies
);



// ========================================
// 🌙 MODO NOCHE
// ========================================

const modoBtn =
    document.getElementById(
        "modoBtn"
    );


const modoGuardado =
    localStorage.getItem(
        "modoAjolotes"
    );


if (modoGuardado === "noche") {

    document.body.classList.add(
        "modo-noche"
    );

    modoBtn.textContent =
        "☀️ Modo claro";

}



modoBtn.addEventListener(
    "click",
    function() {

        document.body.classList.toggle(
            "modo-noche"
        );


        const estaNoche =
            document.body.classList.contains(
                "modo-noche"
            );


        if (estaNoche) {

            modoBtn.textContent =
                "☀️ Modo claro";

            localStorage.setItem(
                "modoAjolotes",
                "noche"
            );

        } else {

            modoBtn.textContent =
                "🌙 Modo noche";

            localStorage.setItem(
                "modoAjolotes",
                "claro"
            );

        }

    }
);



// ========================================
// ⬆️ BOTÓN VOLVER ARRIBA
// ========================================

const arribaBtn =
    document.getElementById(
        "arribaBtn"
    );


window.addEventListener(
    "scroll",
    function() {

        if (window.scrollY > 500) {

            arribaBtn.classList.add(
                "visible"
            );

        } else {

            arribaBtn.classList.remove(
                "visible"
            );

        }

    }
);



arribaBtn.addEventListener(
    "click",
    function() {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }
);



// ========================================
// 🫧 BURBUJAS
// ========================================

function crearBurbuja() {

    const burbuja =
        document.createElement(
            "span"
        );


    const tamaño =
        Math.random() * 18 + 8;


    burbuja.style.position =
        "fixed";


    burbuja.style.bottom =
        "-30px";


    burbuja.style.left =
        Math.random() * 100 +
        "vw";


    burbuja.style.width =
        tamaño + "px";


    burbuja.style.height =
        tamaño + "px";


    burbuja.style.border =
        "2px solid rgba(255,255,255,.7)";


    burbuja.style.borderRadius =
        "50%";


    burbuja.style.pointerEvents =
        "none";


    burbuja.style.zIndex =
        "1";


    const duracion =
        Math.random() * 5 + 5;


    burbuja.animate(

        [

            {
                transform:
                    "translateY(0)",

                opacity: 0

            },

            {

                transform:
                    "translateY(-30vh)",

                opacity: .7

            },

            {

                transform:
                    "translateY(-110vh)",

                opacity: 0

            }

        ],

        {

            duration:
                duracion * 1000,

            easing:
                "linear"

        }

    );


    document.body.appendChild(
        burbuja
    );


    setTimeout(

        function() {

            burbuja.remove();

        },

        duracion * 1000

    );

}


setInterval(
    crearBurbuja,
    900
);



// ========================================
// 🦎 ANIMACIÓN DE TARJETAS
// ========================================

const observador =
    new IntersectionObserver(

        function(entradas) {

            entradas.forEach(
                function(entrada) {

                    if (
                        entrada.isIntersecting
                    ) {

                        entrada.target.style.opacity =
                            "1";

                        entrada.target.style.transform =
                            "translateY(0)";

                        observador.unobserve(
                            entrada.target
                        );

                    }

                }
            );

        },

        {
            threshold: 0.1
        }

    );



tarjetas.forEach(
    function(tarjeta) {

        tarjeta.style.opacity =
            "0";

        tarjeta.style.transform =
            "translateY(25px)";

        tarjeta.style.transition =
            "opacity .6s ease, transform .6s ease";

        observador.observe(
            tarjeta
        );

    }
);
