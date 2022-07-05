var addTwoNumbers = function(l1, l2) {
    let newl1 = []
    let newl2 = []
    for (let i = 0; i < l1.length; i++){
        newl1.unshift(l1[i])
    }
    for (let i = 0; i < l2.length; i++){
        newl2.unshift(l2[i])
    }
    let l1int = Number(newl1.join(''))
    let l2int = Number(newl2.join(''))
     let outputInt = l1int + l2int
    const output = Array.from(String(outputInt), Number)
    
return output
    

///

var addTwoNumbers = function(l1, l2) {
    let newl1 = []
    let newl2 = []
    let output = []
    for (let i = 0; i < l1.length; i++){
        newl1.unshift(l1[i])
    }
    for (let i = 0; i < l2.length; i++){
        newl2.unshift(l2[i])
    }
    let l1int = Number(newl1.join(''))
    let l2int = Number(newl2.join(''))
     let outputInt = l1int + l2int
    let initOutput = Array.from(String(outputInt), Number)
    for (let i = 0; i < initOutput.length; i++){
        output.unshift(initOutput[i])
    }
    
return output
    
    
};
    
};