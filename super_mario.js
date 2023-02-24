kaboom({
    global: true,
    fullscreen: true,
    scale: 2,
    clearColor: [0,0,0,1]
})

loadRoot("https://i.imgur.com/")

loadSprite('bloco', 'M6rwarW.png')

scene("game", () =>{
    layer(["background", "object", "ui"], "object")

    const map = []

    const level_config = {
        width: 20,
        height: 20,
        '=': [sprite('bloco'), solid()]
    }

    const fase = addLevel(map, level_config)

})

go("game")