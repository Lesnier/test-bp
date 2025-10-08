mermaid.initialize({ startOnLoad: true });
const procesarDiagramas = async () => {
  // Seleccionar todos los elementos <pre> con la clase "mermaid"
  const elementosPre = document.querySelectorAll("pre.mermaid");
  let idCounter = 0;

  for (const pre of elementosPre) {
    // El contenedor es el elemento padre del <pre>, que ya tiene la clase "diagram"
    const contenedorDiagrama = pre.parentElement;

    // Extraer el código del diagrama del <pre>
    const codigoDiagrama = pre.textContent;
    idCounter++;
    const idDiagrama = `mermaid-diagrama-${idCounter}`;

    // Renderizar el SVG a partir del código
    const { svg } = await mermaid.render(idDiagrama, codigoDiagrama);

    // Limpiar el contenedor (elimina el <pre>) y colocar el SVG renderizado
    contenedorDiagrama.innerHTML = svg;

    // Aplicar panzoom al elemento SVG que ahora está dentro de <div class="diagram">
    const svgElement = contenedorDiagrama.querySelector("svg");
    panzoom(svgElement, {
      maxZoom: 5,
      minZoom: 0.5,
      bounds: true,
    });
  }
};

// Ejecutar la función cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", procesarDiagramas);
