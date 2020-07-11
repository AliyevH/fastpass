import jwt

SECRET_KEY  = "603EB60C-3AD0-46DB-92B8-2813689E3272"


def jwt_token(token):
    try:
        token = token.split(" ")[1]
        return jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
    except Exception as err:
        print(err)
        return False
