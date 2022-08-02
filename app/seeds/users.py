from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name='Demo', last_name='Smith' email='demo@aa.io', password='password',
        avatar='https://res.cloudinary.com/kelp-me/image/upload/v1659139522/default-profile_w8hf54.png',
        phone=5555550001)
    marnie = User(
        first_name='marnie', last_name='Jones' email='marnie@aa.io', password='password',
        avatar='https://res.cloudinary.com/kelp-me/image/upload/v1659139522/default-profile_w8hf54.png',
        phone=5555550002)
    bobbie = User(
        first_name='bobbie', last_name='Garcia' email='bobbie@aa.io', password='password',
        avatar='https://res.cloudinary.com/kelp-me/image/upload/v1659139522/default-profile_w8hf54.png',
        phone=5555550003)

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
