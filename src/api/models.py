from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, Text,ForeignKey, DateTime
from sqlalchemy.orm import Mapped, mapped_column
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False, default=True)


    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }
        

class Project(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(120), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    image_url:Mapped[str] = mapped_column(String(255), nullable=True)
    hashtags:Mapped[str] = mapped_column(String(255), nullable=True)
    is_accepting_applications:Mapped[bool] = mapped_column(default=True)
    created_at: Mapped[datetime] = mapped_column(default=datetime.utcnow)
    
    owner_id: Mapped[int] = mapped_column(ForeignKey('user.id'),nullable=False)
    
    def serialize(self):
        return{
            'id':self.id,
            'title':self.title,
            'description':self.description,
            'image_url':self.image_url,
            'hashtags':self.hashtags,
            'is_accepting_applications':self.is_accepting_applications,
            'created_at':self.created_at.isoformat(),
            'owner_id':self.owner_id
        }
    
    
class Postularse(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    message: Mapped[str] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(default=datetime.utcnow)
    
    user_id: Mapped[int] = mapped_column(ForeignKey('user.id'), nullable=False)
    project_id: Mapped[int] = mapped_column(ForeignKey('project.id'), nullable=False)
    
    def serialize(self):
        return{
            'id':self.id,
            'message':self.message,
            'created_at':self.created_at.isoformat(),
            'user_id':self.user_id,
            'project_id':self.project_id
        }