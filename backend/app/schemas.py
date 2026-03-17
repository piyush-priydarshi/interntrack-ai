from pydantic import BaseModel
from datetime import date

class JobCreate(BaseModel):
    company: str
    role: str
    location: str
    skills: str
    deadline: date
    job_link: str

class JobUpdate(BaseModel):
    status: str

class AIQuery(BaseModel):
    query: str