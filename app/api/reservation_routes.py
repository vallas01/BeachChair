from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from app.models import Reservation, db
from app.forms.reservation_form import ReservationForm
import json


reservation_routes = Blueprint('reservation', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages



@reservation_routes.route('')
# @login_required
def reservation_get():
    reservations = Reservation.query.all()

    return {'reservation': [reservation.to_dict() for reservation in reservations]}


@reservation_routes.route('', methods=['POST'])
def reservation_post():
    """
    Creates a new reservation
    """
    form = ReservationForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        print('HEREEEEEE', form.data)
        new_reservation = Reservation(
            user_id = form.data["user_id"],
            location = form.data["location"],
            date = form.data["date"],
            arrangement = form.data["arrangement"]
            )
        
        db.session.add(new_reservation)
        db.session.commit()

        return new_reservation.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@reservation_routes.route('/<id>', methods=['DELETE'])
def delete_post(id):
    """
    Deletes a reservation (ACV)
    """
    reservation = Reservation.query.get(int(id))
    db.session.delete(reservation)
    db.session.commit()
    return {'message': 'success'}

@reservation_routes.route('/<id>', methods=['PUT'])
def edit_post(id):
    """
    Edits a reservation
    """
    form = ReservationForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    reservation = Reservation.query.get(id)

    if form.validate_on_submit():
        reservation.user_id = form.user_id.data
        reservation.location = form.location.data
        reservation.date = form.date.data
        reservation.arrangement = form.arrangement.data
        # print('REservation=====================',reservation)
        db.session.commit()

        return reservation.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401