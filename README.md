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
    - [ ] Animación destrucción capsula (DOING) -> FALTA LO DEL TIMER, Ha dicho que cuando hay una eliminación una capsula debería empezar un timer
    - [x] Cambio de cápsula cuando se suelte una doble (DOING)
    - [x] Más rápido tecla down
    - [ ] Cápsula AISLADA cae cuando no tiene nada abajo (virus no)
    - [ ] Elementos AISLADOS deben caer no sujetos y actualizarse (dividir en funciones dice)
        - [ ] Lo que no esté sujeto que caiga (CHECKEAR FILAS DESDE ABAJO, PASADA POR TODO EL MAPA Y REPETIR HASTA QUE DEJE DE CAER)
        - [ ] Animar eso (Conexiones son importantes)
        - [ ] Que no caigan los que esten conectados y sujetos
        - [ ] Volver a mirar si hay destrucción y volver a entrar al bucle
        
    - [ ] Siguiente cápsula se muestra antes
    - [x] Cambiar ovimiento lateral demasiado rápido (VARIABLE capsuleTimerX)
    - [x] Animación impacto cápsula -> Se ve que cuando llega una capsula está un poco más abajo de lo que debería y cuando se coloca en el tilemap se pone bien
    - [ ] Lupa con virus bailando -> Cuando pierdes se rien
    - [ ] Yoshi lanzando cápsula <- DEBERÍA PRIORIZARSE
    - [ ] Cuando pierdes se pone triste 
    - [ ] Pantallita de GAME OVER
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
- [ ] Texto de letras y puntuaciones (carpeta 1)
    - [ ] Mostrar puntuación
    - [ ] Mostrar nº viruses
    - [ ] Mostrar nivel
- [ ] MISCELÁNEA
    - [x] Pantalla intermedia con dificultades 
        - [x] Navegación por la pantalla
        - [x] Número de virus (generación aleatoria) (5 niveles) (DOING)
        - [x] Movimiento de las cápsulas más rápido (3 velocidades)
        - [ ] Tipo de música (chill, guay, off)
    - [x] Cambiar todos los sprites de cada escena a un mismo PNG
    - [x] Cambiar los sprites de viruses a un mismo png (EDA para 3 virus)