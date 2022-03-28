# mei-jc
Proyecto de la asignatura "Juegos por Computador" del MEI en la UPC.
"Dr. Yoshi"

# TODOLIST
- [x] Movimiento y colisiones
- [x] Retoques pantalla inicial 
    - [x] Letras brillantes,
    - [x] Virus bailando
    - [x] Yoshi bailando
- [x] Animaciones y retoques de lógica
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
    - [x] Siguiente cápsula se muestra antes
    - [x] Pasar de nivel cuando te quedas sin viruses (nivel + 1, si + nivel 6 te pasaste el juego?)
    - [x] Subir velocidad progresivamente (+1 cada 10 capsulas?)
    - [x] Fin de juego
        - [x] Lógica parar juego
        - [x] Sprite cartel ( siguiente nivel, perdiste, ganaste, pausa?)
    - [x] Lupa con virus bailando -> Cuando pierdes se rien
        - [x] Sprites virus grandes (3 para normal, 1 para explotar, 2 para cuando pierdes (se rien))
    - [x] Yoshi lanzando cápsula 
        - [x] Lógica lanzamiento capsula
        - [x] Sprite yoshi lanzando (2 para estado normal, X para lanzar capsula, 2 para cuando ganas (feliz), 2 para cuando pierdes (triste))
- [x] Texto de letras y puntuaciones (carpeta 1)
    - [x] Mostrar puntuación
    - [x] Mostrar nº viruses
    - [x] Mostrar nivel
- [ ] Asignar Músicas
    - [x] Música de fondo (2 para juego, 1 para menu / otras pantallas) [ENCONTRADA]
    - [x] Sonido tirar cápsula [ENCONTRADA]
    - [x] Sonido mover izq/dcha [ENCONTRADA]
    - [x] Pulsar botón [ENCONTRADA]
    - [x] Destrucción de cápsulas 
    - [x] Destrucción de virus
    - [x] Destrucción de virus en lupa
    - [x] Giro de capsula
    - [x] Colisión de cápsulas (misma que cuando bajan cápsulas destrucción) [ENCONTRADA]
    - [x] Nivel completado [ENCONTRADA]
    - [x] Game over [ENCONTRADA]

- [x] MISCELÁNEA
    - [x] Pantalla intermedia con dificultades 
        - [x] Navegación por la pantalla
        - [x] Número de virus (generación aleatoria) (5 niveles) (DOING)
        - [x] Movimiento de las cápsulas más rápido (3 velocidades)
        - [x] Tipo de música (chill, guay, off)
    - [x] Cambiar todos los sprites de cada escena a un mismo PNG
    - [x] Cambiar los sprites de viruses a un mismo png (EDA para 3 virus)
    - [x] PAUSA?
    - [x] Oscurecer huevos de fondo GAME
    - [x] Oscurecer fondo de lupa
- [x] BUGS:
    - [x] Cuando finaliza el juego no se puede reiniciar, solucionar eso LOL
