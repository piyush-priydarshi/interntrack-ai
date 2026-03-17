from app.database import supabase


def create_job(job):
    data = supabase.table("jobs").insert(job).execute()
    return data


def get_all_jobs():
    data = supabase.table("jobs").select("*").execute()
    return data.data


def get_user_jobs(user_id):
    data = supabase.table("jobs").select("*").eq("user_id", user_id).execute()
    return data.data


def update_job(job_id, status):
    data = supabase.table("jobs").update(
        {"status": status}
    ).eq("id", job_id).execute()
    return data


def delete_job(job_id):
    return supabase.table("jobs").delete().eq("id", job_id).execute()