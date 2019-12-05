# Google Ads Script, pause campaigns at budget limit.
Google Ads - Pause campaigns by script at budget limit. 


## Getting Started

This script selects campaign spent of any campaigns with the selected label, compares it to budget. If the bugdet is close (buffer used to decide early cut off) or over budget, the script will pauses campaign and sends an email and campaign paused as attachement. 

Recommended to set the script to run everyhour for best chance of pausing before accurately, and avoiding overspend between two script run. 

### Config

Budget and Campaign Label :

```
var budget = 1000; // enter budget here
var label = 'Brand'; // Select Campaigns by Label

```
Dates range for the spent to pull :
```
var io_startdate = "20190101"; // YYYYMMDD
var io_enddate = "20191231"; // YYYYMMDD, 
```

### Limitation

Script only pulls non-video campaign. `AdsApp.campaigns()` would need to be replaced by `AdsApp.VideoCampaign()` to cover only video campaigns. 