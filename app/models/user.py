from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    first_name = db.Column(db.String(40), nullable=True, unique=False)
    last_name = db.Column(db.String(40), nullable=True, unique=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    avatar = db.Column(db.String(255), nullable=True, default='https://www.austriabc.com/wp-content/uploads/2019/08/default-profile.png')
    phone = db.Column(db.String(12), nullable=True, unique=False)
    hashed_password = db.Column(db.String(255), nullable=False)

    reviews = db.relationship('Review', back_populates='users')
    reservations = db.relationship('Reservation', back_populates='users')


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email,
            'avatar': self.avatar,
            'phone': self.phone,
        }
