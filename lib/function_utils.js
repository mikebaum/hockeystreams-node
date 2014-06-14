
function asArray(quasiArray, start) {
    var result = [];
    for (var i = (start || 0); i < quasiArray.length; i++)
        result.push(quasiArray[i]);
    return result;
}

function partial(func) {
    var fixedArgs = asArray(arguments, 1);
    return function(){
        return func.apply(null, fixedArgs.concat(asArray(arguments)));
    };
}

exports.partial = partial;