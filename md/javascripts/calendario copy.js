(() => {
  const mesos = [
    { nom: "septiembre", any: 2026, mes: 8, lectius: 16, mini: [2,1,2] },
    { nom: "octubre", any: 2026, mes: 9, lectius: 20, mini: [2,1,2] },
    { nom: "noviembre", any: 2026, mes: 10, lectius: 20, mini: [2,1,2] },
    { nom: "diciembre", any: 2026, mes: 11, lectius: 15, mini: [2,1,2] },
    { nom: "enero", any: 2027, mes: 0, lectius: 17, mini: [2,1,2] },
    { nom: "febrero", any: 2027, mes: 1, lectius: 20, mini: [2,1,2] },
    { nom: "marzo", any: 2027, mes: 2, lectius: 15, mini: [2,1,2] },
    { nom: "abril", any: 2027, mes: 3, lectius: 22, mini: [2,1,2] },
    { nom: "mayo", any: 2027, mes: 4, lectius: 21, mini: [2,1,2] },
    { nom: "junio", any: 2027, mes: 5, lectius: 0, mini: [2,1,2] }
  ];

  const unitats = [
    { ra: "",    codi: "U00", hores: 1,  nom: "",                 cls: "u00" },
    { ra: "RA1", codi: "U01", hores: 10, nom: "INTRO",            cls: "u01" },
    { ra: "RA6", codi: "U02", hores: 20, nom: "Conceptual",       cls: "u02" },
    { ra: "RA6", codi: "U03", hores: 20, nom: "Lógico",           cls: "u03" },
    { ra: "RA2", codi: "U04", hores: 15, nom: "Físico",           cls: "u04" },
    { ra: "RA4", codi: "U05", hores: 10, nom: "Tratamiento",      cls: "u05" },
    { ra: "RA3", codi: "U06", hores: 23, nom: "Consultas",        cls: "u06" },
    { ra: "RA5", codi: "U07", hores: 23, nom: "Programación",     cls: "u07" },
    { ra: "RA7", codi: "U08", hores: 10, nom: "No Relacionales",  cls: "u08" },
    { ra: "FE",  codi: "FE",  hores: 34, nom: "Formación Empresa",cls: "fe" }
  ];

  const classesPerData = {
    // setembre
    "2026-09-09":"inici-fi",
    "2026-09-10":"u00", "2026-09-11":"u01",
    "2026-09-14":"u01", "2026-09-15":"u01", "2026-09-16":"u01", "2026-09-17":"u01", "2026-09-18":"u01",
    "2026-09-21":"u01", "2026-09-22":"u01", "2026-09-23":"u01",
    "2026-09-24":"u02", "2026-09-25":"u02", "2026-09-28":"u02", "2026-09-29":"u02", "2026-09-30":"u02",

    // octubre
    "2026-10-01":"u02","2026-10-02":"u02","2026-10-05":"u02","2026-10-06":"u02","2026-10-07":"u02","2026-10-08":"u02",
    "2026-10-09":"festiu","2026-10-12":"festiu",
    "2026-10-13":"u02","2026-10-14":"u02","2026-10-15":"u02","2026-10-16":"u02",
    "2026-10-19":"u02","2026-10-20":"u02","2026-10-21":"u02","2026-10-22":"u02","2026-10-23":"u02",
    "2026-10-26":"u03","2026-10-27":"u03","2026-10-28":"u03","2026-10-29":"u03","2026-10-30":"u03",

    // novembre
    ...Object.fromEntries([2,3,4,5,6,9,10,11,12,13,16,17,18,19,20].map(d => [`2026-11-${String(d).padStart(2,"0")}`,"u03"])),
    "2026-11-23":"avaluacio","2026-11-24":"avaluacio","2026-11-25":"avaluacio",
    "2026-11-26":"u04","2026-11-27":"u04","2026-11-30":"u04",

    // desembre
    ...Object.fromEntries([1,2,3,4,8,9,10,11].map(d => [`2026-12-${String(d).padStart(2,"0")}`,"u04"])),
    "2026-12-07":"festiu",
    ...Object.fromEntries([14,15,16,17,18,21].map(d => [`2026-12-${d}`,"u05"])),
    ...Object.fromEntries([22,23,24,25,28,29,30,31].map(d => [`2026-12-${d}`,"festiu"])),

    // gener
    ...Object.fromEntries([1,4,5,6].map(d => [`2027-01-${String(d).padStart(2,"0")}`,"festiu"])),
    "2027-01-07":"u05","2027-01-08":"u05",
    ...Object.fromEntries([11,12,13].map(d => [`2027-01-${d}`,"u05"])),
    ...Object.fromEntries([14,15,18,19,20,21,22,25,26,27,28,29].map(d => [`2027-01-${d}`,"u06"])),

    // febrer
    ...Object.fromEntries([1,2,3,4,5,8,9,10,11,12].map(d => [`2027-02-${String(d).padStart(2,"0")}`,"u06"])),
    ...Object.fromEntries([15,16,17,18,19].map(d => [`2027-02-${d}`,"u07"])),
    "2027-02-22":"avaluacio","2027-02-23":"avaluacio","2027-02-24":"avaluacio",
    "2027-02-25":"u07","2027-02-26":"u07",

    // març
    ...Object.fromEntries([1,2,3,4,5,8,9,10,11,12,15,16].map(d => [`2027-03-${String(d).padStart(2,"0")}`,"u07"])),
    ...Object.fromEntries([22,23,24].map(d => [`2027-03-${d}`,"u08"])),
    ...Object.fromEntries([17,18,19,25,26,29,30,31].map(d => [`2027-03-${d}`,"festiu"])),

    // abril
    ...Object.fromEntries([1,2,5].map(d => [`2027-04-${String(d).padStart(2,"0")}`,"festiu"])),
    ...Object.fromEntries([6,7,8,9,12,13].map(d => [`2027-04-${String(d).padStart(2,"0")}`,"u08"])),
    ...Object.fromEntries([14,15,16,19,20,21,22,23,26,27,28,29,30].map(d => [`2027-04-${d}`,"fe"])),

    // maig
    ...Object.fromEntries([3,4,5,6,7,10,11,12,13,14,17,18,19,20,21,24,25,26,27,28,31].map(d => [`2027-05-${String(d).padStart(2,"0")}`,"fe"])),

    // juny
    "2027-06-01":"examen","2027-06-02":"examen","2027-06-03":"examen","2027-06-04":"examen",
    "2027-06-08":"avaluacio","2027-06-18":"inici-fi",
    "2027-06-21":"examen","2027-06-22":"examen","2027-06-23":"examen","2027-06-24":"avaluacio"
  };

  const diesSetmana = ["lu","ma","mi","ju","vi","sa","do"];

  function iso(any, mes, dia) {
    return `${any}-${String(mes + 1).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;
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
      <div class="mes-resum">
        ${info.mini.map((x, i) => `<span class="mini" style="grid-column:${i*2+2}">${x}</span>`).join("")}
        <span class="total">${info.lectius}</span>
      </div>
    `;

    const grid = section.querySelector(".mes-dies");

    for (let i = 0; i < offset; i++) {
      grid.insertAdjacentHTML("beforeend", `<span class="buit"></span>`);
    }

    for (let d = 1; d <= dies; d++) {
      const data = new Date(info.any, info.mes, d);
      const key = iso(info.any, info.mes, d);
      const capSetmana = data.getDay() === 0 || data.getDay() === 6;
      const classe = classesPerData[key] || "";
      const classes = ["dia"];
      if (capSetmana) classes.push("cap-setmana");
      if (classe) classes.push(classe);
      grid.insertAdjacentHTML("beforeend", `<span class="${classes.join(" ")}">${d}</span>`);
    }

    return section;
  }

    function creaPanell() {
  const total = unitats.reduce((s, u) => s + u.hores, 0);

  const panell = document.createElement("aside");
  panell.className = "panell-lateral";

  panell.innerHTML = `
    <div class="panell-contingut">

      <!-- LEYENDA -->
      <div class="llegenda">
        <div class="llegenda-item">
          <span class="llegenda-mostra examen">18</span>
          <span>Examen</span>
        </div>

        <div class="llegenda-item">
          <span class="llegenda-mostra festiu">21</span>
          <span>Festivo</span>
        </div>

        <div class="llegenda-item">
          <span class="llegenda-mostra avaluacio">26</span>
          <span>Evaluación</span>
        </div>

        <div class="llegenda-item">
          <span class="llegenda-mostra inici-fi">18</span>
          <span>Inicio/Fin de curso</span>
        </div>

        <div class="llegenda-item">
          <span class="llegenda-mostra cap-setmana">26</span>
          <span>Fin de semana</span>
        </div>
      </div>


      <!-- RESUMEN DE EVALUACIONES -->
      <div class="resum-hores">
        <table>
          <thead>
            <tr>
              <th>EVA</th>
              <th>HORAS</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>1.ª EVA</td>
              <td>51</td>
            </tr>

            <tr>
              <td>2.ª EVA</td>
              <td>52</td>
            </tr>

            <tr>
              <td>3.ª EVA</td>
              <td>63</td>
            </tr>

            <tr class="fila-total">
              <th>Total</th>
              <th>${total}</th>
            </tr>
          </tbody>
        </table>
      </div>


      <!-- UNIDADES -->
      <div class="unitats">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>UNIDAD</th>
              <th>HORAS</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            ${unitats.map(u => `
              <tr>
                <td class="ra">${u.ra}</td>
                <td class="codi ${u.cls}">${u.codi}</td>
                <td class="hores ${u.cls}">${u.hores}</td>
                <td class="nom">${u.nom}</td>
              </tr>
            `).join("")}

            <tr class="fila-total-unitats">
              <td></td>
              <td></td>
              <th>${total}</th>
              <td></td>
            </tr>
          </tbody>
        </table>
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
    //layout.appendChild(creaPanell());
    arrel.appendChild(layout);
  }

  document.addEventListener("DOMContentLoaded", render);
  document.addEventListener("DOMContentSwitch", render);
  render();

    function render2() {
    const arrel = document.getElementById("resum");
    if (!arrel || arrel.dataset.rendered === "1") return;

    arrel.dataset.rendered = "1";

    const layout = document.createElement("div");
    layout.className = "planificacio-curs";

    //const zonaMesos = document.createElement("div");
    //zonaMesos.className = "calendari-mesos";
    //mesos.forEach(m => zonaMesos.appendChild(creaMes(m)));

    //layout.appendChild(zonaMesos);
    layout.appendChild(creaPanell());
    arrel.appendChild(layout);
  }

  document.addEventListener("DOMContentLoaded", render);
  document.addEventListener("DOMContentSwitch", render);
  render2();
})();
