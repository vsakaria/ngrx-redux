export const reminders = (state: any = [], {type, payload}) => {
	switch (type) {
  		case 'CREATE_REMINDER':
      		return [...state, payload];
    	default:
      		return state;
  	}
};
