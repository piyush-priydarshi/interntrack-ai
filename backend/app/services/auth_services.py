from fastapi import HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt
from app.config import SUPABASE_KEY

security = HTTPBearer()


def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):

    token = credentials.credentials

    try:
        payload = jwt.decode(
            token,
            SUPABASE_KEY,
            algorithms=["HS256"],
            audience="authenticated"
        )

        return payload

    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")