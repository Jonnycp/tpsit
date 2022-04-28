const getLevels = () => {
    return fetch("./assets/data/levels.json")
        .then(response => response.json() )
}

const getLevelsArrayPromise = () => {
    let array = [];
    return getLevels()
    .then(levels => {
        levels.forEach(level => {
            level.levels.forEach(l => {
                array.push(l)
            })
        })
    })
    .then(l => array)   
}

const getLevelsArray = (levels) => {
    let array = [];
    levels.forEach(level => {
        level.levels.forEach(l => {
            array.push(l)
        })
    })
    return array;
}

const getLevelId = () => {
    const queryParams = new URLSearchParams(location.search);
    return queryParams.get("level");
}