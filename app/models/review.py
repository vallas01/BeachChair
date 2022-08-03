from .db import db


class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    text = db.Column(db.String(2000), nullable=False)
    location = db.Column(db.String(20), nullable=False)
    rating = db.Column(db.Integer, nullable=False)

    users = db.relationship("User", back_populates="reviews")
    
    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "text": self.text,
            "location": self.location,
            "rating": self.rating,
        }