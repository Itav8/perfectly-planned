import pika
import json


def publish_message(message: dict = {}):
    connection = pika.BlockingConnection(pika.ConnectionParameters("rabbitmq"))
    channel = connection.channel()

    queue = "email-task"
    channel.queue_declare(queue=queue)

    channel.basic_publish(exchange="", routing_key=queue, body=json.dumps(message))
    print(f"[x] Sent {message}")
    connection.close()


if __name__ == "__main__":
    publish_message()
