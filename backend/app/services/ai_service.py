from openai import OpenAI
from app.config import OPENAI_API_KEY
from app.services.supabase_service import get_jobs

client = OpenAI(api_key=OPENAI_API_KEY)


def query_jobs(user_query):

    jobs = get_jobs()

    context = "\n".join(
        [f"{j['company']} - {j['role']} deadline {j['deadline']}" for j in jobs]
    )

    prompt = f"""
    User question: {user_query}

    Job database:
    {context}

    Answer the question using this data.
    """

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}]
    )

    return response.choices[0].message.content