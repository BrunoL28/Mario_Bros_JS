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

    const mario = ([
        sprite('mario'), 
        solid(), 
        body(),
        pos(60, 0),
        origin('bot')
    ])

})

go("game")