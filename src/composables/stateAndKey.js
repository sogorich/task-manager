
export function checkStateAndKey(state, eventKey, eventKeyCode, customCallback, isDenial) {
	
	const stateProxy = isDenial ? !state : state
	
	if (stateProxy && eventKey === eventKeyCode) {
		customCallback()	
	}
}