from fastapi import APIRouter
from app.schemas import AIQuery
from app.services.ai_service import query_jobs

router = APIRouter()


@router.post("/ai/query")
def ai_query(data: AIQuery):

    result = query_jobs(data.query)

    return {"response": result}