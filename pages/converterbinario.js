import { useEffect } from "react";

export default function ConverterBinario() {
    function setInputFilter(textbox, inputFilter) {
        [
            "input",
            "keydown",
            "keyup",
            "mousedown",
            "mouseup",
            "select",
            "contextmenu",
            "drop",
        ].forEach(function (event) {
            textbox.addEventListener(event, function () {
                if (inputFilter(this.value)) {
                    this.oldValue = this.value;
                    this.oldSelectionStart = this.selectionStart;
                    this.oldSelectionEnd = this.selectionEnd;
                } else if (this.hasOwnProperty("oldValue")) {
                    this.value = this.oldValue;
                    this.setSelectionRange(
                        this.oldSelectionStart,
                        this.oldSelectionEnd
                    );
                } else {
                    this.value = "";
                }
            });
        });
    }

    useEffect(() => {
        setInputFilter(
            document.getElementById("numerosBinario"),
            function (value) {
                return /\b[01]+\b/.test(value);
            }
        );
    }, []);
    const ok = async (e) => {
        e.preventDefault();
        var { numBinario } = e.target;
        let bin = numBinario.value;
        let dec = 0;
        for (let c = 0; c < bin.length; c++)
            dec += Math.pow(2, c) * bin[bin.length - c - 1]; //calcula para pegar do último ao primeiro
        document.getElementById("resultado").innerHTML = dec;
    };
    return (
        <>
            <h1>Conversão número binário para decimal</h1>
            <form onSubmit={ok}>
                <input
                    type="text"
                    id="numerosBinario"
                    name="numBinario"
                    placeholder="Número em binário"
                />
                <button type="submit">OK</button>
            </form>
            Resultado: <span id="resultado"></span>
        </>
    );
}
