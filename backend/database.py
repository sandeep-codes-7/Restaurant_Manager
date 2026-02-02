from sqlalchemy import create_engine 
from sqlalchemy.orm import declarative_base 
from sqlalchemy.orm import sessionmaker

ITEM_DB_URL = "sqlite:///./item.db"
ORDER_DETAILS_DB = "sqlite:///./orders.db"

engine_itemdb = create_engine(ITEM_DB_URL,connect_args={"check_same_thread":False})
engine_orderdb = create_engine(ORDER_DETAILS_DB, connect_args={"check_same_thread":False})

localsession_for_orders = sessionmaker(bind=engine_orderdb,autoflush=False, autocommit=False)
localsession_for_items = sessionmaker(bind=engine_itemdb,autoflush=False,autocommit=False)

Base = declarative_base()