"""empty message

Revision ID: e6b24f64f013
Revises: 93a574e50cbc
Create Date: 2022-08-04 12:38:15.776869

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e6b24f64f013'
down_revision = '93a574e50cbc'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('reservations', sa.Column('arrangement', sa.Integer(), nullable=False))
    op.drop_column('reservations', 'package')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('reservations', sa.Column('package', sa.INTEGER(), autoincrement=False, nullable=False))
    op.drop_column('reservations', 'arrangement')
    # ### end Alembic commands ###