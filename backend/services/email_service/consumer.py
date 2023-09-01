import json
import os
import time
from pika.exceptions import AMQPConnectionError
import pika
import smtplib
from email.message import EmailMessage

SENDER_EMAIL = os.environ.get("SENDER_EMAIL")
SENDER_PASSWORD = os.environ.get("SENDER_PASSWORD")


# Consumer
def consume_message():
    # Set the hostname that we'll connect to
    parameters = pika.ConnectionParameters(host="rabbitmq")
    # Create a connection to RabbitMQ
    connection = pika.BlockingConnection(parameters)
    # Open a channel to RabbitMQ
    channel = connection.channel()
    # Create a queue if it does not exist
    queue = "email-task"
    channel.queue_declare(queue=queue)

    channel.basic_consume(queue=queue, on_message_callback=send_email, auto_ack=True)
    print(f" [*] Waiting for messages in {queue}. To exit press CTRL+C")

    channel.start_consuming()


def send_email(ch, method, properties, body):
    message = json.loads(body)
    print(f" [x] Received {message}")
    # creates SMTP session
    s = smtplib.SMTP("smtp.gmail.com", 587)

    # start TLS for security
    s.starttls()

    # Authentication
    s.login(SENDER_EMAIL, SENDER_PASSWORD)

    # message to be sent
    html = f"""<!DOCTYPE html>
            <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Your HTML Title</title>
            <body>
            <h1>{message["message"]}</h1>
            </body>
            </html>
            """
    try:
        msg = EmailMessage()
        msg.set_content(
            "simple text would go here - This is a fallback for html content"
        )
        msg.add_alternative(html, subtype="html")
        msg["Subject"] = message["subject"]
        msg["From"] = "italizv@gmail.com"
        msg["To"] = message["email"]
        s.send_message(msg)
    except Exception:
        print("Something went wrong!!!")

    # terminating the session
    s.quit()


if __name__ == "__main__":
    while True:
        try:
            consume_message()
        except AMQPConnectionError:
            print("Could not connect to RabbitMQ")
            time.sleep(2.0)
