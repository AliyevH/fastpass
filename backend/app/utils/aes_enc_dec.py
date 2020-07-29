from Crypto.Cipher import AES
key = b"test1234test1234test1234"


# def encrypt(data, key):
#     cipher = AES.new(key, AES.MODE_EAX)
#     nonce = cipher.nonce
#     ciphertext, tag = cipher.encrypt_and_digest(data)
#     return ciphertext, tag, nonce
#
#
# def decrypt(ciphertext, tag, nonce, key):
#     cipher = AES.new(key, AES.MODE_EAX, nonce)
#     plaintext = cipher.decrypt(ciphertext)
#
#     try:
#         cipher.verify(tag)
#         return plaintext.decode()
#     except ValueError:
#         print("Key incorrect or message corrupted")
#         return False

import base64
import os
from cryptography.fernet import Fernet
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC

def encrypt(data, key):
    print("Beginning encryption")
    password = key.encode()
    salt = b" "
    kdf = PBKDF2HMAC(
        algorithm=hashes.SHA256(),
        length=32,
        salt=salt,
        iterations=100000,
        backend=default_backend()
    )
    key = base64.urlsafe_b64encode(kdf.derive(password))
    f = Fernet(key)
    token = f.encrypt(data.encode())
    return token.decode("utf-8")

def decrypt(encrypted_data, key):
    print("Beginning decryption")
    password = key.encode()
    salt = b" "
    kdf = PBKDF2HMAC(
        algorithm=hashes.SHA256(),
        length=32,
        salt=salt,
        iterations=100000,
        backend=default_backend()
    )
    key = base64.urlsafe_b64encode(kdf.derive(password))
    f = Fernet(key)
    data = f.decrypt(encrypted_data.encode())
    return data.decode("utf-8")

