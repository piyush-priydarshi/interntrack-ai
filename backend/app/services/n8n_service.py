import requests
from app.config import N8N_WEBHOOK_URL


def trigger_n8n(job):
    payload = {
        "company": job["company"],
        "role": job["role"],
        "deadline": str(job["deadline"]),
        "link": job["job_link"]
    }

    try:
        requests.post(N8N_WEBHOOK_URL, json=payload)
    except Exception as e:
        print("n8n trigger failed:", e)