from database import engine_itemdb,engine_orderdb, Base, localsession_for_items,localsession_for_orders
from models import ItemList, OrderList
from fastapi import FastAPI, Depends, status, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
import uuid
import json
from sqlalchemy.dialects.sqlite import JSON
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder

def short_code():
    return int(str(uuid.uuid4().int)[:6])


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
    # orderid: int
    orderdata: dict
    # desc: str


@app.get("/")
async def home():
    return "home"

@app.post("/createorder")
async def createorder(order: OrderItem, db: Session = Depends(get_order_db), description: str = None):
    # doc = OrderItem(
    #     orderid=1234,
    #     orderdata={
    #         "biryani":200
    #     }
    # )
    
    def recur():
        orderid = short_code()
        exist = db.query(OrderList).filter(OrderList.orderId == orderid).first()
        if exist:
            recur()
        else:
            return orderid
        
    orderid = recur()
    _sum = 0
    for vals in order.orderdata.values():
        for i in vals.values():
            _sum += i
    new_order = OrderList(orderId=orderid, orderdata=order.orderdata, description = description, sum_total=_sum)
    # print(type(order.orderdata))
    db.add(new_order)
    db.commit()
    db.refresh(new_order)
    m = jsonable_encoder(new_order)
    # for i in m:
    #     print(i)
    return {"created_order":m}



@app.get("/getallorders")
async def getall(db: Session = Depends(get_order_db)):
    data = db.query(OrderList).all()
    # return jsonable_encoder(data)[0]["orderdata"]["additionalProp1"]
    m = jsonable_encoder(data)
    # print(m[0]['orderdata']['additionalProp1'])
    for i in m:
        print(i)
    return m

@app.get("/clearorders",status_code=status.HTTP_200_OK)
async def clearOrderDB(db: Session = Depends(get_order_db)):
    db.query(OrderList).delete()
    db.commit()
    # db.refresh(OrderList)

@app.get("/clearitems",status_code=status.HTTP_200_OK)
async def clearOrderDB(db: Session = Depends(get_item_db)):
    db.query(ItemList).delete()
    db.commit()
    # db.refresh(OrderList)
    return None

@app.get("/cancleorder",status_code=status.HTTP_200_OK)
async def cancleOrder(orderid: int = None, db: Session = Depends(get_order_db)):
    c_order = db.query(OrderList).filter(OrderList.orderId == orderid).first()
    if not c_order:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Order number didn't exist!")
    if c_order.cancle_status == True:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Already cacelled!")
    c_order.cancle_status = True
    db.commit()
    db.refresh(c_order)
    return c_order

@app.get("/getOrder")
async def getOrder(_id: int, db: Session = Depends(get_order_db)):
    order = db.query(OrderList).filter(OrderList.orderId == _id).first()
    return order