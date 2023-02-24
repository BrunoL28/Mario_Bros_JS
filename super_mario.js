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
loadSprite('mario', 'Wb1qfhK.png')
loadSprite('cogumelo', '0wMd92p.png')

let _jump = true
let _big = false

scene("game", () =>{
    layer(["background", "object", "ui"], "object")

    const map = [
        '=                                    =',
        '=                                    =',
        '=                                    =',
        '=                                    =',
        '=                                    =',
        '=                                    =',
        '=                                    =',
        '=                                    =',
        '=                                    =',
        '=                                    =',
        '=     %=        =*=%=                =',
        '=                                    =',
        '=                                    =',
        '=          $$$$          ^   ^   ^   =',
        '======================================',
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
    }

    const fase = addLevel(map, level_config)

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
        sprite('mario'), 
        solid(), 
        body(),
        big(),
        pos(60, 0),
        origin('bot')
    ])

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

})

go("game")