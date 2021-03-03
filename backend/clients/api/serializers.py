from rest_framework import serializers


class ClientSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=200)
