from rest_framework import serializers
from .models import Profile
from ..Account.models import Account


class ProfileSerializer(serializers.ModelSerializer):
    account = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = '__all__'

    def get_account(self, obj):
        return Account.objects.get(pk=obj.account.id).__str__()


class ProfileUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'
