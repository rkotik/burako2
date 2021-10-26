document.addEventListener("DOMContentLoaded", () => {
  // Variables
  let baseDatos = [];
  let mano = 0;
  let totalNosotros = 0;
  let totalEllos = 0;
  var manogral = 0;

  // Variables de contexto
  // const btnCargar = document.querySelector("#btnCargar");
  const btnBorrar = document.querySelector("#btnBorrar");
  const btnSumar = document.querySelector("#btnSumar");
  const baseNosotros = document.querySelector("#base-nosotros");
  const puntosNosotros = document.querySelector("#puntos-nosotros");
  const baseEllos = document.querySelector("#base-ellos");
  const puntosEllos = document.querySelector("#puntos-ellos");
  const error = document.querySelector("#error");
  const tabla = document.querySelector("#tabla");
  const totalNos = document.querySelector("#tn");
  const totalEll = document.querySelector("#te");

  // Funciones
  const limpiar = () => {
    baseDatos = [];
    mano = 0;
    totalNosotros = 0;
    totalEllos = 0;
    manogral;
  };

  const sumar = (e) => {
    e.preventDefault();
    mano++; //Suma 1 al numero de manos
    // Leer los puntos de la mano
    if (
      baseNosotros.value == "" ||
      puntosNosotros.value == "" ||
      baseEllos.value == "" ||
      puntosEllos.value == ""
    ) {
      error.classList.remove("hide");
      error.textContent = "Debes ingresar todos los datos solicitados";
      setTimeout(() => {
        error.classList.add("hide");
      }, 3000);
    } else {
      baseDatos.push({
        baseNosotros: baseNosotros.value,
        puntosNosotros: puntosNosotros.value,
        baseEllos: baseEllos.value,
        puntosEllos: puntosEllos.value,
      });
      localStorage.setItem("Puntos", JSON.stringify(baseDatos));
      tabla.innerHTML += `
        <tr>
          <td>${mano}</td>
          <td>${baseNosotros.value}/${puntosNosotros.value}</td>
          <td>${baseEllos.value}/${puntosEllos.value}</td>
        </tr>
      `;
      totalNosotros +=
        parseInt(baseNosotros.value) + parseInt(puntosNosotros.value);
      totalEllos += parseInt(baseEllos.value) + parseInt(puntosEllos.value);
      totalNos.textContent = Intl.NumberFormat("es-AR").format(totalNosotros);
      totalEll.textContent = Intl.NumberFormat("es-AR").format(totalEllos);

      // Borrar datos para nueva mano
      baseNosotros.value = "";
      puntosNosotros.value = "";
      baseEllos.value = "";
      puntosEllos.value = "";
    }
  };

  // const cargar = (e) => {
  //   e.preventDefault();
  //   limpiar();
  //   puntos = JSON.parse(localStorage.getItem("Puntos"));
  //   if (puntos) {
  //     let tNos = 0;
  //     let tEllos = 0;
  //     let mano = 0;
  //     tabla.innerHTML = "";
  //     puntos.forEach((puntaje) => {
  //       tNos +=
  //         parseInt(puntaje.baseNosotros) + parseInt(puntaje.puntosNosotros);
  //       totalNos.textContent = Intl.NumberFormat("es-AR").format(tNos);
  //       tEllos += parseInt(puntaje.baseEllos) + parseInt(puntaje.puntosEllos);
  //       totalEll.textContent = Intl.NumberFormat("es-AR").format(tEllos);
  //       mano++;
  //       tabla.innerHTML += `
  //         <tr>
  //           <td>${mano}</td>
  //           <td>${puntaje.baseNosotros}/${puntaje.puntosNosotros}</td>
  //           <td>${puntaje.baseEllos}/${puntaje.puntosEllos}</td>
  //         </tr>
  //       `;
  //       baseDatos.push({
  //         baseNosotros: puntaje.baseNosotros,
  //         puntosNosotros: puntaje.puntosNosotros,
  //         baseEllos: puntaje.baseEllos,
  //         puntosEllos: puntaje.puntosEllos,
  //       });

  //       manogral = mano;
  //     });
  //   } else {
  //     error.classList.remove("hide");
  //     error.textContent = "No hay datos para recuperar";
  //     setTimeout(function () {
  //       error.classList.add("hide");
  //     }, 3000);
  //   }
  //   mano = manogral;
  // };

  const borrar = (e) => {
    e.preventDefault();
    puntos = JSON.parse(localStorage.getItem("Puntos"));
    if (!puntos) {
      error.classList.remove("hide");
      error.textContent = "No hay datos para eliminar";
      setTimeout(() => {
        error.classList.add("hide");
      }, 3000);
    } else {
      confirm("¿Estás seguro de limpiar los datos del juego?");
      localStorage.clear();
      mano = 0;
      totalNosotros = 0;
      totalEllos = 0;
      limpiar();
      totalNos.textContent = totalNosotros;
      totalEll.textContent = totalEllos;
      document.querySelector("#tabla").innerHTML = "";
      error.classList.remove("hide");
      error.textContent = "Datos eliminados, podés empezar una nueva partida";
      setTimeout(() => {
        error.classList.add("hide");
      }, 3000);
    }
  };

  const cargarInicio = () => {
    limpiar();
    puntos = JSON.parse(localStorage.getItem("Puntos"));
    if (puntos) {
      let tNos = 0;
      let tEllos = 0;
      let mano = 0;
      tabla.innerHTML = "";
      puntos.forEach((puntaje) => {
        tNos +=
          parseInt(puntaje.baseNosotros) + parseInt(puntaje.puntosNosotros);
        totalNos.textContent = Intl.NumberFormat("es-AR").format(tNos);
        tEllos += parseInt(puntaje.baseEllos) + parseInt(puntaje.puntosEllos);
        totalEll.textContent = Intl.NumberFormat("es-AR").format(tEllos);
        mano++;
        tabla.innerHTML += `
          <tr>
            <td>${mano}</td>
            <td>${puntaje.baseNosotros}/${puntaje.puntosNosotros}</td>
            <td>${puntaje.baseEllos}/${puntaje.puntosEllos}</td>
          </tr>
        `;
        baseDatos.push({
          baseNosotros: puntaje.baseNosotros,
          puntosNosotros: puntaje.puntosNosotros,
          baseEllos: puntaje.baseEllos,
          puntosEllos: puntaje.puntosEllos,
        });

        manogral = mano;
      });
    }
    //  else {
    //   error.classList.remove("hide");
    //   error.textContent = "No hay datos para recuperar";
    //   setTimeout(function () {
    //     error.classList.add("hide");
    //   }, 3000);
    // }
    mano = manogral;
  };

  // Detecciones
  btnSumar.addEventListener("click", sumar);
  btnBorrar.addEventListener("click", borrar);
  // btnCargar.addEventListener("click", cargar);
  cargarInicio();
});
