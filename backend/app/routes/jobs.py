from fastapi import APIRouter,Depends
from app.services.auth_services import verify_token
from app.schemas import JobCreate, JobUpdate
from app.services.supabase_service import *
from app.services.n8n_service import trigger_n8n

router = APIRouter()


@router.post("/jobs")
def add_job(job: JobCreate, user=Depends(verify_token)):

    job_data = job.model_dump()

    job_data["deadline"] = job_data["deadline"].isoformat()

    job_data["user_id"] = user["sub"]

    create_job(job_data)

    return {"message": "Job added"}
    

@router.get("/jobs")
def list_jobs(user=Depends(verify_token)):
    return get_jobs()


@router.get("/jobs/{job_id}")
def job_details(job_id: int):
    return get_job(job_id)


@router.put("/jobs/{job_id}")
def update_status(job_id: int, job: JobUpdate):
    return update_job(job_id, job.status)


@router.delete("/jobs/{job_id}")
def remove_job(job_id: int):
    return delete_job(job_id)