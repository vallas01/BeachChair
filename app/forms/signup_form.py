from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def my_length_check(form, field):
    if (len(field.data) < 8 ):
        raise ValidationError('Password must have at least 8 characters')


def length(min=3, max=-1):
    message = 'Must be between %d and %d characters long.' % (min, max)

    def _length(form, field):
        l = field.data and len(field.data) or 0
        if l < min or max != -1 and l > max:
            raise ValidationError(message)

    return _length


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists, length(min=3, max=12)])
    first_name = StringField('first_name', validators=[DataRequired(), length(min=3, max=12)])
    last_name = StringField('last_name', validators=[DataRequired(), length(min=3, max=12)])
    email = StringField('email', validators=[DataRequired(), user_exists, Email()])
    password = StringField('password', validators=[DataRequired(), my_length_check])
    avatar = StringField('avatar')
    phone = StringField('phone')

   