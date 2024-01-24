<h2>Price Drop Alert Bot</h2></br>

Have you ever wanted to buy a skin through Netease BUFF marketplace but were limited by your budget? Built using Python, Selenium, and SMTPlib, this script automatically web-scrapes Netease BUFF marketplace and alerts you on the prices of your favourite skins through email.<br>


<h3>Note: This README is outdated. However, the original script is still inside the "script" folder and would work with the current directions. </h3>

### Tools/Technologies Used: <br/>
<ul>
  <li><a href="https://www.selenium.dev/">Selenium</a></li>
  <li><a href="https://docs.python.org/3/library/smtplib.html">SMTPlib</a></li>
  <li><a href="https://pypi.org/project/python-dotenv/">python-dotenv</a></li>
  <li><a href="https://pypi.org/project/webdriver-manager/">webdriver_manager/Chromedriver</a></li>
  <li><a href="https://aws.amazon.com/ec2/">AWS EC2</a></li>
</ul>

### How does this script work? <br/>

➡️ The script opens an instance of the BUFF marketplace website using Selenium and Chromedriver<br/>
➡️ By reusing cookies, the script effectively bypasses the 2FA authentication required for the BUFF Marketplace website<br/>
➡️ Items and desired prices are then read from “items.txt” <br/>
➡️ Each item is then searched and opened on BUFF marketplace. <br/>
➡️ The price of the lowest listing of each item is then web-scraped. <br>
➡️ If the price of the item is lower than the desired price, it is saved to “extracted_data.txt”<br/>
➡️ main.py then runs send_email.py<br/>
➡️ The automation email address is read from the .env file. Using SMTPlib, “send_email.py” automatically  sends an email to your personal email address. <br/>



### To Use:

**Step 1: Download** <br>
Download all of the files and save them into a folder. Open the project folder using the text editor of your choice.

**Step 2: Install Required Packages** <br>
Using your terminal, install selenium, smtplib, python-dotenv, and webdriver_manager.

**Step 3: Bypass two-factor authentication login using cookies** <br>
Log into Netease BUFF and copy all of the cookies. You can do so by clicking Inspect > Application > Cookies on Chrome then copying everything. Open up Excel/Google Sheets and paste the cookies into a new spreadsheet, following the format shown below (rename the first 3 cells in the row as "name", "value", "domain"). Delete every other column except for the first 3. Download the file as a .csv file and rename it to "buff_cookies.csv". Drag it into the same folder as this project. You may find <a href="https://www.youtube.com/watch?v=vhjKJ7huN-w&t=435s">this video</a> helpful.

<img width="361" alt="Screenshot 2024-01-06 at 12 32 38 AM" src="https://github.com/ThomasQi3141/BUFF_Price_Drop_Alert_Script/assets/131242218/a83baf77-dbae-4f9a-a94f-9a81179efac2"><br>



**Step 4: Specify items and desired prices** <br>
Open items.txt and add items you wish to purchase, as well as the price you wish to buy them for (their “desired price”) using the format shown below. Make sure that the item names are exactly how they appear on BUFF.

<img width="539" alt="Screenshot 2024-01-06 at 12 44 57 AM" src="https://github.com/ThomasQi3141/BUFF_Price_Drop_Alert_Script/assets/131242218/84f36ee6-ae66-468c-a137-253446769ca5"><br>


**Step 5: Set up the .env file** <br>
Make a new file called ".env". Using an existing email address, fill in the fields in the .env file as shown below. The Python script will use this email to send alert emails to your personal email. <br> <br>**Note:** It is recommended to use an Outlook email for this purpose, as it is free and SMTP settings allow for automation by default. 

<img width="359" alt="Screenshot 2024-01-06 at 12 42 35 AM" src="https://github.com/ThomasQi3141/BUFF_Price_Drop_Alert_Script/assets/131242218/ad049f9a-6844-414c-a477-2d41aae3d5a7"><br>


**Step 6: Set up receiver email** <br>
On line 44 of send_email.py, replace the dummy text with your personal email (the email address that you want to receive notifications in). 

**Step 7: Set up AWS EC2 instance** <br>
Finish automating this process by setting up your own AWS EC2 instance! You may find <a href="https://praneeth-kandula.medium.com/launching-and-connecting-to-an-aws-ec2-instance-6678f660bbe6"> this guide</a> helpful. <br><br><br>




### Troubleshooting: <br>
**SMTP Errors:** These errors are mainly caused by your email service provider (for the email address that sends the automated emails). <a href="https://stackoverflow.com/questions/38602682/smtplib-smtpauthenticationerror-535-5-7-3-authentication-unsuccessful">This thread</a> may be helpful. 
