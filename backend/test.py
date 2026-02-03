import uuid
def short_code():
    return int(str(uuid.uuid4().int)[:6])

print(type(short_code()))
print(short_code())