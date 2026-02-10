from sqlalchemy import Column, Integer, String, Boolean #type: ignore
from database import Base
from sqlalchemy.dialects.sqlite import JSON #type: ignore

class ItemList(Base):
    __tablename__="items"
    id = Column(Integer, index=True, primary_key=True)
    itemname = Column(String,index=True,unique=True,nullable=False)
    price = Column(Integer,index=True,nullable=False)


class OrderList(Base):
    __tablename__="orders"
    id = Column(Integer, primary_key=True, index=True)
    orderId = Column(Integer,unique=True,index=True)
    orderdata = Column(JSON)
    cancle_status = Column(Boolean,default=False)
    description = Column(String)
    sum_total = Column(Integer, nullable=False)