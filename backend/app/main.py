from fastapi import FastAPI
from .routes import jobs, dashboard, ai

app = FastAPI(
    title="InternTrack AI Backend"
)

app.include_router(jobs.router)
app.include_router(dashboard.router)
app.include_router(ai.router)


@app.get("/")
def root():
    return {"message": "Backend running"}