from .db import db


class Reservation(db.Model):
    __tablename__ = 'reservations'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    date = db.Column(db.String(200), nullable=False)
    location = db.Column(db.String(20), nullable=False)
    arrangement = db.Column(db.Integer, nullable=False)
    total = db.Column(db.Integer, nullable=False)

    users = db.relationship("User", back_populates="reservations")
    
    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "restaurant_id": self.restaurant_id,
            "date": self.date,
            "arrangement": self.arrangement,
            "total": self.total,
            "owner":self.users.to_dict(),
        }