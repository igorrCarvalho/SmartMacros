from __future__ import annotations
import uuid
from typing import ClassVar, Set, Type
from sqlalchemy import DateTime, ForeignKey, text, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, declared_attr

USER_OWNED_REGISTRY: Set[Type] = set()

class UserOwnedMixin:
    __abstract__ = True

    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="CASCADE"),
        index=True,
        nullable=False,
    )

    def __init_subclass__(cls, **kwargs):
        super().__init_subclass__(**kwargs)
        if "__tablename__" in cls.__dict__ or any(
            hasattr(base, "__tablename__") for base in cls.__mro__
        ):
            USER_OWNED_REGISTRY.add(cls)