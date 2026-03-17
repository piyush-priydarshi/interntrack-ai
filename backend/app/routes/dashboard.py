from fastapi import APIRouter
from app.services.supabase_service import get_jobs

router = APIRouter()


@router.get("/dashboard")
def dashboard():

    jobs = get_jobs()

    total = len(jobs)
    applied = len([j for j in jobs if j["status"] == "Applied"])
    saved = len([j for j in jobs if j["status"] == "Not Applied"])

    return {
        "total_jobs": total,
        "applied_jobs": applied,
        "saved_jobs": saved
    }