kaboom({
    global: true,
    fullscreen: true,
    scale: 2,
    clearColor: [0,0,0,1]
})

loadRoot("https://i.imgur.com/")

loadSprite('bloco', 'M6rwarW.png')
loadSprite('goomba', 'KPO3fR9.png')
loadSprite('surprise', 'gesQ1KP.png')
loadSprite('openedsurprise', 'bdrLpi6.png')
loadSprite('coin', 'wbKxhcd.png')
loadSprite('cogumelo', '0wMd92p.png')
loadSprite('tubo-esquerdo', 'ReTPiWY.png')
loadSprite('tubo-direito', 'hj2GK4n.png')
loadSprite('tubo-esquerdo-reverse', 'c1cYSbt.png')
loadSprite('tubo-direito-reverse', 'nqQ79eI.png')
loadSprite('brick', 'pogC9x5.png')
loadSprite('blue-block', 'fVscIbn.png') 
loadSprite('blue-brick', '3e5YRQd.png') 
loadSprite('blue-steel', 'gqVoI2b.png') 
loadSprite('blue-goomba', 'SvV4ueD.png')

loadSprite('mario', 'OzrEnBy.png', {
    sliceX: 3.9,
    anims: {
        idle: {
            from: 0,
            to: 0,
        },
        move: {
            from: 1,
            to: 2,
        },
    },
});

let _jump = true
let _big = false

scene("preview", () => {
    add([text('Use the key arrows to move and space to jump', 10), origin('center'), pos(width()/2, height()/2 - 80)])
    add([text('To go down the pipe, press the down arrow when you are on top of it', 10), origin('center'), pos(width()/2, height()/2 - 60)])
    add([text('If you jump under a surprise box, they might drop a coin or a mushroom', 10), origin('center'), pos(width()/2, height()/2 - 40)])
    add([text('The game has four levels and every coin', 10),  origin('center'), pos(width()/2, height()/2 - 20)])
    add([text('You collect will increase your score by 1', 10),  origin('center'), pos(width()/2, height()/2)])
    add([text('If you collect a mushroom, it increases you in size', 10),  origin('center'), pos(width()/2, height()/2 + 20)])
    add([text('If you touch a goomba, when you are small, you die.', 10), origin('center'), pos(width()/2, height()/2 + 40)])
    add([text('If you are big, go back to small size', 10), origin('center'), pos(width()/2, height()/2 + 60)])
    add([text('Press P to start', 10), origin('center'), pos(width()/2, height()/2 + 80)])
    add([text('GOOD GAME', 10), origin('center'), pos(width()/2, height()/2 + 100)])
    keyPress('p', () => {
        go("game", {level: 0, score: 0, big: _big})
    })
})

scene("game", ({ level, score, big }) => {
    layer(["background", "object", "ui"], "object")

    const maps = [
        [
            '+                                    +',
            '+                                    +',
            '+                                    +',
            '+                                    +',
            '+                                    +',
            '+                                    +',
            '+                                    +',
            '+                                    +',
            '+                                    +',
            '+                                    +',
            '+     %=        =*=%=                +',
            '+                                    +',
            '+                                ~(  +',
            '+          $$$$          ^   ^   )-  +',
            '======================================',
        ],
        [
            '/                                     /',
            '/                                     /',
            '/        =%%===                       /',
            '/                                     /',
            '/                         x           /',
            '/!!!!!!!!!!!!!!!!!!!!!!!!!!!!         /',
            '/                                     /',
            '/                                     /',
            '/                                     /',
            '/         !!!!!!!!!!!!!!!!!!!!!!!!!!!!/',
            '/                                     /',
            '/                                     /',
            '/                                     /',
            '/                  z z                /',
            '/   %            z z z z              /',
            '/              z z z z z z       ~(   /',
            '/            z z z z z z z z     )-   /',
            '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',
        ],
        [
            '                                     ',
            '                             !       ',
            '                            %%%%%%   ',
            '                     !               ',
            '             %%    %%%%%             ',
            '      %%%                            ',
            '                                     ',
            '   %                                 ',
            '                                     ',
            '                                  ~( ',
            '=     !    !   =  ^  ^    !    !  )- ',
            '===========================    =====/',
          ],
          [
            '=                                   =',
            '=                                   =',
            '=                                   =',
            '=                                   =',
            '=                                   =',
            '=    ======          =              =',
            '=                 =  =  =           =',
            '=              =  =  =  =  =    ~(  =',
            '=              =  =  =  =  =    )-  =',
            '=====================================',
          ],
          /*
          [
            '/                                   /',
            '/        $   $                      /',
            '/     $  z  z  $                    /',
            '/     z  z  z  z   x   ^            /',
            '/!!!!!!!!!!!!!!!!!!!!!!!!!!         /',
            '/                                   /',
            '/                                   /',
            '/                $$$$$              /',
            '/               }}}}}}}             /',
            '/                                   /',
            '/                          $$$$$$   /',
            '/          !!!!!!!!!!!!!!!!!!!!!!!!!/',
            '/                                   /',
            '/$                                  /',
            '/=                                  /',
            '/                                   /',
            '/     z z z z                       /',
            '/    zzzzzzzzz   x   x              /',
            '/=========================          /',
            '/                                   /',
            '/                                   /',
            '/                             $$$$$$/',
            '/               $$$$$$        ======/',
            '/               ======              /',
            '/                                   /',
            '/ =%%=                              /',
            '/                x   x              /',
            '/!!!!!!!!    !!!!!!!!!!!!!!!! !!!!!!/',
            '',
          ],
          */
    ]

    const level_config = {
        width: 20,
        height: 20,
        '=': [sprite('bloco'), solid()],
        '#': [sprite('cogumelo'), 'cogumelo', body()],
        '}': [sprite('openedsurprise'), solid()],
        '^': [sprite('goomba'), 'dangerous'],
        '$': [sprite('coin'), 'coin'],
        '%': [sprite('surprise'), solid(), 'coin-surprise'],
        '*': [sprite('surprise'), solid(), 'cogumelo-surprise'],
        '~': [sprite('tubo-esquerdo'), solid(), 'tubo', scale(0.5)],
        '(': [sprite('tubo-direito'), solid(), 'tubo', scale(0.5)],
        ')': [sprite('tubo-esquerdo-reverse'), solid(), scale(0.5)],
        '-': [sprite('tubo-direito-reverse'), solid(), scale(0.5)],
        '+': [sprite('brick'), solid()],
        '!': [sprite('blue-block'), solid(), scale(0.5)],
        '/': [sprite('blue-brick'), solid(), scale(0.5)],
        'z': [sprite('blue-steel'), solid(), scale(0.5)],
        'x': [sprite('blue-goomba'), body(), 'dangerous', scale(0.5)],
    }

    const fase = addLevel(maps[level], level_config)

    const scoreLabel = add([
        text('Moedas: ' + score, 10),
        pos(20, 5),
        layer('ui'),
        {
            value: score
        }
    ])

    add([text('Level: ' + parseInt(level + 1), 10), pos(12, 30)])

    function big(){
        return{
            isBig(){
                return _big
            },
            smallify(){
                this.scale = vec2(1)
                _big = false
            },
            biggify(){
                this.scale = vec2(1.5)
                _big = true
            },
        }
    }

    const mario = add([
        sprite('mario', {
            animSpeed: 0.1,
            frame: 0
        }), 
        solid(), 
        body(),
        big(),
        pos(60, 0),
        origin('bot'),
        {
            speed: 120
        }
    ])

    if(_big){
        mario.biggify()
    }

    keyDown('left', () => {
        mario.flipX(true)
        mario.move(-120, 0)
    })

    keyDown('right', () => {
        mario.flipX(false)
        mario.move(120, 0)
    }) 

    keyPress('space', () => {
        if(mario.grounded()){
            mario.jump(390)
            _jump = true
        }
    })

    keyPress('left', () => {
        mario.flipX(true)
        mario.play('move')
    })

    keyPress('right', () => {
        mario.flipX(false)
        mario.play('move')
    })

    keyRelease('left', () => {
        mario.play('idle')
    })

    keyRelease('right', () => {
        mario.play('idle')
    })

    action('dangerous', (object) => {
        object.move(-20, 0)
    })

    mario.action(() => {
        if(mario.grounded()){
            _jump = false
        }
    })

    mario.on('headbutt', (object) => {
        if(object.is('coin-surprise')){
            fase.spawn('$', object.gridPos.sub(0, 1))
            destroy(object)
            fase.spawn('}', object.gridPos.sub(0, 0))
        }

        if(object.is('cogumelo-surprise')){
            fase.spawn('#', object.gridPos.sub(0, 1))
            destroy(object)
            fase.spawn('}', object.gridPos.sub(0, 0))
        }
    })

    action('cogumelo', (object) => {
        object.move(20, 0)
    })

    mario.collides('cogumelo', (object) => {
        destroy(object)
        mario.biggify()
    })

    mario.collides('dangerous', (object) => {
        if(_jump){
            destroy(object)
        }else{
            if(_big){
                mario.smallify()
            }else{
                go("lose", ({score: scoreLabel.value}))
            }
        }
    })

    mario.collides('coin', (object) => {
        destroy(object)
        scoreLabel.value++
        scoreLabel.text = 'Moedas: ' + scoreLabel.value
    })

    mario.collides('tubo', () => {
        keyPress('down', () => {
            go("game", {
                level: (level + 1) % maps.length,
                score: scoreLabel.value,
                big: _big
            })
        })
    })

})

scene("lose", ({score}) => {
    add([ text('Score: ' + score, 10), origin('center'), pos(width()/2, height()/2)])
    add([text('Press Space to return', 10), origin('center'), pos(width()/2, height()/2 + 20)])
    keyPress('space', () => {
        go("game", {level: 0, score: 0, big: _big})
    })
})

go("preview")