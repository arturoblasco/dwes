
```mermaid
flowchart TD
    A[Inicio] --> B[Leer datos]
    B --> C{¿Los datos son correctos?}
    C -->|Sí| D[Guardar información]
    C -->|No| E[Mostrar error]
    D --> F[Fin]
    E --> B
```
Dirección del diagrama
```mermaid
flowchart LR
    A[Rectángulo]
    B(Rectángulo redondeado)
    C((Círculo))
    D{Decisión}
    E[(Base de datos)]
    F[[Subrutina]]
 
    A --> B --> C --> D --> E --> F
```
 
Formas de los nodos
```mermaid
flowchart LR
    A[Inicio] --> B[Flecha normal]
    B -.-> C[Flecha discontinua]
    C ==> D[Flecha gruesa]
    D -->|Texto en la flecha| E[Final]
```
Tipos de flechas
```mermaid
flowchart TD
    A[Introducir nota] --> B{¿Nota mayor o igual a 5?}
    B -->|Sí| C[Aprobado]
    B -->|No| D[Suspendido]
```
Condiciones
```mermaid
flowchart LR
    A[Inicio] --> B[Procesar datos]
    B --> C{¿Correctos?}
    C -->|Sí| D[Guardar]
    C -->|No| E[Error]
 
    style A fill:#c8e6c9,stroke:#2e7d32,color:#000
    style B fill:#bbdefb,stroke:#1565c0,color:#000
    style C fill:#fff9c4,stroke:#f9a825,color:#000
    style D fill:#c8e6c9,stroke:#2e7d32,color:#000
    style E fill:#ffcdd2,stroke:#c62828,color:#000
```
Colores y estilos
```mermaid
flowchart LR
    A[Inicio] --> B[Proceso]
    B --> C[Resultado]
    B --> D[Error]
 
    classDef inicio fill:#c8e6c9,stroke:#2e7d32,color:#000
    classDef proceso fill:#bbdefb,stroke:#1565c0,color:#000
    classDef correcto fill:#dcedc8,stroke:#558b2f,color:#000
    classDef error fill:#ffcdd2,stroke:#c62828,color:#000
 
    class A inicio
    class B proceso
    class C correcto
    class D error
```
Agrupaciones con subgraph
```mermaid
flowchart LR
    subgraph Cliente
        A[Usuario]
        B[Navegador]
    end
 
    subgraph Servidor
        C[Aplicación web]
        D[(Base de datos)]
    end
 
    A --> B
    B --> C
    C --> D
```
Diagrama de secuencia
```mermaid
sequenceDiagram
    actor Usuario
    participant Navegador
    participant Servidor
    participant BD as Base de datos
 
    Usuario->>Navegador: Accede a la página
    Navegador->>Servidor: Solicita los datos
    Servidor->>BD: Ejecuta consulta
    BD-->>Servidor: Devuelve resultados
    Servidor-->>Navegador: Devuelve HTML
    Navegador-->>Usuario: Muestra la página
```
Diagrama de Clases
```mermaid
classDiagram
    class Persona {
        -String nombre
        -int edad
        +saludar()
    }
 
    class Alumno {
        -String curso
        +matricularse()
    }
 
    class Profesor {
        -String departamento
        +evaluar()
    }
 
    Persona <|-- Alumno
    Persona <|-- Profesor
```
Diagrama ER
```mermaid
erDiagram
    CLIENTE ||--o{ PEDIDO : realiza
    PEDIDO ||--|{ LINEA_PEDIDO : contiene
    PRODUCTO ||--o{ LINEA_PEDIDO : aparece
 
    CLIENTE {
        int id_cliente PK
        string nombre
        string correo
    }
 
    PEDIDO {
        int id_pedido PK
        date fecha
        int id_cliente FK
    }
 
    PRODUCTO {
        int id_producto PK
        string nombre
        decimal precio
    }
 
    LINEA_PEDIDO {
        int id_pedido FK
        int id_producto FK
        int cantidad
    }
```
Diagrama de estado
```mermaid
stateDiagram-v2
    [*] --> Pendiente
 
    Pendiente --> EnProceso : iniciar
    EnProceso --> Finalizado : completar
    EnProceso --> Cancelado : cancelar
    Cancelado --> Pendiente : reabrir
 
    Finalizado --> [*]
```
 
Diagrama de Gantt
```mermaid
gantt
    title Desarrollo de una aplicación web
    dateFormat YYYY-MM-DD
 
    section Análisis
    Recogida de requisitos :a1, 2026-09-01, 5d
    Diseño inicial         :a2, after a1, 4d
 
    section Desarrollo
    Base de datos          :b1, after a2, 6d
    Programación backend   :b2, after b1, 10d
    Programación frontend  :b3, after b1, 10d
 
    section Pruebas
    Pruebas finales        :c1, after b2, 5d
```
 
Mapa mental
```mermaid
mindmap
    root((XML))
        Estructura
            Prólogo
            Elemento raíz
            Elementos hijos
        Sintaxis
            Etiquetas
            Atributos
            Entidades
        Validación
            DTD
            XML Schema
        Procesamiento
            DOM
            SAX
```
Línea del tiempo
```mermaid
timeline
    title Evolución de los lenguajes de marcas
 
    1986 : SGML se convierte en estándar
    1991 : Aparece HTML
    1998 : Se publica XML 1.0
    2000 : Se publica XHTML
    2014 : HTML5 se convierte en estándar
```
Gráfico circular
```mermaid
pie showData
    title Uso de lenguajes de marcas
    "HTML" : 40
    "XML" : 25
    "Markdown" : 20
    "SVG" : 10
    "Otros" : 5
```
 
Diagrama de experiencia de usuario
```mermaid
journey
    title Compra en una tienda online
 
    section Búsqueda
      Buscar producto: 5: Cliente
      Comparar precios: 4: Cliente
 
    section Compra
      Añadir al carrito: 5: Cliente
      Registrarse: 3: Cliente
      Realizar el pago: 2: Cliente
 
    section Entrega
      Recibir el pedido: 5: Cliente
```
 
Diagrama Git
```mermaid
gitGraph
    commit id: "Inicio"
    commit id: "Página principal"
 
    branch desarrollo
    checkout desarrollo
    commit id: "Nueva funcionalidad"
    commit id: "Corrección"
 
    checkout main
    merge desarrollo
    commit id: "Versión 1.0"
```