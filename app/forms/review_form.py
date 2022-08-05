from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

def length(min=3, max=-1):
    message = 'Must be between %d and %d characters long.' % (min, max)

    def _length(form, field):
        l = field.data and len(field.data) or 0
        if l < min or max != -1 and l > max:
            raise ValidationError(message)

    return _length


class ReviewForm(FlaskForm):
    user_id = IntegerField('UserId',validators=[DataRequired()])
    text = StringField('Review', validators=[DataRequired(), length(min=3, max=240)])
    location = StringField('Location',validators=[DataRequired()])
    rating = IntegerField('Rating', validators=[DataRequired()])