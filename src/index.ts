interface ActionsFormat<T> {
  type: T
}

type ActionExtraction<Payload, Type> = Extract<Payload, { type: Type }>

type ActionsMapper<State, ActionsPayload extends ActionsFormat<string>, UsingImmer extends boolean> = {
  [key in ActionsPayload['type']]: (
    state: State,
    action: ActionExtraction<ActionsPayload, key>
  ) => UsingImmer extends true ? State | void : State
}

const createReducer = <State, ActionsPayload extends ActionsFormat<string>, UsingImmer extends boolean = false>(
  actionMapper: ActionsMapper<State, ActionsPayload, UsingImmer>
) => (state: State, action: ActionsPayload) => {
  const actionFunc = actionMapper?.[action.type as ActionsPayload['type']]
  return actionFunc
    ? actionFunc?.(state, action as ActionExtraction<ActionsPayload, typeof action.type>) || state
    : state
}

export default createReducer
