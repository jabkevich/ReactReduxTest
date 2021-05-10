const objs = {
    "testArr": [
        "string1",
        "string2",
        "string3",
        [
            "string4",
            "string5",
            [
                "string6",
                "string7",
                "string8",
                1,
                2,
                4
            ]
        ],
        "string9",
        "string10",
        "string11",
        "string12",
        "string13",
        "string14",
        "string15",
        null,
        {},
        [
            null,
            [
                5,
                6,
                7
            ]
        ],
        "string16"
    ]
}

function smoothingArr(objs, newObject){
    for(let i = 0; i<objs.length; i++){
            if(Array.isArray(objs[i])){
                smoothingArr(objs[i], newObject)
            }else{
                newObject.push(objs[i])
            }
    }
    return newObject
}

function smoothing(objs){
    let newArray = []
    if(!Array.isArray(objs)){
        let obj
        for (obj in objs) {
            if(objs.hasOwnProperty(obj)){
                newArray = smoothingArr(objs[obj], newArray)
            }
        }
    }else{
        newArray = smoothingArr(objs, newArray)
    }
    return newArray
}

const smoothArray = smoothing(objs)
console.log(smoothArray)

function primitivesSort(array){
    let newArray = []
    let k = 0;
    const primitives = {}
    for(let i =0; i< array.length; i++){
        if (!(typeof array[i] in primitives))
            primitives[typeof array[i]] = k++
        if(!Array.isArray(newArray[primitives[typeof array[i]]]))
            newArray[primitives[typeof array[i]]]=[]
        newArray[primitives[typeof array[i]]].push(array[i])
    }
    return newArray
}


console.log(primitivesSort(smoothArray))