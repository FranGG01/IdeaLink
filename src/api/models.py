from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, Text, ForeignKey, DateTime, UniqueConstraint, JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime

db = SQLAlchemy()

# 🔁 Relación de favoritos (muchos a muchos)
favorites = db.Table(
    'favorites',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
    db.Column('project_id', db.Integer, db.ForeignKey('project.id'), primary_key=True)
)

# 🔁 Relación de colaboradores (muchos a muchos)
project_collaborators = db.Table(
    'project_collaborators',
    db.Column('project_id', db.Integer, db.ForeignKey('project.id'), primary_key=True),
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True)
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

    # ✅ Favoritos
    favorite_projects = db.relationship("Project", secondary=favorites, backref="favorited_by")

    @property
    def friends(self):
        # Amigos que enviaron solicitud aceptada
        sent = FriendRequest.query.filter_by(sender_id=self.id, status='accepted').all()
        # Amigos que recibieron solicitud aceptada
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
    image_url: Mapped[str] = mapped_column(String(255), nullable=True)
    hashtags: Mapped[str] = mapped_column(String(255), nullable=True)
    is_accepting_applications: Mapped[bool] = mapped_column(default=True)
    created_at: Mapped[datetime] = mapped_column(default=datetime.utcnow)
    owner_id: Mapped[int] = mapped_column(ForeignKey('user.id'), nullable=False)
    owner = relationship("User")

    # Relaciones
    collaborators = db.relationship('User', secondary=project_collaborators)
    stackblitz_url = db.Column(db.String, nullable=True)
    code_files: Mapped[dict] = mapped_column(JSON, nullable=True)

    def serialize(self, current_user_id=None):
        is_favorite = False
        if current_user_id:
            is_favorite = any(user.id == current_user_id for user in self.favorited_by)

        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'image_url': self.image_url,
            'hashtags': self.hashtags,
            'is_accepting_applications': self.is_accepting_applications,
            'created_at': self.created_at.isoformat(),
            'owner_id': self.owner_id,
            'stackblitz_url': self.stackblitz_url,
            'code_files': self.code_files,
            'is_favorite': is_favorite,
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
