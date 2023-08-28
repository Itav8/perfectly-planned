import json
import pika

queue = "email-task"


# Consumer
def consume_message():
    print("hai?")
    connection = pika.BlockingConnection(pika.ConnectionParameters(host="rabbitmq"))
    channel = connection.channel()

    channel.queue_declare(queue=queue)

    def callback(ch, method, properties, body):
        message = json.loads(body)
        print(f" [x] Received {message}")

    channel.basic_consume(queue=queue, on_message_callback=callback, auto_ack=True)
    print(f" [*] Waiting for messages in {queue}. To exit press CTRL+C")

    channel.start_consuming()


if __name__ == "__main__":
    consume_message()
