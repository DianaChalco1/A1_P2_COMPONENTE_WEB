
// Se crea un componente web de nombre "calculadora-basica"
class CalculadoraBasica extends HTMLElement{


// se crea un constructor para la parte estetica.
constructor(){
    super();
    this.attachShadow({ mode: 'open' });
// Se crea un shadow DOM para encapsular el estilo y la estructura del componente
this.shadowRoot.innerHTML = `
    <link rel="stylesheet" href="public/lib/bootstrap/css/bootstrap.min.css">

    <div class="container mt-2">
  <div class="card p-4 shadow w-50 mx-auto" style="background-color:rgb(160, 242, 204);">
    <h3 class="text-center mb-4">🧮 Calculadora Básica</h3>
    
    <div class="mb-3">
      <label for="Numero1" class="form-label">Ingrese primer número</label>
      <input type="number" class="form-control" id="Numero1">
    </div>
    
    <div class="mb-3">
      <label for="Numero2" class="form-label">Ingrese segundo número</label>
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
      <button id="Calculo" type="button" class="btn btn-success">Calcular</button>
    </div>
        <div  id="Resultado" class="mb-3 text-center mx-auto"> Resultado: </div>

            <ul id="Historial" class="list-group mb-3 mx-auto">HISTORIAL</ul>


  </div>
</div>
`;
}

// se crea la lógica correspondiente
connectedCallback (){
this.shadowRoot
    .querySelector("#Calculo")
    .addEventListener("click", () => this.calculos());

}
// Se crea la función que realiza los cálculos
calculos(){
//se obtiene los datos ingresados con querySelector
const numero1 = parseFloat(this.shadowRoot.querySelector("#Numero1").value);
const numero2 = parseFloat(this.shadowRoot.querySelector("#Numero2").value);
const operacion = this.shadowRoot.querySelector("#Operacion").value;
const resultadoElem = this.shadowRoot.querySelector("#Resultado");
const historial = this.shadowRoot.querySelector("#Historial");
// Se obtiene el elemento del historial
// Se crea la operación selecionada por el usuario suma, resta, multiplicación o división
  let resultado;
    //Se realiza la validación de campo vacío y número
      if (isNaN(numero1) || isNaN(numero2)) {
      resultadoElem.textContent = "Ingrese solo números.";
      return;
    }

  // Se ejecuta la operación según el valor seleccionado
  switch (operacion) {
    // Se evalúa la operación seleccionada por el usuario
    case "Suma":
      resultado = numero1 + numero2;
      break;
    // Se evalúa la operación seleccionada por el usuario
    case "Resta":
      resultado = numero1 - numero2;
      break;
    // Se evalúa la operación seleccionada por el usuario
    case "Multiplicación":
      resultado = numero1 * numero2;
      break;
    // Se evalúa la operación seleccionada por el usuario
    case "División":
      if (numero2 === 0) {
    // Validación para evitar división por cero
        resultadoElem.textContent = "Adevertencia! No se puede dividir entre cero.";
        return;
      }
    // Se evalúa la operación seleccionada por el usuario
      resultado = numero1 / numero2;
      break;
    default:
    // Refleja mensaje si no se selecciona una operación válida
      resultadoElem.textContent = "Seleccione operación disponible.";
      return;
  }

  // Muestra el resultado
  resultadoElem.textContent = `Resultado: ${resultado}`;

 // Se crea el evento que permite salir del shadow DOM
  this.dispatchEvent(new CustomEvent("resultado-calculado", {
  detail: { resultado }, 
  bubbles: true,         
  composed: true        
}));

  // Lógica para agregar los resultados a un historial (list)
const operItem = document.createElement("li");
  operItem.textContent = `Historial de las operaciones----->Resultado = ${resultado}`;
  operItem.classList.add("bg-info");
  // Se agrega la clase de bootstrap para el estilo
   historial.appendChild(operItem);

}

}
// Se define el componente web "calculadora-basica"
// Se registra el componente para que pueda ser utilizado en el HTML
customElements.define("calculadora-basica",CalculadoraBasica);