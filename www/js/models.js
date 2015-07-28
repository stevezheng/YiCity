/**
 * Created by pc-bin on 2015/7/23 0023.
 */
'use strict';
var Schema = require('./schema');
var Q = Schema.Q;
var _ = require('underscore');
var async = require('async');

var Category = exports.Category = new Schema('Category', {
    fields: [
        {name: 'name', type: 'str', unique: true}
    ]
});

var Shop = exports.Shop = new Schema('Shop', {
    fields: [
        {name: 'description',  type: 'str'},    // ��������
        {name: 'address',      type: 'str'},    // ���̵�ַ
        {name: 'area',         type: 'str'},    // ��������
        {name: 'distrinct',    type: 'str'},    // ��Ȧ
        {name: 'userId',       type: 'str'},
        {name: 'phone',        type: 'number'},
        {name: 'name',         type: 'str'},
        {name: 'categoryId',   type: 'str'},
        {name: 'categoryName', type: 'str'},
        {name: 'keywords',     type: 'json'},
        {name: 'title',        type: 'str'},
        {name: 'tel',          type: 'str'},
        {name: 'image',        type: 'str'},
        {name: 'price',        type: 'number'},
        {name: 'sort',         type: 'number'},
        {name: 'comments',     type: 'json'},   // ����
    ]
});

Shop.fillObjects = function(shops, callback) {
    if (!Array.isArray(shops)) {
        shops = [shops];
    }

    shops = shops.map(function(shop) {
        if (shop.toJSON) {
            return shop.toJSON();
        }
        return shop;
    });

    var ids = shops.map(function(shop) {
        return shop.userId;
    });

    ids = _.uniq(ids);
    async.waterfall([
        function(next) {
            User.findByIds(ids, next);
        },
        function(users, next) {
            var userMap = {};
            users.forEach(function(user) {
                userMap[user.Id] = user.toJSON();
            });
            shops = shops.map(function(shop) {
                shops.user = userMap[shop.userId];
                return shop
            });
            next(null, shops);
        }
    ], callback);
};

var ShopComment = exports.ShopComment = new Schema('ShopComment', {
    fields: [
        {name: 'content', type: 'str'},
        {name: 'shopId',  type: 'str', index: true},
        {name: 'userId',  type: 'str'}
    ]
});

ShopComment.fillObjects = function(comments, callback) {
    if (!Array.isArray(comments)) {
        comments = [comments];
    }

    comments = comments.map(function(comment) {
        if (comment.toJSON) {
            return comment.toJSON();
        }
        return comment;
    });

    var ids = comments.map(function(comment) {
        return comment.userId;
    });

    ids = _.uniq(ids);
    async.waterfall([
        function(next) {
            User.findByIds(ids, next);
        },
        function(users, next) {
            var userMap = {};
            users.forEach(function(user) {
                userMap[user.Id] = user.toJSON();
            });
            comments = comments.map(function(comment) {
                comments.user = userMap[comment.userId];
                return comment
            });
            next(null, comments);
        }
    ], callback);
};

var Item = exports.Item = new Schema('Item', {
    fields: [
        {name: 'saleName',     type: 'number'}, // ����
        {name: 'commentStar',  type: 'number'}, // ����
        {name: 'commentCount', type: 'number'}, // ������
        {name: 'comments',     type: 'json'},   // ����
        {name: 'originPrice',  type: 'number'},
        {name: 'marketPrice',  type: 'number'},
        {name: 'price',        type: 'number'}, // �۸�
        {name: 'freight',      type: 'number'}, // �˷�
        {name: 'name',         type: 'str'},
        {name: 'shopId',       type: 'str'},
        {name: 'shopName',     type: 'str'},
        {name: 'categoryId',   type: 'str'},
        {name: 'categoryName', type: 'str'},
        {name: 'description',  type: 'str'},    // ��Ʒ����
        {name: 'content',      type: 'str'},    // ��Ʒ����
        {name: 'click',        type: 'number'},
        {name: 'brandId',      type: 'str'},    // Ʒ�� ID
        {name: 'brandName',    type: 'str'},    // Ʒ������
        {name: 'vat',          type: 'number'}, // ��ֵ˰
        {name: 'collect',      type: 'number'}, // �ղ�
        {name: 'status',       type: 'number'}, // ״̬ 0-����, 1-����
        {name: 'storage',      type: 'number'}, // ���
        {name: 'image',        type: 'str'},    // Ĭ����ƷͼƬ
        {name: 'images',       type: 'json'},   // ��ƷͼƬ
        {name: 'transportId',  type: 'str'},    // �˷�ģ��
    ]
});

var FlashSale = exports.FlashSale = new Schema('FlashSale', {
    fields: [
        {name: 'itemId',  type: 'str'},    // ��Ʒ ID
        {name: 'Item',  type: 'pointer'},    // ��Ʒָ��
        {name: 'discountPrice',  type: 'number'},    // �ۿۼ�
        {name: 'limitCount',  type: 'number'},    // �޹�
        {name: 'status',  type: 'number'},    // ״̬ 0-����, 1-����
        {name: 'expireTime',  type: 'date'},    // ����ʱ��
    ]
});

var CashBack = exports.CashBack = new Schema('CashBack', {
    fields: [
        {name: 'itemId',  type: 'str'},    // ��Ʒ ID
        {name: 'Item',  type: 'pointer'},    // ��Ʒָ��
        {name: 'cashBack',  type: 'number'},    // �ۿۼ�
        {name: 'status',  type: 'number'},    // ״̬ 0-����, 1-����
    ]
});

//����ȯ
var Vouchers = exports.Vouchers = new Schema('Vouchers', {
    fields: [
        {name: 'shopId',  type: 'str'},    // ���� ID
        {name: 'Shop',  type: 'pointer'},    // ����ָ��
        {name: 'discount',  type: 'number'},    // ���ý��
        {name: 'condition',  type: 'number'},    // ������
        {name: 'limitCount',  type: 'number'},    // ����ȯ����
        {name: 'expireTime',  type: 'date'},    // ����ʱ��
        {name: 'count',  type: 'number'},    // ��ȡ����
        {name: 'status',  type: 'number'},    // ״̬ 0-����, 1-����
    ]
});

//����ȯ����
var VouchersOrder = exports.VouchersOrder = new Schema('VouchersOrder', {
    fields: [
        {name: 'name',  type: 'str'},    // ����
        {name: 'shopId',  type: 'str'},    // ���� ID
        {name: 'Shop',  type: 'pointer'},    // ����ָ��
        {name: 'VouchersId', type: 'str'}, // ����ȯid
        {name: 'Vouchers', type: 'pointer'}, // ����ȯָ��
        {name: 'userId',  type: 'str'},    // ��ȡ��id
        {name: 'User',  type: 'pointer'},    // ��ȡ��ָ��
        {name: 'activeTime',  type: 'date'},    // ��ȡʱ��
        {name: 'status',  type: 'number'},    // ״̬ 0-����, 1-����, 2-��ʹ��
    ]
});

//����
var Buying = exports.Buying = new Schema('Buying', {
    fields: [
        {name: 'name',  type: 'str'},    // ����
        {name: 'itemId',  type: 'str'},    // ��Ʒ ID
        {name: 'content',  type: 'str'},    // �����
        {name: 'Item',  type: 'pointer'},    // ����ָ��
        {name: 'discountPrice',  type: 'number'},    // �����۸�
        {name: 'limitCount',  type: 'number'},    // ��������
        {name: 'expireTime',  type: 'date'},    // ����ʱ��
        {name: 'count',  type: 'number'},    // ��������
        {name: 'status',  type: 'number'},    // ״̬ 0-����, 1-����
    ]
});

//��������
var BuyingOrder = exports.BuyingOrder = new Schema('BuyingOrder', {
    fields: [
        {name: 'itemId',  type: 'str'},    // ���� ID
        {name: 'Item',  type: 'pointer'},    // ����ָ��
        {name: 'buyingId', type: 'str'}, // ����id
        {name: 'Buying', type: 'pointer'}, // ����ָ��
        {name: 'userId',  type: 'str'},    // ��ȡ��id
        {name: 'User',  type: 'pointer'},    // ��ȡ��ָ��
        {name: 'activeTime',  type: 'date'},    // ��ȡʱ��
        {name: 'status',  type: 'number'},    // ״̬ 0-����, 1-����, 2-��ʹ��
    ]
});

Item.fillObjects = function(items, callback) {
    if (!Array.isArray(items)) {
        items = [items];
    }

    items = items.map(function(item) {
        if (item.toJSON) {
            return item.toJSON();
        }
        return item;
    });

    var ids = items.map(function(item) {
        return item.userId;
    });

    ids = _.uniq(ids);
    async.waterfall([
        function(next) {
            User.findByIds(ids, next);
        },
        function(users, next) {
            var userMap = {};
            users.forEach(function(user) {
                userMap[user.Id] = user.toJSON();
            });
            items = items.map(function(item) {
                items.user = userMap[item.userId];
                return item
            });
            next(null, items);
        }
    ], callback);
};

var ItemComment = exports.ItemComment = new Schema('ItemComment', {
    fields: [
        {name: 'content', type: 'str'},
        {name: 'itemId',  type: 'str', index: true},
        {name: 'userId',  type: 'str'}
    ]
});

ItemComment.fillObjects = function(comments, callback) {
    if (!Array.isArray(comments)) {
        comments = [comments];
    }

    comments = comments.map(function(comment) {
        if (comment.toJSON) {
            return comment.toJSON();
        }
        return comment;
    });

    var ids = comments.map(function(comment) {
        return comment.userId;
    });

    ids = _.uniq(ids);
    async.waterfall([
        function(next) {
            User.findByIds(ids, next);
        },
        function(users, next) {
            var userMap = {};
            users.forEach(function(user) {
                userMap[user.Id] = user.toJSON();
            });
            comments = comments.map(function(comment) {
                comments.user = userMap[comment.userId];
                return comment
            });
            next(null, comments);
        }
    ], callback);
};

var Address = exports.Address = new Schema('Address', {
    fields: [
        {name: 'isDefault', type: 'bool'},   // �Ƿ���Ĭ�ϵ�ַ
        {name: 'phone',     type: 'number'}, // �ջ��˵绰
        {name: 'name',      type: 'str'},    // �ջ�������
        {name: 'province',  type: 'str'},
        {name: 'city',      type: 'str'},
        {name: 'area',      type: 'str'},
        {name: 'address',   type: 'str'},
        {name: 'userId',    type: 'str'},
        {name: 'username',  type: 'str'},
    ]
});


var Order = exports.Order = new Schema('Order', {
    fields: [
        {name: 'userId',           type: 'str'},
        {name: 'cost',             type: 'number'}, // �ܶ�
        {name: 'items',            type: 'json'},   // ��Ʒ��Ϣ
        {name: 'status',           type: 'number'}, // ����״̬ -2-�˻� -1-ȡ�� 0-����������,δ֧�� 1-������֧�� 2-����������
        {name: 'payMethod',        type: 'number'}, // ֧����ʽ 0-���� 1-�ֽ�
        {name: 'useMethod',        type: 'number'}, // ���ѷ�ʽ 0-�������� 1-�ͻ�����
        {name: 'voucherId',        type: 'str'},    // ����ȯid idΪ�ձ�ʾ��ʹ�ô���ȯ
        {name: 'voucherMoney',     type: 'number'}, // ����ȯ���
        {name: 'voucherCondition', type: 'json'},   // ����ȯʹ������
        {name: 'address',          type: 'json'},
        {name: 'alipaySN',         type: 'json'},   // ֧����������
        {name: 'wechatSN',         type: 'json'}    // ΢�Ŷ�����
    ]
});

var Config = exports.Config = new Schema('Config', {
    fields: [
        {name: 'key',   type: 'str', unique: true},
        {name: 'value', type: 'str'}
    ]
});

Config.set = function(key, value, callback) {
    Config.findByKey(key, function(err, conf) {
        if (conf) {
            conf.value = value;
        } else {
            conf = new Config({key: key, value: value});
        }
        conf.save(callback);
    });
};

Config.get = Config.findByKey;

var User = exports.User = new Schema("User", {
    fields: [

    ]
});

//��̳
var Forum = exports.Forum = new Schema('Forum', {
    fields: [
        {name: 'title',        type: 'str'},    // ����
        {name: 'content',      type: 'str'},    // ����
        {name: 'Browse',       type: 'str'},    // �����
        {name: 'userId',       type: 'str'},    // ������
        {name: 'commentNum ',  type: 'number'}, //������
        {name: 'url',          type: 'number'},
        {name: 'categoryId',   type: 'str'},
        {name: 'categoryName', type: 'str'},
        {name: 'image',        type: 'str'},
    ]
});

//��̳����
var ForumComment = exports.ForumComment = new Schema('ForumComment', {
    fields: [
        {name: 'commentContent',type: 'str'},    //��������
        {name: 'toUsername',    type: 'str'},    // �ظ�����
        {name: 'forumId',       type: 'str'},    // �ظ���������Id
        {name: 'ForumComment',  type: 'str'},
        {name: 'username ',     type: 'str'},
        {name: 'userId',        type: 'str'},
    ]
});

//��̳�ղ�
var ForumCollection = exports.ForumCollection = new Schema('ForumCollection', {
    fields: [
        {name: 'ForumId',       type: 'str'},    // ����
        {name: 'userId',        type: 'str'},    // �ղ���
    ]
});
