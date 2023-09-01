import os
import pika
import json

RABBITMQ_HOST = os.environ.get("RABBITMQ_HOST")


def publish_message(message: dict = {}):
    connection = pika.BlockingConnection(pika.ConnectionParameters(RABBITMQ_HOST))
    channel = connection.channel()

    queue = "email-task"
    channel.queue_declare(queue=queue)

    channel.basic_publish(exchange="", routing_key=queue, body=json.dumps(message))
    print(f"[x] Sent {message}")
    connection.close()


if __name__ == "__main__":
    publish_message()
