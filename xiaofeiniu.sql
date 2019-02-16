SET NAMES UTF8;
DROP DATABASE IF EXISTS xiaofeiniu;
CREATE DATABASE xiaofeiniu CHARSET=UTF8;
USE xiaofeiniu;

/*管理员*/
CREATE TABLE xfn_admin(
    aid INT PRIMARY KEY AUTO_INCREMENT,
    aname VARCHAR(32) UNIQUE,
    apwd VARCHAR(64)
);
INSERT INTO xfn_admin VALUES
(NULL,'admin',PASSWORD('123456')),
(NULL,'boss',PASSWORD('999999'));

/*全局设置表*/
CREATE TABLE xfn_settings(
    sid INT PRIMARY KEY AUTO_INCREMENT,
    appName VARCHAR(32),
    apiUrl VARCHAR(64),
    adminUrl VARCHAR(64),
    appUrl VARCHAR(64),
    icp VARCHAR(64),
    copyright VARCHAR(128)
);
INSERT INTO xfn_settings VALUES
(NULL,'小肥牛','http://127.0.0.1:8090','http://127.0.0.1:8091','http://127.0.0.1:8092','京ICP备12003709号-3','Copyright © 北京达内金桥科技有限公司版权所有');

/*桌台表*/
CREATE TABLE xfn_table(
    tid INT PRIMARY KEY AUTO_INCREMENT,
    tname VARCHAR(32),
    type VARCHAR(32),
    status INT
);
INSERT INTO xfn_table VALUES
(NULL,'福满堂','6-8人桌',1),
(NULL,'金镶玉','4人桌',2),
(NULL,'寿比天','10人桌',3),
(NULL,'福如海','2人桌',0);

/*桌台预订信息*/
CREATE TABLE xfn_reservation(
    rid INT PRIMARY KEY AUTO_INCREMENT,
    contactName VARCHAR(32),
    phone VARCHAR(16),
    contactTime BIGINT,
    dinnerTime BIGINT,
    tableId INT,
    FOREIGN KEY(tableId) REFERENCES xfn_table(tid)
);
INSERT INTO xfn_reservation VALUES
(NULL,'丁丁','13745678199','1550297414909','1550311200000',1),
(NULL,'当当','13745678299','1550297424909','1550311200000',2),
(NULL,'豆豆','13745678399','1550297434909','1550311200000',3),
(NULL,'丫丫','13745678499','1550297444909','1550311200000',4);

/*菜品类别*/
CREATE TABLE xfn_category(
    cid INT PRIMARY KEY AUTO_INCREMENT,
    cname VARCHAR(32)
);
INSERT INTO xfn_category VALUES
(NULL,'肉类'),
(NULL,'丸滑类'),
(NULL,'海鲜河鲜类'),
(NULL,'蔬菜豆制类'),
(NULL,'菌菇类');

/*菜品*/
CREATE TABLE xfn_dish(
    did INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(32),
    imgUrl VARCHAR(128),
    price DECIMAL(6,2),
    detail VARCHAR(128),
    categoryId INT,
    FOREIGN KEY(categoryId) REFERENCES xfn_category(cid)
);
INSERT INTO xfn_dish VALUES
(100000,'丸类组合','1-CE7I8934.jpg',35,'由多种丸类组合而成。锅开后浮起来再煮3分钟左右即可食用。配上丸滑蘸碟，风味更突出。',2),

(NULL,'草原羔羊肉','CE7I6859.jpg',60,'选自内蒙锡林郭勒大草原10月龄以下羔羊，经过排酸、切割、冷冻而成。锅开后涮30秒左右即可食用。',1),

(NULL,'冻虾','CE7I7004.jpg',20,'将活虾冷冻而成。肉质脆嫩，锅开后再煮4分钟左右即可食用。',3),

(NULL,'有机香菇','CE7I9428.jpg',35,'经过挑选、清洗、装盘而成。锅开后再煮2分钟左右即可食用',5),

(NULL,'包心生菜','005.jpg',35,'经过挑选、清洗、装盘而成。口感清香，锅开后再煮1分钟左右即可食用',4);

/*订单*/
CREATE TABLE xfn_order(
    oid INT PRIMARY KEY AUTO_INCREMENT,
   startTime BIGINT,
    endTime BIGINT,
    customerCount INT,
    tableId INT,
    FOREIGN KEY(tableId) REFERENCES xfn_table(tid)
);
INSERT INTO xfn_order VALUES
(1,'1550297414909','1550311200000',3,1);

/*订单详情*/
CREATE TABLE xfn_order_detail(
    oid INT PRIMARY KEY AUTO_INCREMENT,
   dishId INT, /*菜品编号*/
    dishCount INT,/*份数*/
    customerName VARCHAR(32),/*顾客称谓*/
   orderId INT,/*订单编号*/
    FOREIGN KEY(dishId) REFERENCES xfn_dish(did),
    FOREIGN KEY(orderId) REFERENCES xfn_order(oid)
);
INSERT INTO xfn_order_detail VALUES
(NULL,100001,1,'丁丁',1);

