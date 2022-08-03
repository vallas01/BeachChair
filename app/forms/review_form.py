from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired


class ReviewForm(FlaskForm):
    user_id = IntegerField('UserId',validators=[DataRequired()])
    text = StringField('Review', validators=[DataRequired()])
    location = StringField('Location',validators=[DataRequired()])
    rating = IntegerField('Rating', validators=[DataRequired()])