# mei-jc
Proyecto de la asignatura "Juegos por Computador" del MEI en la UPC.
"Dr. Yoshi"

# TODOLIST
- [x] Movimiento y colisiones
- [x] Retoques pantalla inicial 
    - [x] Letras brillantes,
    - [x] Virus bailando
    - [x] Yoshi bailando
- [ ] Animaciones y retoques de lógica
    - [x] Reset cápsula cada vez que se empieza
    - [x] Generación aleatoria de virus
    - [x] Animación destrucción capsula (DOING) -> FALTA LO DEL TIMER, Ha dicho que cuando hay una eliminación una capsula debería empezar un timer
    - [x] Cambio de cápsula cuando se suelte una doble (DOING)
    - [x] Más rápido tecla down
    - [x] Cápsula AISLADA cae cuando no tiene nada abajo (virus no)
    - [x] Elementos AISLADOS deben caer no sujetos y actualizarse (dividir en funciones dice)
        - [x] Lo que no esté sujeto que caiga (CHECKEAR FILAS DESDE ABAJO, PASADA POR TODO EL MAPA Y REPETIR HASTA QUE DEJE DE CAER)
        - [x] Animar eso (Conexiones son importantes)
        - [x] Que no caigan los que esten conectados y sujetos
        - [x] Volver a mirar si hay destrucción y volver a entrar al bucle
    - [x] Cambiar ovimiento lateral demasiado rápido (VARIABLE capsuleTimerX)
    - [x] Animación impacto cápsula -> Se ve que cuando llega una capsula está un poco más abajo de lo que debería y cuando se coloca en el tilemap se pone bien
    - [ ] Siguiente cápsula se muestra antes
    - [ ] Pantallita de GAME OVER + logica de game over
    - [ ] Pasar de nivel cuando te quedas sin viruses (nivel + 1, si + nivel 6 te pasaste el juego?)
    - [ ] Subir velocidad progresivamente (+1 cada 10 capsulas?)
    - [ ] Lupa con virus bailando -> Cuando pierdes se rien
    - [ ] Yoshi lanzando cápsula <- DEBERÍA PRIORIZARSE
    - [ ] Cuando pierdes se pone triste 
- [x] Texto de letras y puntuaciones (carpeta 1)
    - [x] Mostrar puntuación
    - [x] Mostrar nº viruses
    - [x] Mostrar nivel
- [ ] Músicas
    - [ ] Música de fondo (2 para juego, 1 para menu / otras pantallas)
    - [ ] Sonido tirar cápsula
    - [ ] Sonido mover izq/dcha
    - [ ] Sonido bajar capsula rápidp
    - [ ] Pulsar botón
    - [ ] Destrucción de cápsulas
    - [ ] Colisión de cápsulas
    - [ ] Nivel completado
    - [ ] Game over 

- [ ] MISCELÁNEA
    - [x] Pantalla intermedia con dificultades 
        - [x] Navegación por la pantalla
        - [x] Número de virus (generación aleatoria) (5 niveles) (DOING)
        - [x] Movimiento de las cápsulas más rápido (3 velocidades)
        - [ ] Tipo de música (chill, guay, off)
    - [x] Cambiar todos los sprites de cada escena a un mismo PNG
    - [x] Cambiar los sprites de viruses a un mismo png (EDA para 3 virus)