<h2>BUFF Price Web Scraper</h2></br>

Have you ever wanted to keep track of skin prices on BUFF marketplace without manually checking? Built using React, Express, Selenium, and SMTPlib, this app automatically web-scrapes BUFF marketplace, alerting you on the prices of your favourite skins through email. <br>

### Demo Video:
[<img width="1512" alt="Screenshot 2024-01-30 at 3 53 35 PM" src="https://github.com/ThomasQi3141/BUFF-Price-Web-Scraper/assets/131242218/bfed9df6-b2d3-426e-8266-8712daf4487a" width="50%">](https://youtu.be/FJNyKdG10nA)



### Tools/Technologies Used: <br/>
<ul>
  <li><a href="https://react.dev/">React.js</a></li>
  <li><a href="https://expressjs.com/">Express.js</a></li>
  <li><a href="https://www.selenium.dev/">Selenium</a></li>
  <li><a href="https://docs.python.org/3/library/smtplib.html">SMTPlib</a></li>
  <li><a href="https://pypi.org/project/python-dotenv/">python-dotenv</a></li>
  <li><a href="https://pypi.org/project/webdriver-manager/">webdriver_manager/Chromedriver</a></li>
  <li><a href="https://aws.amazon.com/ec2/">AWS EC2</a></li>
</ul>

### How does this app work?<br />

➡️ After entering items and clicking on get prices, the front-end sends an api request to the back-end hosted on AWS EC2<br />
➡️ After receiving the API request, the back-end runs the Python script as a child process<br />
➡️ The script opens an instance of the BUFF marketplace website using Selenium and Chromedriver ➡️ By reusing cookies, the script effectively bypasses the 2FA authentication required for the BUFF Marketplace website<br />
➡️ The price of the lowest listing of each item is then web-scraped<br />
➡️ The back-end relays the information back to the front-end, which is then displayed.<br />
➡️ When the “Email Me” button is clicked, the front-end sends an api request to the back-end, running “send_email.py” as a child process<br />
➡️ The automation email address is read from the .env file. Using SMTPlib, “send_email.py” automatically sends an email to your personal email address<br />




### Troubleshooting: <br>
**SMTP Errors:** These errors are mainly caused by your email service provider (for the email address that sends the automated emails). <a href="https://stackoverflow.com/questions/38602682/smtplib-smtpauthenticationerror-535-5-7-3-authentication-unsuccessful">This thread</a> may be helpful. >br />
**Note:** The web scraper script can be found in the script folder.
