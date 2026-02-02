from database import engine_itemdb,engine_orderdb, Base, localsession_for_items,localsession_for_orders
from models import ItemList, OrderList
from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
import uuid
import json
from sqlalchemy.dialects.sqlite import JSON
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder

def get_item_db():
    try:
        db = localsession_for_items()
        yield db
    finally:
        db.close()

def get_order_db():
    try:
        db = localsession_for_orders()
        yield db
    finally:
        db.close()



app = FastAPI()

ItemList.__table__.create(bind=engine_itemdb,checkfirst=True)
OrderList.__table__.create(bind=engine_orderdb,checkfirst=True)

class OrderItem(BaseModel):
    orderid: int
    orderdata: dict


@app.get("/")
async def home():
    return "home"

@app.post("/createorder")
async def createorder(order: OrderItem, db: Session = Depends(get_order_db)):
    # doc = OrderItem(
    #     orderid=1234,
    #     orderdata={
    #         "biryani":200
    #     }
    # )
    new_order = OrderList(orderId=order.orderid,orderdata=order.orderdata)
    db.add(new_order)
    db.commit()
    db.refresh(new_order)
    return {"created_order":new_order}

@app.get("/getallorders")
async def getall(db: Session = Depends(get_order_db)):
    data = db.query(OrderList).all()
    # return jsonable_encoder(data)[0]["orderdata"]["additionalProp1"]
    return jsonable_encoder(data)

