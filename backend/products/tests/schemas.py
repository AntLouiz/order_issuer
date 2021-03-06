from marshmallow import Schema, fields


class ProductSchema(Schema):
    name = fields.Str()
    price = fields.Int()
    multiple = fields.Int()
