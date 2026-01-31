from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime
from enum import Enum

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="The Impacts API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# ============== Enums ==============

class ServiceType(str, Enum):
    SEO = "seo"
    META = "meta"
    SOCIAL = "social"
    ALL = "all"

class BudgetRange(str, Enum):
    LOW = "1k-3k"
    MEDIUM = "3k-5k"
    HIGH = "5k-10k"
    ENTERPRISE = "10k+"

# ============== Models ==============

class ContactCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: Optional[str] = Field(None, max_length=20)
    service: ServiceType
    budget: Optional[BudgetRange] = None
    message: str = Field(..., min_length=10, max_length=2000)

class Contact(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: Optional[str] = None
    service: str
    budget: Optional[str] = None
    message: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

class NewsletterCreate(BaseModel):
    email: EmailStr

class Newsletter(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: str
    subscribed_at: datetime = Field(default_factory=datetime.utcnow)

class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

# ============== Routes ==============

@api_router.get("/")
async def root():
    return {"message": "The Impacts API is running"}

# Contact Form Endpoints
@api_router.post("/contact", response_model=Contact, status_code=201)
async def create_contact(input: ContactCreate):
    """Submit a contact form inquiry"""
    contact_dict = input.model_dump()
    contact_obj = Contact(**contact_dict)
    await db.contacts.insert_one(contact_obj.model_dump())
    return contact_obj

@api_router.get("/contact", response_model=List[Contact])
async def get_contacts():
    """Get all contact form submissions"""
    contacts = await db.contacts.find().sort("created_at", -1).to_list(1000)
    return [Contact(**contact) for contact in contacts]

@api_router.get("/contact/{contact_id}", response_model=Contact)
async def get_contact(contact_id: str):
    """Get a specific contact submission by ID"""
    contact = await db.contacts.find_one({"id": contact_id})
    if not contact:
        raise HTTPException(status_code=404, detail="Contact not found")
    return Contact(**contact)

@api_router.delete("/contact/{contact_id}", status_code=204)
async def delete_contact(contact_id: str):
    """Delete a contact submission"""
    result = await db.contacts.delete_one({"id": contact_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Contact not found")
    return None

# Newsletter Endpoints
@api_router.post("/newsletter", response_model=Newsletter, status_code=201)
async def subscribe_newsletter(input: NewsletterCreate):
    """Subscribe to newsletter"""
    # Check if email already exists
    existing = await db.newsletters.find_one({"email": input.email})
    if existing:
        raise HTTPException(status_code=409, detail="Email already subscribed")
    
    newsletter_obj = Newsletter(email=input.email)
    await db.newsletters.insert_one(newsletter_obj.model_dump())
    return newsletter_obj

@api_router.get("/newsletter", response_model=List[Newsletter])
async def get_newsletter_subscribers():
    """Get all newsletter subscribers"""
    subscribers = await db.newsletters.find().sort("subscribed_at", -1).to_list(1000)
    return [Newsletter(**sub) for sub in subscribers]

@api_router.delete("/newsletter/{email}", status_code=204)
async def unsubscribe_newsletter(email: str):
    """Unsubscribe from newsletter"""
    result = await db.newsletters.delete_one({"email": email})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Email not found")
    return None

# Status Check Endpoints (existing)
@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    await db.status_checks.insert_one(status_obj.model_dump())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["https://theimpacts.agency/",
        "https://www.theimpacts.agency",
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
