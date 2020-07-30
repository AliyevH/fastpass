alembic revision --autogenerate
alembic upgrade heads
uvicorn app.main:app --host 0.0.0.0 --reload
