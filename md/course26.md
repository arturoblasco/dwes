---
title: ""
hide:
  - title
  - toc
---

# <img src="../img/dwes_intro.png" width="40"> Curso 26-27 Planificación

### **Planificación temporal**

<table class="tabla-up">
  <tbody>
    <tr class="php">
      <td class="codigo"><span>U01</span></td>
      <td>Arquitectura Web</td>
    </tr>
    <tr class="php">
      <td class="codigo"><span>U02</span></td>
      <td>Lenguaje PHP</td>
    </tr>
    <tr class="php">
      <td class="codigo"><span>U03</span></td>
      <td>PHP OO</td>
    </tr>
    <tr class="php">
      <td class="codigo"><span>U04</span></td>
      <td>Programación Web</td>
    </tr>
    <tr class="php">
      <td class="codigo"><span>U05</span></td>
      <td>Acceso a BD</td>
    </tr>

    <tr class="laravel">
      <td class="codigo"><span>U06</span></td>
      <td>Entorno de Desarrollo Profesional</td>
    </tr>
    <tr class="laravel">
      <td class="codigo"><span>U07</span></td>
      <td>Fundamentos</td>
    </tr>
    <tr class="laravel">
      <td class="codigo"><span>U08</span></td>
      <td>Gestión de datos</td>
    </tr>
    <tr class="laravel">
      <td class="codigo"><span>U09</span></td>
      <td>Interacción con usuario</td>
    </tr>
    <tr class="laravel">
      <td class="codigo"><span>U10</span></td>
      <td>Autenticación básica</td>
    </tr>
    <tr class="laravel">
      <td class="codigo"><span>U11</span></td>
      <td>Despliegue</td>
    </tr>
    <tr class="proyecto">
      <td class="codigo"><span>Proyecto</span></td>
      <td>Pruebas finales</td>
    </tr>
  </tbody>
</table>


```mermaid
---
---
config:
  theme: base

  gantt:
    numberSectionStyles: 3
    barHeight: 26
    barGap: 7
    fontSize: 12
    sectionFontSize: 14
    leftPadding: 105

  themeCSS: >-
    .section {
      opacity: 1;
    }

    /* PHP */
    .section0 {
      fill: #eaf3fb;
    }

    .task0 {
      fill: #7fa6c9;
      stroke: #638bae;
      stroke-width: 1.5px;
    }

    .taskText0 {
      fill: #ffffff !important;
      font-weight: 500;
    }

    /* Laravel */
    .section1 {
      fill: #fbe9e9;
    }

    .task1 {
      fill: #d98282;
      stroke: #b65f5f;
      stroke-width: 1.5px;
    }

    .taskText1 {
      fill: #ffffff !important;
      font-weight: 500;
    }

    /* Proyecto */
    .section2 {
      fill: #e8f5e9;
    }

    .task2 {
      fill: #90b998;
      stroke: #589765;
      stroke-width: 1.5px;
    }

    .taskText2 {
      fill: #ffffff !important;
      font-weight: 500;
    }

    /* Rejilla */
    .grid .tick {
      stroke: #999999;
      opacity: 0.30;
    }

    .grid .tick text {
      fill: #555555;
    }
---

gantt
    dateFormat DD-MM-YYYY
    axisFormat %d-%m-%y
    tickInterval 1week

    todayMarker stroke-width:3px,stroke:#e53935,opacity:0.85

    section PHP
    U01 :a1, 09-09-2026, 7d
    U02 :a2, after a1, 16d
    U03 :a3, after a2, 28d
    U04 :a4, after a3, 21d
    U05 :a5, after a4, 14d

    section Laravel
    U06 :p1, after a3, 8d
    U07 :p2, after p1, 32d
    U08 :p3, after p2, 18d
    U09 :p4, after p3, 22d
    U10 :p5, after p4, 14d
    U11 :p6, after p5, 7d

    section Proyecto
    Pruebas finales :pr1, after p3, 43d
```

### **Calendario lectivo**

<div id="calendari-curs"></div>
<div id="resum"></div>