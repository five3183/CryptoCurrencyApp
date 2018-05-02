//coin app iterates through an array, executes apis and returns data
const coinArray = ["BTC", "ETH", "XRP", "BCH", "ADA", "XLM", "NEO", "LTC", "EOS", "XEM"]
var URL = "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=";
var currency = "&tsyms=USD"
var returnArray = [];
let Price
let Open
let High
let Low
    // async await routine to execute api using ajax for every entry in the
    // coinArray. The array.map function us used to iterate through the coin Array
    // and for every entry ( denoted by c ) it calls getPrice.
    // do the nature of array.map -- the cArray is populated with each Promise
    // for getPrice ... when array.map is completed we execute Promise.all to
    // issue the complete the processing of the promise/ajax calls
const getAllPrices = async(coinArray) => {
    const cArray = coinArray.map(async c => {
        const response = await getPrice(c)
        return response
    });
    const newArray = await Promise.all(cArray);
    // ... do some stuff
    return newArray
}
const getPrice = (a) => {
    return new Promise((resolve, reject) => {
        $.ajax({
                url: URL + a + currency,
                method: "GET",
            })
            .then((response) => {
                resolve(response.DISPLAY)
            })
    })
}


////////////////////////////////////////////////////
getAllPrices(coinArray).then((newArray) => {
    // using spread operator to copy the array -- because these are complex objects
    // this is covered later in course when we hit es6
    returnArray = [...newArray]
        // entire array of complex objects
    console.log("======= Array of Complex Objects  =======")
    console.log(returnArray)
    console.log("Results for 1st item in the array")
    Price = returnArray[0].BTC.USD.PRICE
    Open = returnArray[0].BTC.USD.OPENDAY
    High = returnArray[0].BTC.USD.HIGHDAY
    Low = returnArray[0].BTC.USD.LOWDAY
    console.log("Price for coin BTC " + Price)
    console.log("Opening for coin BTC " + Open)
    console.log("High for coin BTC " + High)
    console.log("Low for coin BTC " + Low)
    console.log("Results for last item in the array")
        // subtract 1 from the length to determine the last item in Array
    let t = coinArray.length - 1
    let coin = coinArray[t]
    console.log(returnArray[t])
    Price = returnArray[t][coin].USD.PRICE
    Open = returnArray[t][coin].USD.OPENDAY
    High = returnArray[t][coin].USD.HIGHDAY
    Low = returnArray[t][coin].USD.LOWDAY
    console.log("Price for " + coin + " = " + Price)
    console.log("Opening for " + coin + " = " + Open)
    console.log("High for " + coin + " = " + High)
    console.log("Low for " + coin + " = " + Low)
        // can also build a for loop and iterate through returnArray logging all values  
    let i = 0
    coinArray.forEach((c) => {
        let coin = coinArray[i]
		price = (returnArray[i][coin].USD.PRICE)
		cap = (returnArray[i][coin].USD.MKTCAP)
		open = (returnArray[i][coin].USD.OPENDAY)
		high = (returnArray[i][coin].USD.HIGHDAY)
		low = (returnArray[i][coin].USD.LOWDAY)
		coinNme = coin

		console.log(coin + " price " + price)
		console.log(coin + " Open " + open)
		console.log(coin + " High " + high)
		console.log(coin + " Low " + low)

		let tBody = $("tbody")
		let tRow = $("<tr>")

		coinNme = $("<td>").text(coinNme)
		coinPrice = $("<td>").text(price)
		coinCap = $("<td>").text(cap)
		coinHigh = $("<td>").text(high)
		coinLow = $("<td>").text(low)

		tRow.append(coinNme, coinPrice, coinCap, coinHigh, coinLow)
		tBody.append(tRow)
        i++
    })

})