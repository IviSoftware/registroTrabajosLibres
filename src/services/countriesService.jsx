const getCountries = async ()=>{
    const data = await fetch('https://restcountries.com/v3.1/all');
    const json = await data.json();
    return json;
}

export {getCountries}