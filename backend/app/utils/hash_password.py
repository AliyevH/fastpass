from passlib.hash import sha256_crypt

def encrypt_password(password):
    return sha256_crypt.hash(password)


def verify_password(password, hashed_password):
    return sha256_crypt.verify(password, hashed_password)


