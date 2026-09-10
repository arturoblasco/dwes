(() => {
  /* =========================================================
     CALENDARIO DEL CURSO
     Adaptado al diagrama de Gantt PHP + Laravel + Proyecto
     ========================================================= */

  const mesos = [
    { nom: "septiembre", any: 2026, mes: 8 },
    { nom: "octubre",    any: 2026, mes: 9 },
    { nom: "noviembre",  any: 2026, mes: 10 },
    { nom: "diciembre",  any: 2026, mes: 11 },
    { nom: "enero",      any: 2027, mes: 0 },
    { nom: "febrero",    any: 2027, mes: 1 },
    { nom: "marzo",      any: 2027, mes: 2 },
    { nom: "abril",      any: 2027, mes: 3 },
    { nom: "mayo",       any: 2027, mes: 4 },
    { nom: "junio",      any: 2027, mes: 5 }
  ];

  /*
   * Las duraciones coinciden con las del Gantt.
   * "fin" es exclusivo, igual que en una barra temporal:
   * U01 09/09 + 5d => ocupa 09/09 ... 13/09 y U02 empieza 14/09.
   */
  const tasquesGantt = [
    /* PHP */
    { codi: "U01", nom: "Arquitectura Web",                 inici: "2026-09-09", dies: 7,  cls: "u01", bloc: "php" },
    { codi: "U02", nom: "Lenguaje PHP",                     inici: "2026-09-16", dies: 16, cls: "u02", bloc: "php" },
    { codi: "U03", nom: "PHP OO",                           inici: "2026-10-02", dies: 28, cls: "u03", bloc: "php" },
    { codi: "U04", nom: "Programación Web",                 inici: "2026-10-30", dies: 21, cls: "u04", bloc: "php" },
    { codi: "U05", nom: "Acceso a BD",                      inici: "2026-11-20", dies: 14, cls: "u05", bloc: "php" },

    /* Laravel */
    { codi: "U06", nom: "Entorno de Desarrollo Profesional", inici: "2026-10-25", dies: 8,  cls: "u06", bloc: "laravel" },
    { codi: "U07", nom: "Fundamentos",                       inici: "2026-11-02", dies: 32, cls: "u07", bloc: "laravel" },
    { codi: "U08", nom: "Gestión de datos",                  inici: "2026-12-04", dies: 18, cls: "u08", bloc: "laravel" },
    { codi: "U09", nom: "Interacción con usuario",           inici: "2027-01-07", dies: 22, cls: "u09", bloc: "laravel" },
    { codi: "U10", nom: "Autenticación básica",              inici: "2027-01-29", dies: 14, cls: "u10", bloc: "laravel" },
    { codi: "U11", nom: "Despliegue",                        inici: "2027-01-11", dies: 7,  cls: "u11", bloc: "laravel" },

    /* Proyecto */
    { codi: "PROY", nom: "Pruebas finales",                  inici: "2027-01-07", dies: 40, cls: "proyecto", bloc: "proyecto" }
  ];

  /* Para el panel lateral/resumen */
  const unitats = tasquesGantt.map(t => ({
    ra: t.bloc === "php" ? "PHP" : t.bloc === "laravel" ? "Laravel" : "Proyecto",
    codi: t.codi,
    dies: t.dies,
    nom: t.nom,
    cls: t.cls
  }));

  /*
   * Fechas especiales del calendario escolar.
   * Se conservan separadas de las unidades para que un festivo,
   * evaluación o examen tenga prioridad visual sobre la planificación.
   */
  const classesEspecialsPerData = {
    "2026-09-09": "inici-fi",

    "2026-10-09": "festiu",
    "2026-10-12": "festiu",

    "2026-11-23": "avaluacio",
    "2026-11-24": "avaluacio",
    "2026-11-25": "avaluacio",

    "2026-12-07": "festiu",
    "2026-12-22": "festiu",
    "2026-12-23": "festiu",
    "2026-12-24": "festiu",
    "2026-12-25": "festiu",
    "2026-12-28": "festiu",
    "2026-12-29": "festiu",
    "2026-12-30": "festiu",
    "2026-12-31": "festiu",

    "2027-01-01": "festiu",
    "2027-01-04": "festiu",
    "2027-01-05": "festiu",
    "2027-01-06": "festiu",

    "2027-02-22": "avaluacio",
    "2027-02-23": "avaluacio",
    "2027-02-24": "avaluacio",

    "2027-03-17": "festiu",
    "2027-03-18": "festiu",
    "2027-03-19": "festiu",
    "2027-03-25": "festiu",
    "2027-03-26": "festiu",
    "2027-03-29": "festiu",
    "2027-03-30": "festiu",
    "2027-03-31": "festiu",

    "2027-04-01": "festiu",
    "2027-04-02": "festiu",
    "2027-04-05": "festiu",

    "2027-06-01": "examen",
    "2027-06-02": "examen",
    "2027-06-03": "examen",
    "2027-06-04": "examen",
    "2027-06-08": "avaluacio",
    "2027-06-18": "inici-fi",
    "2027-06-21": "examen",
    "2027-06-22": "examen",
    "2027-06-23": "examen",
    "2027-06-24": "avaluacio"
  };

  const diesSetmana = ["lu", "ma", "mi", "ju", "vi", "sa", "do"];

  /* =========================================================
     DÍAS EN LOS QUE SE IMPARTE CLASE
     ========================================================= */

  function esDiaClasse(data) {
    const diaSetmana = data.getDay();

    // JavaScript:
    // 0 = domingo, 1 = lunes, 2 = martes, 3 = miércoles,
    // 4 = jueves, 5 = viernes, 6 = sábado.
    return diaSetmana === 2 || diaSetmana === 3 || diaSetmana === 4;
  }


  /* Colores suaves iguales a los bloques del Gantt */
  const colorsBloc = {
    php:      { fons: "#bedcf7", text: "#295d89" },
    laravel:  { fons: "#facccc", text: "#933c3c" },
    proyecto: { fons: "#baf6bf", text: "#3f7650" }
  };

  function iso(any, mes, dia) {
    return `${any}-${String(mes + 1).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;
  }

  function dataLocal(isoDate) {
    const [y, m, d] = isoDate.split("-").map(Number);
    return new Date(y, m - 1, d, 12, 0, 0);
  }

  function sumaDies(isoDate, dies) {
    const d = dataLocal(isoDate);
    d.setDate(d.getDate() + dies);
    return iso(d.getFullYear(), d.getMonth(), d.getDate());
  }

  /*
   * Construye automáticamente qué unidades están activas cada día.
   * Solo se asignan unidades a martes, miércoles y jueves.
   * El resto de días continúan visibles en el calendario.
   */
  /*
   * IMPORTANTE:
   * planificacioPerData solo contendrá martes, miércoles y jueves.
   * Lunes y viernes seguirán apareciendo en el calendario,
   * pero sin color de unidad ni código Uxx.
   */
  const planificacioPerData = {};

  function afegeixPlanificacio(tasca) {
    const inici = dataLocal(tasca.inici);
    const fi = dataLocal(sumaDies(tasca.inici, tasca.dies)); // exclusivo

    for (let d = new Date(inici); d < fi; d.setDate(d.getDate() + 1)) {

      /*
       * Només assignem unitats als dies reals de classe:
       * dimarts, dimecres i dijous.
       *
       * Dilluns i divendres continuen apareixent al calendari,
       * però sense fons de PHP/Laravel/Projecte i sense Uxx.
       */
      if (!esDiaClasse(d)) continue;

      const key = iso(d.getFullYear(), d.getMonth(), d.getDate());

      if (!planificacioPerData[key]) {
        planificacioPerData[key] = [];
      }

      planificacioPerData[key].push(tasca);
    }
  }

  tasquesGantt.forEach(afegeixPlanificacio);

  /*
   * Fondo del día.
   * Si coinciden PHP/Laravel/Proyecto, la celda se divide en franjas,
   * de modo que el solapamiento del Gantt también se ve en el calendario.
   */
  function estilPlanificacio(tasques) {
    if (!tasques.length) return "";

    const blocs = [...new Set(tasques.map(t => t.bloc))];

    if (blocs.length === 1) {
      return `background:${colorsBloc[blocs[0]].fons};`;
    }

    const percent = 100 / blocs.length;
    const trams = [];

    blocs.forEach((bloc, i) => {
      const inici = (i * percent).toFixed(2);
      const fi = ((i + 1) * percent).toFixed(2);
      trams.push(
        `${colorsBloc[bloc].fons} ${inici}%`,
        `${colorsBloc[bloc].fons} ${fi}%`
      );
    });

    return `background:linear-gradient(135deg, ${trams.join(",")});`;
  }

  function etiquetaTasques(tasques) {
    if (!tasques.length) return "";

    return tasques
      .map(t => t.codi === "PROY" ? "P" : t.codi.replace("U", ""))
      .join("<br>");
  }

  function titolTasques(tasques) {
    return tasques
      .map(t => `${t.codi}: ${t.nom}`)
      .join(" + ");
  }

  function creaMes(info) {
    const primer = new Date(info.any, info.mes, 1);
    const dies = new Date(info.any, info.mes + 1, 0).getDate();
    const offset = (primer.getDay() + 6) % 7;

    const section = document.createElement("section");
    section.className = "mes";

    section.innerHTML = `
      <h3>${info.nom}</h3>
      <div class="mes-cap">${diesSetmana.map(d => `<span>${d}</span>`).join("")}</div>
      <div class="mes-dies"></div>
    `;

    const grid = section.querySelector(".mes-dies");

    for (let i = 0; i < offset; i++) {
      grid.insertAdjacentHTML("beforeend", `<span class="buit"></span>`);
    }

    for (let d = 1; d <= dies; d++) {
      const data = new Date(info.any, info.mes, d);
      const key = iso(info.any, info.mes, d);
      const capSetmana = data.getDay() === 0 || data.getDay() === 6;

      const classeEspecial = classesEspecialsPerData[key] || "";
      const tasques = planificacioPerData[key] || [];

      /*
       * En festivos/evaluaciones/exámenes prevalece el color especial.
       * Las unidades siguen disponibles en el tooltip si el Gantt las cruza.
       */
      const tasquesVisibles = (!capSetmana && !classeEspecial) ? tasques : [];

      const classes = ["dia"];

      if (capSetmana) classes.push("cap-setmana");
      if (classeEspecial) classes.push(classeEspecial);

      tasquesVisibles.forEach(t => classes.push(t.cls, t.bloc));

      if (tasquesVisibles.length > 1) {
        classes.push("solapament");
      }

      const style = tasquesVisibles.length
        ? estilPlanificacio(tasquesVisibles)
        : "";

      const etiqueta = etiquetaTasques(tasquesVisibles);

      const tooltipParts = [];
      if (classeEspecial) tooltipParts.push(classeEspecial);
      if (tasques.length) tooltipParts.push(titolTasques(tasques));
      const tooltip = tooltipParts.join(" · ");

      grid.insertAdjacentHTML(
        "beforeend",
        `<span class="${classes.join(" ")}"
               ${style ? `style="${style}"` : ""}
               ${tooltip ? `title="${tooltip}"` : ""}>
            <span class="numero-dia">${d}</span>
            ${etiqueta
              ? `<small class="unitats-dia">
                   ${etiqueta}
                 </small>`
              : ""}
         </span>`
      );
    }

    return section;
  }

  function creaPanell() {
    const total = unitats.reduce((s, u) => s + u.dies, 0);

    const panell = document.createElement("aside");
    panell.className = "panell-lateral";

    panell.innerHTML = `
      <div class="panell-contingut">

        <!-- LEYENDA -->
        <div class="llegenda">
          <div class="llegenda-item">
            <span class="llegenda-mostra inici-fi">18</span>
            <span>Inicio/Fin de curso</span>
          </div>

          <div class="llegenda-item">
            <span class="llegenda-mostra examen">18</span>
            <span>Examen</span>
          </div>

          <div class="llegenda-item">
            <span class="llegenda-mostra avaluacio">26</span>
            <span>Evaluación</span>
          </div>

          <div class="llegenda-item">
            <span class="llegenda-mostra cap-setmana">26</span>
            <span>Fin de semana</span>
          </div>

          <div class="llegenda-item">
            <span class="llegenda-mostra festiu">21</span>
            <span>Festivo</span>
          </div>

        </div>

      </div>
    `;

    return panell;
  }

  function render() {
    const arrel = document.getElementById("calendari-curs");
    if (!arrel || arrel.dataset.rendered === "1") return;

    arrel.dataset.rendered = "1";

    const layout = document.createElement("div");
    layout.className = "planificacio-curs";

    const zonaMesos = document.createElement("div");
    zonaMesos.className = "calendari-mesos";

    mesos.forEach(m => zonaMesos.appendChild(creaMes(m)));

    layout.appendChild(zonaMesos);
    arrel.appendChild(layout);
  }

  function render2() {
    const arrel = document.getElementById("resum");
    if (!arrel || arrel.dataset.rendered === "1") return;

    arrel.dataset.rendered = "1";

    const layout = document.createElement("div");
    layout.className = "planificacio-curs";

    layout.appendChild(creaPanell());
    arrel.appendChild(layout);
  }

  document.addEventListener("DOMContentLoaded", render);
  document.addEventListener("DOMContentSwitch", render);

  document.addEventListener("DOMContentLoaded", render2);
  document.addEventListener("DOMContentSwitch", render2);

  render();
  render2();
})();
