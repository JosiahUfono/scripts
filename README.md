# scripts

Script Name: NGX Price Picker
Description: 
  This script fetches the current NGX stock prices by parsing the stock ticker into the NGXPRICE formular
  in your online spreedsheet. (e.g =NGXPRICE("DANGCEM") returns Dangote cement's current stock price).
  Where the ticker is wrong or doesn't exist, it returns a "ticker not found" error message.
  Replace the apiKey value in the NgxStickPrice script with your personal apikey generated from ngxpulse.ng.

 The GET_ALL_TICKERS() function returns the current list of NGX stock tickers alongside their company names.
