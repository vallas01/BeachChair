from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField
from wtforms.validators import DataRequired


class ReservationForm(FlaskForm):
    user_id = IntegerField('UserId',validators=[DataRequired()])
    date = StringField('Date', validators=[DataRequired()])
    location = StringField('Location',validators=[DataRequired()])
    arrangement = IntegerField('Arrangement', validators=[DataRequired()])