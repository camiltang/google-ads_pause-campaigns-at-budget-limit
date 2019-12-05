/**
 *  
 * @description: Google Ads - Pause campaign by script at budget limit. 
 * @author: Camil Tang-Turcotte
 * 
 */

// ----- Settings --------------------------------------- 

var budget = 1000; // enter budget here
var label = 'Brand'; // Select Campaigns by Label

var client = ''; // client name here 
var safe_buffer = 0.025; // %
var email = ''; // email to send alert here
var io_startdate = "20190101"; // YYYYMMDD
var io_enddate = "20191231"; // YYYYMMDD

// ----- Function --------------------------------------- 

function main() {
  var spent = getcost();
  var currentAccount = AdsApp.currentAccount();
  Logger.log('Customer ID: ' +  currentAccount.getCustomerId() + '\nAccount: ' + currentAccount.getName() + '\nCurrency Code: ' + currentAccount.getCurrencyCode() + '\nSpend: ' + spent.toFixed(2) + ' $ \nBudget: ' + budget.toFixed(2) + ' $ \nAttached campaignns were paused. \n');

  if (spent > (budget * (1 - safe_buffer))) {
    var campaigns = AdsApp.campaigns().withCondition("Status = ENABLED").withCondition("LabelNames CONTAINS_ANY [" + label + "]").get();
    var csv = 'Campaign ID,Campaign';
    
    while (campaigns.hasNext()) { // iterate around all campaigns with Label
      var campaign = campaigns.next();
      campaign.pause();
      var row = [campaign.getId(),campaign.getName()];
      csv += '\n' + row.join(',');
    }
    
    MailApp.sendEmail(email, 'Campaign paused by Script | Budget limit | ' + client, Logger.getLog(),{attachments:[{fileName: 'paused_campaigns.csv', mimeType: 'text/csv', content: csv}]});
    Logger.log('SENT')
  }
  else {
    Logger.log("Not Sent")
  }
}

function getcost() {
  var value = 0;
  var campaigns = AdsApp.campaigns().withCondition("LabelNames CONTAINS_ANY [" + label + "]").get();

  while (campaigns.hasNext()) { // iterate around all campaigns with Label
    var campaign = campaigns.next();
    var cost = campaign.getStatsFor(io_startdate, io_enddate).getCost();
    value = value + cost;
  }
  
  //Logger.log(value.toFixed(2) + ' | Total'); 
  return value; //return cost value for entire period, of campaign with Label. 
}
