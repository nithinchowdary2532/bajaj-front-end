from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Union

app = FastAPI()

class RequestData(BaseModel):
    data: List[Union[str, int]]

class ResponseData(BaseModel):
    is_success: bool
    user_id: str
    email: str
    roll_number: str
    numbers: List[str]
    alphabets: List[str]
    highest_alphabet: List[str]

@app.post("/bfhl", response_model=ResponseData)
def post_data(request: RequestData):
    # Extract user information
    user_id = "john_doe_17091999"
    email = "john@xyz.com"
    roll_number = "ABCD123"

    # Separate numbers and alphabets
    numbers = []
    alphabets = []
    for item in request.data:
        if str(item).isdigit():
            numbers.append(str(item))
        elif isinstance(item, str) and item.isalpha():
            alphabets.append(item)

    # Find the highest alphabet (case-insensitive)
    highest_alphabet = [max(alphabets, key=lambda x: x.upper())] if alphabets else []

    response = ResponseData(
        is_success=True,
        user_id=user_id,
        email=email,
        roll_number=roll_number,
        numbers=numbers,
        alphabets=alphabets,
        highest_alphabet=highest_alphabet
    )
    return response

@app.get("/bfhl")
def get_operation_code():
    return {"operation_code": 1}
