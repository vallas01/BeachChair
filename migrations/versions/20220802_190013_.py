"""empty message

Revision ID: 44d41458b5cc
Revises: ffdc0a98111c
Create Date: 2022-08-02 19:00:13.713229

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '44d41458b5cc'
down_revision = 'ffdc0a98111c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('reservations',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('date', sa.String(length=200), nullable=False),
    sa.Column('location', sa.String(length=20), nullable=False),
    sa.Column('package', sa.Integer(), nullable=False),
    sa.Column('total', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('reviews',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('text', sa.String(length=2000), nullable=False),
    sa.Column('location', sa.String(length=20), nullable=False),
    sa.Column('rating', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.add_column('users', sa.Column('first_name', sa.String(length=40), nullable=True))
    op.add_column('users', sa.Column('last_name', sa.String(length=40), nullable=True))
    op.add_column('users', sa.Column('avatar', sa.String(length=255), nullable=True))
    op.add_column('users', sa.Column('phone', sa.Integer(), nullable=True))
    op.create_unique_constraint(None, 'users', ['phone'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'users', type_='unique')
    op.drop_column('users', 'phone')
    op.drop_column('users', 'avatar')
    op.drop_column('users', 'last_name')
    op.drop_column('users', 'first_name')
    op.drop_table('reviews')
    op.drop_table('reservations')
    # ### end Alembic commands ###
