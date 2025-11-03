from sqlalchemy import event
from sqlalchemy.orm import Session, with_loader_criteria
from app.core.user_context import get_current_user_id
from app.models.mixins.user_owned import USER_OWNED_REGISTRY

@event.listens_for(Session, "before_flush")
def _inject_user_id(session: Session, flush_context, instances):
    uid = get_current_user_id()
    if uid is None or not USER_OWNED_REGISTRY:
        return None
    for obj in session.new:
        if obj.__class__ in USER_OWNED_REGISTRY and getattr(obj, "user_id", None) is None:
            try:
                setattr(obj, "user_id", uid)
            except Exception:
                pass
    return None

@event.listens_for(Session, "do_orm_execute")
def _apply_user_scope(execute_state):
    if not execute_state.is_select:
        return None
    uid = get_current_user_id()
    if uid is None or not USER_OWNED_REGISTRY:
        return None

    stmt = execute_state.statement
    for model in list(USER_OWNED_REGISTRY):
        stmt = stmt.options(
            with_loader_criteria(
                model,
                lambda cls: cls.user_id == uid,
                include_aliases=True,
            )
        )
    execute_state.statement = stmt
    return None
