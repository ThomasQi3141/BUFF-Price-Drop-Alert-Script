import os
import smtplib # pip3 install smtplib
from email.message import EmailMessage
from email.utils import formataddr
from pathlib import Path


from dotenv import load_dotenv # pip3 install python-dotenv

PORT = 587
EMAIL_SERVER = "smtp-mail.outlook.com"

# Load environment variables 
current_dir = Path(__file__).resolve().parent if "__file__" in locals() else Path.cwd()
envars = current_dir / ".env"
load_dotenv(envars)

# Read environment variables
sender_email = os.getenv("EMAIL")
password_email = os.getenv("PASSWORD")



# Function to send email
def send_email(subject, receiver_email):
    msg = EmailMessage()
    msg["Subject"] = subject
    msg["From"] = formataddr(("BUFF Price Automation", f"{sender_email}"))
    msg["To"] = receiver_email
    msg["BCC"] = sender_email
    with open("./extracted_data.txt", "r") as f:
        msg.set_content(
            "Item:Current Price\n" + f.read()
        )
    with smtplib.SMTP(EMAIL_SERVER, PORT) as server:
        server.starttls()
        server.login(sender_email, password_email)
        server.sendmail(sender_email, receiver_email, msg.as_string())

# Calls the send_email function
if __name__ == "__main__":
    send_email(
        subject="Price Update",
        receiver_email="thomaszhaojieqi@gmail.com",
    )
