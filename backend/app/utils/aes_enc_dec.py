from Crypto.Cipher import AES
key = b"test1234test1234test1234"

def encrypt(data, key):
    cipher = AES.new(key, AES.MODE_EAX)
    nonce = cipher.nonce
    ciphertext, tag = cipher.encrypt_and_digest(data)
    return ciphertext, tag, nonce


def decrypt(ciphertext, tag, nonce, key):
    cipher = AES.new(key, AES.MODE_EAX, nonce)
    plaintext = cipher.decrypt(ciphertext)
    print(plaintext)

    try:
        cipher.verify(tag)
        print("The message is authentic:", plaintext)
        return plaintext.decode()
    except ValueError:
        print("Key incorrect or message corrupted")



