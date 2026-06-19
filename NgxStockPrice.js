/**
Script Name: NGX Price Picker
Author: ufono, Josiah U.
Email: ufonojosiah@gmail.com
Date: 2026-06-18
Description: 
  This script fetches the current NGX stock prices by parsing the stock ticker into the NGXPRICE formular
  in your online spreed sheet. (e.g =NGXPRICE("DANGCEM") returns Dangote cement current stock price).
  Where the ticker is wrong or doesn't exist, it returns a "ticker not found" error message.

  The GET_ALL_TICKERS() function returns the current list of NGX stock tickers alongside their company names.

  Replace the apiKey value in this script with your personal API key generated from ngxpulse.ng.
 */

function NGXPRICE(ticker) {

  // Replace this with your actual NGXpulse API key
const apiKey = "enter your api key within this quotes";
  
const url = "https://www.ngxpulse.ng/api/ngxdata/stocks";
  const options = {
    "method": "GET",
    "headers": {
      "X-API-Key": apiKey
    },
    "muteHttpExceptions": true
  };
  
  try {
    const response = UrlFetchApp.fetch(url, options);
    const responseCode = response.getResponseCode();
    const responseText = response.getContentText();
    
    // Check for HTTP errors
    if (responseCode !== 200) {
      return "API Error (" + responseCode + "): " + responseText.substring(0, 40);
    }
    
    const json = JSON.parse(responseText);
    
    // Determine where the array of stocks is located in the JSON
    let stockArray = null;
    if (Array.isArray(json)) {
      stockArray = json;
    } else if (json && json.data && Array.isArray(json.data)) {
      stockArray = json.data;
    } else if (json && json.stocks && Array.isArray(json.stocks)) {
      stockArray = json.stocks; // <--- This handles your specific API format
    } else {
      return "Unexpected Format: " + responseText.substring(0, 40);
    }
    
    // Find the specific stock matching the requested ticker symbol
    const stock = stockArray.find(item => item.symbol && item.symbol.toUpperCase() === ticker.toUpperCase());
    
     if (stock) {
      return stock.current_price;
    } else {
      return "Ticker Not Found";
    }
  } catch (error) {
    return "Script Error: " + error.toString();
  }
}


function GET_ALL_TICKERS() {
  const apiKey = "enter your api key within this quotes"; // Don't forget to add your API key here too!
 
  const url = "https://www.ngxpulse.ng/api/ngxdata/stocks";
  
  const options = {
    "method": "GET",
    "headers": {
      "X-API-Key": apiKey
    },
    "muteHttpExceptions": true
  };
  
  try {
    const response = UrlFetchApp.fetch(url, options);
    if (response.getResponseCode() !== 200) return [["Error fetching data"]];
    
    const json = JSON.parse(response.getContentText());
    let stockArray = json.stocks || json.data || json; 
    
    if (!Array.isArray(stockArray)) return [["Unexpected API format"]];
    
    // Create an array starting with headers
    let result = [["Ticker Symbol", "Company Name"]];
    
    // Loop through the stocks and extract the symbol and name
    stockArray.forEach(stock => {
      if (stock.symbol) {
        result.push([stock.symbol, stock.name || ""]);
      }
    });
    
    return result;
    
  } catch (error) {
    return [["Script Error", error.toString()]];
  }
}
