export function classNames(...params) {
    let result = [];
    if (typeof params[0] == 'object') {
        for (let prop in params[0]) 
            params[0][prop] && result.push(prop);
    }
    else result = params;
    return result.join(' ');
}