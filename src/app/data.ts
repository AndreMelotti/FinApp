
export async function Data(){
    const data = await fetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL")
    .then((response)=> {return response.json()})
    // .then((json)=>setDollar(json))
    .then((dollar)=>console.log(dollar))
    .catch((err)=> console.log(err))

    return data
}

console.log(Data())