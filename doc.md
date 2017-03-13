# Data Flow

Data flow in one of the following way:
1. dispatch actions -> reducers -> redux store -> component props -> UI
2. keypress -> (EventEmitter) -> component state changes
3. component events -> (EventEmitter) -> keyboard