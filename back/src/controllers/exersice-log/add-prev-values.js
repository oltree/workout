export const addPrevValues = (currentLog, prevLog = null) => {
	return currentLog.times.map((item, index) => ({
		...item,
		prevWeight: prevLog ? prevLog.times[index].weight : 0,
		prevRepeat: prevLog ? prevLog.times[index].repeat : 0
	}));
};
