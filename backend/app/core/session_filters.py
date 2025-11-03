from typing import Any
from sqlalchemy import event
from sqlalchemy.orm import Session, with_loader_criteria
from app.core.user_context import get_current_user_id
from app.models.mixins import USER_OWNED_REGISTRY, UserOwnedMixin

@event.listens_for(Session, "do_orm_execute", retval=True)
def _add_user_scope(execute_state) -> Any:
    uid = get_current_user_id()
    if uid is None:
        return execute_state.statement

    stmt = execute_state.statement
    for model in USER_OWNED_REGISTRY:
        stmt = stmt.options(
            with_loader_criteria(
                model,
                lambda cls: cls.user_id == uid,
                include_aliases=True,
            )
        )
    return stmt

@event.listens_for(Session, "before_flush")
def _inject_user_id_on_new(session, flush_context, instances):
    uid = get_current_user_id()
    if uid is None:
        return
    for obj in session.new:
        if isinstance(obj, UserOwnedMixin) and getattr(obj, "user_id", None) is None:
            obj.user_id = uid