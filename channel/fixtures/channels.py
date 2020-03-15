str = ''
for index, i in enumerate(range(11, 26)):
    str += '{\"model\": \"channel.channel\",'
    str += f'\"pk\": {index + 52}, \"fields\": '
    str += '{\"channel_type\": 3,'
    str += f'\"band\": {i}}}}},'
print(str)
