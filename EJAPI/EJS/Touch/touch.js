/* 

Las listas de toques disponibles son:

touches: lista de todos los puntos de contacto individuales, independientemente del elemento objetivo del evento o del cambio de estado.
targetTouches: lista de todos los puntos de contacto individuales que se iniciaron en el mismo elemento que es el objetivo del evento.
changedTouches: lista de todos los puntos de contacto individuales cuyos estados cambiaron entre el evento táctil anterior y este. Dependiendo del evento:
Para el evento de touchstart, es una lista de los puntos de contacto que se activaron con el evento actual
Para el evento touchmove, es una lista de los puntos táctiles que han cambiado desde el último evento
Para el evento de touchend, es una lista de puntos táctiles correspondientes a los dedos que ya no tocan la superficie
Los eventos posibles son:

touchstart: enviado cuando el usuario toca la pantalla con el dedo
touchend: enviado cuando se levanta el dedo/punto de contacto de la pantalla
touchmove: enviado cuando el usuario mueve un punto táctil a lo largo de la superficie
touchcancel: se activa cuando un punto de contacto se ha interrumpido de una manera específica dependiente de la implementación. Por ejemplo, demasiados puntos de contacto
Touch
El objeto Touch contiene propiedades interesantes que nos permiten implementar gestos de interacción multitáctil, como:

identifier: identificador único del punto de contacto.
screenX/screenY: coordenadas x/y del punto de contacto relativas la esquina superior izquierda de la pantalla.
clientX/clientY: coordenadas x/y del punto de contacto relativas a la esquina superior izquierda de la vista del navegador, sin incluir ningún offset de desplazamiento.
pageX/pageY: coordenadas x/y del punto de contacto en relación con la ventana gráfica, incluido cualquier desplazamiento.


*/

