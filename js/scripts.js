/**
 * Encripta el texto según el diccionario proporcionado.
 * Muestra advertencia si el texto tiene caracteres no permitidos.
 * 
 * @param {Object} codificacion - Diccionario de sustitución para letras.
 */
function codificarTexto(codificacion) {
    const advertencia = document.querySelector("#warning");
    advertencia.removeAttribute("style");

    const entradaTexto = document.querySelector("#texto");
    const textoIngresado = entradaTexto.value;
    const areaOriginal = document.querySelector("#default");
    const areaResultado = document.querySelector("#result");
    const salidaTexto = document.querySelector("#texto_out");

    if (textoIngresado === "") {
        alert("Por favor, ingrese el texto que desea encriptar.");
        return;
    }

    if (textoIngresado) {
        let textoCodificado = "";

        for (let char of textoIngresado) {
            if (!/^[a-z\s]*$/.test(char)) {
                advertencia.style.color = "red";
                advertencia.style.fontSize = "16px";
                return;
            } else if (/^\s*$/.test(textoIngresado)) {
                areaOriginal.classList.remove("invisible");
                areaResultado.classList.add("invisible");
                return;
            }

            textoCodificado += codificacion[char] || char;
        }

        areaOriginal.classList.add("invisible");
        areaResultado.classList.remove("invisible");
        salidaTexto.innerHTML = textoCodificado;
    }
}

/**
 * Desencripta el texto según el diccionario proporcionado.
 * Muestra advertencia si el texto tiene caracteres no permitidos.
 * 
 * @param {Object} codificacion - Diccionario de sustitución para letras.
 */
function decodificarTexto(codificacion) {
    const advertencia = document.querySelector("#warning");
    advertencia.removeAttribute("style");

    const entradaTexto = document.querySelector("#texto");
    let textoIngresado = entradaTexto.value;
    const areaOriginal = document.querySelector("#default");
    const areaResultado = document.querySelector("#result");
    const salidaTexto = document.querySelector("#texto_out");


    if (textoIngresado === "") {
        alert("Por favor, ingrese el texto que desea desencriptar.");
        return;
    }

    if (textoIngresado) {
        if (!/^[a-z\s]*$/.test(textoIngresado)) {
            advertencia.style.color = "red";
            advertencia.style.fontSize = "16px";
            return;
        } else if (/^\s*$/.test(textoIngresado)) {
            areaOriginal.classList.remove("invisible");
            areaResultado.classList.add("invisible");
            return;
        }

        // Desencripta el texto
        for (let [letra, sustitucion] of Object.entries(codificacion)) {
            const regex = new RegExp(sustitucion, "g");
            textoIngresado = textoIngresado.replace(regex, letra);
        }

        areaOriginal.classList.add("invisible");
        areaResultado.classList.remove("invisible");
        salidaTexto.innerHTML = textoIngresado;
    }
}

/**
 * Copia el texto del área de salida al portapapeles.
 */
function copiarAlPortapapeles() {
    const salidaTexto = document.querySelector("#texto_out");
    navigator.clipboard.writeText(salidaTexto.value);
}

// Asocia eventos a los botones
const botonCodificar = document.querySelector('#enc');
const botonDecodificar = document.querySelector('#des');
const botonCopiar = document.querySelector('#copiar');

const diccionarioCodificacion = {"a": "ai", "e": "enter", "i": "imes", "o": "ober", "u": "ufat"};

botonCodificar.addEventListener('click', () => codificarTexto(diccionarioCodificacion));
botonDecodificar.addEventListener('click', () => decodificarTexto(diccionarioCodificacion));
botonCopiar.addEventListener('click', copiarAlPortapapeles);
