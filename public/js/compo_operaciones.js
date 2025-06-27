class CalculadoraBasica extends HTMLElement{
// aqui vamos a manipular el DOM
// creamos un constructor para la parte estetica.
constructor(){
    super();
    this.attachShadow({ mode: 'open' });

this.shadowRoot.innerHTML = `
    <link rel="stylesheet" href="public/lib/bootstrap/css/bootstrap.min.css">

<div class="container mt-2">
  <div class="card p-4 shadow w-50 mx-auto">
    <h3 class="text-center mb-4">Calculadora Básica</h3>
    
    <div class="mb-3">
      <label for="Numero1" class="form-label">Ingrese el primer número</label>
      <input type="number" class="form-control" id="Numero1">
    </div>
    
    <div class="mb-3">
      <label for="Numero2" class="form-label">Ingrese el segundo número</label>
      <input type="number" class="form-control" id="Numero2">
    </div>
    
    <div class="mb-3">
      <select class="form-select" id="Operacion">
        <option selected disabled>Selecciona la operación</option>
        <option value="Suma">Suma</option>
        <option value="Resta">Resta</option>
        <option value="Multiplicación">Multiplicación</option>
        <option value="División">División</option>
      </select>
    </div>

    <div class="mb-3 mx-auto">
      <button id="Calculo" type="button" class="btn btn-primary">Calcular</button>
    </div>
        <div  id="Resultado" class="mb-3 text-center mx-auto"> Resultado: </div>

            <ul id="Historial" class="list-group mb-3 mx-auto">HISTORIAL</ul>


  </div>
</div>

`;




}

// creamos la lógica correspondiente
// funcion para el llamado del boton 

connectedCallback (){
this.shadowRoot
    .querySelector("#Calculo")
    .addEventListener("click", () => this.calculos());


}

calculos(){
//obtenemos los datos ingresados con querySelector
const numero1 = parseFloat(this.shadowRoot.querySelector("#Numero1").value);
const numero2 = parseFloat(this.shadowRoot.querySelector("#Numero2").value);
const operacion = this.shadowRoot.querySelector("#Operacion").value;
const resultadoElem = this.shadowRoot.querySelector("#Resultado");
const historial = this.shadowRoot.querySelector("#Historial");


// Creamos la operación selecionada por el usuario suma, resta, multiplicación o división 
  let resultado;
    //Realizamos la validación de campo vacío y número
      if (isNaN(numero1) || isNaN(numero2)) {
      resultadoElem.textContent = "Por favor ingresa solo números.";
      return;
    }

  // Ejecutar la operación según el valor seleccionado
  switch (operacion) {
    case "Suma":
      resultado = numero1 + numero2;
      break;
    case "Resta":
      resultado = numero1 - numero2;
      break;
    case "Multiplicación":
      resultado = numero1 * numero2;
      break;
    case "División":
      if (numero2 === 0) {
        resultadoElem.textContent = "Lo sentimos, no se puede dividir entre cero.";
        return;
      }
      resultado = numero1 / numero2;
      break;
    default:
      resultadoElem.textContent = "Por favor selecciona una operación disponible.";
      return;
  }

  // Mostrar el resultado
  resultadoElem.textContent = `Resultado: ${resultado}`;

 // Creamos el evento que permite salir del shadow DOM
  this.dispatchEvent(new CustomEvent("resultado-calculado", {
  detail: { resultado }, 
  bubbles: true,         
  composed: true        
}));

// Lógica para agregar los resultados a un historial (list)ç

const operItem = document.createElement("li");
  operItem.textContent = `Oeracion del Historial----->Resultado = ${resultado}`;
  operItem.classList.add("list-group-item");

   historial.appendChild(operItem);

}




}
 

customElements.define("calculadora-basica",CalculadoraBasica);