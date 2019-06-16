import uuid

import paho.mqtt.client as mqtt

mqtt_user_name = 'oauth2-user'
mqtt_password = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJuczAxIiwic3ViIjoiMjU0NyIsInVzZXJfbmFtZSI6ImhhdW1hbnNvbjc2QGdtYWlsLmNvbSIsInNjb3BlIjpbInJlYWQtb25seSJdLCJleHAiOjE2MjExMzM4NzIsImF1dGhvcml0aWVzIjpbIlJPTEVfVVNFUiJdLCJqdGkiOiJkMGY3MjEyYi0yMmMzLTQ3MTYtOTRmNy1iMGIxYjIyMWFkODIiLCJjbGllbnRfaWQiOiJyZWFkLW9ubHkifQ.g0n019kArD5M4XNlg80tVf7MImZKXubjJYAGiP0Ew1M'  # copy and paste here external client id from your account
user_id = '2547'  # copy and paste here your user id
device_id = '5292-5151-5541-1620'  # copy and paste here your device id

alerts_topic = '/v1/users/{}/in/alerts'.format(user_id)
acc_norm_datasource_topic = '/v1/users/{}/in/devices/{}/datasources/ACCELERATION_NORM'.format(user_id, device_id)

ca_cert_path = 'cacert.crt'


def on_connect(client, userdata, flags, rc):
    print('Connected with result code {}'.format(rc))


def on_message(client, userdata, msg):
    print('Msg received from topic={}\n{}'.format(msg.topic, str(msg.payload)))


def main():
    client = mqtt.Client(str(uuid.uuid4()), 'websockets')
    client.on_connect = on_connect
    client.on_message = on_message

    client.tls_set(ca_cert_path)
    client.username_pw_set(mqtt_user_name, mqtt_password)

    client.connect('ns01-wss.brainium.com', 443)

    client.subscribe(alerts_topic)
    client.subscribe(acc_norm_datasource_topic)

    client.loop_forever()


main()
