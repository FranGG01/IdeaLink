from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, Text, ForeignKey, DateTime, UniqueConstraint, JSON, PickleType
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime

db = SQLAlchemy()

favorites = db.Table(
    'favorites',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
    db.Column('project_id', db.Integer, db.ForeignKey('project.id'), primary_key=True)
)

class FriendRequest(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    sender_id: Mapped[int] = mapped_column(ForeignKey('user.id'), nullable=False)
    receiver_id: Mapped[int] = mapped_column(ForeignKey('user.id'), nullable=False)
    status: Mapped[str] = mapped_column(String(20), nullable=False, default='pending')  # pending, accepted, rejected
    created_at: Mapped[datetime] = mapped_column(default=datetime.utcnow)

    sender = relationship("User", foreign_keys=[sender_id], back_populates="sent_requests")
    receiver = relationship("User", foreign_keys=[receiver_id], back_populates="received_requests")

    __table_args__ = (UniqueConstraint('sender_id', 'receiver_id', name='_sender_receiver_uc'),)


class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False, default=True)
    username: Mapped[str] = mapped_column(String(120), nullable=True)
    avatar_url: Mapped[str] = mapped_column(String(255), nullable=True)
    banner_url: Mapped[str] = mapped_column(String(255), nullable=True)
    role: Mapped[str] = mapped_column(String(120), nullable=True)
    location: Mapped[str] = mapped_column(String(120), nullable=True)
    bio: Mapped[str] = mapped_column(Text, nullable=True)

    sent_requests = relationship("FriendRequest", foreign_keys=[FriendRequest.sender_id], back_populates="sender", lazy="dynamic")
    received_requests = relationship("FriendRequest", foreign_keys=[FriendRequest.receiver_id], back_populates="receiver", lazy="dynamic")

    favorite_projects = db.relationship("Project", secondary=favorites, backref="favorited_by")

    @property
    def friends(self):
        sent = FriendRequest.query.filter_by(sender_id=self.id, status='accepted').all()
        received = FriendRequest.query.filter_by(receiver_id=self.id, status='accepted').all()
        return [fr.receiver for fr in sent] + [fr.sender for fr in received]

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "username": self.username,
            "avatar_url": self.avatar_url,
            "banner_url": self.banner_url,
            "role": self.role,
            "location": self.location,
            "bio": self.bio
        }


class Project(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(120), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    image_urls: Mapped[list] = mapped_column(PickleType, nullable=True)
    hashtags: Mapped[str] = mapped_column(String(255), nullable=True)
    is_accepting_applications: Mapped[bool] = mapped_column(default=True)
    created_at: Mapped[datetime] = mapped_column(default=datetime.utcnow)
    owner_id: Mapped[int] = mapped_column(ForeignKey('user.id'), nullable=False)
    owner = relationship("User")

    collaborators = db.relationship('ProjectCollaborator', back_populates='project', cascade='all, delete-orphan')
    stackblitz_url = db.Column(db.String, nullable=True)
    code_files: Mapped[dict] = mapped_column(JSON, nullable=True)

    def serialize(self, current_user_id=None):
        print("🔍 Comparando:", self.owner_id, "con", current_user_id)
        is_favorite = False
        if current_user_id:
            is_favorite = any(user.id == current_user_id for user in self.favorited_by)

        hashtags_list = []
        if self.hashtags:
            hashtags_list = [tag.strip().lstrip('#') for tag in self.hashtags.split(',') if tag.strip()]

        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'image_urls': self.image_urls or [],
            'hashtags': hashtags_list,
            'is_accepting_applications': self.is_accepting_applications,
            'created_at': self.created_at.isoformat(),
            'owner_id': self.owner_id,
            'stackblitz_url': self.stackblitz_url,
            'code_files': self.code_files,
            'is_favorite': is_favorite,
            'is_owner': current_user_id == self.owner_id,
            'owner': {
                'username': getattr(self.owner, "username", "Anónimo"),
                'avatar_url': getattr(self.owner, "avatar_url", "https://ui-avatars.com/api/?name=User")
            }
        }


class Postularse(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    message: Mapped[str] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(default=datetime.utcnow)

    user_id: Mapped[int] = mapped_column(ForeignKey('user.id'), nullable=False)
    project_id: Mapped[int] = mapped_column(ForeignKey('project.id'), nullable=False)
    user = relationship("User")
    project = relationship("Project")

    def serialize(self):
        return {
            'id': self.id,
            'message': self.message,
            'created_at': self.created_at.isoformat(),
            'user_id': self.user_id,
            'project_id': self.project_id,
            'user': {
                'username': getattr(self.user, "username", "Anónimo"),
                'avatar_url': getattr(self.user, "avatar_url", "https://ui-avatars.com/api/?name=User")
            }
        }


class ProjectCollaborator(db.Model):
    __tablename__ = 'project_collaborators'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    project_id = db.Column(db.Integer, db.ForeignKey('project.id'), nullable=False)

    user = db.relationship('User')
    project = db.relationship('Project')

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "project_id": self.project_id
        }
